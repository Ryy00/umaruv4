import fs from 'fs';
export const setup = {
  name: "cardcute",
  version: "40.0.0",
  permission: "Users",
  creator: "D-Jukie, Lê Định, John Lester",
  description: "Create a facebook user information card",
  category: "Info",
  usages: ["", "[@mention]", "[uid]", "[fburl]"],
  mainScreenshot: ["/media/cardcute/screenshot/main.jpg"],
  screenshot: ["/media/cardcute/screenshot/1.jpg", "/media/cardcute/screenshot/2.jpg", "/media/cardcute/screenshot/3.jpg"],
  cooldown: 30,
  isPrefix: true
};
export const domain = {"cardcute": setup.name}
export const execCommand = async function({api, event, key, kernel, umaru, args, keyGenerator, Users, Threads, getUsers, context}) {
  let mentions = Object.keys(event.mentions);
  (event.attachments.length !== 0 && event.attachments[0].type == "share" &&  event.attachments[0].hasOwnProperty("target") && event.attachments[0].target.__typename == 'User' && event.attachments[0].target.hasOwnProperty("id")) ? mentions[0] = event.attachments[0].target.id:(mentions.length === 0 && /^[0-9]+$/.test(args[0])) ? mentions[0] = args[0]: (event.type == "message_reply") ? mentions[0] = event.messageReply.senderID : (mentions.length === 0) ? mentions[0] = event.senderID:mentions[0] = mentions[0];
  await umaru.createJournal(event);
  let image = await kernel.readStream(["cardcute"], { key: key, uid: mentions[0], info: await Users.getInfoV2(mentions[0]), av1: await Users.getImage(mentions[0])})
  let path = umaru.sdcard + "/Pictures/"+keyGenerator()+".jpg";
  await kernel.writeStream(path, image);
  return api.sendMessage({body: context, attachment: fs.createReadStream(path)}, event.threadID, async() => {
    await umaru.deleteJournal(event);
    await fs.promises.unlink(path);
  }, event.messageID)
}