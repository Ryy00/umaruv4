export const setup = {
  name: "onbot",
  version: "40.0.0",
  permission: "GroupAdmin",
  creator: "John Lester",
  description: "onbot to the group",
  category: "admin",
  usages: "",
  cooldown: 0,
  isPrefix: true
}
export const execCommand = async function({api, event, umaru}) {
  if(event.isGroup == true) {
  umaru.data.threads[event.threadID]['active'] = true
  await umaru.save();
  api.sendMessage(`✅ Successfully onbot in this thread: ${event.threadID}`, event.threadID, event.messageID)
  } else {
  umaru.data.users[event.threadID]['active'] = true
  await umaru.save();
  api.sendMessage(`✅ Successfully onbot in this thread: ${event.threadID}`, event.threadID, event.messageID)
  }
}