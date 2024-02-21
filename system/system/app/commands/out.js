export const setup = {
  name: "out",
  version: "40.0.0",
  permission: "Admin",
  creator: "John Lester",
  description: "Leave specific thread",
  category: "admin",
  usages: [""],
  cooldown: 10,
  isPrefix: true
};
export const domain = {"out": setup.name};
export const execCommand = async function({api, event, args, Threads, umaru}) {
    const tid = args.join(" ")
    if (!tid) {
      return api.removeUserFromGroup(api.getCurrentUserID(), event.threadID);
    } else {
      return api.removeUserFromGroup(api.getCurrentUserID(), tid, () => api.sendMessage("The bot has left this group", event.threadID, event.messageID));
    }
}
