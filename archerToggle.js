if (!World.isWorldLoaded()) JsMacros.waitForEvent('ChunkLoad')

//Command handler
var ARCHER_TOGGLE_CONFIG = require('./archerToggle.json');
let archerToggle = ARCHER_TOGGLE_CONFIG.archerToggle;
const CommandManager = Chat.getCommandManager();
let command = CommandManager.createCommandBuilder("meleeMacro");
command.unregister();

command.wordArg("medule").suggestMatching(["archer"]).wordArg("true/false").suggestMatching(["true", "false"]).executes(JavaWrapper.methodToJava((event) => {

        archerToggle = event.getArg("true/false");

        if (archerToggle == "true"){
                Chat.log("You are now on archer mode.")
        }
        else{
                Chat.log("You are no longer on archer mode.");
        }
        

        FS.open('./archerToggle.json').write(JSON.stringify({ archerToggle: archerToggle }));
    
})).register();
