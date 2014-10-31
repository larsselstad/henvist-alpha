// TODO: sanere denne?

/*jshint node: true*/
var fs = require('fs'),
    dot = require('dot');

module.exports = function (params) {
    var pageTemplate = fs.readFileSync(params.root + '/src/template/page.template.html', 'utf8');
    var peopleTemplate = fs.readFileSync(params.root + '/src/template/people.template.html', 'utf8');

    var html = fs.createWriteStream(params.dir + '/index.html');

    var peopleTempFn = dot.template(peopleTemplate);
    var pageTempFn = dot.template(pageTemplate);

    var pageRes = pageTempFn({
        body: peopleTempFn({
            title: params.title,
            headerRow: params.headerRow,
            people: params.people,
            lastUpdate: params.lastUpdate
        }),
        title: params.title
    });

    html.end(pageRes);
};