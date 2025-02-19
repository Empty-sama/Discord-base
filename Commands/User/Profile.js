const { SlashCommandBuilder } = require('discord.js');
const { request } = require('undici');
require('../../index')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('profile')
        .setDescription('Get your profile info'),
    async execute(interaction) {
        const image = interaction.user.displayAvatarURL();
        const id = db.get(`id`, interaction.user.id)
        const text = `\n✨Your Profile✨\n\n🎗Username = ${interaction.user.username}\n🔮ID = ${id}\n📕\n`
        const user = interaction.options.getUser('target');
		// if (user) return interaction.reply(`${user.username}'s avatar: ${user.displayAvatarURL()}`);
        return interaction.reply(`Avatar = ${image}` + text );
		// return interaction.reply(text + `Avatar = ${interaction.user.displayAvatarURL()}`);
        // const { body } = await request(interaction.user.displayAvatarURL({ format: 'jpg' }));
        // await interaction.reply({ files: [body] }, text);
    },
}