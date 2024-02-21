export const setup = {
  name: "kick",
  version: "40.0.0",
  permission: "GroupAdmin",
  creator: "John Lester",
  description: "Removing user from the group.",
  category: "Group",
  usages: ["[uids]", "[mentions]"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"kick": setup.name}
export const execCommand = async function({api, event, args, translate, umaru, systemadmin, Threads, prefix, usage}) {
  if(args.length === 0 && event.type != "message_reply") return usage(this, prefix, event)
  const admins = await Threads.getAdminIDs(event.threadID);
  if(!admins.includes(api.getCurrentUserID())) return api.sendMessage((await translate("⚠️ Please make me admin first before use this command.", event, null, true)), event.threadID, event.messageID);
  let mentions = Object.keys(event.mentions);
  (mentions.length === 0 && /^[0-9]+$/.test(args[0])) ? mentions = args: (event.type == "message_reply") ? mentions = [event.messageReply.senderID] : (mentions.length === 0) ? mentions = [event.senderID]: mentions = mentions;
  let h = false;
  for(const item of mentions) {
    if(!(admins.includes(item) || systemadmin.includes(item))) {
    await new Promise((resolve) => setTimeout(resolve, 500));
   return api.removeUserFromGroup(item, event.threadID, () => {})
    } else if(h == false) {
      h = true;
      return api.sendMessage((await translate("⚠️ Kicking the group admin and system admin is not allowed.", event, null, true)), event.threadID, event.messageID);
    }
  }
}