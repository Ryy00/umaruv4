import fs from 'fs';
export const setup = {
  name: "bed",
  version: "40.0.0",
  permission: "Users",
  creator: "John Lester",
  description: "Bed",
  category: "Image Generation",
  usages: [
    "[uid]",
    "[@mention]",
    "[uid] [uid]",
    "[@mention] [@mention]"
  ],
  mainScreenshot: ["/media/bed/screenshot/main.jpg"],
  screenshot: ["/media/bed/screenshot/uid.jpg", "/media/bed/screenshot/mention.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"bed": setup.name}
export const execCommand = async function({api, event, key, kernel, umaru, args, keyGenerator, Users, prefix, context, usage}) {
  let mentions = Object.keys(event.mentions);
  if(mentions.length === 1) {mentions[1] = mentions[0]; mentions[0] = event.senderID;}
  if(args.length === 1 && /^[0-9]+$/.test(args[0])) {mentions[0] = event.senderID;mentions[1] = args[0];}
  if(args.length === 2 && /^[0-9]+$/.test(args[0]) && /^[0-9]+$/.test(args[1])) {mentions[0] = args[0]; mentions[1] = args[1];}
  if(event.isGroup == false) {mentions[0] = event.senderID;mentions[1] = api.getCurrentUserID();}
  if(event.isGroup == true && mentions.length === 0) return usage(this, prefix, event);
  await umaru.createJournal(event);
  let path = umaru.sdcard + "/Pictures/"+keyGenerator()+".jpg";
  let image = await kernel.readStream(["bed"], {key: key, senderID: await Users.getImage(mentions[0]), targetID: await Users.getImage(mentions[1])});
  await kernel.writeStream(path, image);
  return api.sendMessage({body: context, attachment: fs.createReadStream(path)}, event.threadID, async() => {
    await umaru.deleteJournal(event);
    await fs.promises.unlink(path);
  }, event.messageID)
}