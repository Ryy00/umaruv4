import fs from "fs";
import axios from "axios";
export const setup = {
  name: "adc",
  version: "40.0.0",
  permission: "Admin",
  creator: "John Lester",
  description: "Apply code to pastebin",
  category: "General",
  usages: ["[filename]", "[reply the url with filename]"],
  cooldown: 5,
  isPrefix: true
}
export const domain = {"adc": setup.name};
export const execCommand = async function({api, event, args, umaru, kernel, install, usage, key}) {
  if(args.length === 0) return usage(this, prefix, event);
  let text = args.join(" ");
  if (event.type === "message_reply") {
    let url = event.messageReply.body.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g);
    let file = (text.endsWith(".js")) ? text : text+".js";
    if(url === null) return api.sendMessage(`❎ An error occurred while applying the code ${file}.`, event.threadID, event.messageID);
    let { data } = await axios.get(url[0], {responseType: "stream"});
    await kernel.writeStream(umaru.mainPath+"/app/commands/"+file, data);
    let msg = await install(true, "cmd", file, data, "i");
    if(typeof msg === "string") {
      await fs.promises.unlink(umaru.mainPath+"/app/commands/"+file);
      return api.sendMessage("❎ "+msg, event.threadID, event.messageID)
    } else {
      return api.sendMessage(`✅ ${file} was successfully installed.`, event.threadID, event.messageID);
    }
  }
  if(fs.existsSync(umaru.mainPath+'/app/commands/'+text+".js")) {
    let data = await fs.promises.readFile(umaru.mainPath+'/app/commands/'+text+".js", "utf-8");
    let link = await kernel.read(["pastebin"], {key: key, args: args, data: data});
    return api.sendMessage(link, event.threadID, event.messageID);
  } else if(fs.existsSync(umaru.mainPath+'/app/commands/'+text)) {
    let data = await fs.promises.readFile(umaru.mainPath+'/app/commands/'+text, "utf-8");
    let link = await kernel.read(["pastebin"], {key: key, args: args, data: data});
    return api.sendMessage(link, event.threadID, event.messageID);
  } else {
    return api.sendMessage(`❎ ${(umaru.mainPath+'/app/commands/'+text+".js")?text+".js":text} file not found`, event.threadID, event.messageID)
  }
}