const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('runtime')
		.setDescription('Checks how long the bot has been running'),
	async execute(interaction) {
        const pad = (s) => (s < 10 ? '0' : '') + s;
        const formatTime = (seconds)=> {
        const hours = Math.floor(seconds / (60 * 60));
        const minutes = Math.floor((seconds % (60 * 60)) / 60);
        const secs = Math.floor(seconds % 60);
        return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
        };
        const uptime = formatTime(process.uptime());
        const text = `Konnichiwa ${interaction.user}, I am alive, in fact I've been alive for ${uptime}!`;
		await interaction.reply(text);
	},
};