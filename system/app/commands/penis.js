export const setup = {
  name: "penis",
  version: "40.0.0",
  permission: "Users",
  creator: "John Lester",
  description: "",
  category: "random-text",
  usages: [""],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"penis": setup.name}
export const execCommand = async function({api, event}) {
  return api.sendMessage(`8${'='.repeat(Math.floor(Math.random() * 10))}D`, event.threadID, event.messageID);
}