/*
Wynncraft Melee Macro by WaiZ and Rikko (https://github.com/richard-marc).
https://github.com/CoolBvll/Melee-Macro 
*/

if (!World.isWorldLoaded()) JsMacros.waitForEvent('ChunkLoad');

var mouseDown = false;

function handleArcherClick(context, sleepTime) {
    mouseDown = true;
    context.releaseLock();

    while (mouseDown) {
        KeyBind.releaseKeyBind('key.interact');
        Player.getPlayer().interact();
        Time.sleep(sleepTime);
    }
}

function handleDefaultClick(context, sleepTime) {
    mouseDown = true;
    context.releaseLock();

    while (mouseDown) {
        KeyBind.releaseKeyBind('key.attack');
        Player.getPlayer().attack();
        Time.sleep(sleepTime);
    }
}

JsMacros.on('Key', true, JavaWrapper.methodToJava((event, context) => {
    const heldItemLore = Player.getPlayer().getMainHand().getLore().toString();
    if (!heldItemLore.includes("DPS")) return;

    const isArcher = heldItemLore.includes("Archer/Hunter");
    const attackButton = isArcher ? "key.mouse.right" : "key.mouse.left";
    const handler = isArcher ? handleArcherClick : handleDefaultClick;

    if (event.key === attackButton) {
        if (event.action === 1) handler(context, 100);
        if (event.action === 0) mouseDown = false;
    }
}));


