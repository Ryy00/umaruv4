export const setup = {
  name: "setgroupname",
  version: "40.0.0",
  permission: "Users",
  creator: "John Lester",
  description: "Change the group name",
  category: "Group",
  usages: ["[name]"],
  cooldown: 5,
  isPrefix: true
};
export const execCommand = async function({api, event, args, translate, umaru, systemadmin, Threads}) {
  const admins =  await Threads.getAdminIDs(event.threadID);
  if(!(admins.includes(event.senderID) || systemadmin.includes(event.senderID)) && umaru.data['threads'][event.threadID] && umaru.data['threads'][event.threadID]['AntiChangeGroup'] && umaru.data['threads'][event.threadID]['AntiChangeGroup']['name'] == true) {
   return api.sendMessage((await translate("⚠️ An error occurred. Please disable the anti-change group name before using this command.", event, null, true)), event.threadID, event.messageID)
  }
  let text = args.join(" ")
  return api.setTitle(text, event.threadID, async() => {
    api.sendMessage((text == "") ? (await translate("✅ Successfully removed the group name.", event, null, true)): (await translate("✅ Successfully named the group {{1}}.", event, null, true)).replace("{{1}}", text), event.threadID, event.messageID)
  });
}