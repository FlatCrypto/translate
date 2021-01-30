const request = require('request-promise');
const Languages = require('./languages');

class Translate {
  constructor() {
    this.iso = Languages.iso;
    this.language = Languages.language;
  }
  translate(text, options = {}) {
    if (typeof options != 'object') {
      throw new TypeError('Options is not a valid');
      return;
    }
    if (typeof text != 'string' || text == null || text == '') {
      throw new TypeError('Text is not a valid');
      return;
    }
    options.to = options.to || 'en';
    options.from = options.from || 'auto';
    if (!(this.isSupported(options.to))) {
      throw new TypeError('\'' + options.to + '\' language is not supported');
      return;
    }
    if (!(this.isSupported(options.from))) {
      throw new TypeError('\'' + options.from + '\' language is not supported');
      return;
    }
    options.to = this.getCode(options.to.toLowerCase());
    options.from = this.getCode(options.from.toLowerCase());
    
    var data = {
      googleURL: function(to, from, text) {
        return 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=' + from + '&tl=' + to + '&dt=t&q=' + text;
      }
    };
    
    var url = data.googleURL(options.to, options.from, decodeURIComponent(text))
    var returns = {
      to: {
        text: null,
        lang: (this.getName(options.to) || 'English'),
        iso: (options.to || 'en')
      },
      from: {
        text: null,
        lang: null,
        iso: null
      }
    };
    
    return new Promise((resolve, reject) => {
      request(url).then(data => {
        data = JSON.parse(data);
        returns.to.text = data[0][0][0];
        returns.from.lang = this.getName(data[2]);
        returns.from.iso = data[2].toLowerCase();
        returns.from.text = data[0][0][1];
        resolve(returns);
      }).catch(reject);
    });
  }
  isSupported(lang) {
    if (this.iso.includes(lang.toLowerCase())) return true;
    else return false;
  }
  getCode(lang) {
    if (!lang) {
        return false;
    }
    lang = lang.toLowerCase();

    if (this.language[lang]) {
        return lang;
    }

    var keys = Object.keys(this.language).filter(function (key) {
        if (typeof this.language[key] !== 'string') {
            return false;
        }
        return this.language[key].toLowerCase() === lang;
    });

    return keys[0] || lang;
  }
  getName(iso) {
    return this.language[iso.toLowerCase()] || iso;
  }
}

module.exports = Translate;
