// class representing a blackjack hand
function Hand() {
	this.cards = [];
	this.sum = 0;
	this.ace = false;
}

Hand.prototype.toString = function() {
	return this.cards.toString();
}

// get number of cards in hand
Hand.prototype.length = function() {
	return this.cards.length;
}

// function to add a card to hand
Hand.prototype.addCard = function(card) {
	if (card.number == 1) {
		this.ace = true;
	}

	this.cards.push(card);
	var card_value = card.number;
	if (card_value > 10) {
		card_value = 10;
	}
	print(this.sum);
	this.sum += card_value;
}

// deal 2 cards to hand
function deal(deck, hand) {
	hand.addCard(deck.pop());
	hand.addCard(deck.pop());
}

// prompt for user input and check results
function prompt(deck, hand) {
	print('Hit or Stay?');
	var input = readline();
	if (input == 'h') {
		hand.addCard(deck.pop());
		if (checkBust(hand)) {
			return false;
		}
		if (checkWin(hand)) {
			return false;
		}
		return true;
	} else if (input == 's') {
		print('\n\nFinal score: ' + getScore(hand));
		return false;
	}
}

// print cards in hand and scores (ace as 1 or 11 if applicable)
function showStatus(hand) {
	var ace_alternate = '';

	if (hand.ace && (hand.sum + 10 <= 21)) {
		ace_alternate = ' or ' + (hand.sum + 10);
	}

	print('Cards in hand: ' + hand);
	print('Card total: ' + hand.sum + ace_alternate);
}

// check for bust
function checkBust(hand) {
	if (hand.sum > 21) {
		print('\n\nBust!');
		showStatus(hand);
		return true;
	}
	return false;
}

// get max score (ace as 1 or 11)
function getScore(hand) {
	var score = hand.sum;
	if (hand.ace && (hand.sum + 10 <= 21)) {
		score = hand.sum + 10;
	}
	return score;
}

// check if blackjack exists in hand
function checkWin(hand) {
	if (getScore(hand) == 21) {
		print('\n\nBlackjack!');
		print('Cards in hand: ' + hand);
		return true;
	}
	return false;
}

// run game until win, lose, or stay
function blackjack() {
	// set up deck and shuffle
	var deck = (new Deck()).cards;
	shuffle(deck);

	// deal hand
	var hand = new Hand();
	deal(deck, hand);
	showStatus(hand);
	
	// loop game
	while (prompt(deck, hand)) {
		showStatus(hand);
	}
}
