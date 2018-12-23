const got = require("got");

exports.use = async (client, message, args, command, discord) => {
    getMeme()

    function getMeme() {
        got('https://www.reddit.com/r/memes/random/.json').then(response => {
            let content = JSON.parse(response.body);
            if (!content[0]) {
                getMeme()
            }
            var image = content[0].data.children[0].data.url;
            if (!image) {
                getMeme()
            }
            var title = content[0].data.children[0].data.title;
            if (!title) {
                getMeme()
            }

            let embed = new discord.RichEmbed()
                .setColor()
                .setTitle("Meme requested by " + message.author.tag)
                .setDescription(title)
                .setImage(image)
                .setFooter("Bot made by Farris Bris#7705")
            message.channel.send(embed)
        }).catch()
    }
}

exports.help = {
    name: "meme",
    description: "Base",
    category: "Base",
    aliases: ["memes"]
}