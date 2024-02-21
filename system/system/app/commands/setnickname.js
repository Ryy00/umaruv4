export const setup = {
  name: "setnickname",
  version: "40.0.0",
  permission: "Users",
  creator: "John Lester",
  description: "Change your group's or the person you tag's nickname.",
  category: "Group",
  usages: ["[text]","[uid] [text] ", "[mention] [text]"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"setname": setup.name}
export const execCommand = async function({api, event, umaru, args, translate, Users, systemadmin, Threads}) {
  const admins =  await Threads.getAdminIDs(event.threadID);
  if(!(admins.includes(event.senderID) || systemadmin.includes(event.senderID)) && umaru.data['threads'][event.threadID] && umaru.data['threads'][event.threadID]['AntiChangeGroup'] && umaru.data['threads'][event.threadID]['AntiChangeGroup']['nickname'] == true) {
   return api.sendMessage((await translate("⚠️ An error occurred. Please disable the anti-change group nickname before using this command.", event, null, true)), event.threadID, event.messageID)
  }
  let mentions = Object.keys(event.mentions);
  (mentions.length === 0 && /^[0-9]+$/.test(args[0])) ? mentions[0] = args[0]: (event.type == "message_reply") ? mentions[0] = event.messageReply.senderID : (mentions.length === 0) ? mentions[0] = event.senderID: mentions[0] = mentions[0];
  if(mentions[0] === event.senderID) {
     return api.changeNickname(args.join(" "), event.threadID, event.senderID, async(err) => {
                                if(err) return api.sendMessage((await translate("⚠️ An error occurred: "+err.error, event, null, true)), event.threadID, event.messageID)
                              });
  } else {
    let name = await Users.getName(mentions[0]);
    return api.changeNickname(args.join(" ").replace(event.mentions[mentions[0]], "").replace(mentions[0], ""), event.threadID, mentions[0], async(err) => {
      if(err) return api.sendMessage((await translate("⚠️ An error occurred: "+err.error, event, null, true)), event.threadID, event.messageID)
    });
   }
}
