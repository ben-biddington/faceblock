class Application {
    constructor(ports = {}) {
        this._log       = ports.log;
        this._source    = ports.source;
    }

    start(images = []) {
        const allImages = [...document.querySelectorAll("img")];
    }
}

module.exports.Application = Application;