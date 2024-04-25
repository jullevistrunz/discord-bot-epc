const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require('discord.js')
const fs = require('fs')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('suggestions-non-ephemeral')
    .setDescription('Display the list of suggestions (non-ephemeral)')
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    try {
      const suggestions = JSON.parse(fs.readFileSync('suggestions.json'))
      const codeBlockQuotes = '```'

      let suggestionsString = codeBlockQuotes
      for (const suggestion of suggestions) {
        suggestionsString += `- ${suggestion}\n`
      }
      suggestionsString += codeBlockQuotes

      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('ff0090')
            .setTitle('Suggestions')
            .setDescription(
              suggestions.length
                ? suggestionsString
                : '*No suggestion available*'
            )
            .setFooter({
              text: 'Please keep in mind that these features are planned but there is no guarantee that they will be implemented.',
            }),
        ],
        ephemeral: false,
      })
    } catch {
      interaction.reply({
        content: ':x: Something went wrong',
        ephemeral: true,
      })
    }
  },
}
