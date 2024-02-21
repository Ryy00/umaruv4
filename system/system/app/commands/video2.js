import fs from 'fs';
export const setup = {
  name: "video2",
  version: "40.0.0",
  permission: "Users",
  creator: "John Lester",
  description: "Get a video through youtube",
  category: "media",
  usages: ["[title]"],
  mainScreenshot: ["/media/video2/screenshot/main.jpg"],
  screenshot: ["/media/video2/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"video2": setup.name}
export const execCommand = async function({api, event, key, kernel, umaru, args, keyGenerator, context,   prefix, usage, translate}) {
    try {
        if(args.length === 0) return usage(this, prefix, event)
  let text = args.join(" ");
  api.sendMessage((await translate("🔍 Searching", event, null, true))+" "+text, event.threadID, event.messageID);
  (event.attachments.length !== 0 && event.attachments[0].type == "share" && event.attachments[0].hasOwnProperty('title')) ? text = event.attachments[0].title: ""; 
  let data = await kernel.read(["video"], {key: key, search: text, defaultLink: true});
  if(data && data.success == false) return api.sendMessage((await translate("⚠️ An error occurred:", event, null, true))+" "+data.msg, event.threadID, event.messageID);
      await umaru.createJournal(event);
  let video = await kernel.readStream(["getVideo"], {key: key, ID: data.ID, defaultLink: data.defaultLink});

  let path = umaru.sdcard + "/Download/"+keyGenerator()+".mp4";
  await kernel.writeStream(path, video)
  return api.sendMessage({body: context+data.title, attachment: fs.createReadStream(path)}, event.threadID, async(e) => {
    await umaru.deleteJournal(event);
    await fs.promises.unlink(path);
    if(e) return api.sendMessage((await translate("⚠️ An error occurred", event, null, true)), event.threadID, event.messageID)
  }, event.messageID)
} catch (e) {
  await umaru.deleteJournal(event);
    return api.sendMessage((await translate("⚠️ An error occurred", event, null, true)), event.threadID, event.messageID)
}
}