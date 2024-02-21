import fs from 'fs';
export const setup = {
  name: "black",
  version: "40.0.0",
  permission: "Users",
  creator: "John Lester",
  description: "Create a metallic text effect",
  category: "Text Generation",
  usages: ["[text]"],
  mainScreenshot: ["/media/black/screenshot/main.jpg"],
  screenshot: ["/media/black/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"black": setup.name}
export const execCommand = async function({api, event, key, kernel, umaru, args, keyGenerator, Users, context}) {
  await umaru.createJournal(event);
  let text = args.join(" ");
  if(args.length === 0) text = await Users.getName(event.senderID);
  let image = await kernel.readStream(["black"], {key: key, text: text});
  let path = umaru.sdcard + "/Pictures/"+keyGenerator()+".jpg";
  await kernel.writeStream(path, image);
  return api.sendMessage({body: context, attachment: fs.createReadStream(path)}, event.threadID, async() => {
    await umaru.deleteJournal(event);
    await fs.promises.unlink(path);
  }, event.messageID)
}