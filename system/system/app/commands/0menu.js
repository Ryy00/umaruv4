import fs from "fs";
let isWrite = false;
let command = {};
let items = {};
let alCmd = {};
export const setup = {
  name: "menu",
  version: "40.0.0",
  permission: "Users",
  creator: "John Lester",
  description: "View the details of the commands.",
  category: "help",
  usages: ["", "all", "[page number]", "all [page number]"],
  cooldown: 5,
  isPrefix: true
}
export const execCommand = async function({api, event, args, umaru, prefix, reply}) {
  let text = args[0];
  let page = (text === "all") ? (parseInt(args[1]) || 1): (parseInt(text) || 1);
  let num = 10;
  let i = 1 + page * num - 10;
  let cut = page * num - num;
  if(isWrite == false) {
  let cmd = umaru.category.keys();

  for(const item of cmd) {
    let text = umaru.category.get(item).toLowerCase().split(/\s+/).map(a => a.replace(a[0], a[0].toUpperCase())).join(" ");
    if(!command.hasOwnProperty(text)) {
      command[text] = []
      command[text].push(item)
    } else {
      command[text].push(item)
    }
  }
    let j = 0;
    let cmds = Object.keys(command);
    for(const item of cmds) {
      j += 1;
      items[j] = item;
    }
    j = 0;
    let allCmd = umaru.umaruCommand.keys();
    for(const item of allCmd) {
      j += 1;
      alCmd[j] = item;
    }
    isWrite = true;
  }
  if(text == "all") {
    let cmds = Object.values(alCmd);
    const commands = cmds.slice(cut, cut + num);
    let msg = "";
    let n = cut;
    for (const item of commands) {
      n += 1;
      msg += `『 ${n} 』 ${item}: ${umaru.description.get(item)}\n`;
    }
    return api.sendMessage(msg+`\n» Page: ${page}/${Math.ceil(cmds.length / num)}\n» Reply with the order number to display the details of the command.`, event.threadID, async(err, info) => {
      let ctx = {name: this.setup.name,thread: event.threadID,messageID: event.messageID,ID: info.messageID,type: "command_usage",author: "global", isAll: true}
      await reply.create(ctx);
    }, event.messageID)
  } else {
  let cmds = Object.keys(command);
  const commands = cmds.slice(cut, cut + num);
  let msg = "";
  let n = cut;
  for (const item of commands) {
    n += 1;
    msg += `『 ${n} 』 ${item}\n`;
  }
  return api.sendMessage(msg+`\n» Page: ${page}/${Math.ceil(cmds.length / num)}\n» Reply with the order number to display the commands by category.`, event.threadID, async(err, info) => {
    let ctx = {name: this.setup.name,thread: event.threadID,messageID: event.messageID,ID: info.messageID,type: "command",author: "global"}
    await reply.create(ctx);
  }, event.messageID)
  }
}
export const execReply = async function({api, event, args, umaru, prefix, reply, umaruv4}) {
  let ctx = {
    name: this.setup.name,
    ID: event.messageReply.messageID,
    author: "global"
  }
  let data  = await reply.read(ctx);
  let choose = args.join(" ");
  if(data.type == "command") {
      let get = parseInt(choose);
      if(!isNaN(get)) {
        let cmd = command[items[get]];
        let msg = "";
        let commands = {}
        for(let i = 0; i < cmd.length; i++) {
          commands[(i+1)] = cmd[i];
          msg += `『 ${i+1} 』 ${cmd[i]}\n`;
        }
        return api.sendMessage(msg+`\n» Reply with the order number to display the details of the command.`, event.threadID, async(err, info) => {
          let ctx = {name: this.setup.name,thread: event.threadID,messageID: event.messageID,ID: info.messageID,type: "command_usage",author: "global", command: commands}
          await reply.create(ctx);
        }, event.messageID)
      }
  } else if(data.type == "command_usage") {
    if(data.command && data.command.hasOwnProperty(choose)) {
      return umaruv4({payload: `${prefix}${umaru.domain.help} ${data.command[choose]}`});
    } else if(data.isAll == true && alCmd.hasOwnProperty(choose)) {
       return umaruv4({payload: `${prefix}${umaru.domain.help} ${alCmd[choose]}`});
    }
  }
}