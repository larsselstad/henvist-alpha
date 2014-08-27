// TODO: sanere denne?

/*jshint node: true*/
var fs = require('fs'),
    dot = require('dot');

module.exports = function (root, dir, psykologer, nevropsykologer) {
    var page = fs.readFileSync(root + '/src/template/page.template.html', 'utf8');
    var people = fs.readFileSync(root + '/src/template/people.template.html', 'utf8');

    var html = fs.createWriteStream(dir + '/index.html');

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