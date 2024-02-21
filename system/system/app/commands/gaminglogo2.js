import fs from 'fs';
export const setup = {
  name: "gaminglogo2",
  version: "40.0.0",
  permission: "Users",
  creator: "John Lester",
  description: "Create a gaming mascot logo",
  category: "Logo Generation",
  usages: ["[text]"],
  mainScreenshot: ["/media/gaminglogo2/screenshot/main.jpg"],
  screenshot: ["/media/gaminglogo2/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"gaminglogo2": setup.name}
export const execCommand = async function({api, event, key, kernel, umaru, args, keyGenerator, Users, context}) {
  await umaru.createJournal(event);
  let text = args.join(" ");
  if(args.length === 0) text = await Users.getName(event.senderID);
  let image = await kernel.readStream(["gaminglogo2"], {key: key, text: text});
  let path = umaru.sdcard + "/Pictures/"+keyGenerator()+".jpg";
  await kernel.writeStream(path, image);
  return api.sendMessage({body: context, attachment: fs.createReadStream(path)}, event.threadID, async() => {
    await umaru.deleteJournal(event);
    await fs.promises.unlink(path);
  }, event.messageID)
}