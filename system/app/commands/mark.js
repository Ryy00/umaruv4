import fs from 'fs';
export const setup = {
  name: "mark",
  version: "40.0.0",
  permission: "Users",
  creator: "MewMew, hungdz30cm, John Lester",
  description: "Comment on the board ( ͡° ͜ʖ ͡°)",
  category: "edit-img",
  usages: ["[text]"],
  mainScreenshot: ["/media/mark/screenshot/main.jpg"],
  screenshot: ["/media/mark/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"mark": setup.name}
export const execCommand = async function({api, event, key, kernel, args, umaru, keyGenerator, context,   prefix, usage}) {
  let text = args.join(" ");
  if (!text) return usage(this, prefix, event);
  await umaru.createJournal(event);
  let image = await kernel.readStream(["mark"], {key: key, text: text});
  let path = umaru.sdcard + "/Pictures/"+keyGenerator()+".jpg";
  await kernel.writeStream(path, image);
  return api.sendMessage({body: context, attachment: fs.createReadStream(path)}, event.threadID, async() => {
    await umaru.deleteJournal(event);
    await fs.promises.unlink(path);
  }, event.messageID)
}