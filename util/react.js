//checks if message contains one of two strings and is in the desired channel then reacts to that message with an emoji
module.exports = function(message, emote) {
    if ((message.content.includes('odie') || message.content.includes('jobie'))) {
        try {
            message.react(emote);            
        }
        catch(e) {
            console.log(e);
        }
    }
}

