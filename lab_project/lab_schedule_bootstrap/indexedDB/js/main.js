/**
 * Created by Fancy on 2015/12/22.
 */
var db = null;

window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

//create DB and connect to it
var connectToDB = function () {
    var version = 1,
        request = window.indexedDB.open("awesomenotes", version);
    //create list
    request.onupgradeneeded = function (event) {
        alert("unupgradeneeded fired");
        var db = event.target.result;
        db.createObjectStore("notes", {keyPath: "id", autoIncrement: true});
    };
    request.onsuccess = function (event) {
        db = event.target.result;
        fetchNotes();
    };
    request.onerror = function (event) {
        alert(event.debug[1].message);
    }
};

//load the notelist
var fetchNotes = function () {
    var keyRange, request, result, store, transaction;

    transaction = db.transaction(["notes"],"readwrite");
    store = transaction.objectStore("notes");

    //gain the data
    keyRange = IDBKeyRange.lowerBound(0);
    request = store.openCursor(keyRange);

    request.onsuccess = function (event) {
        result = event.target.result;
        if(result){
            addToNotesList(result.key,result.value);
            result.continue();
        }
    };

    request.onerror = function (event) {
        alert("Unable to fetch records.");
    };
};

var addToNotesList = function (key,data){
    var item = $("<li>");
    var notes = $("#notes");

    item.attr("data-id", key);
    item.html(data.title);
    notes.append(item);
};

// read the specific
$("#notes").click(function (event) {
    var element = $(event.target);
    if(element.is('li')){
        getNote(element.attr("data-id"));
    }
});

var getNote = function (id){
    var request,store,transaction ;
    id = parseInt(id);

    transaction = db.transaction(["notes"]);
    store = transaction.objectStore("notes");
    request = store.get(id);

    request.onsuccess = function (event){
        showNote(request.result);
    };

    request.onerror = function (error){
        alert("Unable to fetch record" + id);
    };
}

var showNote = function (data){
    var note = $("note"),
        title = $("#title");

    title.val(data.title);
    title.attr("data-id",data.id);
    note.val(data.note);

    $("#delete_button").show();
}

//create update delete note
$("#new_button").click(function (event) {
    newNote();
});

var newNote = function () {
    var note = $("#note");
    var title = $("#title");

    $("#delete_button").hide();
    title.removeAttr("data-id");
    title.val("");
    note.val("");
};

$("#save_button").click(function (event) {
    var id,note,title;

    event.preventDefault();
    note = $("#note");
    title = $("#title");
    id = title.attr("data-id");

    if(id){

        updateNote(id,title.val(),note.val());
    }
})