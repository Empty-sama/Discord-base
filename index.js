const { Client, Events, GatewayIntentBits, Collection, ClientPresence } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const { QuickDB } = require("quick.db");
// const { connect } = require('mongoose');
// const Eco = require("quick.eco");

const token = process.env.TOKEN || '';

const client = new Client({
	intents: [GatewayIntentBits.Guilds]
})

client.once(Events.ClientReady, c => {
	console.log(`Yoruichi is ready! Logged in as ${c.user.tag}`);
});

client.commands = new Collection();

const db = new QuickDB();

client.login(token)

const foldersPath = path.join(__dirname, 'Commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	console.log(interaction)

	const command = interaction.client.commands.get(interaction.commandName);

	const userOnDatabase = await db.get('user', interaction.user)
	if(!userOnDatabase) {
		await db.push('user', interaction.user)
	}
	
	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

// quickdb way of adding message count
// client.on("messageCreate", async (message) => {
// 	const authorId = message.author.id;
  
// 	await db.add(`messageCount_${authorId}`, 1);
  
// 	let messageCount = await db.get(`messageCount_${authorId}`);
// 	console.log(`User with the ID of ${authorId} has ${messageCount} messages.`);
//   });