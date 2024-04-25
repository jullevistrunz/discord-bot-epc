const { token } = require('./config.json')
const fs = require('fs')
const path = require('path')
const { Client, GatewayIntentBits, Collection, Events } = require('discord.js')

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
})

// register commands into bot
client.commands = new Collection()
const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith('.js'))
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file)
  const command = require(filePath)
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command)
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
    )
  }
}

// register global commands into bot
const globalCommandsPath = path.join(__dirname, 'globalCommands')
const globalCommandFiles = fs
  .readdirSync(globalCommandsPath)
  .filter((file) => file.endsWith('.js'))
for (const file of globalCommandFiles) {
  const filePath = path.join(globalCommandsPath, file)
  const command = require(filePath)
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command)
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
    )
  }
}

// listen for commands
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return
  const command = interaction.client.commands.get(interaction.commandName)
  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`)
    return
  }
  try {
    await command.execute(interaction)
  } catch (error) {
    console.error(error)
    await interaction.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true,
    })
  }
})

const eventsPath = path.join(__dirname, 'events')
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith('.js'))

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file)
  const event = require(filePath)
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args))
  } else {
    client.on(event.name, (...args) => event.execute(...args))
  }
}

// log in to discord
client.login(token)
