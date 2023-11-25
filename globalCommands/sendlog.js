const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('sendlog')
    .setDescription('Tell someone to send their logs')
    .addIntegerOption((option) => {
      return option
        .setName('type')
        .setDescription('The type of log to be sent')
        .setRequired(true)
        .addChoices(
          {
            name: 'RPH',
            value: 0,
          },
          {
            name: 'EPC',
            value: 1,
          }
        )
    })
    .addUserOption((option) => {
      return option
        .setName('user')
        .setDescription('User to be pinged')
        .setRequired(false)
    })
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.EmbedLinks),
  async execute(interaction) {
    if (!interaction.channel) {
      return interaction.reply({
        content: `:x: The interaction channel does not exist; Please contact <@695670290587451515>!`,
      })
    }
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
          'Please attach your RagePluginHook log - a file found in your GTA main directory; It is not found in your logs folder.'
        )
        .setImage('https://i.imgur.com/v0V5e4P.png'),
      new EmbedBuilder()
        .setColor(color)
        .setAuthor(author)
        .setTitle('Attach your EPC.log')
        .setDescription(
          'Please attach your EPC log - it is located in your GTA main directory > EPC.'
        )
        .setImage('https://i.imgur.com/eDQCKbg.png'),
    ]
    await interaction.reply({ ephemeral: true, content: 'Sending message...' })
    await interaction.channel.send({
      content: user ? `<@${user.id}>` : '',
      embeds: [embeds[interaction.options.getInteger('type')]],
    })
    interaction.deleteReply()
  },
}
