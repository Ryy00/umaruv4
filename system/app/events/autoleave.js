export const setup = {
  name: "autoleave",
  setEvent: ["log:subscribe"],
  creator: "John Lester",
  version: "40.0.0",
  description: "Auto-leave when autoleave quick is enabled and user added the bot to the group"
}
export const exec = async function({api, event, umaru}) {
  if(umaru.data['AutoLeave']['Mode'] == true && event.logMessageData.addedParticipants.some(a => a.userFbId == api.getCurrentUserID()) && !umaru.config.adminbot.includes(event.author)) {
    api.sendMessage("🤖 𝙰𝚞𝚝𝚘𝚕𝚎𝚊𝚟𝚎 𝚖𝚘𝚍𝚎 𝚒𝚜 𝚌𝚞𝚛𝚛𝚎𝚗𝚝𝚕𝚢 𝙰𝚌𝚝𝚒𝚟𝚎.\n\n𝙿𝚕𝚎𝚊𝚜𝚎 𝚖𝚎𝚜𝚜𝚊𝚐𝚎 𝚖𝚎 𝚘𝚗 𝚏𝚋: » https://www.facebook.com/Hazeyy0 «\n\n𝚃𝚘 𝚐𝚛𝚊𝚗𝚝 𝚢𝚘𝚞 𝚙𝚎𝚛𝚖𝚒𝚜𝚜𝚒𝚘𝚗 𝚝𝚘 𝚞𝚜𝚎 𝚝𝚑𝚒𝚜 𝚋𝚘𝚝.", event.threadID, (err, info) => {
      api.removeUserFromGroup(api.getCurrentUserID(), event.threadID)
    }, event.messageID)
  }
}