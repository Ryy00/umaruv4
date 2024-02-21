import fs from 'fs';
export const setup = {
  name: "lolcover3",
  version: "40.0.0",
  permission: "Users",
  creator: "John Lester",
  description: "Create a cover game League of Legends (LOL)",
  category: "Cover Generation",
  usages: ["[text]"],
  mainScreenshot: ["/media/lolcover3/screenshot/main.jpg"],
  screenshot: ["/media/lolcover3/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"lolcover3": setup.name}
export const execCommand = async function({api, event, key, kernel, umaru, args, keyGenerator, Users, context}) {
  await umaru.createJournal(event);
  let text = args.join(" ");
  if(args.length === 0) text = await Users.getName(event.senderID);
  let image = await kernel.readStream(["lolcover3"], {key: key, text: text});
  let path = umaru.sdcard + "/Pictures/"+keyGenerator()+".jpg";
  await kernel.writeStream(path, image);
  return api.sendMessage({body: context, attachment: fs.createReadStream(path)}, event.threadID, async() => {
    await umaru.deleteJournal(event);
    await fs.promises.unlink(path);
  }, event.messageID)
}