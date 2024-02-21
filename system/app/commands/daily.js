export const setup = {
  name: "daily",
  version: "40.0.0",
  permission: "Users",
  creator: "John Lester",
  description: "Every day, you will receive 19011310000 coins!",
  category: "Economy",
  usages: [""],
  cooldown: 10,
  isPrefix: true
};
export const domain = {"daily": setup.name}
export const execCommand = async function({api, event, umaru, args, translate}) {
  let t = 43200000;
  if(!umaru.data.users[event.senderID]) {
    umaru.data.users[event.senderID] = {};
    umaru.data.users[event.senderID].money = 0;
  }
  if(umaru.data.users[event.senderID] && umaru.data.users[event.senderID].cooldownTime && t - (Date.now() - umaru.data.users[event.senderID].cooldownTime) > 0) {
    let time = t- (Date.now() - umaru.data.users[event.senderID].cooldownTime);
    let seconds = Math.floor( (time/1000) % 60 );
    let minutes = Math.floor( (time/1000/60) % 60 );
    let hours = Math.floor( (time/(1000*60*60)) % 24 );
    return api.sendMessage((await translate("✨ You have received your rewards for today. Please return in {{3}} hour, {{1}} minutes, and {{2}} seconds.", event, null, true)).replace("{{1}}", minutes).replace("{{2}}", seconds).replace("{{3}}", hours), event.threadID, event.messageID);
  } else {
    let reward = 19011310000;
    umaru.data.users[event.senderID].money += reward;
    umaru.data.users[event.senderID].cooldownTime = Date.now();
    await umaru.save();
    return api.sendMessage((await translate("💵 You were given ${{1}}. Please try again in 12 hours if you want to continue receiving.", event, null, true)).replace("{{1}}", reward), event.threadID, event.messageID);
  }
}