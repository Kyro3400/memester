const discord = require("discord.js");
const client = new discord.Client();
const fs = require("fs");
const prefix = "!"

client.commands = new discord.Collection();
client.aliases = new discord.Collection();

fs.readdir('./commands/', (err, files) => {
    let jsfiles = files.filter(f => f.split('.')
        .pop() === 'js');
    if (jsfiles.length <= 0) {
        console.log('No commands to load!');
        return;
    }
    console.log(`[Commands]\tLoaded a total amount ${files.length} Commands`);
    jsfiles.forEach(f => {
        let props = require(`./commands/${f}`);
        props.fileName = f;
        client.commands.set(props.help.name, props);
        props.help.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});

fs.readdir("./commands/", (err, files) => {
    files.forEach(file => {
        let eventFunction = require(`./commands/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, (...args) => eventFunction.run(client, ...args));
    });
});

client.on("message", message => {
    if (!message.guild) return;
    if (message.author.bot) return;
    if (message.content.indexOf(prefix) !== 0) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    let command = args.shift().toLowerCase();
    let cmd;
    if (client.commands.has(command)) {
        cmd = client.commands.get(command);
    } else if (client.aliases.has(command)) {
        cmd = client.commands.get(client.aliases.get(command));
    }
    if (!cmd) return;
    cmd.use(client, message, args, command, discord);

});

client.on("ready", async () => {
    console.log(`${client.user.username} is online!`);
    client.user.setActivity(`memes for ${client.users.size} members`)
});

client.login("NTI0ODgyNTY5NjA3NTEyMDY0.DwFJxg.zB6ozRIfKncS2A2C6QkTFAn-Vx0");