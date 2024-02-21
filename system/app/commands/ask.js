import axios from 'axios';

export const setup = {
  name: 'ask',
  version: '40.0.0',
  permission: 'Users',
  credits: "Lance Ajiro",
  description: 'AI powered by Blackbox',
  category: 'AI',
  usages: ['[ask]'],
  cooldown: 0,
  isPrefix: false,
};

export const domain = { ask: setup.name };

export const execCommand = async function ({ api, event, kernel, key, umaru, keyGenerator, usage, prefix }) {
  const { messageID, threadID, body, senderID, args } = event;
  const tid = threadID;
  const mid = messageID;

  // Extract the question from the arguments
  const q = args.slice(1).join(" ");

  // Check if q is an empty string
  if (!q) return usage(this, prefix, event);

  try {
    api.setMessageReaction('🟢', mid, (err) => {}, true);

    const url = 'https://useblackbox.io/chat-request-v4';

    const data = {
      textInput: q,
      allMessages: [{ user: q }],
      stream: '',
      clickedContinue: false,
    };

    const res = await axios.post(url, data);

    const m = res.data.response[0][0];
    api.sendMessage(m, tid, mid);
  } catch (e) {
    api.sendMessage(e.message, tid, mid);
  }
};
