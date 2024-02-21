import fs from 'fs';
import axios from 'axios';
export const setup = {
  name: "animeinfo",
  version: "40.0.0",
  permission: "Users",
  creator: "John Lester",
  description: "Get a anime info",
  category: "media",
  usages: ["[title]"],
  mainScreenshot: ["/media/animeinfo/screenshot/main.jpg"],
  screenshot: ["/media/animeinfo/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"animeinfo": setup.name}
export const execCommand = async function({api, event, key, kernel, umaru, args, keyGenerator, context,   prefix, usage, translate}) {
  if(args.length === 0) return usage(this, prefix, event);
  let text = args.join(" ");
  await umaru.createJournal(event);
  let info = await kernel.read(["animeinfo"], {key: key, search: text});
   let data = info[0]
  if(typeof info === "string") {
    await umaru.deleteJournal(event);
    return api.sendMessage("⚠️ "+info, event.threadID, event.messageID);
  }
  let msg = (await translate(`🌸 Title: {{1}}\n🌸 Overview: {{2}}\n🌸 Release date: {{3}}\n🌸 Rating: {{4}}`, event, null, true)).replace("{{1}}", data.title).replace("{{2}}", data.shortDescription).replace("{{3}}", data.startDate).replace("{{4}}", data.score);
  try {
  let img = (await axios.get(data.thumbnail, {responseType: "stream"})).data;
  let path = umaru.sdcard+"/Pictures/"+keyGenerator()+".jpg";
  await kernel.writeStream(path, img);
  return api.sendMessage({body: context+msg, attachment: fs.createReadStream(path)},event.threadID,async (err) => {
    if(err) api.sendMessage(context+msg, event.threadID, event.messageID);
    await umaru.deleteJournal(event);
    await fs.promises.unlink(path);
  }, event.messageID)
  } catch {
    api.sendMessage(context+msg, event.threadID, async() => {
      await umaru.deleteJournal(event);
    },event.messageID);
  }
}