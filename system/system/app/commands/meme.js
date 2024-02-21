import fs from "fs";
import axios from "axios";
export const setup = {
  name: "meme",
  version: "40.0.0",
  permission: "Users",
  creator: "John Lester",
  description: "Random reddit memes",
  category: "media",
  usages: [""],
  cooldown: 5,
  isPrefix: true
}
export const domain = {"meme": setup.name};
export const execCommand = async function({api, event, kernel, key, umaru, keyGenerator}) {
  await umaru.createJournal(event);
  let data = await kernel.read(["reddit"], {key: key});
  let image = await axios.get(data.url, {responseType:"stream"});
  let path = umaru.sdcard+"/Pictures/"+keyGenerator()+".jpg";
  await kernel.writeStream(path, image.data);
  return api.sendMessage({body: data.title+"\n"+data.caption, attachment: fs.createReadStream(path)}, event.threadID, async () => {
    await umaru.deleteJournal(event);
    await fs.promises.unlink(path);
  }, event.messageID)
}