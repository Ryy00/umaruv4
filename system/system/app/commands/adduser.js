export const setup = {
    name: "adduser",
    version: "40.0.0",
    permission: "Users",
    creator: "John Lester",
    description: "Add user to the group chat",
    category: "General",
    usages: [
        "[uid]",
        "[fburl]"
    ],
    mainScreenshot: ["/media/adduser/screenshot/main.jpg"],
    screenshot: ["/media/adduser/screenshot/uid.jpg", "/media/adduser/screenshot/url.jpg"],
    cooldown: 5,
    isPrefix: true
}
export const domain = {"adduser": setup.name};
export const execCommand = async function({api, event, args, translate, usage, prefix}) {
  try {
    if(event.isGroup == false) return api.sendMessage(await translate("⚠️ This command is only allowed in group chat.", event, null, true), event.threadID, event.messageID);
    (typeof args[0] === "undefined") ? args[0] = "": ""
    (/[0-9]/.test(args[0])) ? "" : (event.attachments.length !== 0 && event.attachments[0].type == "share" &&  event.attachments[0].hasOwnProperty("target") && event.attachments[0].target.__typename == 'User' && event.attachments[0].target.hasOwnProperty("id")) ? args[0] = event.attachments[0].target.id: (event.type == "message_reply") ? args[0] = event.messageReply.senderID: args[0] = "";
    if(args.length === 0) return usage(this, prefix, event);
    if(event.participantIDs.includes(args[0])) return api.sendMessage(await translate("This user already to the group.",event, null, true), event.threadID, event.messageID)
    let name = (await api.getUserInfo(args[0]))[args[0]].name
    api.addUserToGroup(args[0], event.threadID, async(err) => {
        if(err) return api.sendMessage(await translate("❎ Can't add this user to the group", event, null, true), event.threadID, event.messageID)
        return api.sendMessage(await translate(`✅ ${name} added to the group`, event, null, true), event.threadID, event.messageID)
    })
  } catch (err) {
    if(err) return api.sendMessage(await translate("❎ Can't add this user to the group", event, null, true), event.threadID, event.messageID)
  }
}