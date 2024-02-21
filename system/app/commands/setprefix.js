export const setup = {
  name: "setprefix",
  version: "40.0.0",
  permission: "GroupAdmin",
  creator: "John Lester",
  description: "Set the prefix",
  category: "General",
  usages: ["[text]"],
  mainScreenshot: ["/media/setPrefix/screenshot/main.jpg"],
  screenshot: ["/media/setPrefix/screenshot/main.jpg"],
  cooldown: 10,
  isPrefix: true
};
export const domain = {"setprefix": setup.name};
export const execCommand = async function({api, args, event, umaru, translate, prefix, usage}) {
  let text = args.join("");
  (event.isGroup == true) ? umaru.data['threads'][event.threadID]['prefix'] = text:umaru.data['users'][event.threadID]['prefix'] = text;
  let ownid = api.getCurrentUserID();
  let botname = (umaru.config.botname) ? umaru.config.botname: umaru.data['users'][ownid].name.split(" ")[0];
  (text !== "") ? api.changeNickname(umaru.config.nickname.replace("{prefix}", text).replace("{botname}", botname), event.threadID, ownid):api.changeNickname("", event.threadID, ownid)
  await umaru.save();
  return api.sendMessage((await translate("✅ Successfully set the prefix to {{1}}", event, null, true)).replace("{{1}}", text), event.threadID, event.messageID)
}