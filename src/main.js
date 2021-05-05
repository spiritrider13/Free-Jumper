/*


Code written by Sam Vik, Aria Altenburg and Jason Lee.

Something we thought we did technically interesting was our obstacle spawn and hit detection.
There are 3 total obstacles always-present, however they are called upon each other when reaching
the end of the screen. Took inspiration from Nathan's "recursive" spawning, but wanted to keep it self-
contained for performance. Also, while the horse jumps, it actually just ignores the obstacles' hitboxes.

Additionally, our speedModifier variable is technically interesting, at least to Sam Vik. We used it to modify
the speed of all things in the game, and provided an easy way to balance/adjust the difficulty during playtesting.

In terms of our visual style, we are specifically proud of Jason's work on the background music. It sounds good, real,
and not cheap. Jason also made a very nice background image for the main menu that we really like.
We are also very proud of our hand-crafted horse animations made through Libresprite. A horse is a complex animal and
we think our animations compliment that fact.


*/



// Project info included in README.md

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    fps: {
        target: 60,
        forceSetTimeOut: true
        },
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true,
            gravity: {
                x:0,
                y:0
            }
        }
    },
    scene: [ Menu, Controls, Play, Credits] 
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

//a modifying double that speeds up obstacles and the distance over time
let speedModifier = 1;

//record this session's furthest record;
let distanceRecord = 0;

// reserve keyboard variables
let keySPACE, keyLEFT, keyRIGHT;