const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('sendlog')
    .setDescription('Tell someone to send their logs')
    .addUserOption((option) => {
      return option
        .setName('user')
        .setDescription('User to be pinged')
        .setRequired(false)
    }),
  async execute(interaction) {
    const user = interaction.options.getUser('user')
    const author = {
      name: interaction.user.displayName,
      iconURL: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png`,
    }
    const color = 'ff0090'
    const embeds = [
      new EmbedBuilder()
        .setColor(color)
        .setAuthor(author)
        .setTitle('Attach your RagePluginHook.log')
        .setDescription(
          `${
            user ? `<@${user.id}> ` : ''
          }Please attach your RagePluginHook log - a file found in your GTA main directory; it is not found in your logs folder.`
        )
        .setImage('https://i.imgur.com/v0V5e4P.png'),
    ]
    interaction.reply({ embeds: embeds, ephemeral: false })
  },
}
