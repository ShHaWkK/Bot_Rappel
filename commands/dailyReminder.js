const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dailyreminder')
        .setDescription('Définit un rappel quotidien avec un sujet, une description et une date de fin au format JJ/MM/YYYY.')
        .addStringOption(option => 
            option.setName('heure')
                .setDescription('L\'heure du rappel au format hh:mm.')
                .setRequired(true)
                .addChoices(
                    // Ajoutez des choix pour chaque heure entre 06h et 23h
                    { name: '06:00', value: '06:00' },
                    { name: '07:00', value: '07:00' },
                    { name: '08:00', value: '08:00' },
                    { name: '09:00', value: '09:00' },
                    { name: '10:00', value: '10:00' },
                    { name: '11:00', value: '11:00' },
                    { name: '12:00', value: '12:00' },
                    { name: '13:00', value: '13:00' },
                    { name: '14:00', value: '14:00' },
                    { name: '15:00', value: '15:00' },
                    { name: '16:00', value: '16:00' },
                    { name: '17:00', value: '17:00' },
                    { name: '18:00', value: '18:00' },
                    { name: '19:00', value: '19:00' },
                    { name: '20:00', value: '20:00' },
                    { name: '21:00', value: '21:00' },
                    { name: '22:00', value: '22:00' },
                    { name: '23:00', value: '23:00' }
                )
        )
        .addStringOption(option => option.setName('sujet').setDescription('Le sujet du rappel.').setRequired(true))
        .addStringOption(option => option.setName('description').setDescription('La description du rappel.').setRequired(true))
        .addStringOption(option => option.setName('date_fin').setDescription('La date de fin du rappel au format JJ/MM/YYYY.').setRequired(true)),
    async execute(interaction) {
        try {
            // Parse and validate options
            const time = interaction.options.getString('heure');
            const subject = interaction.options.getString('sujet');
            const description = interaction.options.getString('description');
            const endDateInput = interaction.options.getString('date_fin');
            const endDateParts = endDateInput.split('/');
            const [day, month, year] = endDateParts.map(part => parseInt(part, 10));
            const endDate = new Date(year, month - 1, day, 23, 59, 59); // set to the end of the end date

            // Validate date and time
            if (endDateParts.length !== 3 || isNaN(day) || isNaN(month) || isNaN(year) || endDate < new Date()) {
                return interaction.reply('La date de fin est invalide ou dans le passé. Veuillez fournir une date au format JJ/MM/YYYY.');
            }

            // Confirm setup to user
            await interaction.reply(`Un rappel quotidien pour "${subject}" a été configuré à ${time} et se terminera le ${endDateInput}.`);

            // Setup reminder
            const [hours, minutes] = time.split(':').map(part => parseInt(part, 10));
            const reminderTimeMs = (hours * 60 * 60 * 1000) + (minutes * 60 * 1000);
            const now = new Date();
            let nextReminder = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0, 0);
            if (nextReminder <= now) { // If time has passed for today, set for tomorrow
                nextReminder.setDate(nextReminder.getDate() + 1);
            }
            const initialDelay = nextReminder - now; // Milliseconds until next reminder

            // Send initial reminder after delay
            setTimeout(() => {
                sendReminder(subject, description, interaction);
                // Setup daily reminder interval
                const intervalId = setInterval(() => {
                    if (new Date() <= endDate) {
                        sendReminder(subject, description, interaction);
                    } else {
                        clearInterval(intervalId);
                        interaction.followUp({ content: 'Le rappel quotidien est maintenant terminé.' }).catch(console.error);
                    }
                }, 24 * 60 * 60 * 1000); // Repeat every 24 hours
            }, initialDelay);
        } catch (error) {
            console.error('Erreur lors de l\'exécution de la commande /dailyreminder:', error);
            await interaction.reply('Une erreur est survenue lors de la configuration de votre rappel.');
        }
    },
};

function sendReminder(subject, description, interaction) {
    const embed = new MessageEmbed()
        .setTitle(`Rappel : ${subject}`)
        .setDescription(description)
        .setColor('#0099ff')
        .setTimestamp();
    interaction.followUp({ embeds: [embed] }).catch(console.error);
}
