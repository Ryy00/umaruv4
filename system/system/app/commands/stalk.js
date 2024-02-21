import fs from 'fs';
import axios from 'axios';
export const setup = {
    name: "stalk",
    version: "40.0.0",
    permission: "Users",
    creator: "John Lester",
    description: "View a facebook user information",
    category: "Info",
    usages: ["", "[@mention]", "[uid]", "[fburl]"],
    cooldown: 5,
    isPrefix: true
  };
  export const domain = {"stalk": setup.name}
  export const execCommand = async function({api, event, args, umaru, kernel, Users, keyGenerator}) {
    let mentions = Object.keys(event.mentions);
    (event.attachments.length !== 0 && event.attachments[0].type == "share" &&  event.attachments[0].hasOwnProperty("target") && event.attachments[0].target.__typename == 'User' && event.attachments[0].target.hasOwnProperty("id")) ? mentions[0] = event.attachments[0].target.id:(mentions.length === 0 && /^[0-9]+$/.test(args[0])) ? mentions[0] = args[0]: (event.type == "message_reply") ? mentions[0] = event.messageReply.senderID : (mentions.length === 0) ? mentions[0] = event.senderID:mentions[0] = mentions[0];
    let info = await Users.getInfoV2(mentions[0]);
    let view = `❯ Name: ${info.name}\n❯ ID: ${info.id}\n❯ Birthday: ${info.birthday}\n❯ Age: ${info.age}\n❯ Gender: ${info.gender.replace(info.gender[0], info.gender[0].toUpperCase())}\n❯ Hometown: ${info.hometown}\n❯ Location: ${info.location}\n❯ Relationship: ${info.relationship_status}${(info.love && info.love.name) ? `\n❯ ${info.relationship_status} with ${info.love.name}`:""}\n❯ Followers: ${info.follow}\n❯ Link: ${info.link}`;
    let path = umaru.sdcard+"/Pictures/"+keyGenerator()+".jpg";
    try {
    let { data } = await axios.get(`https://graph.facebook.com/${info.id}/picture?width=1500&height=1500&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, {responseType: "stream"});
    await kernel.writeStream(path, data);
    return api.sendMessage({body: view, attachment: fs.createReadStream(path)}, event.threadID, async(err) => {
      if(err) return api.sendMessage({body: view}, event.threadID, event.messageID);
      await fs.promises.unlink(path);
    },event.messageID)
    } catch {
      return api.sendMessage({body: view}, event.threadID, event.messageID);
    }
  }