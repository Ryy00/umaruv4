import fs from 'fs';
export const setup = {
  name: "presentation",
  version: "40.0.0",
  permission: "Users",
  creator: "John Lester",
  description: "Presentation text",
  category: "Image Generation",
  usages: [
    "[text]"
  ],
  mainScreenshot: ["/media/presentation/screenshot/main.jpg"],
  screenshot: ["/media/presentation/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"presentation": setup.name}
export const execCommand = async function({api, event, key, kernel, umaru, args, keyGenerator, prefix, context, usage}) {
  await umaru.createJournal(event);
  if(args.length === 0) return usage(this, prefix, event);
  let path = umaru.sdcard + "/Pictures/"+keyGenerator()+".jpg";
  let image = await kernel.readStream(["presentation"], {key: key, text: args.join(" ")});
  await kernel.writeStream(path, image);
  return api.sendMessage({body: context, attachment: fs.createReadStream(path)}, event.threadID, async() => {
    await umaru.deleteJournal(event);
    await fs.promises.unlink(path);
  }, event.messageID)
}