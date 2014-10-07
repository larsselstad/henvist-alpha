/*jshint node: true*/

var root = process.cwd();

var assert = require('assert'),
    fs = require('fs'),
    PDFParser = require("pdf2json/pdfparser"),
    pageUtil = require(root + '/src/pageUtil'),
    numberUtil = require(root + '/src/numberUtil');

function ass(expect, actual) {
    try {
        return assert.equal(expect, actual);
    } catch (e) {
        return e;
    }
}

function assertArray(expect, actual) {
    var errors = [];

    expect.forEach(function (el, i) {
        errors.push(ass(el, actual[i]));
    });

    return errors.filter(Boolean);
}

function isEmpty(el) {
    if (el === undefined) {
        return false;
    } else {
        if (el.length === 0) {
            return false;
        }

        return true;
    }
}

function testEnd(testName, errors) {
    if (errors.length === 0) {
        console.log(testName + ': Done with no errors');
    } else {
        console.log(testName + ': Done with ' + errors.length + ' errors');

        errors.forEach(function (el) {
            console.log(el);
        });
    }

}

module.exports = {
    extractingPsykologerOsloTest: function () {
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

        var pathToPdf = __dirname + "/Psykologer_Oslo_telefonliste.pdf";

        var pdfParser = new PDFParser();

        // denne bør bare returnere grid
        // løses med ett async/promise biblotek
        pdfParser.on("pdfParser_dataReady", function (pdfData) {
            var grid = [];

            pdfData.data.Pages.forEach(function (page) {
                page.Texts.forEach(pageUtil.extractRows(grid));
            });

            var workGrid = pageUtil.mapRow(grid[2])(grid);

            var errors = [];

            errors.push(ass(workGrid.length, 157));

            errors.push(ass(workGrid[0][3], 'Sist endret 12.05.2014'));
            errors.push(ass(workGrid[1][0], 'Helse Sør-Øst RHF, Kjøp av helsetjenester, tlf. 02411'));

            errors.push(assertArray(workGrid[2], ['Navn',
                'Praksisadr',
                'Postadresse',
                'Poststed',
                'Tlf. praksis',
                'Avtale',
                'Kommentar'
            ]));

            errors.push(assertArray(workGrid[3], ['Psykologer:', , , , , , ]));

            errors.push(assertArray(workGrid[4], [
                'Forsmo, Rune',
                'Kongensgate 2',
                ,
                '0153 Oslo',
                '95186639',
                '100',
             ]));

            errors.push(assertArray(workGrid[5], [
                'Johansen, Jarl Otto',
                'Kongensgate 2',
                ,
                '0153 Oslo',
                '99308707',
                '100',
             ]));

            errors.push(assertArray(workGrid[155], [
                'Reiersen Odd-Arne',
                'Nevropsykologisk Senter',
                'Økernvn. 145',
                '0580 Oslo',
                '2491197/ 88002627',
                '100',
                '80% nevropsykologi, 20% terapi'
             ]));

            /*
            var pagesData = pageUtil.extractData(grid, {
                'Psykologer:': 'Psykologer:',
                'Nevropsykologer:': 'Nevropsykologer:'
            }, corrections);*/

            //htmlMaker(root, __dirname, 'Psykologer', pagesData['Psykologer:']);

            testEnd('extractingPsykologerOsloTest', errors.filter(isEmpty));
        });

        pdfParser.on("pdfParser_dataError", function (data) {
            console.log('error!');
        });

        fs.readFile(pathToPdf, function (err, pdfBuffer) {
            if (!err) {
                pdfParser.parseBuffer(pdfBuffer);
            }
        });
    },
    extractingPsykologerAkershusTest: function () {
        var corrections = {};

        var pathToPdf = __dirname + "/Psykologer_Akershus_telefonliste.pdf";

        var pdfParser = new PDFParser();

        // denne bør bare returnere grid
        // løses med ett async/promise biblotek
        pdfParser.on("pdfParser_dataReady", function (pdfData) {
            var grid = [];

            pdfData.data.Pages.forEach(function (page) {
                page.Texts.forEach(pageUtil.extractRows(grid));
            });

            var workGrid = pageUtil.mapRow(grid[2])(grid);

            var errors = [];

            errors.push(ass(workGrid.length, 79));

            errors.push(ass(workGrid[0][3], 'Sist endret 11.08.2014'));
            errors.push(ass(workGrid[1][0], 'Helse Sør-Øst RHF, Kjøp av helsetjenester, tlf. 02411'));

            errors.push(assertArray(workGrid[2], [
                'Navn',
                'Region',
                'Praksisadr',
                'Praksisadr',
                'Poststed',
                'Tlf. praksis',
                'Avtalt %'
            ]));

            errors.push(assertArray(workGrid[3], ['Psykologer:', , , , , , ]));

            errors.push(assertArray(workGrid[4], [
                'Anthi, Per Roar',
                'Follo',
                'Idrettsvn. 27 b,',
                ,
                '1400 Ski',
                '64873073',
                '100'
            ]));

            errors.push(assertArray(workGrid[5], [
                'Arentz-Hansen, Erik',
                'Follo',
                'Kolbotnvn. 7, 5.etg',
                'Postboks 532',
                '1411 Kolbotn',
                '92273322',
                '100'
            ]));

            /*
            var pagesData = pageUtil.extractData(grid, {
                'Psykologer:': 'Psykologer:',
                'Nevropsykologer:': 'Nevropsykologer:'
            }, corrections);*/

            //htmlMaker(root, __dirname, 'Psykologer', pagesData['Psykologer:']);

            testEnd('extractingPsykologerAkershusTest', errors.filter(isEmpty));
        });

        pdfParser.on("pdfParser_dataError", function (data) {
            console.log('error!');
        });

        fs.readFile(pathToPdf, function (err, pdfBuffer) {
            if (!err) {
                pdfParser.parseBuffer(pdfBuffer);
            }
        });
    }
};