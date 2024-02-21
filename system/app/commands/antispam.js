export const setup = {
    name: "antispam",
    version: "40.0.0",
    permission: "GroupAdmin",
    creator: "John Lester",
    description: "Remove members when they spam",
    category: "General",
    usages: [
        "on",
        "off"
    ],
    cooldown: 5,
    isPrefix: true
};
export const domain = {"antispam": setup.name}
export const execCommand = async function({api, event, args, prefix, usage, translate, context, umaru, Threads}) {
  if(event.isGroup == false) return api.sendMessage(await translate("⚠️ This command is only allowed in group chat.", event, null, true), event.threadID, event.messageID);
  const admins = await Threads.getAdminIDs(event.threadID);
  if(!admins.includes(api.getCurrentUserID())) return api.sendMessage("⚠️ Please make me admin first before use this command.", event.threadID, event.messageID);
    let True = (args[0] && args[0].toLowerCase() === "on") ? true: (args[0] && args[0].toLowerCase() === "off") ? false : null;
    if(args.length === 0 || True === null) return usage(this, prefix, event);
    let msg = await translate((True === true) ? "enabled": "disabled", event, null, true);
    umaru.data['threads'][event.threadID]['antispam'] = True;
    await umaru.save();
    return api.sendMessage(context+(await translate("✅ Antispam successfully", event, null, true))+" "+msg, event.threadID, event.messageID);
}
let sC = {};
export const execEvent = async function({api, event, args, prefix, usage, translate, context, umaru, cooldown, systemadmin, Threads, Users}) {
  const admins = await Threads.getAdminIDs(event.threadID);
  if((!systemadmin.includes(event.senderID) || !admins.includes(event.senderID)) && (event.type == "message" || event.type == "message_reply") && event.isGroup == true && umaru.data['threads'].hasOwnProperty(event.threadID) &&  umaru.data['threads'][event.threadID]['antispam'] == true && admins.includes(api.getCurrentUserID())) {
    if(admins.includes(event.senderID)) return;
    if(!sC.hasOwnProperty(event.threadID)) sC[event.threadID] = {};
    if(!sC[event.threadID].hasOwnProperty(event.senderID)) sC[event.threadID][event.senderID] = 1;
      let countdown = cooldown.isCooldown(this.setup.name+event.threadID+event.senderID, 10);
    if(sC[event.threadID][event.senderID] < 8 && countdown) {
      sC[event.threadID][event.senderID] += 1;
    } else if(sC[event.threadID][event.senderID] >= 8 && countdown) {
      sC[event.threadID][event.senderID] = 1;
      return api.sendMessage((await translate("⚠️ Spam detected. {{1}} will be removed from this group.", event, null, true)).replace("{{1}}", await Users.getName(event.senderID)), event.threadID, () => {
       return api.removeUserFromGroup(event.senderID, event.threadID, () => {});
      })
    } else {
      sC[event.threadID][event.senderID] = 1;
      cooldown.create(this.setup.name+event.threadID+event.senderID);
    }
  }
}