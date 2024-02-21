export const setup = {
  name: "setemoji",
  version: "40.0.0",
  permission: "Users",
  creator: "John Lester",
  description: "Change the group emoji",
  category: "Group",
  usages: ["[emoji]"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"setemoji": setup.name}
export const execCommand = async function({api, event, args, translate, umaru, systemadmin, Threads}) {
  const admins =  await Threads.getAdminIDs(event.threadID);
  if(!(admins.includes(event.senderID) || systemadmin.includes(event.senderID)) && umaru.data['threads'][event.threadID] && umaru.data['threads'][event.threadID]['AntiChangeGroup'] && umaru.data['threads'][event.threadID]['AntiChangeGroup']['emoji'] == true) {
   return api.sendMessage((await translate("⚠️ An error occurred. Please disable the anti-change group emoji before using this command.", event, null, true)), event.threadID, event.messageID)
  }
  let text = args.join(" ").match(/\p{Emoji}/gu);
  let emoji = (Array.isArray(text)) ? text[0]:"";
  return api.changeThreadEmoji(emoji, event.threadID, async(err) => {
      if(err) return api.sendMessage((await translate("⚠️ An error occurred: "+err.error, event, null, true)), event.threadID, event.messageID);
      api.sendMessage((await translate("✅ Successfully set the reaction to {{1}}", event, null, true)).replace("{{1}}", (emoji == "") ? "👍":emoji), event.threadID, event.messageID)
  });
}