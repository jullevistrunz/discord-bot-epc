const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require('discord.js')
const fs = require('fs')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('removesuggestion')
    .setDescription('Remove the suggestion from the list')
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption((option) => {
      return option
        .setName('suggestion')
        .setDescription('The suggestion that will be removed')
        .setRequired(true)
    }),
  async execute(interaction) {
    try {
      const suggestion = interaction.options.getString('suggestion')
      const suggestions = JSON.parse(fs.readFileSync('suggestions.json'))

      const index = suggestions.indexOf(suggestion)
      if (index < 0) {
        interaction.reply({
          content: ":x: Couldn't find suggestion",
          ephemeral: true,
        })
        return
      }

      suggestions.splice(index, 1)

      fs.writeFileSync('suggestions.json', JSON.stringify(suggestions))

      const codeBlockQuotes = '```'
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('ff0090')
            .setTitle('Suggestion removed from list')
            .setDescription(
              `${codeBlockQuotes}${suggestion}${codeBlockQuotes}`
            ),
        ],
        ephemeral: true,
      })
    } catch {
      interaction.reply({
        content: ':x: Something went wrong',
        ephemeral: true,
      })
    }
  },
}
