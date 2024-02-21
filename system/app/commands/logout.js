import fs from 'fs';
export const setup = {
  name: "logout",
  version: "40.0.0",
  permission: "Admin",
  creator: "John Lester",
  description: "Logout the bot",
  category: "System",
  usages: [""],
  cooldown: 5,
  isPrefix: true
}
export const execCommand = async function({api, event, umaru}) {
  return api.sendMessage("Logout...", event.threadID, () => {
    fs.writeFileSync(umaru.appstatePath, "[]");
    process.exit(1);
  }, event.messageID)
}
