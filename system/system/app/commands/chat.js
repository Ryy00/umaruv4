export const setup = {
  name: "chat",
  version: "40.0.0",
  permission: "Admin",
  creator: "John Lester",
  description: "Chat thread using bot",
  category: "admin",
  usages: ["connect [threadID]", "disconnect"],
  cooldown: 10,
  isPrefix: true
};
export const domain = {"chat": setup.name};
export const execCommand = async function({api, event, args, umaru, usage, prefix}) {
  if(args.length === 0) return usage(this, prefix, event);
  let check = Array.from(umaru.process.chat.keys());
  let threadid = args[1];
  switch (args[0].toLowerCase()) {
    case 'connect':
      if(check.length !== 0) return api.sendMessage("⚠️ Please disconnect first. Use "+prefix+this.setup.name+" disconnect", event.threadID, event.messageID);
      await umaru.createJournal(event);
      umaru.process.chat.set(event.senderID, threadid);
      umaru.process.chat.set(threadid, event.senderID);
      umaru.process.chat.set(event.threadID, threadid);
      umaru.process.chat.set(threadid, event.threadID);
      return api.sendMessage("💬 Successfully connected to "+threadid+"...",event.threadID, event.messageID);
    break;
    case "disconnect":
      umaru.process.chat.clear();
      umaru.process.messageID.clear();
      await umaru.deleteJournal(event);
      return api.sendMessage("💬 Successfully disconnected...", event.threadID, event.messageID)
    break;
  }

}
