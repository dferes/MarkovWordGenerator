const markov = require('./markov');

describe("Tests the constructor MarkovMachine", () => {
    let markov1;
    let markov2;
    beforeEach(() => {
        markov1 = new markov.MarkovMachine('the cat in the hat is in the hat');
        markov2 = new markov.MarkovMachine('sally sells sea shells down by the sea shore');
    })
    test('the string passed to the constructor is turned into an arry', () => {
    expect(markov1.words).toBeInstanceOf(Array);
    });
    test('the string passed to the constructor is turned into an array of correct length', () => {
        expect(markov1.words.length).toEqual(9);
        expect(markov2.words.length).toEqual(9);
    });
    test('the words array is passed to makeChains and returns an object containing arrays', () => {
        expect(markov1.chainObject).toBeInstanceOf(Object);
        expect(markov1.chainObject['the']).toBeInstanceOf(Array);
        expect(markov1.chainObject['hat']).toBeInstanceOf(Array);
        });
    test('the chainObject contains arrays of correct length for each key', () => {
        expect(markov1.chainObject['the'].length).toEqual(3);
        expect(markov1.chainObject['cat'].length).toEqual(1);
        expect(markov1.chainObject['in'].length).toEqual(2);
        expect(markov1.chainObject['hat'].length).toEqual(2);
        expect(markov1.chainObject['is'].length).toEqual(1);
        });
});


describe("Tests the method makeText()", () => {
    let markov1;
    let markov2;
    beforeEach(() => {
        markov1 = new markov.MarkovMachine('the cat in the hat is in the hat');
        markov2 = new markov.MarkovMachine('sally sells sea shells down by the sea shore');
    })
    test('the default length of the string response of makeText', () => {
        const markovText = markov1.makeText();
        expect(markovText.split(' ').length).toEqual(35);
    });
    test('the provided length of the string response of makeText', () => {
        const markovText = markov1.makeText(50);
        expect(markovText.split(' ').length).toEqual(50);
    });
    test('there are no null values in the response of makeText', () => {
        const markovText = markov1.makeText(100);
        expect(markovText.split(' ')).toEqual(
            expect.not.arrayContaining([null])
        );
    });
    test('there are no white spaces in the response of makeText', () => {
        const markovText = markov1.makeText(50);
        expect(markovText.split(' ')).toEqual(
            expect.not.arrayContaining([' '])
        );
    });
});