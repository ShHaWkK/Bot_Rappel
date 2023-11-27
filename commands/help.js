const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Affiche des informations sur l\'utilisation des commandes du bot.'),
    async execute(interaction) {
        // Vous pouvez fournir des informations sur les commandes du bot ici
        const helpMessage = 'Voici comment utiliser les commandes du bot :\n' +
            '```/ping : Répond par Pong!```\n' +
            '```/setreminder : Définit un rappel avec un message personnalisé.```\n' +
            '```/dailyreminder : Définit un rappel quotidien avec un sujet, une description et une date de fin.```\n' +
            '```/listreminders : Affiche la liste des rappels.```\n' +
            '```/help : Affiche cette aide.```';

        interaction.reply(helpMessage);
    },
};
