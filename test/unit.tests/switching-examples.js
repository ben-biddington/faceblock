const { MockFunction } = require('../support');

const Application = require('../../core/application').Application;

describe('Switching off', () => {
    it('instructs to block with an empty list', () => {
        const application = new Application({}, []);

        const mock = new MockFunction();

        application.onBlocking(mock.fun());
        
        application.start([]);

        application.switchOff();

        mock.mustHaveBeenCalledWith(
          {
              images: [ ] 
          }
      );
    });
});