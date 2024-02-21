export const setup = {
    name: "unsend",
    version: "40.0.0",
    permission: "GroupAdmin",
    creator: "John Lester",
    description: "Unsend the message of the bot.",
    category: "General",
    usages: [],
    cooldown: 5,
    isPrefix: true
};
export const domain = {"unsend": setup.name}
export const execCommand = async function({api, event, args, prefix, usage, translate, context, umaru}) {
  if(event.type !== "message_reply") return api.sendMessage("⚠️ Please reply to my message.", event.threadID, event.messageID);
  if(event.type == "message_reply" && api.getCurrentUserID() !== event.messageReply.senderID) return api.sendMessage(await translate("⚠️ Unsending the other message is not allowed.", event, null, true), event.threadID, event.messageID);
  return api.unsendMessage(event.messageReply.messageID, () => {});
}