import fs from 'fs';
import axios from 'axios';
import moment from 'moment-timezone'
export const setup = {
  name: "github",
  version: "40.0.0",
  permission: "Users",
  creator: "John Lester",
  description: "Get username info from github",
  category: "Info",
  usages: ["[username]"],
  mainScreenshot: ["/media/github/screenshot/main.jpg"],
  screenshot: ["/media/github/screenshot/main.jpg"],
  cooldown: 10,
  isPrefix: true
};
export const domain = {"github": setup.name}
export const execCommand = async function({api, event, key, kernel, umaru, args, keyGenerator, prefix, usage, context,   translate}) {
  try {
  let text = args.join(" ");
  if(!text) return usage(this, prefix, event);
  let { data } = await axios.get("https://api.github.com/users/"+text);
  let msg = `❯ Name: ${(data.name) ? data.name: "Not found"}\n❯ Username: ${data.login}\n❯ ID: ${data.id}\n❯ Bio: ${(data.bio) ? data.bio: "Not found"}\n❯ Public repos: ${data.public_repos}\n❯ Followers: ${data.followers}\n❯ Following: ${data.following}\n❯ Link: ${data.html_url}\n❯ Created: ${moment.utc(data.created_at).format("LL")}\n❯ Updated: ${moment.utc(data.updated_at).format("LL")}`;
  await umaru.createJournal(event);
  let img = (await axios.get(data.avatar_url, {responseType: "stream"})).data;
  let path = umaru.sdcard+"/Pictures/"+keyGenerator()+".jpg";
  await kernel.writeStream(path, img);
  return api.sendMessage({body: context+msg, attachment: fs.createReadStream(path)}, event.threadID, async() => {
    await umaru.deleteJournal(event);
    await fs.promises.unlink(path);
  }, event.messageID);
  } catch (e) {
    if(e.response.data.hasOwnProperty("message")) {
      return api.sendMessage((await translate("⚠️ The user was not found. Please provide a valid username.", event, null, true)), event.threadID, event.messageID);
    } else {
      return api.sendMessage((await translate("⚠️ An error occurred", event, null, true)), event.threadID, event.messageID)
    }
  }
}