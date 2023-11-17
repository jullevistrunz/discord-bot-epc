const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('verify')
    .setDescription('Verify on this Server'),
  async execute(interaction) {
    try {
      const role = interaction.guild.roles.cache.find(
        (r) => r.name == 'Verified'
      )
      interaction.member.roles.add(role)
      await interaction.reply({
        content: `:white_check_mark: Successfully verified <@${interaction.user.id}>!`,
        ephemeral: true,
      })
    } catch {
      await interaction.reply({
        content: `:x: Couldn't verify <@${interaction.user.id}>\nPlease contact <@695670290587451515>!`,
        ephemeral: true,
      })
    }
  },
}
