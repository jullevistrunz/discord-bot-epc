const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require('discord.js')
const fs = require('fs')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('suggestions')
    .setDescription('Display the list of suggestions')
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.EmbedLinks),
  async execute(interaction) {
    try {
      const suggestions = JSON.parse(fs.readFileSync('suggestions.json'))

      let suggestionsString = ''
      for (const suggestion of suggestions) {
        suggestionsString += `• ${suggestion}\n`
      }

      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('ff0090')
            .setTitle('Suggestions')
            .setDescription(
              suggestionsString
                ? suggestionsString
                : '*No suggestion available*'
            )
            .setFooter({
              text: 'Please keep in mind that these features are planned but there is no guarantee that they will be implemented.',
            }),
        ],
      })
    } catch {
      interaction.reply({
        content: ':x: Something went wrong',
        ephemeral: true,
      })
    }
  },
}
