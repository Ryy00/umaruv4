export const setup = {
  name: "outall",
  version: "40.0.0",
  permission: "Admin",
  creator: "John Lester",
  description: "Leave all thread",
  category: "admin",
  usages: [""],
  cooldown: 10,
  isPrefix: true
};
export const domain = {"outall": setup.name};
export const execCommand = async function({api, event, args, Threads, umaru}) {
  for(const item of umaru.allThreadID) {
  api.removeUserFromGroup(api.getCurrentUserID(), item);
  }
     return api.sendMessage('✅ Out of the whole group successfully', event.threadID);
}
