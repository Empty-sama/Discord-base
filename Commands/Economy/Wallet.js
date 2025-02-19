const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('wallet')
        .setDescription('Get the amount of Yen that the user currently has'),
    async execute(interaction, client, message) {
        let user = message.mentions.users.first() || message.author;
        let userBalance = client.eco.fetchMoney(user.id);
        let text = `Konnichiwa ${user}, you currently have ${userBalance} Yen.`;
        await interaction.reply(text);
    },
}