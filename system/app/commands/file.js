import fs from "fs-extra";
export const setup = {
  name: "file",
  version: "40.0.0",
  permission: "Admin",
  creator: "John Lester",
  description: "Manage the current commands or delete the commands",
  category: "General",
  usages: ["list [page number]", "delete [filename]"],
  cooldown: 5,
  isPrefix: true
}
export const domain = {"file": setup.name};
export const execCommand = async function({api, event, args, umaru, usage, prefix}) {
  if(args.length === 0) return usage(this, prefix, event);
  let text = args.splice(1).join(" ");
  switch (args[0].toLowerCase()) {
    case "delete":
      if(text === '') return usage(this, prefix, event);
  if(fs.existsSync(umaru.mainPath+'/app/commands/'+text)) {
      fs.removeSync(umaru.mainPath+'/app/commands/'+text);
        return api.sendMessage(`✅ ${text} was successfully deleted.`, event.threadID, event.messageID);
      } else {
        return api.sendMessage(`❎ ${text} not found`, event.threadID, event.messageID)
      }
    break;
    case "list":
      let msg = "📁 commands\n/app/commands\n\n";
      let la = await fs.promises.readdir(umaru.mainPath+'/app/commands');
      let pages = parseInt(text.match(/\b\d+\b/g)) || 1;
      let page = 40;
      let data = [];
      let inf = "";
        data = la.slice((pages * page) - page, pages * page);
        inf =  "\n" + "» Page: "+pages+"/"+Math.ceil(la.length / page);
      for (const item of data) {
        msg += ((await fs.promises.stat(umaru.mainPath+'/app/commands/'+item)).isDirectory()?"📁 ":"📄 ")+item+"\n";
      }
      return api.sendMessage(msg+inf, event.threadID, event.messageID)
    break;
    default:
      usage(this, prefix, event);
    break;
  }
}