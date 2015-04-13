/*jshint node: true*/

var root = process.cwd();

var pdfToHtml = require(root + '/src/pdfToHtml');

var corrections = {
    name: {
        'nicke, Erik': 'Stänicke, Erik'
    },
    phone: {
        '2424270': '22424270',
        '2430824': '22430824',
        '2468163': '22468163',
        '2600200': '22600200',
        '2845125': '22845125',
        '2563567': '22563567',
        '2581783': '22581783',
        '2923759': '22923759',
        '2491197': '22491197',
        '689804': '21689804',
        '8174959': '48174959'
    }
};

var pathToPdf = root + "/data/Psykologer_Oslo_telefonliste.pdf";

pdfToHtml({
    categories: {
        'Psykologer:': 'Psykologer:',
        'Nevropsykologer:': 'Nevropsykologer:'
    },
    dir: __dirname,
    pageTitle: 'Psykologer i Oslo',
    pagesDataKey: 'Psykologer:',
    pathToPdf: pathToPdf,
    headerIndex: 2
});