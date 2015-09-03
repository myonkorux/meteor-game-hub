function Card(suit, number) {
	this.suit = suit
	this.number = number
}

Card.prototype.toString = function() {
	return this.suit + this.number
}

function Deck() {
	this.cards = []
	suits = ['D', 'C', 'H', 'S']
	for (s = 0; s < 4; s++) {
		for (n = 1; n < 14; n++) {
			this.cards.push(new Card(suits[s], n))
		}
	}
}

Deck.prototype.toString = function() {
	return this.cards.toString()
}