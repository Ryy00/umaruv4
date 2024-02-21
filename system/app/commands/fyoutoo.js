import fs from 'fs';
export const setup = {
  name: "fyoutoo",
  version: "40.0.0",
  permission: "Users",
  creator: "John Lester",
  description: "fyoutoo",
  category: "No Prefix",
  usages: [""],
  mainScreenshot: ["/media/fyoutoo/screenshot/main.jpg"],
  screenshot: ["/media/fyoutoo/screenshot/main.jpg"],
  cooldown: 60,
  isPrefix: true
};
export const execEvent = async function({api, event, cooldown, umaru, systemadmin}) {
    if(!systemadmin.includes(event.senderID) && cooldown.isCooldown(this.setup.name+event.senderID, this.setup.cooldown)) return;
    let input = ["fuck", "pakyu", "pak yu"];
    if(event.body && input.some(a => event.body.toLowerCase() === a)) {
        let msg = {
            body: "F you too",
            attachment: fs.createReadStream(umaru.mainPath+"/media/fyoutoo/fyou.gif")
        }
        cooldown.create(this.setup.name+event.senderID);
        return api.sendMessage(msg, event.threadID, event.messageID)
    }
}
export const execCommand = async function({api, event}) {
    return api.sendMessage(`fyoutoo no prefix command when someone say "f*ck".`, event.threadID, event.messageID)
}