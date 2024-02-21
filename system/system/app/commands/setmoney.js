export const setup = {
  name: "setmoney",
  version: "40.0.0",
  permission: "Admin",
  creator: "John Lester",
  description: "Set the money",
  category: "system",
  usages: ["[number]","[number] [uid] ", "[number] [mention]"],
  cooldown: 10,
  isPrefix: true
};
export const domain = {"setmoney": setup.name}
export const execCommand = async function({api, event, umaru, args, translate, Users, usage, prefix}) {
  let mentions = Object.keys(event.mentions);
  (mentions.length === 0 && /^[0-9]+$/.test(args[1])) ? mentions[0] = args[1]: (event.type == "message_reply") ? mentions[0] = event.messageReply.senderID : (mentions.length === 0) ? mentions[0] = event.senderID: mentions[0] = mentions[0];
  let value = parseInt(args[0]);
  if(isNaN(value)) return usage(this, prefix, event);
  if(mentions[0] === event.senderID) {
    umaru.data.users[event.senderID].money = value;
    await umaru.save();
    return api.sendMessage((await translate("✅ Successfully change your money to {{1}}.", event, null, true)).replace("{{1}}", value), event.threadID, event.messageID)
  } else {
    let name = await Users.getName(mentions[0]);
    if(!umaru.data.users[mentions[0]]) umaru.data.users[mentions[0]] = {};
    umaru.data.users[mentions[0]].money = value;
    await umaru.save();
    return api.sendMessage((await translate("✅ Successfully change {{2}}'s money to {{1}}.", event, null, true)).replace("{{1}}", value).replace("{{2}}", name), event.threadID, event.messageID);
  }
}
