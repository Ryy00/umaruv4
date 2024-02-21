export const setup = {
  name: "link",
  version: "1.0.0",
  permission: "Users",
  creator: "Lance Ajiro",
  description: "Replies with the link of the attached file.",
  category: "utility",
  usages: "",
  cooldown: 0,
  isPrefix: true,
};

export const domain = { "link": setup.name };

export const execCommand = async function ({ api, event, translate }) {
  if (event.type !== "message_reply" || !event.messageReply.attachments || event.messageReply.attachments.length === 0 || event.messageReply.attachments.length > 1) {
    return api.sendMessage("Please reply to a message with a single attachment.", event.threadID, event.messageID);
  }

  return api.sendMessage((await translate(`🌠 Here's the link: {{1}}`, event, null, true)).replace("{{1}}", event.messageReply.attachments[0].url), event.threadID, event.messageID);
};
