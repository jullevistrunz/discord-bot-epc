const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('verify')
    .setDescription('Verify on this Server'),
  async execute(interaction) {
    await interaction.reply({
      content: `Pong!\nYour username: ${interaction.user.username}\nYou joined this server (${interaction.guild.name}) with ${interaction.guild.memberCount} members on ${interaction.member.joinedAt}`,
      ephemeral: true,
    })
  },
}
