import fs from 'fs';
export const setup = {
  name: "drake",
  version: "1.0.0",
  permission: "Users",
  creator: "D-Jukie, John Lester",
  description: "drake",
  category: "edit-img",
  usages: ["[text] | [text]"],
  mainScreenshot: ["/media/drake/screenshot/main.jpg"],
  screenshot: ["/media/drake/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"drake": setup.name}
export const execCommand = async function({api, event, key, kernel, args, umaru, keyGenerator, context,   prefix, usage}) {
  if (args.length === 0) return usage(this, prefix, event);
   const text = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|");
   await umaru.createJournal(event);
  let image = await kernel.readStream(["drake"], {key: key, text: text});
  let path = umaru.sdcard + "/Pictures/"+keyGenerator()+".jpg";
  await kernel.writeStream(path, image);
  return api.sendMessage({body: context, attachment: fs.createReadStream(path)}, event.threadID, async() => {
    await umaru.deleteJournal(event);
    await fs.promises.unlink(path);
  }, event.messageID)
}