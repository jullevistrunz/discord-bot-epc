const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('COMMAND')
    .setDescription('DESCRIPTION')
    .addStringOption((option) => {
      return option
        .setName('OPTION')
        .setDescription('OPTION_DESCRIPTION')
        .setRequired(true)
    }),
  async execute(interaction) {
    await interaction.reply({
      content: `ANSWER`,
      ephemeral: true,
    })
  },
}
