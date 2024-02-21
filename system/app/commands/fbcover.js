import fs from 'fs';
export const setup = {
  name: "fbcover",
  version: "40.0.0",
  permission: "Users",
  creator: "John Lester",
  description: "Create a custom facebook cover.",
  category: "Info",
  usages: [""],
  mainScreenshot: ["/media/fbcover/screenshot/1.jpg", "/media/fbcover/screenshot/2.jpg"],
  screenshot: ["/media/fbcover/screenshot/1.jpg", "/media/fbcover/screenshot/2.jpg"],
  cooldown: 30,
  isPrefix: true
};
export const domain = {"fbcover": setup.name}
export const execCommand = async function({api, event, key, kernel, umaru, args, keyGenerator, Users, getUsers, context, reply, translate}) {
  let { ID } = await reply.read({
      name: this.setup.name,
      author: event.senderID
  });
  if(typeof ID === "string") api.unsendMessage(ID);
  let msg = `『  𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸 𝗰𝗼𝘃𝗲𝗿 𝗳𝗼𝗿𝗺  』\n\n❯ Name:\n❯ Subname:\n❯ Number:\n❯ Address:\n❯ Email: \n❯ Color:\n\n` + (await translate("» Fill out this form and then reply.", event, null, true));
  return api.sendMessage(msg, event.threadID, async (err, info) => {
      let ctx = {
          name: this.setup.name,
          author: event.senderID,
          ID: info.messageID
      }
      await reply.create(ctx);
  }, event.messageID)
}
export const execReply = async function({api, args, kernel, key, event, reply,   umaru, keyGenerator, translate, Users, context}) {
  let ctx = {
    name: this.setup.name,
    author: event.senderID
  }
  let { data } = await reply.read(ctx);
  let { ID } = await reply.read(ctx);
  api.unsendMessage(ID);
  let form = event.body.split(/\n+/).map(a => a = a.replace(/❯(.*?):/g, "").trim());
  let none = "N/A";
  let name = (form[1]) ? form[1]:none;
  let subname = (form[2]) ? form[2]:none;
  let num = (form[3]) ? form[3]:none;
  let address = (form[4]) ? form[4]:none;
  let email = (form[5]) ? form[5]:none;
  let color = (form[6]) ? form[6]:"White";
  await umaru.createJournal(event);
  let image = await kernel.readStream(["fbcover"], { key: key, avt: await Users.getImage(event.senderID), name: name, subname: subname, number: num, address: address, email: email, color: color});
  let path = umaru.sdcard + "/Pictures/"+keyGenerator()+".jpg";
  await kernel.writeStream(path, image);
  return api.sendMessage({body: context+`❯ Name: ${name}\n❯ Subname: ${subname}\n❯ Number: ${num}\n❯ Address: ${address}\n❯ Email: ${email}\n❯ Color: ${color}`, attachment: fs.createReadStream(path)}, event.threadID, async() => {
    await umaru.deleteJournal(event);
    await fs.promises.unlink(path);
  })
}