const fs = require('fs');
const { Client, GatewayIntentBits, Collection } = require('discord.js');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent, 
  ]
});

client.commands = new Collection();

const commandsPath = './commands';
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = `${commandsPath}/${file}`;
    const command = require(filePath);
    if (!command.data || !command.data.name) {
        console.error(`Erreur de chargement de la commande dans le fichier: ${file}`);
        continue;
    }
    client.commands.set(command.data.name, command);
}

client.once('ready', () => {
    console.log(`${client.user.tag} est en ligne !`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({
            content: "Une erreur s'est produite lors de l'exécution de la commande.",
            ephemeral: true
        });
    }
});

client.login(process.env.DISCORD_TOKEN);
