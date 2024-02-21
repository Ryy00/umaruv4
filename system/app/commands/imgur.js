import axios from 'axios';

export const setup = {
  name: "imgur",
  version: "1.0.0",
  permission: "Users",
  creator: "Lance Ajiro",
  description: "imgur upload",
  category: "tools",
  usages: "reply to image {pn}",
};

export const domain = { "imgur": setup.name };

export const execCommand = async function ({ api, event, args }) {
  const linkanh = (event.messageReply && event.messageReply.attachments[0]?.url) || args[0];

  if (!linkanh) {
    return api.sendMessage("Please provide an image URL or reply to an image", event.threadID, event.messageID);
  }

  try {
    const res = await axios.get(`https://tanjiro-api.onrender.com/imgur?link=${encodeURIComponent(linkanh)}&api_key=tanjiro`);
    const lance = res.data.result;
    return api.sendMessage(`${lance}`, event.threadID, event.messageID);
  } catch (error) {
    console.error(error);
    return api.sendMessage("An error occurred while processing the image. Please try again.", event.threadID, event.messageID);
  }
};
