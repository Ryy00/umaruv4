import fs from 'fs';
export const setup = {
  name: "infogroup",
  version: "40.0.0",
  permission: "Users",
  creator: "D-Jukie, John Lester",
  description: "Create a group information card",
  category: "Info",
  usages: ["", "[text]"],
  mainScreenshot: ["/media/infogroup/screenshot/main.jpg"],
  screenshot: ["/media/infogroup/screenshot/main.jpg"],
  cooldown: 30,
  isPrefix: true
};
export const domain = {"infogroup": setup.name}
export const execCommand = async function({api, event, key, kernel, umaru, args, keyGenerator, Users, Threads, getUsers, context}) {
  let text = args.join(" ");
  let data = await getUsers(event.threadID);
  let m = [];
  let f = [];
  let n = [];
  let admin = [];
  for(const item in data) {
    if(data[item].gender === "MALE") {
        m.push(item)
    } else if(data[item].gender === "FEMALE") {
        f.push(item);
    } else {
        n.push(item);
    }
    if(data[item].lastActive === "Administrator") {
        admin.push(item)
    }
  }
  await umaru.createJournal(event);
  let image = await kernel.readStream(["infogroup"], { key: key, m: m, f: f, n: n, participants: event.participantIDs, admin: admin, messageCount: umaru.data.threads[event.threadID].messageCount, av1: await Users.getImage(admin[Math.floor(Math.random() * admin.length)]), av2: await Users.getImage(event.participantIDs[Math.floor(Math.random() * event.participantIDs.length)]), av3: await Users.getImage(event.participantIDs[Math.floor(Math.random() * event.participantIDs.length)]), tav1: await Threads.getImage(event.threadID), threadName: await Threads.getName(event.threadID), text: text})
  let path = umaru.sdcard + "/Pictures/"+keyGenerator()+".jpg";
  await kernel.writeStream(path, image);
  return api.sendMessage({body: context, attachment: fs.createReadStream(path)}, event.threadID, async() => {
    await umaru.deleteJournal(event);
    await fs.promises.unlink(path);
  }, event.messageID)
}