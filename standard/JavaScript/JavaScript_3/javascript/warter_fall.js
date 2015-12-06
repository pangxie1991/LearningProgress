/**
 * Created by Fancy on 2015/11/20 0020.
 */
window.onload = function(){
    imgLocation("container","box");
    var imgData = {"data":[{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"},{"src":"5.jpg"},{"src":"6.jpg"},{"src":"7.jpg"},{"src":"8.jpg"}]};
    window.onscroll = function (){
        if(checkFlag()){
            var cparent = document.getElementById("container");
            for(var i = 0;i<imgData.data.length;i++){
                var ccontent = document.createElement("div");
                ccontent.className = "box";
                cparent.appendChild(ccontent);
                var box_image =document.createElement("div");
                box_image.className = "box_image";
                ccontent.appendChild(box_image);
                var img = document.createElement("img");
                img.src = "EVE/"+imgData.data[i].src;
                box_image.appendChild(img);
            }
            imgLocation("container","box");
        }
    }
};
function imgLocation(parent,content){
    //讲parent下的所有内容全部取出。
    var cparent = document.getElementById(parent);          //指定并赋值父集
    var ccontent = getChildElement(cparent,content);       //调用得到父集的经选择的子集并放入一个数组的函数
    //console.log(ccontent);                               //将数组打印到控制台。
    var imgWidth = ccontent[0].offsetWidth;
    var cols = Math.floor(window.innerWidth/imgWidth);      //得到具体的行数
    console.log(window.innerWidth);
    cparent.style.cssText = "width:"+imgWidth*cols+"px;margin:0 auto;";
    var boxHeightArr = [];
    for (var i = 0;i<ccontent.length;i++){
        if(i<cols){
            boxHeightArr.push(ccontent[i].offsetHeight);
        }else{
            var minHeight = Math.min.apply(null,boxHeightArr);
            var minIndex = getMinHeightLocation(boxHeightArr,minHeight);
            ccontent[i].style.position = "absolute";
            ccontent[i].style.top = minHeight+"px";
            ccontent[i].style.left = ccontent[minIndex].offsetLeft+"px";
            boxHeightArr[minIndex] = boxHeightArr[minIndex]+ccontent[i].offsetHeight;
        }
    }
    window.ccontent = ccontent;
    //window.cparent = cparent;
}
function getMinHeightLocation(boxHeightArr,minHeight){
    for(var i in boxHeightArr){
        if(boxHeightArr[i] == minHeight){
            return i;
        }
    }
}
function getChildElement(parent,content){
    var contentArr = [];                                        //定义一个空的数组
    var allcontent = parent.getElementsByTagName("*");         //取得父集的所有子元素
    for(var i = 0;i<allcontent.length;i++){
        if(allcontent[i].className == content){
            contentArr.push(allcontent[i]);
        }
    }
    return contentArr;
}
function checkFlag(){
    var lastContentHeight = ccontent[ccontent.length -1].offsetTop;
    var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
    var pageHeight = document.documentElement.clientHeight||document.body.clientHeight;
    if (lastContentHeight<scrollTop+pageHeight){
        return true;
    }
    console.log(lastContentHeight+":"+scrollTop+":"+pageHeight);
}
