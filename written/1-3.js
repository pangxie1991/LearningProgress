function getResult (arr) {
  var arrSort = arr.slice(0);
  var l = arr.length;
  var flag = true;
  arrSort.sort(function(a,b) {
    return a - b;
  });
  var start = 0, end = l - 1;
  while (start < l && arr[start] === arrSort[start]) {
    start++;
  }
  while (end >= 0 && arr[end] === arrSort[end]) {
    end--;
  }
  while (start < end) {
    if (arr[start] !== arrSort[end]) {
      flag = false;
      break;
    }
    start++;
    end--;
  }
  if (flag) {
    print('yes');
  } else {
    print('no');
  }
}
var line;
while (line = read_line()) {
  var n = parseInt(line.trim().split(' ')[0]);
  var arr = read_line().trim().split(' ').map(function (x) {
    return parseInt(x);
  });
  if (arr.length === n) {
    getResult(arr);
  }
}
