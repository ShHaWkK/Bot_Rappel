const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('deletereminder')
        .setDescription('Supprime un rappel existant.')
        .addStringOption(option => option.setName('sujet').setDescription('Le sujet du rappel à supprimer').setRequired(true)),
    async execute(interaction) {
        const sujet = interaction.options.getString('sujet');
         const reminders = [];
        reminders.push({ subject: 'Sujet', description: 'Description', endDate: new Date() });
        const reminderIndex = reminders.findIndex(reminder => reminder.subject === sujet);
         if (reminderIndex === -1) {
         return interaction.reply(`Aucun rappel avec le sujet "${sujet}" n'a été trouvé.`);
        }
        
        reminders.splice(reminderIndex, 1);


        // Suppression réussie
        await interaction.reply(`Le rappel avec le sujet "${sujet}" a été supprimé.`);
    },
};
