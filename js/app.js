// DEFINING THE ENEMIES THE PLAYER MUST AVOID AND THEIR MOVEMENT ON THE GAMEBOARD.
var Enemy = function(x,y, speed) {
    // Variables applied to each instance go here.
    this.x = x;
    this.y = y + 55;
    this.sprite = 'images/enemy-bug.png';
    this.speed = speed;
    this.step = 101;
    this.boundary = this.step * 5;
    this.resetPos = -this.step;
};

// Note to self: These global variables ought to be declared after the 
// construct (var Enemy) has been declared. Never before. 
const bug1 = new Enemy(-101, 0, 200);
const bug2 = new Enemy(-101, 83, 300);
const bug3 = new Enemy((-101*2.5), 83, 300);
const bug4 = new Enemy(-101, (83 *2), 180)
const allEnemies = [];
allEnemies.push(bug1,bug2, bug3, bug4);
console.log(allEnemies);

    // Updating the enemy's position
    Enemy.prototype.update = function(dt) {
        if(this.x < this.boundary) {// If the enemy is not past the boundary
            this.x += this.speed * dt; // Move forward, incrementing x by speed * dt.
            // Multiplying any movement by the dt parameter ensures the game runs at the same speed for all computers.
        }
        else {
            this.x = this.resetPos; // Reset position to start.
        }    
    };

    // Draw the enemy on the screen, required method for game.
    Enemy.prototype.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };


/* DEFINING THE PLAYER AND ITS MOVEMENT ON THE GAMEBOARD.
 * This is done by defining a player class.
 * This class requires an update(), render() and a handleInput() method.
 */
class Hero { // Hero class
    constructor() { // Constructor
        //Properties
        this.sprite = 'images/char-boy.png'; // sprite image for the player
        this.step = 101; // width of each block and the distance a player moves horizontally
        this.jump = 83; //height of each block and tehhdistance a player moves vertically
        this.startX = this.step * 2; // starting x position
        this.startY = (this.jump * 4) + 55; // starting y position
        this.x = this.startX; //intial value of x
        this.y = this.startY; // initial value of y
        this.victory = false;
    }
    
    // Methods
        update() { // Update player position
            for(let enemy of allEnemies) { // Check collision here using the x and y coordinates of the player realtive to an enemy
                if  (this.y === enemy.y // Are the player and enemy on the same row?
                     && (enemy.x + enemy.step/2 > this.x && enemy.x < this.x + this.step/2) // Is the player within this narrowly define space relative to an enemy?
                     ) {
                    this.reset();
                }
            }
            if(this.y === 55) { // Check win here. Did the player x and y collide reach final tile? 
                    this.victory = true;
            }
        }

                

        render() { // Render position
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y) // Draw player sprite on current x and y coord position
        } 
        // Handle keyboard input
            // Update player's x and y property according to input
            /** @param {string} input - Direction to travel
             */     
        handleInput(input) {
            switch(input) {
                case 'left':
                    if (this.x > 0) {
                        this.x -= this.step;
                    }
                    break;
                case 'up':
                    if (this.y > this.jump) {
                        this.y -= this.jump;
                    }
                    break; 
                case 'right':
                    if (this.x < this.step * 4) {
                        this.x += this.step;
                    }
                    break;     
                case 'down':
                    if (this.y < this.jump * 4) {
                        this.y += this.jump;
                    }
                    break;          
            }
        }
        // Resetting the Hero to the starting position
            reset() {// Set x and y to starting x and y 
                this.x = this.startX; //intial value of x
                this.y = this.startY; //intial value of y
            }  
}
const player = new Hero();

// This listens for key presses and sends the keys to the player handleInput() method above
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
