import fs from 'fs';
import axios from 'axios';
export const setup = {
  name: "pinterest",
  version: "40.0.0",
  permission: "Users",
  creator: "John Lester",
  description: "Search image through pinterest.",
  category: "media",
  usages: ["[text]","[text] - [number]"],
  cooldown: 60,
  isPrefix: true
};
export const domain = {"pinterest": setup.name}
export const execCommand = async function({api, event, key, kernel, umaru, args, keyGenerator, context,  prefix, usage, translate}) {
  if(args.length === 0) return usage(this, prefix, event);
  let text = args.join(" ");
  let search = text.split("-")[0];
  let num = text.split("-")[1];
  if(typeof num === "undefined") num = 6;
  let attachment = [];
  let attachmentPath = [];
  api.sendMessage(`🔎 Searching for ${search}...`, event.threadID, event.messageID);
  let data = await kernel.read(["pinterest"], { key: key, search: search, count: 10});
  data = data.slice(0, num);
  if(data.length === 0) {
    return api.sendMessage(`⚠️ Your search did not return any result.`, event.threadID, event.messageID)
  }
  for(const item of data) {
    try {
    let path = umaru.sdcard+"/Pictures/"+keyGenerator()+".jpg";
    let img = (await axios.get(item, {responseType: "stream"})).data;
    await kernel.writeStream(path, img);
    attachment.push(fs.createReadStream(path));
    attachmentPath.push(path);
    } catch {}
  }
  return api.sendMessage({body: `--------------------\nPinterest Search Result\n"${search}"\n\nFound: ${data.length} image${data.length > 1 ? 's' : ''}\nOnly showing: ${attachment.length} images\n\n--------------------`, attachment: attachment}, event.threadID,async () => {
    for(const item of attachmentPath) {
      await fs.promises.unlink(item);
    }
  }, event.messageID);
}