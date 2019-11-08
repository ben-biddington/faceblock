class Application {
    constructor(ports = {}, people=[]) {
        this._log       = ports.log;
        this._people    = people;
    }

    start(images = []) {
        this._log(`Application started with <${images.length}> images`);

        const blockable = this._block(this._people, images.map(it => it.getAttribute('src')))

        this._log(`Found the following <${blockable.length}> possible blocks:\n\n${blockable.join('\n')}`);
    }

    _block(disallowed, list) {
        const matchesAny = text => disallowed.map(it => it.replace(/\s/g, '_')).some(d => text.match(new RegExp(`${d}`, 'i')));
    
        return list.filter(matchesAny);
    };
}

module.exports.Application = Application;