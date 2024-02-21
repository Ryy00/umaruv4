import fs from 'fs';
export const setup = {
  name: "whitegold",
  version: "40.0.0",
  permission: "Users",
  creator: "John Lester",
  description: "Elegant white gold 3D text effect",
  category: "Text Generation",
  usages: ["[text]"],
  mainScreenshot: ["/media/whitegold/screenshot/main.jpg"],
  screenshot: ["/media/whitegold/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"whitegold": setup.name}
export const execCommand = async function({api, event, key, kernel, umaru, args, keyGenerator, Users, context}) {
  await umaru.createJournal(event);
  let text = args.join(" ");
  if(args.length === 0) text = await Users.getName(event.senderID);
  let image = await kernel.readStream(["whitegold"], {key: key, text: text});
  let path = umaru.sdcard + "/Pictures/"+keyGenerator()+".jpg";
  await kernel.writeStream(path, image);
  return api.sendMessage({body: context, attachment: fs.createReadStream(path)}, event.threadID, async() => {
    await umaru.deleteJournal(event);
    await fs.promises.unlink(path);
  }, event.messageID)
}