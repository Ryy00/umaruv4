export const setup = {
  name: "tempmail",
  version: "40.0.0",
  permission: "Users",
  creator: "John Lester",
  description: "Temporary email address",
  category: "General",
  usages: ["generate", "check [email address]"],
  cooldown: 5,
  isPrefix: true
}
export const domain = {"tempmail": setup.name};
export const execCommand = async function({api, event, kernel, key, umaru, keyGenerator, usage, prefix, args, translate}) {
  if(args.length === 0) return usage(this, prefix, event);
  switch (args[0].toLowerCase()) {
    case "generate":
      let email = await kernel.read(["tempmail"], {key: key, type: "create"});
      let msg = await translate("✉️ Here's the generated email", event, null, true)+"\n\n";
      for(const item of email) {
        msg += "➣ "+item.replace(".com", " .com")+"\n";
      }
      msg += "\n"+(await translate(`» Use {{1}} to view a message`, event, null, true)).replace("{{1}}", `${prefix}${this.setup.name} check [email address]`);
      return api.sendMessage(msg, event.threadID, event.messageID);
    break;
    case "check":
      let address = args.splice(1).join("");
      if(!(/[0-9a-z]@[0-9a-z]/.test(address))) return api.sendMessage(await translate("⚠️ Invalid email address.",event, null, true), event.threadID, event.messageID);
       let message = await kernel.read(["tempmail"], {key: key, type: "view", email: address});
      if(message.length === 0) return api.sendMessage(await translate("⚠️ No message was found at this email address.",event, null, true), event.threadID, event.messageID);
      let dump = `✉️ Inbox ${message.length}\n`;
      for(const item of message) {
       dump += `\n👤 From: ${item.from}\n✉️ Subject: ${item.subject}\n🗓 Date: ${item.date}\n`
      }
      return api.sendMessage(dump, event.threadID, event.messageID);
    break;
    default:
      return usage(this, prefix, event);
      break;
  }
}