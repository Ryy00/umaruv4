import fs from 'fs';
import axios from 'axios';
export const setup = {
  name: "movieinfo",
  version: "40.0.0",
  permission: "Users",
  creator: "John Lester",
  description: "Get a movie info",
  category: "media",
  usages: ["[title]"],
  mainScreenshot: ["/media/movieinfo/screenshot/main.jpg"],
  screenshot: ["/media/movieinfo/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"movieinfo": setup.name}
export const execCommand = async function({api, event, key, kernel, umaru, args, keyGenerator, context,   prefix, usage, translate}) {
  if(args.length === 0) return usage(this, prefix, event);
  let text = args.join(" ");
  await umaru.createJournal(event);
  let data = "";
  try {
  data = await kernel.read(["movieinfo"], {key: key, search: text});
  } catch {
    await umaru.deleteJournal(event);
  }
  if(typeof data === "string") return api.sendMessage("⚠️ "+data, event.threadID, event.messageID);
  let msg = (await translate(`🌸 Title: {{1}}\n🌸 Language: {{2}}\n🌸 Overview: {{3}}\n🌸 Release date: {{4}}\n🌸 Popularity: {{5}}\n🌸 Vote average: {{6}}\n🌸 Vote count: {{7}}`, event, null, true)).replace("{{1}}", data.original_title).replace("{{2}}", data.original_language).replace("{{3}}", data.overview).replace("{{4}}", data.release_date).replace("{{5}}", data.popularity).replace("{{6}}", data.vote_average).replace("{{7}}", data.vote_count);
  try {
  let img = (await axios.get(data.imageBase+data.poster_path, {responseType: "stream"})).data;
  let path = umaru.sdcard+"/Pictures/"+keyGenerator()+".jpg";
  await kernel.writeStream(path, img);
  return api.sendMessage({body: context+msg, attachment: fs.createReadStream(path)},event.threadID,async (err) => {
    if(err) api.sendMessage(context+msg, event.threadID, event.messageID);
    await umaru.deleteJournal(event);
    await fs.promises.unlink(path);
  }, event.messageID)
  } catch {
    await umaru.deleteJournal(event);
    api.sendMessage(context+msg, event.threadID, async() => {
      await umaru.deleteJournal(event);
    },event.messageID);
  }
}