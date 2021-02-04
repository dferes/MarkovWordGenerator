const markov = require('./markov');

describe("Tests the constructor MarkovMachine", () => {
    let markov1;
    let markov2;
    beforeEach(() => {
        markov1 = new markov.MarkovMachine('the cat in the hat is in the hat');
        markov2 = new markov.MarkovMachine('sally sells sea shells down by the sea shore');
    })
    // test('Test the string passed to the constructor is turned into an arry', () => {
    // expect().toEqual(Array);
    // });
    test('the string passed to the constructor is turned into an array of correct length', () => {
        expect(markov1.words.length).toEqual(9);
        expect(markov2.words.length).toEqual(9);
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