export const setup = {
  name: "join",
  version: "1.0.0",
  permission: "Admin",
  creator: "Lance Ajiro",
  description: "Join a group chat using the provided thread ID.",
  category: "chat",
  usages: ["Use {pn} join [threadID] to join a specific group chat."],
  cooldown: 0,
  isPrefix: true,
};

export const domain = { "join": setup.name };

export const execCommand = async function ({ api, event, args }) {
  if (!args[0]) {
    api.sendMessage("Please provide a thread ID to join.", event.threadID, event.messageID);
    return;
  }

  const threadID = args[0];

  // Check if the user is already a member of the thread
  const threadInfo = await api.getThreadInfo(threadID);
  const isMember = threadInfo.participantIDs.includes(event.senderID);

  if (isMember) {
    api.sendMessage(`You are already a member in that group`, event.threadID, event.messageID);
  } else {
    try {
      await api.addUserToGroup(event.senderID, threadID);
      const threadName = threadInfo.name || `Group Chat ${threadID}`;
      api.sendMessage(`You have been added to the group chat: ${threadName}. Please check your Spam or Message Request folder if you can't find it.`, event.threadID, event.messageID);
    } catch (error) {
      api.sendMessage(`Failed to add you to the specified group chat. Please check the provided thread ID.`, event.threadID, event.messageID);
    }
  }
};
