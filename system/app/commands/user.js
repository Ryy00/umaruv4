import moment from "moment-timezone";
export const setup = {
  name: "user",
  version: "40.0.0",
  permission: "Admin",
  creator: "John Lester",
  description: "Ban or unban users",
  category: "System",
  usages: ["ban [userID] | [reason]", "unban [userID]"],
  cooldown: 5,
  isPrefix: true
}
export const domain = {"user": setup.name};
export const execCommand = async function({api, event, kernel, key, umaru, keyGenerator, usage, prefix, args, translate, Users}) {
  if(args.length === 0) return usage(this, prefix, event);
  let mentions = Object.keys(event.mentions);
  (mentions.length === 0 && /^[0-9]+$/.test(args[1])) ? mentions = [args[1]]: (event.type == "message_reply") ? mentions = [event.messageReply.senderID] : (mentions.length === 0) ? "": mentions = mentions;
  let text = args.join(" ");
  switch (args[0].toLowerCase()) {
    case "ban":
      if(mentions.length === 0) return api.sendMessage("⚠️ Please add a userID or mention someone to ban.", event.threadID, event.messageID)
      let reason = text.split("|")[1];
      reason = (typeof reason === "string") ? reason.trim(): "";
      if(umaru.data.users.hasOwnProperty(mentions[0])) {
        umaru.data.users[mentions[0]].isBanned = `${reason}\nIssued: ${moment.tz(umaru.config.TimeZone).format("LLLL")}`;
        await umaru.save();
        return api.sendMessage((await translate(`✅ Successfully ban {{n}}\n\n${(reason !== "") ? "Reason: {{r}}":""}`, event, null, true)).replace("{{n}}", await Users.getName(mentions[0])).replace("{{r}}", reason), event.threadID,event.messageID);
      } else {
        return api.sendMessage((await translate("⚠️ This userID doesn't exist in my database.", event, null, true)), event.threadID,event.messageID);
      }
    break;
    case "unban":
      if(mentions.length === 0) return api.sendMessage("⚠️ Please add a userID or mention someone to unban.", event.threadID, event.messageID);
      if(umaru.data.users.hasOwnProperty(mentions[0])) {
        delete umaru.data.users[mentions[0]].isBanned;
        await umaru.save();
        return api.sendMessage((await translate(`✅ Successfully unban {{n}}`, event, null, true)).replace("{{n}}", await Users.getName(mentions[0])), event.threadID,event.messageID);
      } else {
        return api.sendMessage((await translate("⚠️ This userID doesn't exist in my database.", event, null, true)), event.threadID,event.messageID);
      }
    break;
    default:
      return usage(this, prefix, event);
      break;
  }
}