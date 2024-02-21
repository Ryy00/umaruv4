import fs from 'fs';
export const setup = {
  name: "aovavatar",
  version: "40.0.0",
  permission: "Users",
  creator: "John Lester",
  description: "Create a new avatar ROV(AOV) by name",
  category: "Avatar Generation",
  usages: ["[text]"],
  mainScreenshot: ["/media/aovavatar/screenshot/main.jpg"],
  screenshot: ["/media/aovavatar/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"aovavatar": setup.name}
export const execCommand = async function({api, event, key, kernel, umaru, args, keyGenerator, Users, context}) {
  await umaru.createJournal(event);
  let text = args.join(" ");
  if(args.length === 0) text = await Users.getName(event.senderID);
  let image = await kernel.readStream(["aovavatar"], {key: key, text: text});
  let path = umaru.sdcard + "/Pictures/"+keyGenerator()+".jpg";
  await kernel.writeStream(path, image);
  return api.sendMessage({body: context, attachment: fs.createReadStream(path)}, event.threadID, async() => {
    await umaru.deleteJournal(event);
    await fs.promises.unlink(path);
  }, event.messageID)
}