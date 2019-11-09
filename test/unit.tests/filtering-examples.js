const { MockFunction } = require('../support');

const Application = require('../../core/application').Application;

describe('blocking images', () => {
    it('works like this', () => {
        const disallowed = [ 'Sonny_Bill_Williams' ];
        
        const images = [ 
            { src: '/assets/news/164347/eight_col_Sonny_Bill_Williams_training.jpg?1536800187'},
            { src: '/assets/news/213783/eight_col_edited_zara_on_trampoline.jpg?1572993075'}
        ]

        const application = new Application({}, disallowed);

        const mock = new MockFunction();

        application.onBlocking(mock.fun());
        
        application.start(images);

        mock.mustHaveBeenCalledWith(
            {
                images: [ { src: '/assets/news/164347/eight_col_Sonny_Bill_Williams_training.jpg?1536800187'} ] 
            }
        );
    });

    it('detects underscores, hyphens and plusses', () => {
        const disallowed = [ 'Sonny Bill Williams', 'Nadia Lim', 'John Key' ];

        const images = [ 
            { src: '/assets/news/164347/eight_col_Sonny_Bill_Williams_training.jpg?1536800187'},
            { src: '/assets/news/213783/eight_col_edited_zara_on_trampoline.jpg?1572993075'},
            { src: '/assets/news/213783/john+key.jpg?1572993075'},
            { src: '/assets/news/213783/nadia-lim.jpg?1572993075'},
        ]

        const application = new Application({}, disallowed);

        const mock = new MockFunction();

        application.onBlocking(mock.fun());
        
        application.start(images);

        mock.mustHaveBeenCalledWith(
            {
                images: 
                [ 
                    { src: '/assets/news/164347/eight_col_Sonny_Bill_Williams_training.jpg?1536800187' } ,
                    { src: '/assets/news/213783/john+key.jpg?1572993075' },
                    { src: '/assets/news/213783/nadia-lim.jpg?1572993075' },
                ] 
            }
        );
    });

    it('Checks alt text, too', () => {
      const disallowed = [ 'Boris Johnson' ];

      const images = [ 
          { src: '/assets/news/164347/eight_col_Sonny_Bill_Williams_training.jpg?1536800187' } ,
          { 
            src: '/assets/news/213783/brexit-chaos.jpg',
            alt: 'Boris Johnson blows it'
          }
      ]

      const application = new Application({}, disallowed);

      const mock = new MockFunction();

      application.onBlocking(mock.fun());
      
      application.start(images);

      mock.mustHaveBeenCalledWith(
          {
              images: 
              [ 
                  { src: '/assets/news/213783/brexit-chaos.jpg', alt: 'Boris Johnson blows it' } ,
              ] 
          }
      );
    });
});