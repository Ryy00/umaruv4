import fs from "fs";
export const setup = {
  name: "pair",
  version: "40.0.0",
  permission: "Users",
  creator: "John Lester",
  description: "pairing someone",
  category: "love",
  usages: "[words]",
  cooldown: 10,
  isPrefix: true
}
export const execCommand = async function({api, event, key, args, Users, translate, Threads, umaru}) {
  if(event.isGroup == false) return api.sendMessage(`⚠️ This command is only allowed in group.`, event.threadID, event.messageID)
  await umaru.createJournal(event)
  const UsersData = await Threads.getUsers(event.threadID);
  let gender = await Users.getGender(event.senderID);
  let cons = (args.length !== 0) ? args.join(" ").toLowerCase(): "";
  let gen = [];
 for (const item in UsersData) {
   if(umaru.data['users'][item] && umaru.data['users'][item]['name'] && umaru.data['users'][item]['name'].toLowerCase() === "facebook user") continue;
   if(args.length !== 0 && ["boy", "men", "lalaki", "lalake"].some(a => cons.includes(a)) && (umaru.data['users'].hasOwnProperty(item) && UsersData[item]['gender'] == "MALE")) {
         gen.push(item)
   } else if(args.length !== 0 && ["girl", "women", "woman", "eabab", "babae"].some(a => cons.includes(a)) && (umaru.data['users'].hasOwnProperty(item) && UsersData[item]['gender'] == "FEMALE")) {
         gen.push(item)
   } else if(args.length !== 0) {
  for (const itemss of args.map(a=>a.replace(/\p{Emoji}/gu, "")).filter(a  => a !== '')) {
    if (itemss.length !== 2 && (umaru.data['users'].hasOwnProperty(item) && umaru.data['users'][item]['name'].toLowerCase().startsWith(itemss.toLowerCase())) || (umaru.data['users'].hasOwnProperty(item) && umaru.data['users'][item]['name'].toLowerCase().endsWith(itemss.toLowerCase()))) {
      gen.push(item)
    }
  }
   } else if (gender == "FEMALE" && UsersData[item]['gender'] == "MALE") {
    gen.push(item);
  } else if (gender == "MALE" && UsersData[item]['gender'] == "FEMALE") {
    gen.push(item);
  } else if(typeof gender !== "undefined" && event.senderID !== item) {
     gen.push(item);
  } else {
     gen.push(item);
  }
}
  let targetID = gen[Math.floor(Math.random() * gen.length)];
  let mentor = [];
  let love = [];
  let mal = await Users.getImage(event.senderID, "dir");
  let femal = await Users.getImage(targetID, "dir");
  love.push(fs.createReadStream(mal));
  love.push(fs.createReadStream(umaru.mainPath + "/media/pair/pair.png"))
  love.push(fs.createReadStream(femal));
  let name = await Users.getName(event.senderID);
  let name2 = await Users.getName(targetID);
  mentor.push({id: event.senderID, tag: name})
  mentor.push({id: targetID, tag: name2});
    let percent = `${(Math.random() * 100).toFixed(2)}%`;
    let words = `\n${args.join(" ")}`;
  return api.sendMessage({body: (await translate(`🥰 Successful pairing! {{1}}\n💌 I hope you enjoy life for 200 years.\n💕Double ratio: {{2}}\n {{3}} 💓 {{4}}`, event, null, true)).replace("{{1}}", (args.length === 0) ? "": words).replace("{{2}}",percent).replace("{{3}}",name).replace("{{4}}",name2), mentions: mentor, attachment: love}, event.threadID, async(err) => {
    await umaru.deleteJournal(event);
  }, event.messageID);
}