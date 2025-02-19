const { SlashCommandBuilder } = require('discord.js');
const { client } = require('../../index.js');

module.exports =  {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Get the usable commands on this bot'),
    async execute(interaction) {
        // const {id} = client
        // console.log(id)
        let text = `*Konnichiwa ${interaction.user}!! Watashi wa Yoruichi*\n\n⚠This bot is still under development.\n\nSlashcommands:\n\n`;
        text += `*/ping -* Will check the bot's latency\n*/help -* Will show you all the useable commands\n*/profile -* Will show you your profile information`;
        await interaction.reply(text);
    },
}