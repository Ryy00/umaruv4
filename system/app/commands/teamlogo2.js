import fs from 'fs';
export const setup = {
  name: "teamlogo2",
  version: "40.0.0",
  permission: "Users",
  creator: "John Lester",
  description: "Create logo, Team logo",
  category: "Logo Generation",
  usages: ["[text] | [text]"],
  mainScreenshot: ["/media/teamlogo2/screenshot/main.jpg"],
  screenshot: ["/media/teamlogo2/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"teamlogo2": setup.name}
export const execCommand = async function({api, event, key, kernel, umaru, args, keyGenerator, Users, context,   prefix, usage}) {
  let text = args.join(" ");
  let text1 = "";
  let text2 = "";
  if(text.includes("|")) {
    text1 = text.split("|")[0].trim();
    text2 = text.split("|")[1].trim();
  } else if(args.length === 0) {
    text = (await Users.getName(event.senderID)).split(" ");
    text1 = text[0];
    text2 = text[1];
  } else {
    return usage(this, prefix, event);
  }
  await umaru.createJournal(event);
  let image = await kernel.readStream(["teamlogo2"], {key: key, text1: text1, text2: text2});
  let path = umaru.sdcard + "/Pictures/"+keyGenerator()+".jpg";
  await kernel.writeStream(path, image);
  return api.sendMessage({body: context, attachment: fs.createReadStream(path)}, event.threadID, async() => {
    await umaru.deleteJournal(event);
    await fs.promises.unlink(path);
  }, event.messageID)
}