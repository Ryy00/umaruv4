import axios from "axios";
import fs from "fs";
export const setup = {
    name: "rank",
    version: "40.0.0",
    permission: "Users",
    creator: "John Lester",
    description: "View the rank card",
    category: "edit-img",
    usages: ["", "[uid]", "[@mention]"],
    cooldown: 30,
    isPrefix: true
};
export const domain = {"rank": setup.name}
export const execCommand = async function({api, event, kernel, Users, key, keyGenerator, umaru, args}) {
  await umaru.createJournal(event);
  let mentions = Object.keys(event.mentions);
  (mentions.length === 0 && /^[0-9]+$/.test(args[0])) ? mentions[0] = args[0]: (event.type == "message_reply" && event.messageReply.attachments.length !== 0 && event.messageReply.attachments[0].type == "photo") ? "" : (event.type == "message_reply") ? mentions[0] = event.messageReply.senderID : (mentions.length === 0) ? mentions[0] = event.senderID: mentions[0] = mentions[0];
  let c = await kernel.rankup({id: mentions[0], type: "download"});
  let background = [
    "https://i.ibb.co/pbWShcZ/66hjqtM.png"
  ]
  let bg = (await axios.get(background[Math.floor(Math.random() * background.length)], {responseType: "arraybuffer"})).data.toString("base64");
  let data = await kernel.readStream(["rank"], {key: key, level: parseInt(c.level), cXp: c.exp, nXp: c.nextExp, av: await Users.getImage(mentions[0]), username: await Users.getName(mentions[0]), bg: bg});
  let path = umaru.sdcard+"/Pictures/"+keyGenerator()+".png";
  await kernel.writeStream(path, data);
  return api.sendMessage({attachment: fs.createReadStream(path)}, event.threadID, async() => {
    await fs.promises.unlink(path);
    await umaru.deleteJournal(event);
  }, event.messageID)
}
