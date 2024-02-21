import fs from 'fs';
export const setup = {
  name: "metal",
  version: "40.0.0",
  permission: "Users",
  creator: "John Lester",
  description: "Create 3d metallic text with details",
  category: "Text Generation",
  usages: ["[text]"],
  mainScreenshot: ["/media/metal/screenshot/main.jpg"],
  screenshot: ["/media/metal/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"metal": setup.name}
export const execCommand = async function({api, event, key, kernel, umaru, args, keyGenerator, Users, context}) {
  await umaru.createJournal(event);
  let text = args.join(" ");
  if(args.length === 0) text = await Users.getName(event.senderID);
  let image = await kernel.readStream(["metal"], {key: key, text: text});
  let path = umaru.sdcard + "/Pictures/"+keyGenerator()+".jpg";
  await kernel.writeStream(path, image);
  return api.sendMessage({body: context, attachment: fs.createReadStream(path)}, event.threadID, async() => {
    await umaru.deleteJournal(event);
    await fs.promises.unlink(path);
  }, event.messageID)
}