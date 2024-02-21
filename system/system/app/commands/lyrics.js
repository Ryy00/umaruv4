import fs from 'fs';
import axios from 'axios';
export const setup = {
  name: "lyrics",
  version: "40.0.0",
  permission: "Users",
  creator: "John Lester",
  description: "Get a lyrics",
  category: "media",
  usages: ["[title]"],
  mainScreenshot: ["/media/lyrics/screenshot/main.jpg"],
  screenshot: ["/media/lyrics/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"lyrics": setup.name}
export const execCommand = async function({api, event, key, kernel, umaru, args, keyGenerator, context,   prefix, usage, translate}) {
    try {
        if(args.length === 0) return usage(this, prefix, event)
  let text = args.join(" ");
  (event.attachments.length !== 0 && event.attachments[0].type == "share" && event.attachments[0].hasOwnProperty('title')) ? text = event.attachments[0].title: ""; 
  await umaru.createJournal(event);
  let data = await kernel.read(["lyrics"], {key: key, title: text});
  if(data && data.error) return api.sendMessage((await translate("⚠️ An error occurred:", event, null, true))+" "+data.error, event.threadID, event.messageID);
  let msg = `🎵 Title: ${data.title}\n👤 Artist: ${data.artist}\n🎼 Lyrics: ${data.lyrics}`;
  let path = umaru.sdcard+"/Pictures/"+keyGenerator()+".jpg";
  return api.sendMessage({body: context+msg}, event.threadID, async(e) => {
    await umaru.deleteJournal(event);
  }, event.messageID)
} catch (e) {
  await umaru.deleteJournal(event);
    return api.sendMessage((await translate("⚠️ An error occurred", event, null, true)), event.threadID, event.messageID)
}
}