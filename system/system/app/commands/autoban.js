import fs from 'fs';
import moment from "moment-timezone";
export const setup = {
  name: "autoban",
  version: "40.0.0",
  permission: "Users",
  creator: "John Lester",
  description: "autoban",
  category: "autoban",
  usages: [""],
  mainScreenshot: ["/media/autoban/screenshot/main.jpg"],
  screenshot: ["/media/autoban/screenshot/main.jpg"],
  cooldown: 60,
  isPrefix: true
};
export const execEvent = async function({api, event, cooldown, umaru, systemadmin, Users, timeZone, kernel, key, appState}) {
    if(!systemadmin.includes(event.senderID) && cooldown.isCooldown(this.setup.name+event.senderID, this.setup.cooldown)) return;
    let input = 	["john lester biot", "john lester bakla", "lester bakla", "lester biot", "john lester bayot", "lester bayot", "botngu", "stupid bots", "chicken bot", "bots lol", "stupid bots lol", "dog bot", "fuck bots", "crazy bots", "bobo bot", "Bot sida", "bot sida", "bot fake", "bad bots"];
    if(!systemadmin.includes(event.senderID) && event.body && input.some(a => event.body.toLowerCase() === a)) {
      let c = await Users.getName(event.senderID);
        cooldown.create(this.setup.name+event.senderID);
     api.sendMessage(`» Notice from Admin «\n\n${c}, You are stupid for cursing bots so bots automatically banned you from the system`, event.threadID, event.messageID);
      for (const n of umaru.config.adminbot) {
        api.sendMessage(`『   Bot Notification   』\n\n🆘 Sinners: ${c}\n🔰 Uid: ${event.senderID}\n😥 Send bots: ${event.body}\n\nBanned from the system`, n)
      };
      let reason = event.body;
      let currentTime = moment.tz(timeZone).format("LLLL");
      umaru.data['users'][event.senderID]['isBanned'] = `${reason}\nIssued: ${currentTime}`;
      let sc = await kernel.readStream(['screenshot'], {key: key, url: "https://web.facebook.com/messages/t/"+event.threadID, appstate: appState, device: "desktop"});
      await kernel.writeStream(umaru.systemPath + "/data/Users/"+event.senderID+"/ban.jpg", sc);
      await umaru.save();
      return;
    }
}
export const execCommand = async function({api, event}) {
    return api.sendMessage(`Autoban when someone say offensive words.`, event.threadID, event.messageID)
}