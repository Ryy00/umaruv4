export const setup = {
  name: "morse",
  version: "40.0.0",
  permission: "Users",
  creator: "John Lester",
  description: "Morse encoder and decoder",
  category: "Utility",
  usages: ["encode [text]", "decode [text]"],
  mainScreenshot: ["/media/morse/screenshot/main.jpg"],
  screenshot: ["/media/morse/screenshot/main.jpg"],
  cooldown: 10,
  isPrefix: true
};
export const domain = {"morse": setup.name}
export const execCommand = async function({api, event, umaru, args, Users, kernel, usage, prefix, key}) {
  if(args.length <= 1) return usage(this, prefix, event);
  let text = args.splice(1).join(" ");
  let choice = args[0].toLowerCase();
  if(choice.startsWith("en")) {
    let encode = await kernel.read(["morse"], {key: key, type: "encode", text: text});
    return api.sendMessage(encode, event.threadID, event.messageID);
  } else if(choice.startsWith("de")) {
    let decode = await kernel.read(["morse"], {key: key, type: "decode", text: text});
    return api.sendMessage(decode, event.threadID, event.messageID);
  } else {
    return usage(this, prefix, event);
  }
}