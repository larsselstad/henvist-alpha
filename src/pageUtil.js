/*jshint node: true*/

var numberUtil = require('./numberUtil');

function safePrint(value) {
    return value || '';
}

function hasProp(object, prop) {
    return object && object.hasOwnProperty(prop);
}

function correct(corrections, prop) {
    console.log('Retter "' + prop + '"" til "' + corrections[prop] + '"');

    return corrections[prop];
}

function prepPhoneNumber(number, corrections) {
    var phoneNumberTrimmed = number.trim();

    if (phoneNumberTrimmed.length !== 8) {
        if (hasProp(corrections, phoneNumberTrimmed)) {
            return formatPhoneNumber(correct(corrections, phoneNumberTrimmed));
        } else {
            return phoneNumberTrimmed + ' er for kort';
        }
    }

    return formatPhoneNumber(phoneNumberTrimmed);
}

function formatPhoneNumber(phoneNumber) {
    var firstChar = phoneNumber.substr(0, 1);

    if (firstChar === '2' || firstChar === '8') {
        return phoneNumber.substr(0, 2) + ' ' + phoneNumber.substr(2, 2) + ' ' + phoneNumber.substr(4, 2) + ' ' + phoneNumber.substr(6, 2);
    } else if (firstChar === '9' || firstChar === '4') {
        return phoneNumber.substr(0, 3) + ' ' + phoneNumber.substr(3, 2) + ' ' + phoneNumber.substr(5);
    } else {
        return 'PhoneNumber not changed: "' + phoneNumber + '"';
    }
}

var pageUtil = {
    extractPage: function (grid) {
        var lastY,
            rowArray;

        return function (textValue) {
            var text = decodeURIComponent(textValue.R[0].T).trim();
            var circaX = parseInt(textValue.x, 10);
            var circaY = Math.round(parseFloat(textValue.y) * 10);

            //console.log(circaY + ' ' + textValue.y + ' ' + text);
            //console.log(circaX + ' ' + textValue.x + ' ' + text);

            if (!numberUtil.almostEqual(lastY, circaY)) {
                rowArray = [];

                grid.push(rowArray);
            }

            /*  9 Navn
            27 Praksisadr
            49 Postadresse
            64 Poststed
            74 Tlf. praksis
            86 Avtale
            92 Kommentar*/

            if (numberUtil.between(circaX, 7, 27)) {
                rowArray[0] = text;
            } else if (numberUtil.between(circaX, 26, 49)) {
                rowArray[1] = text;
            } else if (numberUtil.between(circaX, 48, 64)) {
                rowArray[2] = text;
            } else if (numberUtil.between(circaX, 63, 73)) {
                rowArray[3] = text;
            } else if (numberUtil.between(circaX, 72, 86)) {
                rowArray[4] = text;
            } else if (numberUtil.between(circaX, 85, 92)) {
                rowArray[5] = text;
            } else if (numberUtil.between(circaX, 91, 120)) {
                rowArray[6] = text;
            } else {
                console.log('else: ' + circaX + ' ' + text);
            }

            lastY = circaY;
        };
    },
    extractRows: function (grid) {
        var lastY,
            rowArray;

        return function (textValue) {
            var text = decodeURIComponent(textValue.R[0].T).trim();
            var circaX = parseInt(textValue.x, 10);
            var circaY = Math.round(parseFloat(textValue.y) * 10);

            if (!numberUtil.almostEqual(lastY, circaY)) {
                rowArray = [];

                grid.push(rowArray);
            }

            rowArray.push({
                text: text,
                x: circaX
            });

            lastY = circaY;
        };
    },
    mapRow: function (masterRow) {
        return function (grid) {
            return grid.map(function (row) {
                var rowArray = new Array(masterRow.length);

                row.forEach(function (el) {
                    var text = el.text;
                    var xValue = el.x;

                    // TODO: maybe, just maybe, this could have been solved in a better way

                    if (numberUtil.between(xValue, masterRow[0].x - 2, masterRow[1].x - 1)) {
                        rowArray[0] = text;
                    } else if (numberUtil.between(xValue, masterRow[1].x - 2, masterRow[2].x - 1)) {
                        rowArray[1] = text;
                    } else if (numberUtil.between(xValue, masterRow[2].x - 2, masterRow[3].x - 1)) {
                        rowArray[2] = text;
                    } else if (numberUtil.between(xValue, masterRow[3].x - 2, masterRow[4].x - 1)) {
                        rowArray[3] = text;
                    } else if (numberUtil.between(xValue, masterRow[4].x - 2, masterRow[5].x - 1)) {
                        rowArray[4] = text;
                    } else if (numberUtil.between(xValue, masterRow[5].x - 2, masterRow[6].x - 1)) {
                        rowArray[5] = text;
                    } else if (numberUtil.between(xValue, masterRow[6].x - 2, 120)) {
                        rowArray[6] = text;
                    } else {
                        console.log('else: ' + xValue + ' ' + text);
                    }
                });

                return rowArray;
            });
        };
    },

    name: function (name, corrections) {
        if (hasProp(corrections, name)) {
            return correct(corrections, name);
        } else {
            return name;
        }
    },

    phoneNumber: function (phoneNumber, corrections) {
        if (phoneNumber.indexOf('/') === -1) {
            return prepPhoneNumber(phoneNumber, corrections);
        } else {
            var phoneNumberSplit = phoneNumber.split('/');

            return prepPhoneNumber(phoneNumberSplit[0], corrections) + ' / ' + prepPhoneNumber(phoneNumberSplit[1], corrections);
        }
    },

    objectifyArray: function (array, corrections) {
        var nameCorrections = corrections.name;
        var phoneCorrections = corrections.phone;

        return {
            name: this.name(safePrint(array[0]), nameCorrections),
            workAdress: safePrint(array[1]),
            mailAdress: safePrint(array[2]),
            mailPostal: safePrint(array[3]),
            phone: this.phoneNumber(safePrint(array[4]), phoneCorrections),
            time: safePrint(array[5]),
            comment: safePrint(array[6])
        };
    },

    extractData: function (grid, categories, corrections) {
        if (!grid) {
            throw new TypeError('extractData needs grid');
        }
        if (!categories) {
            throw new TypeError('extractData needs categories');
        }
        if (!corrections) {
            throw new TypeError('extractData needs corrections');
        }

        var pageUtil = this,
            data = {},
            currentCategory;

        grid.forEach(function (row, i) {
            var r = row.filter(function (el) {
                return el !== '';
            });

            if (r.length === 1 && i === 0) {
                //console.log('Legger inn sist endret');

                data.lastUpdate = r[0];
            } else if (r.length === 1) {
                //console.log('1 celle: ' + r);

                if (categories.hasOwnProperty(r[0])) {
                    //console.log('Legger til kategori: ' + r[0]);

                    currentCategory = r[0];

                    data[currentCategory] = [];
                }
            } else {
                if (data[currentCategory]) {
                    //console.log('Legger til rad: ' + row + ' i kategori: ' + currentCategory);
                    data[currentCategory].push(pageUtil.objectifyArray(row, corrections));
                } else {
                    console.log('Rad som ikke er i en kategori: ' + row);
                }
            }
        });

        return data;
    }
};

module.exports = pageUtil;