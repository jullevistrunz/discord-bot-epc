const { SlashCommandBuilder } = require('discord.js')
const fs = require('fs')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('add')
    .setDescription('Add your name to the database')
    .addStringOption((option) => {
      return option
        .setName('username')
        .setDescription('Your username')
        .setRequired(true)
    }),
  async execute(interaction) {
    const optionUsername = interaction.options.getString('username')
    if (optionUsername != interaction.user.tag) {
      await interaction.reply({
        content: `:x: Your username doesn't fit the one you provided!\nProvided username: ${optionUsername}\nYour username: ${interaction.user.tag}\nTry /help for more information`,
        ephemeral: false,
      })
    } else {
      await interaction.reply({
        content: `:white_check_mark: Successfully added ${optionUsername} to the database!`,
        ephemeral: false,
      })
    }
  },
}
