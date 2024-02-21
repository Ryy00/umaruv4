export const setup = {
  name: "fish",
  version: "40.0.0",
  permission: "Users",
  creator: "John Lester",
  description: "Fish",
  category: "Economy",
  usages: [""],
  mainScreenshot: ["/media/fish/screenshot/main.jpg"],
  screenshot: ["/media/fish/screenshot/main.jpg"],
  cooldown: 10,
  isPrefix: true
};
export const domain = {"fish": setup.name}
export const execCommand = async function({api, event, umaru, args, translate}) {
  let t = 1000000;
  if(!umaru.data.users[event.senderID]) {
    umaru.data.users[event.senderID] = {};
    umaru.data.users[event.senderID].money = 0;
  }
  if(umaru.data.users[event.senderID] && umaru.data.users[event.senderID].workTime && t - (Date.now() - umaru.data.users[event.senderID].workTime) > 0) {
        let time = t- (Date.now() - umaru.data.users[event.senderID].workTime);
        let minutes = Math.floor(time / 20000)
        let seconds = ((time % 20000) / 500).toFixed(0);
    return api.sendMessage((await translate("✨ You put in some effort today. Please return after {{1}} minute and {{2}} seconds to avoid exhaustion.", event, null, true)).replace("{{1}}", minutes).replace("{{2}}", seconds), event.threadID, event.messageID);
  } else {
    let money = Math.floor(Math.random() * 9999999)
    umaru.data.users[event.senderID].money += money;
    umaru.data.users[event.senderID].workTime = Date.now();
    await umaru.save();
    return api.sendMessage((await translate("💵 You had big fish again today, and they were sold for: ${{1}}.", event, null, true)).replace("{{1}}", money), event.threadID, event.messageID);
  }
}