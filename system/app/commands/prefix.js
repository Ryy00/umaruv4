import fs from 'fs';
export const setup = {
  name: "prefix",
  version: "40.0.0",
  permission: "Users",
  creator: "John Lester",
  description: "prefix",
  category: "No Prefix",
  usages: [""],
  mainScreenshot: ["/media/prefix/screenshot/main.jpg"],
  screenshot: ["/media/prefix/screenshot/main.jpg"],
  cooldown: 10
};
export const domain = {"prefix": setup.name};
export const execEvent = async function({api, event, cooldown, umaru, prefix, translate, systemadmin}) {
    if(!systemadmin.includes(event.senderID) && cooldown.isCooldown(this.setup.name+event.senderID, this.setup.cooldown)) return;
    let input = ["prefix"];
    if(event.body && input.some(a => event.body.toLowerCase().startsWith(a))) {
        let msg = (await translate(`🌐 System prefix: {{1}}\n💠 Group chat prefix: {{2}}`, event, null, true)).replace("{{1}}", umaru.config.prefix).replace("{{2}}", prefix);
        cooldown.create(this.setup.name+event.senderID);
        return api.sendMessage(msg, event.threadID, event.messageID)
    }
}
export const execCommand = async function({api, event, umaru, prefix, translate}) {
  if(prefix == "") return;
  let msg = (await translate(`🌐 System prefix: {{1}}\n💠 Group chat prefix: {{2}}`, event, null, true)).replace("{{1}}", umaru.config.prefix).replace("{{2}}", prefix);
  return api.sendMessage(msg, event.threadID, event.messageID)
}