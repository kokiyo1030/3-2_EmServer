const request = require('request');
var parseString = require('xml2js').parseString;

request('http://www.kma.go.kr/wid/queryDFSRSS.jsp?zone=4128157500', function (error, response, body) {
    parseString(body, function (err, result) {
        var parseData = result;
        console.log(parseData.rss.channel[0].item[0].description[0].body[0].data[0]);
    })
});