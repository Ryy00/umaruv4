import fs from "fs";
let isWrite = false;
export const setup = {
  name: "shortcut",
  version: "40.0.0",
  permission: "Users",
  creator: "John Lester",
  description: "",
  category: "system",
  usages: ["[input] -> [output]", "delete [input]", "list [page number]"],
  cooldown: 10,
  isPrefix: true
}
export const execCommand = async function({api, event, args, umaru, prefix, reply, writeThread, readThread, usage, translate}) {
  if(args.length === 0) return usage(this, prefix, event);
  let text = args.join(" ");
  let path = umaru.mainPath+"/app/commands/shortcut/"+event.threadID;
  if(text.includes("->")) {
  let [inp, out] = text.split("->")
  let input = inp.trim();
  let output = out.trim();
  if(input === "" || typeof output == "undefined" || output == "") return usage(this, prefix, event);
  let data = await readThread(path);
  if(data.hasOwnProperty(input)) return api.sendMessage(`⚠️ ${input} input already exist!`, event.threadID, event.messageID);
  data[input] = output;
  await writeThread(path, data, true);
    return api.sendMessage(`🔰 Successfully added a new shortcut\n\nInput: ${input}\nOutput: ${output}`, event.threadID, event.messageID);
  } else if(args[0].toLowerCase() == "delete") {
    let data = await readThread(path);
    let input = args.splice(1).join(" ");
    if(!data.hasOwnProperty(input)) return api.sendMessage(`⚠️ ${input} input not found.`, event.threadID, event.messageID);
    delete data[input];
    await writeThread(path, data, true);
    return api.sendMessage(`✅ Successfully removed ${input} shortcut.`, event.threadID, event.messageID)
  } else if(args[0].toLowerCase() == "list") {
    let data = await readThread(path);
    let ref = [];
    for(const item in data) {
      ref.push(`${item} -> ${data[item]}`);
    }
    if(ref.length === 0) return api.sendMessage(`⚠️ Shortcut not found.`, event.threadID, event.messageID);
    let pages = parseInt(args[1]) || 1;
    let page = 20;
    data = ref.slice((pages * page) - page, pages * page);
    let msg = "";
    let count = (pages == 1) ? 1 : ((pages * page) - 10) + 1;
    for (const item of data) {
      msg += `${count++}. ${item}\n`;
    }
    return api.sendMessage(msg+"\n" + "Page: "+pages+"/"+Math.ceil(ref.length / page), event.threadID, event.messageID);
  } else {
    return usage(this, prefix, event);
  }
}
export const execEvent = async function({api, event, readThread, writeThread, umaru, cooldown, systemadmin}) {
  if(((!systemadmin.includes(event.senderID) && cooldown.isCooldown(this.setup.name+event.senderID, this.setup.cooldown)) || event.isGroup !== true) || !fs.existsSync(umaru.mainPath+"/app/commands/shortcut/"+event.threadID+".sqlite")) return;
  let data = await readThread(umaru.mainPath+"/app/commands/shortcut/"+event.threadID);
  if(data.hasOwnProperty(event.body)) {
    cooldown.create(this.setup.name+event.senderID);
    return api.sendMessage(data[event.body], event.threadID, event.messageID)
  }
}