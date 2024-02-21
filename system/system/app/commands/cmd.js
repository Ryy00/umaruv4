import fs from "fs";
export const setup = {
  name: "cmd",
  version: "40.0.0",
  permission: "Admin",
  creator: "John Lester",
  description: "Installing commands",
  category: "system",
  usages: ["install [filename]", "uninstall [filename]"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"cmd": setup.name};
export const execCommand = async function({api, event, umaru, args, usage, prefix, translate, Threads, systemadmin, install}) {
  if(args.length === 0) return usage(this, prefix, event);
  if(args[0].toLowerCase().startsWith("i") || args[0].toLowerCase().startsWith("u")) {
    let text = args.splice(1).join(" ");
    let path = umaru.mainPath+"/app/commands/"+text;
    let cmd = (fs.existsSync(path+".js")) ?text+".js":text;
    if(fs.existsSync(path+".js") || fs.existsSync(path)) {
      let msg = await install(true, "cmd", cmd, (args[0].toLowerCase().startsWith("i"))?"i":"un");
      if(typeof msg === "string") {
        return api.sendMessage("❎ "+msg, event.threadID, event.messageID)
      } else {
        let pr = (args[0].toLowerCase().startsWith("i"))?"✅ Successfully installed ":"✅ Successfully uninstalled ";
        return api.sendMessage(pr+cmd, event.threadID, event.messageID)
      }
    } else {
       return api.sendMessage(`❎ ${cmd} file not found`, event.threadID, event.messageID)
      }
  } else {
     return usage(this, prefix, event);
  } 
}