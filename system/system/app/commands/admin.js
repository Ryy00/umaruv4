import fs from "fs";
export const setup = {
  name: "admin",
  version: "40.0.0",
  permission: "Users",
  creator: "John Lester",
  description: "Tool for admin add/remove/list",
  category: "admin",
  usages: ["add [uid]", "remove [uid]", "list"],
  mainScreenshot: ["/media/admin/screenshot/main.jpg"],
  screenshot: ["/media/admin/screenshot/add.jpg", "/media/admin/screenshot/remove.jpg", "/media/admin/screenshot/list.jpg"],
  cooldown: 5,
  isPrefix: true
}
export const domain = {"admin": setup.name};
export const execCommand = async function({api, event, args, prefix, Users, umaru, translate, context, usage, systemadmin}) {
  let mentions = Object.keys(event.mentions);
  (mentions.length === 0 && /^[0-9]+$/.test(args[1])) ? mentions[0] = args[1]: (event.type == "message_reply") ? mentions[0] = event.messageReply.senderID:"";
  if(args.length === 0) return usage(this, prefix, event);
    switch(args[0].toLowerCase()) {
      case 'list':
        let list = "";
        for(const item of umaru.config.adminbot) {
          if(item.trim() === "") continue;
          let name;
          let link;
          if(umaru.config.Anonymous == true) {
            name = "Anonymous";
            link = item.substring(0, 5)+"*".repeat(Math.abs(item.length - 5))
          } else {
            name = await Users.getName(item);
            link = item;
          }
          list += `❑ ${name}(https://facebook.com/${link})\n`;
        }
        api.sendMessage(context+`[Admin] ${await translate("Admin list", event, null, true)}:\n\n${list}`, event.threadID, event.messageID)
      break;
      case "add":
        if(!systemadmin.includes(event.senderID)) return api.sendMessage(context+(await translate(umaru.config.permission_2, event, null, true)).replace("{{1}}", event.body), event.threadID, event.messageID);
        let id = parseInt(mentions[0]);
        if(isNaN(id)) return api.sendMessage((await translate("⚠️ The uid is invalid.", event, null, true)), event.threadID, event.messageID);
        if(!umaru.config.adminbot.includes(id.toString())) {
          umaru.config.adminbot.push(id.toString());
        await fs.promises.writeFile(umaru.configPath, JSON.stringify(umaru.config, null, '\t'));
        }
        api.sendMessage(context+`[Admin] ${await translate("Added 1 admin", event, null, true)}:\n\n[ ${id} ] » ${await Users.getName(id)}`, event.threadID, event.messageID)
      break;
      case "remove": 
      if(!systemadmin.includes(event.senderID)) return api.sendMessage((await translate(umaru.config.permission_2, event, null, true)).replace("{{1}}", event.body), event.threadID, event.messageID);
      let ids = parseInt(mentions[0]);
      if(isNaN(ids)) return api.sendMessage((await translate("⚠️ The uid is invalid.", event, null, true)), event.threadID, event.messageID);

      umaru.config.adminbot = umaru.config.adminbot.filter(a => a !== ids.toString());
      await fs.promises.writeFile(umaru.configPath, JSON.stringify(umaru.config, null, '\t'));
      api.sendMessage(context+`[Admin] ${await translate("Remove 1 admin", event, null, true)}:\n\n[ ${ids} ] » ${await Users.getName(ids)}`, event.threadID, event.messageID)
      break;
    }
}