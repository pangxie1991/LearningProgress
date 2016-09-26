function getOneCount(num) {
  var count = 0,
    tt;
  for (var i = 0; i < 21; i++) {
    tt = (0x1) << i;
    if (tt&num) {
      count++;
    }
  }
  return count
}
function getResult(l, r, m) {
  var count = 0;
  for (var i = l; i <= r; i++) {
    if (m === getOneCount(i)) {
      count++;
    }
  }
  if (count) {
    print(count);
  } else {
    print(-1);
  }
}
var line;
while (line = read_line()) {
  line = line.trim().split(' ').map(function(x) {
    return parseInt(x);
  });
  getResult(line[0], line[1], line[2]);
}