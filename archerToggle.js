if (!World.isWorldLoaded()) JsMacros.waitForEvent('ChunkLoad')

//Command handler
var ARCHER_TOGGLE_CONFIG = require('./archerToggle.json');
let archerToggle = ARCHER_TOGGLE_CONFIG.archerToggle;
const CommandManager = Chat.getCommandManager();
let command = CommandManager.createCommandBuilder("archer");
command.unregister();

command.greedyStringArg("true/false").executes(JavaWrapper.methodToJava((event) => {
    
        archerToggle = event.getArg("true/false");
        Chat.log("Archer toggle: " + archerToggle);
        FS.open('./archerToggle.json').write(JSON.stringify({ archerToggle: archerToggle }));
    
})).register();
