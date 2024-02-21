import fs from 'fs';
export const setup = {
  name: "lolavatar2",
  version: "40.0.0",
  permission: "Users",
  creator: "John Lester",
  description: "Create Avatar League of Legends by name - Avatar LOL",
  category: "Avatar Generation",
  usages: ["[text]"],
  mainScreenshot: ["/media/lolavatar2/screenshot/main.jpg"],
  screenshot: ["/media/lolavatar2/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"lolavatar2": setup.name}
export const execCommand = async function({api, event, key, kernel, umaru, args, keyGenerator, Users, context}) {
  await umaru.createJournal(event);
  let text = args.join(" ");
  if(args.length === 0) text = await Users.getName(event.senderID);
  let image = await kernel.readStream(["lolavatar2"], {key: key, text: text});
  let path = umaru.sdcard + "/Pictures/"+keyGenerator()+".jpg";
  await kernel.writeStream(path, image);
  return api.sendMessage({body: context, attachment: fs.createReadStream(path)}, event.threadID, async() => {
    await umaru.deleteJournal(event);
    await fs.promises.unlink(path);
  }, event.messageID)
}