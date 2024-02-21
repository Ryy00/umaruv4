export const setup = {
  name: "restart",
  version: "40.0.0",
  permission: 2,
  creator: "John Lester",
  description: "Restarting the bot.",
  category: "system",
  usages: "",
  cooldown: 0,
  isPrefix: true
}
export const execCommand = async function({api, event, umaru}) {
  return api.sendMessage(`🔄 ${umaru.config.botname} Bot are now Restarting...`, event.threadID, async() => {
    process.exit(1)
  }, event.messageID)
}
