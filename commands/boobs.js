const got = require("got");

exports.use = async (client, message, args, command, discord) => {
    if (message.channel.nfsw) return message.reply("you can only use this command in nsfw channels.")
    getBoobs()

    function getBoobs() {
        got('https://www.reddit.com/r/boobs/random/.json').then(response => {
            let content = JSON.parse(response.body);
            if (!content[0]) {
                getBoobs()
            }
            var image = content[0].data.children[0].data.url;
            if (!image) {
                getBoobs()
            }
            var title = content[0].data.children[0].data.title;
            if (!title) {
                getBoobs()
            }

            let embed = new discord.RichEmbed()
                .setColor()
                .setTitle("Boobs requested by " + message.author.tag)
                .setDescription(title)
                .setImage(image)
                .setFooter("Bot made by Farris Bris#7705")
            message.channel.send(embed)
        }).catch()
    }
}

exports.help = {
    name: "boobs",
    description: "Base",
    category: "Base",
    aliases: ["boob"]
}