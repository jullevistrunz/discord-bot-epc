const { SlashCommandBuilder } = require('discord.js')
const fs = require('fs')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('How to use those commands')
    .addStringOption((option) => {
      return option
        .setName('command')
        .setDescription('Command you need help with')
        .setRequired(false)
    }),
  async execute(interaction) {
    const cmd = interaction.options.getString('command')
    const cmdNotFoundMsg = `:x: Couldn't find a command named ${cmd}\n`
    const msgs = {
      add: [
        {
          content:
            '1. Copy your username (you can do this by clicking your name in the bottom left hand profile pop-up)',
          files: [{ attachment: 'img/copyUsername.png' }],
          ephemeral: true,
        },
        {
          content:
            '2. Use the /add command in my DM and you should see something similar to this',
          files: [{ attachment: 'img/addCmd.png' }],
          ephemeral: true,
        },
      ],
      verify: [
        {
          content:
            'Use the /verify command in the intended channel and you should see something similar to this',
          files: [{ attachment: 'img/verifyCmd.png' }],
          ephemeral: true,
        },
      ],
      help: [
        {
          content:
            'Get help for a specific command by adding it as the first option in the help command',
          ephemeral: true,
        },
      ],
    }
    if (cmd == 'add' || cmd == '/add') {
      await interaction.reply(msgs.add[0])
      for (let i = 1; i < msgs.add.length; i++) {
        await interaction.followUp(msgs.add[i])
      }
    } else if (cmd == 'verify' || cmd == '/verify') {
      await interaction.reply(msgs.verify[0])
      for (let i = 1; i < msgs.verify.length; i++) {
        await interaction.followUp(msgs.verify[i])
      }
    } else if (cmd == 'help' || cmd == '/help') {
      await interaction.reply(msgs.help[0])
      for (let i = 1; i < msgs.help.length; i++) {
        await interaction.followUp(msgs.help[i])
      }
    } else if (!cmd) {
      let arr = []
      for (let i = 0; i < Object.keys(msgs).length; i++) {
        arr.push(msgs[Object.keys(msgs)[i]])
      }
      await interaction.reply(arr[0][0])
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
          if (i || j) {
            await interaction.followUp(arr[i][j])
          }
        }
      }
    } else {
      await interaction.reply({
        content: `${cmdNotFoundMsg}:question: All available commands: add, verify, help`,
        ephemeral: true,
      })
    }
  },
}
