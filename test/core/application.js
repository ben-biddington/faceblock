class Application {
    constructor(ports = {}) {
        this._log       = ports.log;
    }

    start(images = []) {
        const allImages = [...document.querySelectorAll("img")];
    }
}

module.exports.Application = Application;