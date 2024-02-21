export const setup = {
  name: "autoleave",
  version: "40.0.0",
  permission: "Administrator",
  creator: "John Lester",
  description: "Auto Leave Inactive group and quick leave",
  category: "Utility",
  usages: [
    "inactive on",
    "inactive off",
    "inactive [number] [date]",
    "quick on",
    "quick off"
  ],
  mainScreenshot: ["/media/autoleave/screenshot/main.jpg"],
  screenshot: ["/media/autoleave/screenshot/quick.jpg", "/media/autoleave/screenshot/inactive.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"autoleave": setup.name}
export const execCommand = async function({api, event, args, translate,  umaru, prefix, context, usage}) {
if(args.length === 0) return usage(this, prefix, event);
if(args[0].toLowerCase() == "inactive") {
  args.shift()
  if(!args[0]) return usage(this, prefix, event);
  if(args[0].toLowerCase() == "on") {
    if(umaru.data['AutoLeave']['days'] === null && umaru.data['AutoLeave']['months'] === null && umaru.data['AutoLeave']['hours'] === null) return api.sendMessage(`${await translate("❎ Setup was not found. You need to set the date.",event, null, true)}\nExample: ${prefix}${this.setup.name} inactive 1 days`, event.threadID, event.messageID)
    
    umaru.data["AutoLeave"]['InactiveGroupMode'] = true
   await umaru.save()
    return api.sendMessage(context+(await translate("✅ Auto-leave inactive groups successfully enable",event, null, true)), event.threadID, event.messageID)
  }
  if(args[0].toLowerCase() == "off") {
    umaru.data["AutoLeave"]['InactiveGroupMode'] = false
   await umaru.save()
    return api.sendMessage(context+(await translate("✅ Auto-leave inactive groups successfully disable",event, null, true)), event.threadID, event.messageID)
  }
  const read = args;
  let num = args[0];
  if(!(((num >= 3 && num <= 24) && read[1].startsWith("hour")) || ((num >= 1 && num <= 31) && read[1].startsWith("day")) || ((num >= 1 && num <= 12) && read[1].startsWith("month")))) return api.sendMessage("❎ "+args.join(" ")+` ${await translate("format is not allowed. you should put like this",event, null, true)}\nExample: ${prefix}${this.setup.name} inactive 2 days\nAvailable format:\nhours: 3 - 24\ndays: 1 - 31\nmonths: 1 - 12`, event.threadID, event.messageID);
  if(read[1].startsWith("day")) {
    if(read[0] == "1") {
   umaru.data["AutoLeave"]['days'] =  null
   umaru.data["AutoLeave"]['hours'] = 24
   umaru.data["AutoLeave"]['months'] = null
   umaru.data["AutoLeave"]['DateType'] = "hours";
  await umaru.save()
      return api.sendMessage(await translate(`✅ Auto-leave inactive groups successfully set to ${read[0]} day\nPlease use "${prefix}${this.setup.name} inactive on" to enable it`, event), event.threadID, event.messageID)
    }
   umaru.data["AutoLeave"]['days'] = parseInt(read[0])
   umaru.data["AutoLeave"]['months'] = null
   umaru.data["AutoLeave"]['hours'] = null
   umaru.data["AutoLeave"]['DateType'] = "days";
   await umaru.save()
    return api.sendMessage(await translate(`✅ Auto-leave inactive group successfully set to ${read[0]} days\nPlease use "${prefix}${this.setup.name} inactive on" to enable it`,event), event.threadID, event.messageID)
  } else if(read[1].startsWith("month")) {
    if(read[0] == "1") {
   umaru.data["AutoLeave"]['days'] = 30
   umaru.data["AutoLeave"]['months'] = null
   umaru.data["AutoLeave"]['hours'] = null
   umaru.data["AutoLeave"]['DateType'] = "days";
     await umaru.save()
      return api.sendMessage(await translate(`✅ Auto-leave inactive groups successfully set to ${read[0]} month\nPlease: use "${prefix}${this.setup.name} inactive on" to enable it`,event), event.threadID, event.messageID)
    }
   umaru.data["AutoLeave"]['days'] =  null
   umaru.data["AutoLeave"]['hours'] = null 
   umaru.data["AutoLeave"]['months'] = parseInt(read[0])
   umaru.data["AutoLeave"]['DateType'] = "months";
   await umaru.save()
    return api.sendMessage(await translate(`✅ Auto-leave inactive groups successfully set to ${read[0]} months\nPlease: use "${prefix}${this.setup.name} inactive on" to enable it`, event), event.threadID, event.messageID)
  } else if(read[1].startsWith("hour")) {
   umaru.data["AutoLeave"]['days'] =  null
   umaru.data["AutoLeave"]['hours'] = parseInt(read[0])
   umaru.data["AutoLeave"]['months'] = null
   umaru.data["AutoLeave"]['DateType'] = "hours";
   await umaru.save()
    return api.sendMessage(await translate(`✅ Auto-leave inactive group successfully set to ${read[0]} hours\nPlease: use "${prefix}${this.setup.name} inactive on" to enable it`,event), event.threadID, event.messageID)
  }
} else if(args[0].toLowerCase() == "quick") {
  args.shift()
  if(args[0].toLowerCase() == "on") {
    umaru.data['AutoLeave']['Mode'] = true
    await umaru.save()
    return api.sendMessage(context+(await translate("✅ Auto-leave quick successfully enable",event, null, true)), event.threadID, event.messageID)
  } else if(args[0].toLowerCase() == "off") {
    umaru.data['AutoLeave']['Mode'] = false
    await umaru.save()
    return api.sendMessage(context+(await translate("✅ Auto-leave quick successfully disable",event, null, true)), event.threadID, event.messageID)
  }
} else {
  return usage(this, prefix, event);
}
}