const got = require("got");

exports.use = async (client, message, args, command, discord) => {
    got('https://www.reddit.com/r/meme/random/.json').then(response => {
        let content = JSON.parse(response.body);
        var image = content[0].data.children[0].data.url;
        message.channel.send(image)
    })
}

exports.help = {
    name: "meme",
    description: "Base",
    category: "Base",
    aliases: []
}