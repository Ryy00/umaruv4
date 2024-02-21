import fs from 'fs';
export const setup = {
  name: "daden",
  version: "1.0.0",
  permission: "Users",
  creator: "BLACK, John Lester",
  description: "White brother :v",
  category: "edit-img",
  usages: ["[text] | [text]"],
  mainScreenshot: ["/media/daden/screenshot/main.jpg"],
  screenshot: ["/media/daden/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"daden": setup.name}
export const execCommand = async function({api, event, key, kernel, args, umaru, keyGenerator, context,   prefix, usage}) {
  const text = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|");
  if (!text) return usage(this, prefix, event);
  await umaru.createJournal(event);
  let image = await kernel.readStream(["daden"], {key: key, text: text});
  let path = umaru.sdcard + "/Pictures/"+keyGenerator()+".jpg";
  await kernel.writeStream(path, image);
  return api.sendMessage({body: context, attachment: fs.createReadStream(path)}, event.threadID, async() => {
    await umaru.deleteJournal(event);
    await fs.promises.unlink(path);
  }, event.messageID)
}