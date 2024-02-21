export const setup = {
  name: "listban",
  version: "40.0.0",
  permission: "Admin",
  creator: "John Lester",
  description: "Show the list of banned groups or users.",
  category: "System",
  usages: ["thread", "user"],
  cooldown: 5,
  isPrefix: true
}
export const domain = {"listban": setup.name};
export const execCommand = async function({api, args, event, reply, umaru, translate, Users, Threads}) {
  if(args.length === 0) return usage(this, prefix, event);
  let c = 0;
  let { ID } = await reply.read({
    name: this.setup.name,
    author: event.senderID
  });
  if(typeof ID === "string") api.unsendMessage(ID);
  switch(args[0].toLowerCase()) {
    case "thread":
      let msg = "";
      let threads = {};
      for(const item in umaru.data.threads) {
        if(umaru.data.threads[item].hasOwnProperty('isBanned')) {
          c+=1;
          threads[c] = item; 
          msg += `${c}. ${await Threads.getName(item)}\n💠 TID: ${item}\n`;
        } 
      }
      for(const item in umaru.data.threadBackup) {
        if(umaru.data.threadBackup[item].hasOwnProperty('isBanned')) {
          c+=1;
          threads[c] = item; 
          msg += `${c}. ${await Threads.getName(item)}\n💠 TID: ${item}\n`;
        } 
      }
      return api.sendMessage(`There are currently ${c} banned threads\n\n`+msg+"\n» Reply with the order number that you want to unban", event.threadID, async(err, info) => {
        let ctx = {
          name: this.setup.name,
          author: event.senderID,
          ID: info.messageID,
          data: threads,
          type: "threads"
        }
        await reply.create(ctx);
      }, event.messageID)
    break;
    case "user":
      let msgs = "";
      let users = {};
      for(const item in umaru.data.users) {
        if(umaru.data.users[item].hasOwnProperty('isBanned')) {
          c+=1;
          users[c] = item;
          msgs += `${c}. ${await Users.getName(item)}\n💠 TID: ${item}\n`;
        } 
      }
      return api.sendMessage(`There are currently ${c} banned users\n\n`+msgs+"\n» Reply with the order number that you want to unban", event.threadID, async(err, info)=> {
        let ctx = {
          name: this.setup.name,
          author: event.senderID,
          ID: info.messageID,
          data: users,
          type: "users"
        }
        await reply.create(ctx);
      }, event.messageID);
    break;
    default: 
      return usage(this, prefix, event);
    break;
  }
}
export const execReply = async function({api, args, event, reply, umaru, translate, Users, Threads}) {
  let ctx = {
    name: this.setup.name,
    author: event.senderID
  }
  let data = await reply.read(ctx);
  let choose = parseInt(args[0]);
  switch (data.type) {
    case "users":
      if(!isNaN(choose) && umaru.data.users.hasOwnProperty(data.data[choose])) {
        delete umaru.data.users[data.data[choose]].isBanned;
        await umaru.save();
        api.sendMessage((await translate(`✅ Successfully unban {{n}}`, event, null, true)).replace("{{n}}", await Users.getName(data.data[choose])), event.threadID,event.messageID);
        return api.sendMessage(`✨ Notification from admin\n\nYou have been removed from the banlist and are now free to use the bot`, data.data[choose]);
      }
    break;
    case "threads":
      if(!isNaN(choose) && umaru.data.threads.hasOwnProperty(data.data[choose])) {
        delete umaru.data.threads[data.data[choose]].isBanned;
        await umaru.save();
        api.sendMessage((await translate(`✅ Successfully unban {{n}}`, event, null, true)).replace("{{n}}", await Threads.getName(data.data[choose])), event.threadID,event.messageID);
        return api.sendMessage(`✨ Notification from admin\n\nYour thread has been removed from the banlist, and you are now free to use the bot`, data.data[choose]);
      } else if(!isNaN(choose) && umaru.data.threadBackup.hasOwnProperty(data.data[choose])) {
         delete umaru.data.threadBackup[data.data[choose]].isBanned;
        await umaru.save();
        api.sendMessage((await translate(`✅ Successfully unban {{n}}`, event, null, true)).replace("{{n}}", await Threads.getName(data.data[choose])), event.threadID,event.messageID);
        return api.sendMessage(`✨ Notification from admin\n\nYour thread has been removed from the banlist, and you are now free to use the bot`, data.data[choose]);
         }
    break;
  }
}