// TODO: sanere denne?

/*jshint node: true*/
var fs = require('fs'),
    dot = require('dot');

module.exports = function (root, dir, title, headerRow, people) {
    var pageTemplate = fs.readFileSync(root + '/src/template/page.template.html', 'utf8');
    var peopleTemplate = fs.readFileSync(root + '/src/template/people.template.html', 'utf8');

    var html = fs.createWriteStream(dir + '/index.html');

    var peopleTempFn = dot.template(peopleTemplate);
    var pageTempFn = dot.template(pageTemplate);

    var pageRes = pageTempFn({
        body: peopleTempFn({
            tittel: title,
            headerRow: headerRow,
            people: people
        }),
        title: title
    });

    html.end(pageRes);
};