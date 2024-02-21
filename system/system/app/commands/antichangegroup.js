export const setup = {
  name: "antichangegroup",
  version: "40.0.0",
  permission: "GroupAdmin",
  creator: "John Lester",
  description: "Prevent change nickname, photo, emoji, theme, name",
  category: "General",
  usages: [
    "name [on/off]",
    "nickname [on/off]",
    "photo [on/off]",
    "theme [on/off]",
    "emoji [on/off]",
    "admin [on/off]"
  ],
  mainScreenshot: ["/media/antichangegroup/screenshot/main.jpg"],
  screenshot: ["/media/antichangegroup/screenshot/name.jpg", "/media/antichangegroup/screenshot/nickname.jpg", "/media/antichangegroup/screenshot/photo.jpg", , "/media/antichangegroup/screenshot/theme.jpg","/media/antichangegroup/screenshot/emoji.jpg", "/media/antichangegroup/screenshot/admin.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"antichangegroup": setup.name}
export const execCommand = async function({api, event, args,  umaru, prefix, context, usage, translate, Threads}) {
  if(event.isGroup == false) return api.sendMessage(await translate("⚠️ This command is only allowed in group chat.", event, null, true), event.threadID, event.messageID);
  const method = ["nickname", "photo", "emoji", "theme", "name", "admin"];
  let True = (args[1] && args[1].toLowerCase() === "on") ? true: (args[1] && args[1].toLowerCase() === "off") ? false : null;
  if((!method.includes(args[0]) || True === null)) return usage(this, prefix, event);
  let msg = await translate((True === true) ? "enabled": "disabled", event, null, true);
  const admins = await Threads.getAdminIDs(event.threadID);


  switch (args[0].toLowerCase()) {
    case 'nickname':
        umaru.data['threads'][event.threadID]['AntiChangeGroup']['nickname'] = True
     await umaru.save()
        return api.sendMessage(context+(await translate("✅ Anti-change group nickname successfully", event, null, true))+" "+msg, event.threadID, event.messageID)
    break;
    case 'photo':
      if(umaru.data['threads'][event.threadID]['imageSrc'] === null) return api.sendMessage((await translate("Your group doesn't have group photo", event, null, true)), event.threadID, event.messageID);
        umaru.data['threads'][event.threadID]['AntiChangeGroup']['photo'] = True
       await umaru.save()
        return api.sendMessage(context+(await translate("✅ Anti-change group photo successfully", event, null, true))+" "+msg, event.threadID, event.messageID);
    break;
    case 'emoji':

        umaru.data['threads'][event.threadID]['AntiChangeGroup']['emoji'] = True
       await umaru.save()
        return api.sendMessage(context+(await translate("✅ Anti-change group emoji successfully", event, null, true))+" "+msg, event.threadID, event.messageID)
    break;
    case 'theme':
        umaru.data['threads'][event.threadID]['AntiChangeGroup']['theme'] = True
       await umaru.save()
        return api.sendMessage(context+(await translate("✅ Anti-change group theme successfully", event, null, true))+" "+msg, event.threadID, event.messageID);
    break;
    case 'name':
        umaru.data['threads'][event.threadID]['AntiChangeGroup']['name'] = True
       await umaru.save()
        return api.sendMessage(context+(await translate("✅ Anti-change group name successfully", event, null, true))+" "+msg, event.threadID, event.messageID);
    break;
    case 'admin':
      if(!admins.includes(api.getCurrentUserID())) return api.sendMessage("⚠️ Please make me admin first before use Anti-change group admin.", event.threadID, event.messageID);
      umaru.data['threads'][event.threadID]['AntiChangeGroup']['admin'] = True
     await umaru.save()
      return api.sendMessage(context+(await translate("✅ Anti-change group admin successfully", event, null, true))+" "+msg, event.threadID, event.messageID);
  break;
  }
}