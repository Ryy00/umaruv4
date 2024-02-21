import fs from 'fs';
export const setup = {
  name: "delete",
  version: "40.0.0",
  permission: "Users",
  creator: "John Lester",
  description: "Delete edit profile picture",
  category: "Image Generation",
  usages: ["","[uid]","[@mention]"],
  mainScreenshot: ["/media/delete/screenshot/main.jpg"],
  screenshot: ["/media/delete/screenshot/1.jpg","/media/delete/screenshot/2.jpg","/media/delete/screenshot/3.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"delete": setup.name}
export const execCommand = async function({api, event, key, kernel, umaru, args, keyGenerator, Users, context}) {
  await umaru.createJournal(event);
  let mentions = Object.keys(event.mentions);
  (mentions.length === 0 && /^[0-9]+$/.test(args[0])) ? mentions[0] = args[0]: (event.type == "message_reply" && event.messageReply.attachments.length !== 0 && event.messageReply.attachments[0].type == "photo") ? "" : (event.type == "message_reply") ? mentions[0] = event.messageReply.senderID : (mentions.length === 0) ? mentions[0] = event.senderID: mentions[0] = mentions[0];
  let image = await kernel.readStream(["delete"], {key: key, targetID: (event.type == "message_reply" && event.messageReply.attachments.length !== 0 && event.messageReply.attachments[0].type == "photo") ? await kernel.readImageFromURL(event.messageReply.attachments[0].url) :await Users.getImage(mentions[0])});
  let path = umaru.sdcard + "/Pictures/"+keyGenerator()+".jpg";
  await kernel.writeStream(path, image);
  return api.sendMessage({body: context, attachment: fs.createReadStream(path)}, event.threadID, async() => {
    await umaru.deleteJournal(event);
    await fs.promises.unlink(path);
  }, event.messageID)
}