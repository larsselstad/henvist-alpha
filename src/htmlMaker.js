// TODO: sanere denne?

/*jshint node: true*/
var fs = require('fs'),
    dot = require('dot');

module.exports = function (dir, params) {
    var pageTemplate = fs.readFileSync(__dirname + '/template/page.template.html', 'utf8');
    var peopleTemplate = fs.readFileSync(__dirname + '/template/people.template.html', 'utf8');

    var html = fs.createWriteStream(dir + '/index.html');

    dot.templateSettings.strip = false;

    var peopleTempFn = dot.template(peopleTemplate);
    var pageTempFn = dot.template(pageTemplate);

    var pageRes = pageTempFn({
        body: peopleTempFn(params),
        title: params.title
    });

    html.end(pageRes);
    
    console.log('Generated: ' + dir + '/index.html');
};