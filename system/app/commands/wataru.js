import axios from 'axios';

export const setup = {
  name: 'wataru',
  version: '40.0.0',
  permission: 'Users',
  creator: 'Lance Ajiro',
  description: 'Interact with an AI to get responses to your questions.',
  category: 'AI',
  usages: ['[question]'],
  cooldown: 5,
  isPrefix: "both",
};

export const domain = { "wataru": setup.name };

export const execCommand = async function ({ api, event, args, usage, prefix }) {
  if (args.length === 0) return usage(this, prefix, event);

  const question = args.join(' ');

  try {
    const response = await axios.get(`https://hercai.onrender.com/v3-beta/hercai?question=${encodeURIComponent(question)}`);
    const aiResponse = response.data.reply;
    api.sendMessage(aiResponse, event.threadID, event.messageID);
  } catch (error) {
    console.error('Error fetching AI response:', error);
    api.sendMessage('Failed to get AI response. Please try again later.', event.threadID, event.messageID);
  }
};
