const { Events, ActivityType } = require('discord.js')

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    console.log(`Bot tag: ${client.user.tag}`)
    client.user.setActivity('verification requests', {
      type: ActivityType.Watching,
    })
  },
}
