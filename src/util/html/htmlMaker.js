/*jshint node: true*/
var fs = require('fs'),
    dot = require('dot'),
    page = fs.readFileSync('./site/template/page.template.html', 'utf8'),
    people = fs.readFileSync('./site/template/people.template.html', 'utf8');

function out(text) {
    return text || '&nbsp;';
}

module.exports = function (psykologer, nevropsykologer) {

    var html = fs.createWriteStream('./site/table.html');

    // TODO: Løs HTML generering med templates
    var peopleTempFn = dot.template(people);
    var pageTempFn = dot.template(page);

    var peopleRes1 = peopleTempFn({
        tittel: 'Psykologer',
        personer: psykologer
    });

    var peopleRes2 = peopleTempFn({
        tittel: 'Nevropsykologer',
        personer: nevropsykologer
    });

    var pageRes = pageTempFn({
        body: peopleRes1 + peopleRes2
    });

    html.end(pageRes);
};