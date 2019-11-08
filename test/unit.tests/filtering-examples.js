const expect = require('chai').expect;

// Returns list of blocked urls
const block = (disallowed, list) => {
    const matchesAny = text => disallowed.map(it => it.replace(/\s/g, '_')).some(d => text.match(new RegExp(`${d}`, 'i')));

    return list.filter(matchesAny);
};

describe('filtering blocked names', () => {
    it('works like this', () => {
        const disallowed = [ 'Sonny_Bill_Williams' ];

        const urls = [ 
            '/assets/news/164347/eight_col_Sonny_Bill_Williams_training.jpg?1536800187',
            '/assets/news/213783/eight_col_edited_zara_on_trampoline.jpg?1572993075'
        ]

        const blocked = block(disallowed, urls);

        expect(blocked).to.eql([ 
            '/assets/news/164347/eight_col_Sonny_Bill_Williams_training.jpg?1536800187',
        ]);
    });

    it('ignores case', () => {
        const disallowed = [ 'sonny_bill_williams' ];

        const urls = [ 
            '/assets/news/164347/eight_col_Sonny_Bill_Williams_training.jpg?1536800187',
            '/assets/news/213783/eight_col_edited_zara_on_trampoline.jpg?1572993075'
        ]

        const blocked = block(disallowed, urls);

        expect(blocked).to.eql([ 
            '/assets/news/164347/eight_col_Sonny_Bill_Williams_training.jpg?1536800187',
        ]);
    });

    it('puts_in_underscores', () => {
        const disallowed = [ 'Sonny Bill Williams' ];

        const urls = [ 
            '/assets/news/164347/eight_col_Sonny_Bill_Williams_training.jpg?1536800187',
            '/assets/news/213783/eight_col_edited_zara_on_trampoline.jpg?1572993075'
        ]

        const blocked = block(disallowed, urls);

        expect(blocked).to.eql([ 
            '/assets/news/164347/eight_col_Sonny_Bill_Williams_training.jpg?1536800187',
        ]);
    });
});