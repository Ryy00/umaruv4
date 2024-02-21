import moment from "moment-timezone";
export const setup = {
  name: "thread",
  version: "40.0.0",
  permission: "Admin",
  creator: "John Lester",
  description: "Ban or unban group chat",
  category: "System",
  usages: ["ban [threadID] | [reason]", "unban [threadID]"],
  cooldown: 5,
  isPrefix: true
}
export const domain = {"thread": setup.name};
export const execCommand = async function({api, event, kernel, key, umaru, keyGenerator, usage, prefix, args, translate, Threads}) {
  if(args.length === 0) return usage(this, prefix, event);
  let mentions = [args[1]];
  let text = args.join(" ");
  switch (args[0].toLowerCase()) {
    case "ban":
      if(mentions.length === 0) return api.sendMessage("⚠️ Please add a threadID to ban.", event.threadID, event.messageID)
      let reason = text.split("|")[1];
      reason = (typeof reason === "string") ? reason.trim(): "";
      if(umaru.data.threads.hasOwnProperty(mentions[0])) {
        umaru.data.threads[mentions[0]].isBanned = `${reason}\nIssued: ${moment.tz(umaru.config.TimeZone).format("LLLL")}`;
        await umaru.save();
        return api.sendMessage((await translate(`✅ Successfully ban {{1}}\n\n${(reason !== "") ? "Reason: {{2}}":""}`, event, null, true)).replace("{{1}}", await Threads.getName(mentions[0])).replace("{{2}}", reason), event.threadID,event.messageID);
      } else {
        return api.sendMessage((await translate("⚠️ This threadID doesn't exist in my database.", event, null, true)), event.threadID,event.messageID);
      }
    break;
    case "unban":
      if(mentions.length === 0) return api.sendMessage("⚠️ Please add a threadID or mention someone to unban.", event.threadID, event.messageID);
      if(umaru.data.threads.hasOwnProperty(mentions[0])) {
        delete umaru.data.threads[mentions[0]].isBanned;
        await umaru.save();
        return api.sendMessage((await translate(`✅ Successfully unban {{1}}`, event, null, true)).replace("{{1}}", await Threads.getName(mentions[0])), event.threadID,event.messageID);
      } else {
        return api.sendMessage((await translate("⚠️ This threadID doesn't exist in my database.", event, null, true)), event.threadID,event.messageID);
      }
    break;
    default:
      return usage(this, prefix, event);
      break;
  }
}