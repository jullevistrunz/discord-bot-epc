const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require('discord.js')
const fs = require('fs')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('addsuggestion')
    .setDescription('Add a suggestion to the list')
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption((option) => {
      return option
        .setName('suggestion')
        .setDescription('The suggestion that will be added')
        .setRequired(true)
    }),
  async execute(interaction) {
    try {
      const suggestion = interaction.options.getString('suggestion')
      const suggestions = JSON.parse(fs.readFileSync('suggestions.json'))

      if (suggestions.includes(suggestion)) {
        interaction.reply({
          content: ':x: Suggestion already included',
          ephemeral: true,
        })
        return
      }

      suggestions.push(suggestion)

      fs.writeFileSync('suggestions.json', JSON.stringify(suggestions))

      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('ff0090')
            .setTitle('New suggestion added to list')
            .setDescription(suggestion)
            .setFooter({
              text: 'Please keep in mind that this just means that the feature is planned. There is no guarantee that it will be implemented.',
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
