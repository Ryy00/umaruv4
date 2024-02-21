export const setup = {
  name: "members",
  version: "40.0.0",
  permission: "GroupAdmin",
  creator: "John Lester",
  description: "Automated remove members who were not active until the time and remove all inactive members.",
  category: "General",
  usages: ["remove inactive time", "remove inactive on", "remove inactive off","list active [page number]", "list inactive [page number]","set hour [3 - 24]", "set day [1 - 30]", "set month [1 - 12]", "remove inactive all"],
  cooldown: 5,
  isPrefix: true
}
export const domain = {"members": setup.name}
export const execCommand = async function({api, event, args, translate, reply, umaru, usage, prefix, Threads, context}) {
  if(event.isGroup == false) return api.sendMessage(await translate("⚠️ This command is only allowed in group chat.", event, null, true), event.threadID, event.messageID);
  const adminIds = await Threads.getAdminIDs(event.threadID);
  if(!adminIds.includes(api.getCurrentUserID())) return api.sendMessage(await translate("⚠️ Please make me admin first before use this command.", event, null, true), event.threadID, event.messageID);
  if(args.length === 0) return usage(this, prefix, event); 
     if(umaru.data['threads'][event.threadID] && umaru.data['threads'][event.threadID]['timeZone'] === 0) return api.sendMessage((await translate("⚠️ The timezone was not found. Use {{p}} to set the timezone in this group chat.", event, null, true)).replace("{{p}}", prefix+"timezone set group [timezone]"), event.threadID, event.messageID);
  switch(args[0].toLowerCase()) {
    case 'remove':
      args.shift()
    if(args.length !== 0 && args[0].toLowerCase() == "inactive" && args[1] && args[1].toLowerCase() == "on") {
      umaru.data['threads'][event.threadID]['seenerRemover'] = true;
       await umaru.save()
        return api.sendMessage(context+(await translate("✅ Auto-members remove successfully enable",event, null, true)), event.threadID, event.messageID)
    } else if(args.length !== 0 && args[0].toLowerCase() == "inactive" && args[1] && args[1].toLowerCase() == "off") {
      umaru.data['threads'][event.threadID]['seenerRemover'] = false;
       await umaru.save();
        return api.sendMessage(context+(await translate("✅ Auto-members remove successfully disable",event, null, true)), event.threadID, event.messageID)
    } else if(args.length !== 0 && args[0].toLowerCase() == "inactive" && args[1] && args[1].toLowerCase() == "time") {
      if(typeof umaru.data["threads"][event.threadID]['timer'] === "undefined" || typeof umaru.data['threads'][event.threadID]['seenerType'] === "undefined") return api.sendMessage(context+(await translate(`⚠️ Please set the time first.`,event, null, true))+`\nExample: ${prefix}${this.setup.name} set day 2`, event.threadID, event.messageID)
      let time = `${umaru.data["threads"][event.threadID]['timer']} ${umaru.data['threads'][event.threadID]['seenerType']}`
        return api.sendMessage(`🕒 Time: ${time}\n🔰 Remove members who were not active until ${time} ago.\n\n${(umaru.data['threads'][event.threadID]['seenerRemover'] == true)?"": `Use "${prefix}${this.setup.name} remove inactive on" to activate this process.`}`, event.threadID, event.messageID)
    } else if(args.length !== 0 && args[0].toLowerCase() == "inactive" && args[1] && args[1].toLowerCase() == "all") {
      return api.sendMessage(`⚠️ Warning. This operation will remove all inactive members that I've never seen active in this group chat. If you want to see that I've never seen active, you can use ${prefix}${this.setup.name} list inactive. Alternatively, you can use the ${prefix}kick command to remove a specific member. Do you want to continue this operation? Reply "yes" if you want.`, event.threadID, async (err, info) => {
        let ctx = {
          name: this.setup.name,
          author: event.senderID,
          ID: info.messageID
        }
        await reply.create(ctx);
      }, event.messageID)
    } else {
      return usage(this, prefix, event);
    }
    break;
    case 'on':
      umaru.data['threads'][event.threadID]['seenerRemover'] = true;
       await umaru.save()
        return api.sendMessage(context+(await translate("✅ Auto-members remove successfully enable",event, null, true)), event.threadID, event.messageID)
    break;
    case "set":
      args.shift();
      let num = parseInt(args[1]);
      if(!(((num >= 3 && num <= 24) && args[0].startsWith("hour")) || ((num >= 1 && num <= 31) && args[0].startsWith("day")) || ((num >= 1 && num <= 12) && args[0].startsWith("month")))) return api.sendMessage("❎ "+args.join(" ")+` ${await translate("format is not allowed. you should put like this",event, null, true)}\nExample: ${prefix}${this.setup.name} set day 2\nAvailable format:\nhours: 3 - 24\ndays: 1 - 31\nmonths: 1 - 12`, event.threadID, event.messageID);

      if(args[0].startsWith("day") && num == 1) {
        umaru.data['threads'][event.threadID]['seenerType'] = "hours";
        umaru.data["threads"][event.threadID]['timer'] = 24;
        return api.sendMessage(await translate(`✅ Auto-members remove successfully set to 1 day.\nPlease use "${prefix}${this.setup.name} on" to enable it`, event),event.threadID, event.messageID) 
      } else if(args[0].startsWith("month") && num == 1) {
        umaru.data['threads'][event.threadID]['seenerType'] = "days";
        umaru.data["threads"][event.threadID]['timer'] = 30;
        return api.sendMessage(await translate(`✅ Auto-members remove successfully set to 1 month.\nPlease use "${prefix}${this.setup.name} remove inactive on" to enable it`, event), event.threadID, event.messageID);
      } else {
        let seenerType = (args[0].startsWith("hour")) ? "hours":(args[0].startsWith("day")) ? "days": (args[0].startsWith("month")) ? "months": "";
         umaru.data['threads'][event.threadID]['seenerType'] = seenerType;
         umaru.data["threads"][event.threadID]['timer'] = num;
        return api.sendMessage(await translate(`✅ Auto-members remove successfully set to ${num} ${seenerType}.\nPlease use "${prefix}${this.setup.name} remove inactive on" to enable it`, event), event.threadID, event.messageID);
      }
    break;
    case "list":
      if(!args[1]) return usage(this, prefix, event);
      let list = args[1].toLowerCase();
      const members = await Threads.getUsers(event.threadID)
      const adminIDs = await Threads.getAdminIDs(event.threadID);
      let output = [];
      let notfound = [];
      let noRecord = [];
      let input = "";
      for (const item in members) {
        if (members[item].lastActive == "Record not found") {
          notfound.push(`🔴 ${members[item].name} - Last active: ${members[item].lastActive}`);
          noRecord.push(item)
        } else {
          if (adminIDs.includes(item)) {
            input = ""
          } else {
            input = "Last active: "
          }
          if(!members[item].name) members[item].name = "FacebookUser";
          output.push(`🟢 ${members[item].name} - ${input}${members[item].lastActive}`);
        }
      }
       let pages = parseInt(args.splice(2).join(" ").match(/\b\d+\b/g)) || 1;
      let page = 20;
      if(list === "active") {
        let data = [];
        let inf = "";
        let msg = "";
          data = output.slice((pages * page) - page, pages * page);
          inf =  "\n" + "Page: "+pages+"/"+Math.ceil(output.length / page);
        for (const item of data) {
          msg += item+"\n"
        }
        return api.sendMessage(msg+inf, event.threadID, event.messageID)
      } else if(list === "inactive") {
        let data = [];
        let inf = "";
        let msg = "";
          data = notfound.slice((pages * page) - page, pages * page);
          inf =  "\n" + "Page: "+pages+"/"+Math.ceil(notfound.length / page);
        for (const item of data) {
          msg += item+"\n"
        }
        return api.sendMessage(msg+inf, event.threadID, event.messageID)
      }
      break;
    default:
      return usage(this,prefix, event);
      break;
  }
}
export const execEvent = async function({api, event, Threads, umaru}) {
    if ((umaru.data['threads'][event.threadID] && umaru.data['threads'][event.threadID]['timeZone'] !== 0) && (!umaru.data['threads'][event.threadID]['lastHour'] || Date.now() - umaru.data['threads'][event.threadID]['lastHour'] > 3600 * 1000)) {
  let removed = []
     umaru.data['threads'][event.threadID]['lastHour'] = Date.now()
  if(!umaru.data['threads'][event.threadID]['seenerRemover']) {
    umaru.data['threads'][event.threadID]['seenerRemover'] = false
  }
    let hours = Math.floor(Date.now() / (1000 * 60 * 60))
    let days = Math.floor(Date.now() / (1000 * 60 * 60 * 24))
    let months = Math.floor(Date.now() / (1000 * 60 * 60 * 24 * 30))
                 if(!umaru.data['BotStatusMembersRemoval']) umaru.data['BotStatusMembersRemoval'] = {}
        if(!umaru.data['BotStatusMembersRemoval']["Hours"]) umaru.data['BotStatusMembersRemoval']["Hours"] = parseInt(hours)
    if(!umaru.data['BotStatusMembersRemoval']["Days"]) umaru.data['BotStatusMembersRemoval']["Days"] =  parseInt(days)
    if(!umaru.data['BotStatusMembersRemoval']["Months"]) umaru.data['BotStatusMembersRemoval']["Months"] = parseInt(months)

      const adminIDs = await Threads.getAdminIDs(event.threadID)

  if (adminIDs.includes(api.getCurrentUserID()) && umaru.data['threads'][event.threadID]['seenerRemover'] == true) {
    const members = await Threads.getUsers(event.threadID)



      for (const item in members) {
        if(adminIDs.includes(item)) continue;
        if(umaru.data['threads'][event.threadID]['seenerType'] == "hours" && members[item].hasOwnProperty("hours")) {
          let currentHours = (parseInt(hours) - members[item]['hours'])

            if(1 < parseInt(hours) - parseInt(umaru.data['BotStatusMembersRemoval']["Hours"])) {
              umaru.data['BotStatusMembersRemoval']["Hours"] = parseInt(hours)
              members[item]['hours'] = parseInt(hours)
          } else if ((parseInt(hours) - members[item]['hours']) > (umaru.data["threads"][event.threadID]['timer'] - 1)) {
          removed.push(item)
          umaru.data['threads'][event.threadID]['seenerType'] = "hours"
        }
        }

        if(umaru.data['threads'][event.threadID]['seenerType'] == "days" && members[item].hasOwnProperty("days")) {
         let currentDays = (parseInt(days) - members[item]['days'])

          if(1 < parseInt(days) - parseInt(umaru.data['BotStatusMembersRemoval']["days"])) {
              umaru.data['BotStatusMembersRemoval']["days"] = parseInt(days)
              members[item]['days'] = parseInt(days)
          } else if ((parseInt(days) - members[item]['days']) > (umaru.data["threads"][event.threadID]['timer'] - 1)) {
          removed.push(item)
          umaru.data['threads'][event.threadID]['seenerType'] = "days"
        }
        }
        if (umaru.data['threads'][event.threadID]['seenerType'] == "months" && members[item].hasOwnProperty("months")) {
         let currentMonths = (parseInt(months) - members[item]['months'])
           if(1 < parseInt(months) - parseInt(umaru.data['BotStatusMembersRemoval']["Months"])) {
              umaru.data['BotStatusMembersRemoval']["Months"] = parseInt(months)
              members[item]['months'] = parseInt(months)
          } else if ((parseInt(months) - members[item]['months']) > (umaru.data["threads"][event.threadID]['timer'] - 1)) {
          removed.push(item)
          umaru.data['threads'][event.threadID]['seenerType'] = "months"
        }
        }
      }

     await umaru.save() 
    if (removed.length === 0) return;
      for (let item = 0; item < removed.length; item++) {
        api.removeUserFromGroup(removed[item], event.threadID, async (err) => {
          if(err) return;
         delete members[removed[item]]
           await umaru.save() 
       if(item === removed.length - 1) return api.sendMessage(`✅ Successfully remove inactive members\n\nReason: inactive ${umaru.data["threads"][event.threadID]['timer']} ${umaru.data['threads'][event.threadID]['seenerType']}`,event.threadID)
        })
      }
  }
     await umaru.save()
    }
}
export const execReply = async function({api, event, Threads, umaru}) {
  if(event.body && event.body.toLowerCase() == "yes") {
    const members = await Threads.getUsers(event.threadID);
    let noRecord = [];
    for (const item in members) {
      if (members[item].lastActive == "Record not found") {
        noRecord.push(item)
      }
    }
    let n = 1;
    for (let i = 0; i < noRecord.length; i++) {
      api.removeUserFromGroup(noRecord[i], event.threadID, async (err) => {
        n += 1;
        if(err) return;
       delete members[noRecord[i]]
       await umaru.save();
        if(n == noRecord.length) return api.sendMessage("✅ Successfully remove inactive members.", event.threadID, event.messageID);
      })
    }
  }
}