const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Répond par Pong!'),
    async execute(interaction) {
        await interaction.reply('Pong!');
    },
};
