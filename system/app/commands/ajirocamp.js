export const setup = {
  name: "ajirocamp",
  version: "1.0.0",
  permission: "Users",
  creator: "Lance Ajiro",
  description: "Adds the user to Ajiro Camp.",
  category: "box",
  usages: "Use {pn} to join the Ajiro Camp.",
  cooldown: 0,
  isPrefix: true,
};

export const domain = { "ajirocamp": setup.name };

export const execCommand = async function ({ api, event, args }) {
  const campName = "Ajiro Camp"; // Set the camp name as a variable
  const threadID = "9385615884789336"; // ID of the thread to add the user to

  // Check if the user is already a member of the thread
  const threadInfo = await api.getThreadInfo(threadID);
  const isMember = threadInfo.participantIDs.includes(event.senderID);

  if (isMember) {
    api.sendMessage(`You are already a member of ${campName}.`, event.threadID, event.messageID);
  } else {
    try {
      await api.addUserToGroup(event.senderID, threadID);
      api.sendMessage(`You have been added to the group chat. Please check your Spam or Message Request folder if you can't find the ${campName} GC.`, event.threadID, event.messageID);
    } catch (error) {
      api.sendMessage(`Failed to add you to the ${campName}.`, event.threadID, event.messageID);
    }
  }
};
