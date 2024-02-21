import axios from 'axios';

export const setup = {
  name: "facts",
  version: "1.0",
  permission: "Users",
  creator: "Lance Ajiro",
  description: "Get random facts.",
  category: "lines",
  usages: "To use the facts command, simply type 'facts'.",
};

export const domain = { "facts": setup.name };

export const execCommand = async function ({ api, event }) {
  try {
    const apiUrl = 'https://tanjiro-api.onrender.com/facts?&api_key=tanjiro';
    const res = await axios.get(apiUrl);
    const fact = res.data.data;

    return api.sendMessage(`${fact}`, event.threadID, event.messageID);
  } catch (error) {
    console.error(error);
    return api.sendMessage("An error occurred while fetching the fact. Please try again.", event.threadID, event.messageID);
  }
};
