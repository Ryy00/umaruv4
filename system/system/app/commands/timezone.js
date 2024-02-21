import fs from "fs";
import moment from 'moment-timezone';
let tz = ["Asia/Manila","Asia/Chita","Asia/Ust-Nera","Australia/ACT","Etc/GMT+12","Etc/GMT-13","Etc/GMT-14","Pacific/Gambier","Pacific/Pitcairn","US/Arizona","US/Central","US/East-Indiana","Africa/Abidjan","Africa/Addis_Ababa","Africa/Algiers","Africa/Blantyre","America/Anguilla","America/Araguaina","America/Godthab","America/Scoresbysund","America/St_Johns","Antarctica/Davis","Antarctica/Mawson","Antarctica/Vostok","Asia/Baku","Asia/Calcutta","Asia/Kabul","Asia/Kathmandu","Asia/Rangoon","Asia/Tehran","Australia/Adelaide","Australia/Darwin","Australia/Eucla","NZ-CHAT","Pacific/Marquesas"]
let tzs = {};
for(const item of tz) {
  let timezo = item.toLowerCase();
  if(!tzs.hasOwnProperty(timezo)) tzs[timezo] = item
};
for(const item of moment.tz.names()) {
  let timezo = item.toLowerCase();
  if(!tzs.hasOwnProperty(timezo)) tzs[timezo] = item
};
export const setup = {
    name: "timezone",
    version: "40.0.0",
    permission: "Users",
    creator: "John Lester",
    description: "Change the timezone",
    category: "System",
    usages: ["list [page number]",  "set me [timezone]", "set group [timezone]", "set system [timezone]", "reset me", "reset group","reset system"],
    cooldown: 5,
    isPrefix: true
};
export const domain = {"timezone": setup.name};
export const execCommand = async function({api, event, umaru, args,   usage, prefix, translate, Threads, systemadmin}) {
  if(args.length === 0) return usage(this, prefix, event);
  switch(args[0].toLowerCase()) {
    case "set":
      if(!args[1] || !args[2]) return usage(this, prefix, event);
      let set = args[1].toLowerCase();
      if(!["me", "group", "system"].some(a => a === set)) return usage(this, prefix, event)
      let _2 = args.splice(2).join(" ").toLowerCase();
      let timez = (tzs.hasOwnProperty(_2)) ? tzs[_2] : null;
      if(timez === null) return api.sendMessage((await translate("⚠️ Unsupported timezone. Use the {{1}} to display all supported timezone.", event, null, true)).replace("{{1}}", prefix+"timezone list"), event.threadID, event.messageID);
      if(set == "me") {
         umaru.data['users'][event.senderID]['timeZone'] = timez;
         await umaru.save();
        return api.sendMessage((await translate("✅ Successfully change the timezone to "+timez, event, null, false)), event.threadID, event.messageID)
      } else if(set == "group") {
        if(event.isGroup == false) return api.sendMessage(await translate("⚠️ This option is only allowed in group chat.", event, null, true), event.threadID, event.messageID);
        let threadAdmin = await Threads.getAdminIDs(event.threadID);
        if(!(threadAdmin.includes(event.senderID)? true:systemadmin.includes(event.senderID))) return api.sendMessage((await translate(umaru.config.permission_1, event, null, false)).replace("{{1}}", event.body), event.threadID, event.messageID);
        umaru.data['threads'][event.threadID]['timeZone'] = timez;
         await umaru.save();
        return api.sendMessage((await translate("✅ Successfully change the timezone to "+timez, event, null, false)), event.threadID, event.messageID)
      } else if(set == "system") {
        if(!systemadmin.includes(event.senderID)) return Umaru.sendMessage((await translate(umaru.config.permission_2, event, null, false)).replace("{{1}}", event.body), event.threadID, event.messageID);
        umaru.config.language = timez;
        await fs.promises.writeFile(umaru.configPath, JSON.stringify(umaru.config, null, '\t'));
        return api.sendMessage((await translate("✅ Successfully change the timezone to "+timez, event, null, false)), event.threadID, event.messageID)
      }
      break;
    case "reset":
      if(!args[1]) return usage(this, prefix, event);
      let reset = args[1].toLowerCase();
      if(!["me", "group", "system"].some(a => a === reset)) return usage(this, prefix, event);
      if(reset == "me") {
         umaru.data['users'][event.senderID]['timeZone'] = 0
         await umaru.save();
         return api.sendMessage((await translate("✅ Successfully reset the timezone.", event, null, false)), event.threadID, event.messageID);
      } else if(reset == "group") {
        if(event.isGroup == false) return api.sendMessage(await translate("⚠️ This option is only allowed in group chat.", event, null, true), event.threadID, event.messageID);
        let threadAdmin = await Threads.getAdminIDs(event.threadID);
        if(!(threadAdmin.includes(event.senderID)? true:systemadmin.includes(event.senderID))) return api.sendMessage((await translate(umaru.config.permission_1, event, null, false)).replace("{{1}}", event.body), event.threadID, event.messageID);
         umaru.data['threads'][event.threadID]['timeZone'] = 0;
         await umaru.save();
        return api.sendMessage((await translate("✅ Successfully reset the timezone.", event, null, false)), event.threadID, event.messageID);
      } else if(reset == "system") {
        if(!systemadmin.includes(event.senderID)) return Umaru.sendMessage((await translate(umaru.config.permission_2, event, null, false)).replace("{{1}}", event.body), event.threadID, event.messageID);
        umaru.config.TimeZone = "Asia/Manila";
        await fs.promises.writeFile(umaru.configPath, JSON.stringify(umaru.config, null, '\t'));
        return api.sendMessage((await translate("✅ Successfully reset the timezone.", event, null, false)), event.threadID, event.messageID);
      }
      break;
    case "list":
      let colect = {};
      let msg = "🕒 Here's the supported timezone. Choose the timezone that is the same as your country's time:\n\n";
      let la = tz;
      let pages = parseInt(args.splice(1).join(" ").match(/\b\d+\b/g)) || 1;
      let page = tz.length/2;
      let data = [];
      let inf = "";
      data = la.slice((pages * page) - page, pages * page);
      inf =  "\n" + "Page: "+pages+"/"+Math.ceil(la.length / page);
      for (const item of data) {
        let time = moment.tz(item).format("hh:mm A");
        msg += item+" - "+time+"\n"
      }
      return api.sendMessage(msg+inf, event.threadID, event.messageID)
      break;
    default:
      usage(this, prefix, event);
      break
  }
}