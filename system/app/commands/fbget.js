import fs from 'fs';
import axios from 'axios';
export const setup = {
  name: "fbget",
  version: "40.0.0",
  permission: "Users",
  creator: "John Lester",
  description: "Get a facebook video and audio",
  category: "media",
  usages: ["video [fburl]", "audio [fburl]"],
  mainScreenshot: ["/media/fbget/screenshot/1.jpg", "/media/fbget/screenshot/2.jpg"],
  screenshot: ["/media/fbget/screenshot/1.jpg", "/media/fbget/screenshot/2.jpg"],
  cooldown: 10,
  isPrefix: true
};
export const domain = {"fbget": setup.name}
export const execCommand = async function({api, event, kernel, umaru, args, keyGenerator, context,   prefix, usage, translate}) {
    try {
      let choice = (typeof args[0] === "string" && event.attachments[0] &&  event.attachments[0].type == "share" && event.attachments[0].playableUrl) ? args[0].toLowerCase(): "";
      
      if(choice == "video") {
        api.sendMessage("⏳ Processing request, please wait...", event.threadID, event.messageID);
        await umaru.createJournal(event);
        let video = (await axios.get(event.attachments[0].playableUrl, { responseType: "stream" })).data;
        let path = umaru.sdcard+"/Download/"+keyGenerator()+".mp4";
        let msg = `❯ Title: ${event.attachments[0].title}\n❯ Description: ${event.attachments[0].description}\n❯ Author: ${event.attachments[0].source}`;
        await kernel.writeStream(path, video);
        let size = await kernel.size(path);
        if(size >= 25) {
          await fs.promises.unlink(path);
          await umaru.deleteJournal(event);
          return api.sendMessage((await translate("⚠️ An error occurred: The file could not be sent because it was larger than 25MB.", event, null, true)), event.threadID, event.messageID)
        }
        return api.sendMessage({body: context+msg, attachment: fs.createReadStream(path)}, event.threadID, async() => {
          await fs.promises.unlink(path);
          await umaru.deleteJournal(event);
        })
      } else if(choice == "audio") {
        api.sendMessage("⏳ Processing request, please wait...", event.threadID, event.messageID);
        await umaru.createJournal(event);
        let audio = (await axios.get(event.attachments[0].playableUrl, { responseType: "stream" })).data;
        let path = umaru.sdcard+"/Download/"+keyGenerator()+".mp3";
        let msg = `❯ Title: ${event.attachments[0].title}\n❯ Description: ${event.attachments[0].description}\n❯ Author: ${event.attachments[0].source}`;
        await kernel.writeStream(path, audio);
        let size = await kernel.size(path);
        if(size >= 25) {
          await fs.promises.unlink(path);
          await umaru.deleteJournal(event);
          return api.sendMessage((await translate("⚠️ An error occurred: The file could not be sent because it was larger than 25MB.", event, null, true)), event.threadID, event.messageID)
        }
        return api.sendMessage({body: context+msg, attachment: fs.createReadStream(path)}, event.threadID, async() => {
          await fs.promises.unlink(path);
          await umaru.deleteJournal(event);
        });
      } else {
        return usage(this, prefix, event);
      }
} catch (e) {
  await umaru.deleteJournal(event);
    return api.sendMessage((await translate("⚠️ An error occurred", event, null, true)), event.threadID, event.messageID)
}
}