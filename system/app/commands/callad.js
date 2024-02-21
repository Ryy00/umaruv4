import moment from "moment-timezone";
import axios from "axios";
import fs from "fs";
export const setup = {
  name: "callad",
  version: "40.0.0",
  permission: "Users",
  creator: "John Lester",
  description: "Report bot errors to admin or leave a comment.",
  category: "General",
  usages: ["[text]"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"callad": setup.name};
export const execCommand = async function({api, event, args, prefix, Users, umaru, translate, timeZone, Threads, reply, kernel, keyGenerator}) {
  if(args.length === 0) return api.sendMessage((await translate("You have not specified what you want to report 📋", event, null, true)), event.threadID, event.messageID)
  let name = await Users.getName(event.senderID);
  let group = await Threads.getName(event.threadID);
  let text = args.join(" ");
  let time = moment.tz(timeZone).format("LLLL");
  let attach = [];
  let attachPath = [];
  let msg = {};
  if(event.type == "message_reply" && event.messageReply.attachments.length !== 0)  {
    let type = event.messageReply.attachments[0].type;
    let ext = (type == "photo")?".jpg":(type == "video")?".mp4":(type == "audio")?".mp3":(type == "animated_image")?".gif":"";
    if(type !== "sticker") {
    for(const item of event.messageReply.attachments) {
      let { data } = await axios.get(item.url, {responseType: "stream"});
      let path = umaru.sdcard+"/Pictures/"+keyGenerator()+ext;
      await kernel.writeStream(path, data);
      attach.push(fs.createReadStream(path));
      attachPath.push(path);
    }
    }
  }
  return api.sendMessage((await translate(`📨 Your message has been successfully delivered to {{1}} Admin.\n🕒 Time: {{2}}`, event, null, true)).replace("{{2}}", time).replace("{{1}}",umaru.config.adminbot.length), event.threadID, async() => {
    for(const item of umaru.config.adminbot) {
      if(event.type == "message_reply" && event.messageReply.attachments.length !==0 && event.messageReply.attachments[0].type == "sticker") {
         msg = (event.isGroup == true) ? {body: (await translate(`👤 Report from: {{1}}\n💠 ID User: {{3}}\n🌐 Group: {{4}}\n🔰 ID Group: {{5}}\n\n✉️ Message: {{6}}\n📋 Description: {{7}}\n🕒 Time: {{2}}`, event, await Users.getLanguage(item), true)).replace("{{1}}", name).replace("{{3}}", event.senderID).replace("{{4}}", group).replace("{{6}}", text).replace("{{2}}", time).replace("{{5}}", event.threadID).replace("{{7}}", event.messageReply.attachments[0].description)}:{body: (await translate(`👤 Report from: {{1}}\n💠 ID User: {{3}}\n\n✉️ Message: {{6}}\n📋 Description: {{7}}\n🕒 Time: {{2}}`, event, await Users.getLanguage(item), true)).replace("{{1}}", name).replace("{{6}}", text).replace("{{2}}", time).replace("{{3}}", event.senderID).replace("{{7}}", event.messageReply.attachments[0].description)}
      } else {
        msg = (event.isGroup == true) ? {body: (await translate(`👤 Report from: {{1}}\n💠 ID User: {{3}}\n🌐 Group: {{4}}\n🔰 ID Group: {{5}}\n\n✉️ Message: {{6}}\n🕒 Time: {{2}}`, event, await Users.getLanguage(item), true)).replace("{{1}}", name).replace("{{3}}", event.senderID).replace("{{4}}", group).replace("{{6}}", text).replace("{{2}}", time).replace("{{5}}", event.threadID)}:{body: (await translate(`👤 Report from: {{1}}\n💠 ID User: {{3}}\n\n✉️ Message: {{6}}\n🕒 Time: {{2}}`, event, await Users.getLanguage(item), true)).replace("{{1}}", name).replace("{{6}}", text).replace("{{2}}", time).replace("{{3}}", event.senderID)}
      }
      if(attach.length !== 0) {
        msg.attachment = attach;
      }
      if(event.type == "message_reply" && event.messageReply.attachments.length !==0) {
        msg.body += (event.messageReply.attachments[0].type === "sticker") ? `\n📂 Attach a sticker`: `\n📂 Attach a file`;
      }
      msg.mentions = [{id: event.senderID, tag: name}];
      api.sendMessage(msg, item, async(err, info) => {
        if(event.type == "message_reply" && (event.messageReply.attachments.length !== 0) && event.messageReply.attachments[0].type === "sticker") {
          api.sendMessage({sticker: event.messageReply.attachments[0].ID}, item);
        }
        if(err) {
          delete msg.attachment;
          api.sendMessage(msg, item, async(err, info) => {
            let ctx = {name: this.setup.name,thread: event.threadID,sender: event.senderID,messageID: event.messageID,ID: info.messageID,type: "call_admin",author: "global"}
              await reply.create(ctx);
          }, event.messageID)
        } else {
        let ctx = {name: this.setup.name,thread: event.threadID,sender: event.senderID,messageID: event.messageID,ID: info.messageID,type: "call_admin",author: "global"}
          await reply.create(ctx);
        }
      })
    }
    if(attach.length !== 0) {
      for(const item of attachPath) {
        await fs.promises.unlink(item);
      }
    }
  }, event.messageID);
}
export const execReply = async function({api, event, args, prefix, Users, umaru, translate, reply, keyGenerator, kernel, cooldown, systemadmin}) {
  if(!systemadmin.includes(event.senderID) && cooldown.isCooldown(this.setup.name+event.senderID, this.setup.cooldown)) return;
	let name = await Users.getName(event.senderID);
  let ctx = {
    name: this.setup.name,
    ID: event.messageReply.messageID,
    author: "global"
  }
  let data  = await reply.read(ctx);
  let msg = {};
  
  let attach = [];
  let attachPath = [];
  if(event.type == "message_reply" && (event.attachments.length !== 0))  {
    let type = event.attachments[0].type;
    let ext = (type == "photo")?".jpg":(type == "video")?".mp4":(type == "audio")?".mp3":(type == "animated_image")?".gif":"";
    if(type == "sticker") {
      msg = (event.type == "message_reply" && (event.attachments.length !== 0) && data.type == "call_admin") ? {body: (await translate(`✉ Feedback from admin\n{{1}} to you:\n\n💬 Content: {{6}}\n📋 Description: {{7}}\n📂 Attach a sticker\n\n» Reply to this message if you want to continue sending admin reports.`, event, null, true)).replace("{{1}}", (umaru.config.Anonymous == true) ? "Anonymous":name).replace("{{6}}", event.body).replace("{{6}}", event.body).replace("{{7}}", event.attachments[0].description)}: (event.type == "message_reply" && (event.attachments.length !== 0) && data.type == "feedback") ? {body: (await translate(`✉️ Feedback from {{1}}:\n\n💬 Content: {{6}}\n📋 Description: {{7}}\n📂 Attach a sticker\n\n» Reply to this message if you want to continue sending admin reports.`, event, null, true)).replace("{{1}}", name).replace("{{6}}", event.body).replace("{{7}}", event.attachments[0].description)} :(data.type == "call_admin") ? {body: (await translate(`✉ Feedback from admin\n{{1}} to you:\n\n💬 Content: {{6}}\n📋 Description: {{7}}\n\n» Reply to this message if you want to continue sending admin reports.`, event, null, true)).replace("{{1}}", (umaru.config.Anonymous == true) ? "Anonymous":name).replace("{{6}}", event.body).replace("{{6}}", event.body).replace("{{7}}", event.attachments[0].description)}:(data.type == "feedback")?{body: (await translate(`✉️ Feedback from {{1}}:\n\n💬 Content: {{6}}\n📋 Description: {{7}}\n\n» Reply to this message if you want to continue sending admin reports.`, event, null, true)).replace("{{1}}", name).replace("{{6}}", event.body).replace("{{6}}", event.body).replace("{{7}}", event.attachments[0].description)}:"";
    } else {
    for(const item of event.attachments) {
      let { data } = await axios.get(item.url, {responseType: "stream"});
      let path = umaru.sdcard+"/Pictures/"+keyGenerator()+ext;
      await kernel.writeStream(path, data);
      attach.push(fs.createReadStream(path));
      attachPath.push(path);
    }
    msg.attachment = attach;
    }
  }
  switch (data.type) {
    case "call_admin":
      cooldown.create(this.setup.name+event.senderID);
      if(event.type == "message_reply" && event.attachments.length !==0 && event.attachments[0].type == "sticker") {
        msg =  (event.type == "message_reply" && (event.attachments.length !== 0) && data.type == "call_admin") ? {body: (await translate(`✉ Feedback from admin\n{{1}} to you:\n\n💬 Content: {{6}}\n📋 Description: {{7}}\n📂 Attach a sticker\n\n» Reply to this message if you want to continue sending admin reports.`, event, await Users.getLanguage(data.sender), true)).replace("{{1}}", (umaru.config.Anonymous == true) ? "Anonymous":name).replace("{{6}}", event.body).replace("{{7}}", event.attachments[0].description)} :(data.type == "call_admin") ? {body: (await translate(`✉ Feedback from admin\n{{1}} to you:\n\n💬 Content: {{6}}\n📋 Description: {{7}}\n\n» Reply to this message if you want to continue sending admin reports.`, event, await Users.getLanguage(data.sender), true)).replace("{{1}}", (umaru.config.Anonymous == true) ? "Anonymous":name).replace("{{6}}", event.body).replace("{{7}}", event.attachments[0].description)}:"";
      } else {
      msg =  (event.type == "message_reply" && (event.attachments.length !== 0) && data.type == "call_admin") ? {body: (await translate(`✉ Feedback from admin\n{{1}} to you:\n\n💬 Content: {{6}}\n📂 Attach a file\n\n» Reply to this message if you want to continue sending admin reports.`, event, await Users.getLanguage(data.sender), true)).replace("{{1}}", (umaru.config.Anonymous == true) ? "Anonymous":name).replace("{{6}}", event.body)} :(data.type == "call_admin") ? {body: (await translate(`✉ Feedback from admin\n{{1}} to you:\n\n💬 Content: {{6}}\n\n» Reply to this message if you want to continue sending admin reports.`, event, await Users.getLanguage(data.sender), true)).replace("{{1}}", (umaru.config.Anonymous == true) ? "Anonymous":name).replace("{{6}}", event.body)}:"";
      }
      if(attach.length !== 0) {
        msg.attachment = attach;
      }
      if(umaru.config.anonymous == false) msg.mentions = [{ id: event.senderID, tag: name }];
      return api.sendMessage(msg, data.thread, async(err, info) => {
        if(event.type == "message_reply" && (event.attachments.length !== 0) && event.attachments[0].type === "sticker") {
          api.sendMessage({sticker: event.attachments[0].ID},  data.thread);
        }
        if(err) {
          delete msg.attachment;
          return api.sendMessage(msg, data.thread, async(err, info) => {
                let ctx = {name: this.setup.name,thread: event.threadID,sender: event.senderID,ID: info.messageID,type: "feedback",author: "global"}
            await reply.create(ctx);
          }, event.messageID)
        } else {
            let ctx = {name: this.setup.name,thread: event.threadID,sender: event.senderID,ID: info.messageID,type: "feedback",author: "global"}
        await reply.create(ctx);
        if(attach.length !== 0) {
          for(const item of attachPath) {
            await fs.promises.unlink(item);
          }
        }
        }
      }, data.messageID)
    break;
    case "feedback":
      cooldown.create(this.setup.name+event.senderID);
        for(const item of umaru.config.adminbot) {
          if(event.type == "message_reply" && event.attachments.length !==0 && event.attachments[0].type == "sticker") {
            msg = (event.type == "message_reply" && (event.attachments.length !== 0) && data.type == "feedback") ? {body: (await translate(`✉️ Feedback from {{1}}:\n\n💬 Content: {{6}}\n📋 Description: {{7}}\n📂 Attach a sticker\n\n» Reply to this message if you want to continue sending feedback reports.`, event, await Users.getLanguage(item), true)).replace("{{1}}", name).replace("{{6}}", event.body).replace("{{7}}", event.attachments[0].description)} :(data.type == "feedback")?{body: (await translate(`✉️ Feedback from {{1}}:\n\n💬 Content: {{6}}\n\n» Reply to this message if you want to continue sending feedback reports.`, event, await Users.getLanguage(item), true)).replace("{{1}}", name).replace("{{6}}", event.body).replace("{{7}}", event.attachments[0].description)}:"";
          } else {
          msg = (event.type == "message_reply" && (event.attachments.length !== 0) && data.type == "feedback") ? {body: (await translate(`✉️ Feedback from {{1}}:\n\n💬 Content: {{6}}\n📂 Attach a file\n\n» Reply to this message if you want to continue sending feedback reports.`, event, await Users.getLanguage(item), true)).replace("{{1}}", name).replace("{{6}}", event.body)} :(data.type == "feedback")?{body: (await translate(`✉️ Feedback from {{1}}:\n\n💬 Content: {{6}}\n\n» Reply to this message if you want to continue sending feedback reports.`, event, await Users.getLanguage(item), true)).replace("{{1}}", name).replace("{{6}}", event.body)}:"";
          }
          if(attach.length !== 0) {
            msg.attachment = attach;
          }
           msg.mentions = [{ id: event.senderID, tag: name }];
          api.sendMessage(msg, item, async(err, info) => {
            if(event.type == "message_reply" && (event.attachments.length !== 0) && event.attachments[0].type === "sticker") {
               api.sendMessage({sticker: event.attachments[0].ID}, item);
            }
            if(err) {
              delete msg.attachment;
              return api.sendMessage(msg, item, async(err, info) => {
                let ctx = {name: this.setup.name,thread: event.threadID,sender: event.senderID,messageID: event.messageID,ID: info.messageID,type: "call_admin",author: "global"}
                await reply.create(ctx);
              }, event.messageID)
            } else {
            let ctx = {name: this.setup.name,thread: event.threadID,sender: event.senderID,messageID: event.messageID,ID: info.messageID,type: "call_admin",author: "global"}
            await reply.create(ctx);
            if(attach.length !== 0) {
              for(const item of attachPath) {
                await fs.promises.unlink(item);
            }
            }
            }
          })
        }
    break;
  }
}