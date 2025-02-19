const { SlashCommandBuilder } = require('discord.js');
require('../../index')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Information about the bot'),
	async execute(interaction) {
        const user = await db.get(`euser`)
		await interaction.reply(`Users = ${user.length}`);
    },
};