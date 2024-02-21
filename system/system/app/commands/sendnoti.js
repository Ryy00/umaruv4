import axios from "axios";
import fs from "fs";
export const setup = {
  name: "sendnoti",
  version: "40.0.0",
  permission: "Admin",
  creator: "John Lester",
  description: "Send notification to all threads",
  category: "admin",
  usages: ["[text]"],
  cooldown: 10,
  isPrefix: true
};
export const domain = {"sendnoti": setup.name};
export const execCommand = async function({api, event, args, umaru, Users,kernel, keyGenerator, usage, prefix}) {
  if(args.length === 0) return usage(this, prefix, event);
  let attachment = [];
  let attachmentPath = [];
  let error = 0;
  let success = 0;
  let name = (umaru.config.Anonymous == true) ? "Anonymous" : await Users.getName(event.senderID);
  if(event.type == "message_reply" && event.messageReply.attachments.length !== 0 && event.messageReply.attachments[0].type !== "sticker") {
    for(const item of event.messageReply.attachments) {
      let extension = (item.type == "photo") ? ".jpg" : (item.type == "video") ? ".mp4": (item.type == "audio") ? ".mp3": (item.type == "animated_image") ? ".gif": "";
      let path = umaru.sdcard+"/Download/"+keyGenerator()+extension;
      let data = (await axios.get(item.url, {responseType: "stream"})).data;
      await kernel.writeStream(path, data);
      attachment.push(fs.createReadStream(path));
      attachmentPath.push(path);
    }
  }
  let msg = (attachment.length === 0) ? `✨ Notification from ${name}\n\n${args.join(" ")}`: {body: `✨ Notification from ${name}\n\n${args.join(" ")}`, attachment: attachment};

  for(const item of umaru.allThreadID) {
    if(item !== event.threadID && event.type == "message_reply" && event.messageReply.attachments.length !== 0 && event.messageReply.attachments[0].type == "sticker") {
      await new Promise((resolve) => {
      api.sendMessage(msg, item, () => {
        api.sendMessage({sticker: event.messageReply.attachments[0].stickerID}, item, (e) => {
          if(e) {
            error += 1;
            return resolve();
          }
          success += 1;
          resolve();
        })
      })
      })
      } else if(item !== event.threadID) {
    await new Promise((resolve) => {
    api.sendMessage(msg, item, (e) => {
      if(e) {
        error += 1;
        return resolve();
      }
      success += 1;
      resolve();
    })
    })
    } 
    await new Promise((resolve) => setTimeout(resolve, 600));
  }
  return api.sendMessage(`Sent message to ${success} thread!`, event.threadID,async() => {
    if(error !== 0) {
      api.sendMessage(`[!] Can't send message to ${error} thread`, event.threadID, event.messageID) 
    }
    for(const item of attachmentPath) {
      await fs.promises.unlink(item);
    }
  }, event.messageID);
}
