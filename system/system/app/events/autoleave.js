export const setup = {
  name: "autoleave",
  setEvent: ["log:subscribe"],
  creator: "John Lester",
  version: "40.0.0",
  description: "Auto-leave when autoleave quick is enabled and user added the bot to the group"
}
export const exec = async function({api, event, umaru}) {
  if(umaru.data['AutoLeave']['Mode'] == true && event.logMessageData.addedParticipants.some(a => a.userFbId == api.getCurrentUserID()) && !umaru.config.adminbot.includes(event.author)) {
    api.sendMessage("🛡 Auto-leave quick is enabled. Please contact the admin", event.threadID, (err, info) => {
      api.removeUserFromGroup(api.getCurrentUserID(), event.threadID)
    }, event.messageID)
  }
}