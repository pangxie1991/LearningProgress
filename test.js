// var parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
//
// var result = parse_url.exec('http://www.baidu.com:8081/goodpart?q#fragment');
//
// var names = ['url', 'scheme', 'slash', 'host', 'port', 'path', 'query', 'hash'];
//
// var blanks = '    ';
//
// var i;
//
// for (i = 0; i < names.length; i++) {
//     console.log(names[i] + ':' + blanks.substring(names[i].length) + result[i]);
// }

var reg = /(?:(lo)+l)/;

var result = reg.exec('I love lol');

console.log(result);
