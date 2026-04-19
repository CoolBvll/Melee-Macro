/*
Wynncraft Melee Macro by WaiZ
https://github.com/CoolBvll/Melee-Macro 
*/

if (!World.isWorldLoaded()) JsMacros.waitForEvent('ChunkLoad');

var mouseDown = false;

function handleArcherClick(context, sleepTime) {
    mouseDown = true;
    context.releaseLock();

    while (mouseDown) {
        KeyBind.releaseKeyBind('key.interact');
        KeyBind.pressKeyBind("key.interact");
        Time.sleep(sleepTime);
    }
}

function handleDefaultClick(context, sleepTime) {
    mouseDown = true;
    context.releaseLock();

    while (mouseDown) {
        KeyBind.pressKeyBind("key.attack");
        Time.sleep(sleepTime);
    }
}

function safeOpenInventory() {
    try {
        return Player?.openInventory() ?? null;
    } catch (_) {
        return null;
    }
}

function selectedHotbarItem(inv) { 
    try {
        const hotbarSlots = inv.getSlots("hotbar"); 
        const selIdx = inv.getSelectedHotbarSlotIndex(); 

        if (selIdx == null || selIdx < 0 || selIdx >= hotbarSlots.length) {
            return null;
        }

        return inv.getSlot(hotbarSlots[selIdx]);
    } catch (_) {
        return null;
    }
}

JsMacros.on('Key', true, JavaWrapper.methodToJava((event, context) => {
    const inv = safeOpenInventory();
    if (!inv) return;

    const itemHeld = selectedHotbarItem(inv);
    if (!itemHeld) return;

    const heldItemLore = itemHeld.getLore().toString();
    if (!heldItemLore.includes("DPS")) return;

    archerToggle = heldItemLore.includes("Archer/Hunter"); 

    if (archerToggle) {
        if (event.key === "key.mouse.right") {
            if (event.action === 1) handleArcherClick(context, 100);
            if (event.action === 0) mouseDown = false;
        }
    } else {
        if (event.key === "key.mouse.left") {
            if (event.action === 1) handleDefaultClick(context, 100);
            if (event.action === 0) mouseDown = false;
        }
    }
}));
