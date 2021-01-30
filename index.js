const Translate = require('./src/translate');

const DATA = new Translate()

module.exports = DATA.translate;

module.exports.getName = DATA.getName;
module.exports.getCode = DATA.getCode;
module.exports.getLanguages = require('./src/languages').language;
