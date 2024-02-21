import fs from 'fs';
export const setup = {
  name: "pokemon",
  version: "40.0.0",
  permission: "Users",
  creator: "John Lester",
  description: "Create a pokemon text effect",
  category: "Text Generation",
  usages: ["[text]"],
  mainScreenshot: ["/media/pokemon/screenshot/main.jpg"],
  screenshot: ["/media/pokemon/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"pokemon": setup.name}
export const execCommand = async function({api, event, key, kernel, umaru, args, keyGenerator, Users, context}) {
  await umaru.createJournal(event);
  let text = args.join(" ");
  if(args.length === 0) text = await Users.getName(event.senderID);
  let image = await kernel.readStream(["pokemon"], {key: key, text: text});
  let path = umaru.sdcard + "/Pictures/"+keyGenerator()+".jpg";
  await kernel.writeStream(path, image);
  return api.sendMessage({body: context, attachment: fs.createReadStream(path)}, event.threadID, async() => {
    await umaru.deleteJournal(event);
    await fs.promises.unlink(path);
  }, event.messageID)
}