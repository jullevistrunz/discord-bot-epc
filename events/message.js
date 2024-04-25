const { Events } = require('discord.js')

module.exports = {
  name: Events.MessageCreate,
  execute(message) {
    if (message.author.bot) return
    // delete messages in #verify-here
    if (message.channelId == '785053415713275945') {
      message.delete()
    }
    // react to RoShit pinging me
    else if (
      message.author.id == '684604053581332521' &&
      message.mentions.users.some((u) => u.id == '695670290587451515')
    ) {
      message.react('1233058017503870988')
    }
  },
}
