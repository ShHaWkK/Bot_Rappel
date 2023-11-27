const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setreminder')
        .setDescription('Définit un rappel avec un message personnalisé.')
        .addIntegerOption(option => option.setName('delay').setDescription('Le délai avant le rappel en minutes.').setRequired(true))
        .addStringOption(option => option.setName('message').setDescription('Le message de rappel personnalisé.').setRequired(true)),
    async execute(interaction) {
        const delay = interaction.options.getInteger('delay') * 60000; // Convertit les minutes en millisecondes
        const reminderMessage = interaction.options.getString('message');

        // Envoie un message de confirmation
        await interaction.reply(`D'accord, je te rappellerai dans ${delay / 60000} minute(s).`);

        // Définit le rappel avec `setTimeout`
        setTimeout(async () => {
            await interaction.followUp(`Voici ton rappel : ${reminderMessage}`);
        }, delay);
    },
};
