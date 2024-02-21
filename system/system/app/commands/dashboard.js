export const setup = {
  name: "dashboard",
  version: "40.0.0",
  permission: "Admin",
  creator: "John Lester",
  description: "View dashboard url and key",
  category: "admin",
  usages: [""],
  cooldown: 10,
  isPrefix: true
};
export const domain = {"dashboard": setup.name}
export const execCommand = async function({api, event, umaru, args, translate, Users, reply}) {
  if(event.isGroup == true) {
    let { ID } = await reply.read({
      name: this.setup.name,
      author: event.senderID
    });
    if(typeof ID === "string") api.unsendMessage(ID);
    return api.sendMessage(`⚠️ Warning. You attempt this command in group chat. The key will show other users here. Do you want to continue? Reply "yes" if you want.`, event.threadID, async (err, info) => {
      let ctx = {
        name: this.setup.name,
        author: event.senderID,
        ID: info.messageID
      }
      await reply.create(ctx)
    }, event.messageID)
  } else {
    let msg = `💻 Url: ${process.env.Umaru_Dashboard}\n🔑 Key: ${process.env.Umaru_Key}`;
    return api.sendMessage(msg, event.threadID, event.messageID);
  }
}
export const execReply = async function({api, event, reply}) {
  if(event.body && event.body.toLowerCase() == "yes") {
    let msg = `💻 Url: ${process.env.Umaru_Dashboard}\n🔑 Key: ${process.env.Umaru_Key}`;
    return api.sendMessage(msg, event.threadID, event.messageID);
  }
}