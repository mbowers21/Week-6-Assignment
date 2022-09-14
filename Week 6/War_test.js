const expect = chai.expect


it ('should return a shuffled deck', function() {
    let array1 = [1, 2, 3, 4, 5]
    let deck = new Deck (array1);
    let x = deck.shuffle();
    console.log(x)
    expect(x).to.not.equal(array1);
} )
    