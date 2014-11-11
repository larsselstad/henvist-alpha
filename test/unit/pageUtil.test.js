/*jshint node: true*/

var root = process.cwd();

var assert = require('assert'),
    pageUtil = require(root + '/src/pageUtil');

function makeTextValue(word, x, y) {
    return {
        R: [{
            T: encodeURIComponent(word)
            }],
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
    },
    extractRowTest: function () {
        var grid = [];
        var texts = [makeTextValue('row1 - 0', 0, 0.12),
                     makeTextValue('row2 - 0', 4, 33.16),
                     makeTextValue('row3 - 0a', 0, 4.748),
                     makeTextValue('row3 - 0b', 0, 4.088),
                     makeTextValue('row3 - 1', 4, 4.748),
                     makeTextValue('row4 - 0', 0, 32.12),
                     makeTextValue('row4 - 1', 4, 32.12),
                    ];

        texts.forEach(pageUtil.extractRows(grid));

        assert.equal(grid[0][0].text, 'row1 - 0');
        assert.equal(grid[1][0].text, 'row2 - 0');

        assert.equal(grid[2][0].text, 'row3 - 0a');
        assert.equal(grid[2][1].text, 'row3 - 0b');
        assert.equal(grid[2][2].text, 'row3 - 1');

        assert.equal(grid[3][0].text, 'row4 - 0');
        assert.equal(grid[3][1].text, 'row4 - 1');
    },
    joinCellsTest: function () {
        var grid = [
            [
                { text: 'Navn', x: 9, y: 47 },
                { text: 'Praksisadr, hvis ulik', x: 25, y: 41 },
                { text: 'postadresse', x: 25, y: 47 },
                { text: 'Postadresse', x: 47, y: 47 },
                { text: 'Poststed', x: 64, y: 47 },
                { text: 'Tlf. praksis', x: 79, y: 47 },
                { text: 'Avtalt %', x: 87, y: 47 }
            ],
            [
                { text: 'Ahmadzadeh, Vali', x: 9, y: 65 },
                { text: 'Nedre Storgate 13', x: 47, y: 65 },
                { text: '3015 Drammen', x: 64, y: 65 },
                { text: '47279964', x: 80, y: 65 },
                { text: '100', x: 91, y: 65 }
            ]
        ];
        
        var newGrid = grid.map(pageUtil.joinCells);
        
        assert.equal(newGrid[0][0], grid[0][0]);
        assert.equal(newGrid[0][1].text, 'Praksisadr, hvis ulik postadresse');
        assert.equal(newGrid[0][2].text, 'Postadresse');
    }
};