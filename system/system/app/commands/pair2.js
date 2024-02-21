import fs from "fs";
export const setup = {
  name: "pair2",
  version: "40.0.0",
  permission: "Users",
  creator: "Khoa, John Lester",
  description: "pairing someone",
  category: "love",
  usages: "[words]",
  cooldown: 10,
  isPrefix: true
}
export const execCommand = async function({api, event, key, args, Users, translate, Threads, umaru, kernel, keyGenerator, context}) {
  if(event.isGroup == false) return api.sendMessage(`⚠️ This command is only allowed in group.`, event.threadID, event.messageID)
    await umaru.createJournal(event)
    const UsersData = await Threads.getUsers(event.threadID);
    let gender = await Users.getGender(event.senderID);
    let cons = (args.length !== 0) ? args.join(" ").toLowerCase(): "";
    let gen = [];
   for (const item in UsersData) {
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
  let mentor = [];
  let targetID = gen[Math.floor(Math.random() * gen.length)];
  let name = await Users.getName(event.senderID);
  let name2 = await Users.getName(targetID);
  mentor.push({id: event.senderID, tag: name})
  mentor.push({id: targetID, tag: name2});
  let per = Math.round(Math.random() * 100);
  let image = await kernel.readStream(["pair2"], {key: key, avt1: await Users.getImage(event.senderID), avt2: await Users.getImage(targetID)});
  let path = umaru.sdcard + "/Pictures/"+keyGenerator()+".jpg";
  let percent = `${(Math.random() * 100).toFixed(2)}%`;
  await kernel.writeStream(path, image);
  return api.sendMessage({body: context+(await translate(`Congratulations! {{2}} has successfully paired with {{3}}.\nThe odds are {{1}}.`, event, null, true)).replace("{{1}}",percent).replace("{{2}}",name).replace("{{3}}",name2), attachment: fs.createReadStream(path), mentions: mentor}, event.threadID, async() => {
    await umaru.deleteJournal(event);
    await fs.promises.unlink(path);
  }, event.messageID)
}