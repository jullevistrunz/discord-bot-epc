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
        content: `:x: Your username doesn't fit the one you provided!\n:exclamation: Provided username: ${optionUsername}\n:exclamation: Your username: ${interaction.user.tag}\n:question: Try /help for more information`,
        ephemeral: false,
      })
    } else {
      if (interaction.guild != null) {
        await interaction.reply({
          content: `:x: Please use this command only in DMs`,
          ephemeral: true,
        })
      } else {
        try {
          let database = JSON.parse(fs.readFileSync('./data.json'))
          if (database.verifiedUsers.includes(optionUsername)) {
            await interaction.reply({
              content: `:x: ${optionUsername} has already been added to the database!`,
              ephemeral: false,
            })
          } else {
            database.verifiedUsers.push(optionUsername)
            fs.writeFileSync('./data.json', JSON.stringify(database))
            await interaction.reply({
              content: `:white_check_mark: Successfully added ${optionUsername} to the database!`,
              ephemeral: false,
            })
          }
        } catch {
          await interaction.reply({
            content: `:x: Couldn't add ${optionUsername} to the database!`,
            ephemeral: false,
          })
        }
      }
    }
  },
}
