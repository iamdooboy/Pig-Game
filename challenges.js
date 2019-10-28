/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

////////////////////////////////////////////////////////////////////////////////////////////////////////////
CHALLENGES
- a player looses his entire score when he rolls two 6 in a row. After that, it's the next player's turn.
- add an input field to the HTML where players can set the winning score, so that they can't change the predefined score of 100
- add another dice to the game, so that there are two dices now. The player loses his current score when one of them is a 1. 
////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/

var scores, roundScore, activePlayer, gamePlaying, previous;

init();

document.querySelector('.btn-roll').addEventListener('click', function(){
	
	if (gamePlaying){
		
		//1. Random number
		var dice1 = Math.floor(Math.random() * 6) + 1;
		var dice2 = Math.floor(Math.random() * 6) + 1;
		
		//2. Display the result
		document.getElementById('dice-1').style.display = 'block';
		document.getElementById('dice-2').style.display = 'block';
		document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
		document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';
		
		//3. Update the round score if the rolled number was not a 1
		if(dice1 !== 1 && dice2 !== 1){
			//add score
			roundScore += dice1 + dice2; 
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		}else {
			//next player
			nextPlayer();
		}
		
//		//3. Update the round score if the rolled number was not a 1
//		if (dice === 6 && previous === 6){
//			scores[activePlayer] = 0;
//			document.querySelector('#score-' + activePlayer).textContent = '0';
//			nextPlayer();
//		} else if(dice !== 1){
//			//add score
//			roundScore += dice; 
//			document.querySelector('#current-' + activePlayer).textContent = roundScore;
//		}else {
//			//next player
//			nextPlayer();
//		}
//		
//		previous = dice;
	}
});

document.querySelector('.btn-hold').addEventListener('click', function(){
	if(gamePlaying){
		//add current score to global score
		scores[activePlayer] += roundScore;
		
		var input = document.querySelector('.final-score').value;
		var winningScore;
		
		//undefined, 0, null or "" are coerced to false
		if (input){
			winningScore = input;
		} else {
			winningScore = 100;
		}

		//update the UI
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];


		//check if player won the game 
		if (scores[activePlayer] >= winningScore){
			document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
			document.getElementById('dice-1').style.display = 'none';
			document.getElementById('dice-2').style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;
		} else {
			//next player
			nextPlayer();
		}
	}
	
});

function nextPlayer(){
	//next player
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	roundScore = 0;
		
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
		
	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');
		
	//document.querySelector('.player-0-panel').classList.remove('active');
	//document.querySelector('.player-1-panel').classList.add('active');
		
	document.getElementById('dice-1').style.display = 'none';
	document.getElementById('dice-2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
	scores = [0,0];
	activePlayer = 0;
	roundScore = 0;
	gamePlaying = true;
	
	//html
	//document.querySelector('#current-' + activePlayer).textContent = dice;
	//document.querySelector('#current-' + activePlayer).innerHTML = 'em' + dice + '</em>';

	//css
	document.getElementById('dice-1').style.display = 'block';
	document.getElementById('dice-2').style.display = 'block';

	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
}






