require('dotenv').config(); 

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const fs = require('fs');

const commands = [];
const commandsPath = './commands';
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = `${commandsPath}/${file}`;
    const command = require(filePath);
    commands.push(command.data);
}


const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log('Début du processus d\'enregistrement des commandes slash.');

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands },
        );

        console.log('Enregistrement des commandes slash réussi.');
    } catch (error) {
        console.error(error);
    }
})();
