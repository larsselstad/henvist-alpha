/*jshint node: true*/

var root = process.cwd();

var assert = require('assert'),
    pageUtil = require(root + '/src/pageUtil');

function makeTextValue(word, x, y) {
    return {
        R: [
            {
                T: encodeURIComponent(word),
                }
            ],
        x: x,
        y: y
    };
}

function assertObject(a, b, value) {
    assert.equal(a, b, value + ' should be "' + a + '", but is "' + b + '"');
}

module.exports = {
    categoriesTest: function () {
        var grid = [
            ['Sist endret 12.05.2014', '', ''],
            ['Helse Sør-Øst RHF, Kjøp av helsetjenester, tlf. 02411'],
            ['Navn', 'Praksisadr', 'Postadresse', 'Poststed', 'Tlf. praksis', 'Avtale', 'Kommentar'],
            ['Category: 1', '', ''],
            ['Cat 1 - Name 1',
            'Terapeutene Majorstua',
            'Majorstuvn. 36',
            '0367 Oslo',
            '99256816',
            '20',
            'Kommentar'],
            ['Sist endret 12.05.2014'],
            ['Cat 1 - Name 2',
            'Terapeutene Majorstua',
            'Majorstuvn. 36',
            '0367 Oslo',
            '99256816',
            '20',
            'Kommentar'],
            ['Category: 2', '', ''],
            ['Cat 2 - Name 1',
            'Terapeutene Majorstua',
            'Majorstuvn. 36',
            '0367 Oslo',
            '99256816',
            '20',
            'Kommentar'],
            ['Cat 2 - Name 2',
            'Terapeutene Majorstua',
            'Majorstuvn. 36',
            '0367 Oslo',
            '99256816',
            '20',
            'Kommentar'],
            ['Helse Sør-Øst RHF, Kjøp av helsetjenester, tlf. 02411'],
            ['Cat 2 - Name 3',
            'Terapeutene Majorstua',
            'Majorstuvn. 36',
            '0367 Oslo',
            '99256816',
            '20',
            'Kommentar']
        ],
            categories = {
                'Category: 1': 'Category: 1',
                'Category: 2': 'Category: 2'
            };

        var data = pageUtil.extractData2(grid, categories);

        //console.log(data);

        assert.equal(grid[0][0], data.lastUpdate);

        assert.notEqual(data['Category: 1'], undefined);
        assert.notEqual(data['Category: 2'], undefined);

        assertObject(grid[4][0], data['Category: 1'][0][0]);
        assertObject(grid[6][0], data['Category: 1'][1][0]);

        assertObject(grid[8][0], data['Category: 2'][0][0]);
        assertObject(grid[9][0], data['Category: 2'][1][0]);
        assertObject(grid[11][0], data['Category: 2'][2][0]);
    }
};