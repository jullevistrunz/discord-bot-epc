const { Events } = require('discord.js')

module.exports = {
  name: Events.GuildMemberAdd,
  async execute(member) {
    await sleep(300000)
    if (!member.roles.cache.some((role) => role.id == '784832416430686208')) {
      member.kick()
    }
  },
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}
