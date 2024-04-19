/*
Wynncraft Melee Macro by WaiZ and Rikko (https://github.com/richard-marc)
https://github.com/CoolBvll/Melee-Macro
*/

if (!World.isWorldLoaded()) JsMacros.waitForEvent('ChunkLoad');

var mouseDown = false;
var SpellDetected = false;

//Checks if the user started a spell.
JsMacros.on('Title', JavaWrapper.methodToJava(event => {
    var ARCHER_TOGGLE_CONFIG = require('./archerToggle.json');
    var archerToggle = ARCHER_TOGGLE_CONFIG.archerToggle === 'true';

    let actionBar = event.message.withoutFormatting();
    if (archerToggle) {
        if (actionBar.getString().startsWith("L-")) {
            SpellDetected = true;
        } else {
            SpellDetected = false;
        }
    } else {
        if (actionBar.getString().startsWith("R-")) {
            SpellDetected = true;
        } else {
            SpellDetected = false;
        }
    }
}));

//The Macro itself.
JsMacros.on('Key', true, JavaWrapper.methodToJava((event, context) => {
    var ARCHER_TOGGLE_CONFIG = require('./archerToggle.json');
    var archerToggle = ARCHER_TOGGLE_CONFIG.archerToggle === 'true';

    if (archerToggle) {
        if (event.action === 1 && event.key == "key.mouse.right") {
            var timer = 0;
            mouseDown = true;
            context.releaseLock();

            do {
                timer++;
                KeyBind.releaseKeyBind('key.interact');
                if (SpellDetected) {
                    Time.sleep(1);
                } else {
                    Player.getPlayer().interact();
                    Time.sleep(100);
                }
            } while (mouseDown);

        } else if (event.action === 0 && event.key == "key.mouse.right") {
            mouseDown = false;
        }
    } else {
        if (event.action === 1 && event.key == "key.mouse.left") {
            var timer = 0;
            mouseDown = true;
            context.releaseLock();

            do {
                timer++;
                KeyBind.releaseKeyBind('key.attack');
                if (SpellDetected) {
                    Time.sleep(1);
                } else {
                    Player.getPlayer().attack();
                    Time.sleep(100);
                }
            } while (mouseDown);

        } else if (event.action === 0 && event.key == "key.mouse.left") {
            mouseDown = false;
        }
    }
}));
