function getPrice(n) {
  var i = 0,
    j = 2,
    k = 2;
  while (k < n) {
    i+=2;
    j+=1;
    k+=j;
  }
  print(n - i);
}
var line;
while(line = read_line()) {
  var n = line.trim().split(' ')[0];
  getPrice(n);
}