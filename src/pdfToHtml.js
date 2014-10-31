/*jshint node: true*/

var root = process.cwd();

var fs = require('fs'),
    PDFParser = require("pdf2json/pdfparser"),
    pageUtil = require('./pageUtil'),
    htmlMaker = require('./htmlMaker');

module.exports = function (params) {
    var pdfParser = new PDFParser();

    // denne bør bare returnere grid
    // løses med ett async/promise biblotek
    pdfParser.on("pdfParser_dataReady", function (pdfData) {
        var grid = [];

        pdfData.data.Pages.forEach(function (page) {
            page.Texts.forEach(pageUtil.extractRows(grid));
        });

        var workGrid = pageUtil.mapRow(grid, grid[2]);

        var pagesData = pageUtil.extractData2(workGrid, params.categories);

        htmlMaker(params.dir, {
            title: params.pageTitle,
            headerRow: grid[2],
            people: pagesData[params.pagesDataKey],
            lastUpdate: pagesData.lastUpdate
        });
    });

    pdfParser.on("pdfParser_dataError", function (data) {
        console.log('error reading: ' + params.pathToPdf);
    });

    fs.readFile(params.pathToPdf, function (err, pdfBuffer) {
        if (!err) {
            pdfParser.parseBuffer(pdfBuffer);
        }
    });
};