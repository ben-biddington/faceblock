const events = require('events');

class BlockableImage {
  constructor(imageElement) {
    this._imageElement = imageElement;
    this._originalSrc = this._imageElement.getAttribute('src');
    this._originalAlt = this._imageElement.getAttribute('alt');
  }

  block() {
    this._imageElement.setAttribute('alt', 'blocked by faceblock');
    this._imageElement.setAttribute('src', '');
  }

  unblock() {
    this._imageElement.setAttribute('alt', this._originalAlt);
    this._imageElement.setAttribute('src', this._originalSrc);
  }
}

class Application {
    constructor(ports = {}, people=[]) {
        this._log       = ports.log || (_ => {});
        this._people    = people;
        this._events    = new events.EventEmitter();
    }

    start(images = []) {
        this._log(`Application started with <${images.length}> images`);

        const blockable = this._block(this._people, images)

        this._log(`Found the following <${blockable.length}> possible blocks:\n\n${blockable.map(it => it.src).join('\n')}`);

        this._events.emit('blocking', { images: blockable });
    }

    switchOff() {
      this._events.emit('blocking', { images: [] });
    }

    _block(disallowed, list) {
        const all = this._flatten(
            [ 
                disallowed,
                disallowed.map(it => it.replace(/\s/g, '_')), 
                disallowed.map(it => it.replace(/\s/g, '-')), 
                disallowed.map(it => it.replace(/\s/g, '+')), 
            ]
        )
        
        const regexEscape = text => text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');

        const matchesAny = img => all.some(d => {
          const blank = { src: '', alt: '' }
          
          const safe = { ...blank, ...img }

          return safe.src.match(new RegExp(`${regexEscape(d)}`, 'i')) || (img.alt || '').match(new RegExp(`${regexEscape(d)}`, 'i'))
        });

        return list.filter(matchesAny);
    };

    _flatten(arrays = []) {
      return [].concat.apply([], arrays);
    }

    onBlocking(handler) {
      this._events.on('blocking', handler);
    }
}

module.exports.Application = Application;