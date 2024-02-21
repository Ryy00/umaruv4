import fs from "fs";
export const setup = {
  name: "kanna",
  version: "40.0.0",
  permission: "Users",
  creator: "John Lester",
  description: "See pictures of baby dragons",
  category: "Image",
  usages: [""],
  cooldown: 5,
  isPrefix: true
}
export const domain = {"kanna": setup.name};
export const execCommand = async function({api, event, kernel, key, umaru, keyGenerator}) {
  await umaru.createJournal(event);
  let image = await kernel.readStream(["kanna"], {key: key});
  let path = umaru.sdcard+"/Pictures/"+keyGenerator()+".jpg";
  await kernel.writeStream(path, image);
  return api.sendMessage({body: "⚡️ Here's Kanna Photo", attachment: fs.createReadStream(path)}, event.threadID, async () => {
    await umaru.deleteJournal(event);
    await fs.promises.unlink(path);
  }, event.messageID)
}