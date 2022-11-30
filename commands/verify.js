const { SlashCommandBuilder } = require('discord.js')
const fs = require('fs')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('verify')
    .setDescription('Verify on this Server'),
  async execute(interaction) {
    //command will only work in guild as it will only be registered in there
    const database = JSON.parse(fs.readFileSync('./data.json'))
    if (!database.verifiedUsers.includes(interaction.user.tag)) {
      await interaction.reply({
        content: `:x: Your username is not in the database\n:question: Try /help for more information`,
        ephemeral: true,
      })
    } else {
      try {
        const role = interaction.guild.roles.cache.find(
          (r) => r.name == 'Verified'
        )
        interaction.member.roles.add(role)
        await interaction.reply({
          content: `:white_check_mark: Successfully verified ${interaction.user.tag}!`,
          ephemeral: true,
        })
      } catch {
        await interaction.reply({
          content: `:x: Couldn't verify ${interaction.user.tag}!`,
          ephemeral: true,
        })
      }
    }
  },
}
