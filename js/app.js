//Initial speed for the enemy 
let enemySpeed = 20;
//Score counter
let score = 0;
let multiplier = 1;
//Lives counter
let lives = 3;

//Updates the score, increases the multiplier and increases difficulty
function scoreUpdate() {
	score += 100 * multiplier;
	multiplier += 0.1;
	enemySpeed += 10;
	document.getElementById("multiplier").innerHTML = "Multiplier: " + multiplier.toFixed(1) + "x";
	document.getElementById("score").innerHTML = "Score: " + score;
}

//Decreases the lives left and checks if the player has lost
function livesUpdate() {
	lives -= 1;
	document.getElementById("lives").innerHTML = "Lives: " + lives;
	//Reset multiplier
	multiplier = 1;
	document.getElementById("multiplier").innerHTML = "Multiplier: " + multiplier.toFixed(1) + "x";
	//Reset enemy speed
	enemySpeed = 20;
	if (lives <= 0) {
		//hide the board and show message
		$('canvas').addClass('hide');
		$('.message').removeClass('hide')
		document.getElementById("scoreMessage").innerHTML = "Congratulation, You scored " + score + " points!";
	}
}

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
	this.x = x;
    this.y = y;
    this.speed = speed;
	this.sprite = 'images/enemy-bug.png';
};

//Player Class which is controlled
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};

// Update the enemy's position, required method for game
Enemy.prototype.update = function(dt) {
	this.x += this.speed * dt;
    //Reset the position when an enemy is off screen
    if (this.x > 550) {
        this.x = -100;
        this.speed = enemySpeed + Math.floor(Math.random() * (5 * enemySpeed));
    }
    // Checks if player and off any enemy is at the same spot
    if ((player.x < this.x + 60) && (player.x > this.x -60) && (player.y < this.y + 30) && (player.y > this.y -30)) {
        player.x = 200;
        player.y = 380;
		//Decrease lives
		livesUpdate() 
    }
};

//Tracks the player on the board
Player.prototype.update = function() {
    // Stops player from moving accross the board
    if (this.y > 380) {
        this.y = 380;
    }
    if (this.x > 400) {
        this.x = 400;
    }
    if (this.x < 0) {
        this.x = 0;
    }
    // Checks if the player has reached the goal
    if (this.y < 0) {
        this.x = 200;
        this.y = 380;
		//Updates the score
		scoreUpdate()
    }
};

//Controls for the player
Player.prototype.handleInput = function(keyPress) {
    switch (keyPress) {
        case 'up':
            this.y -= this.speed + 30;
            break;
        case 'down':
            this.y += this.speed + 30;
            break;
        case 'left':
            this.x -= this.speed + 50;
            break;
		case 'right':
            this.x += this.speed + 50;
            break;
    }
};

//Draws player onto the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Draws the enemy onto the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//List containing all the enemies
var allEnemies = [];

// Position of the enemies on y axis where they'll spawn
let enemyPosition = [60, 140, 220];
let player = new Player(200, 380, 50);
let enemy;

enemyPosition.forEach(function(yAxis) {
	enemy = new Enemy(0, yAxis, 20 + Math.floor(Math.random() * 100));
    allEnemies.push(enemy);
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});