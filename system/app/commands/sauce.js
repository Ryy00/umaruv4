import tinyurl from 'tinyurl';
import axios from 'axios';
import fs from 'fs';

export const setup = {
  name: 'sauce',
  version: '1.0.0',
  permission: 'Users',
  creator: 'rehat--',
  description: 'Search anime sauce by replying to an image',
  category: 'Anime',
  usages: ['reply_image'],
  cooldown: 0,
  isPrefix: true,
};

export const domain = { "sauce": setup.name };

export const execCommand = async function ({ api, event, message, args, umaru, keyGenerator }) {
  let imageUrl;

  if (event.type === 'message_reply') {
    const replyAttachment = event.messageReply.attachments[0];

    if (['photo', 'sticker'].includes(replyAttachment?.type)) {
      imageUrl = replyAttachment.url;
    } else {
      return api.sendMessage({ body: '❌ | Reply must be an image.' }, event.threadID, event.messageID);
    }
  } else if (args[0]?.match(/(https?:\/\/.*\.(?:png|jpg|jpeg))/g)) {
    imageUrl = args[0];
  } else {
    return api.sendMessage({ body: '❌ | Reply to an image.' }, event.threadID, event.messageID);
  }

  const url = await tinyurl.shorten(imageUrl);
  const replyMessage = await api.sendMessage({ body: 'Please wait...⏳' }, event.threadID, null, event.messageID);

  try {
    const response = await axios.get(`https://turtle-apis.onrender.com/api/sauce?url=${url}`);
    const result = response.data.result;
    const title = result.title;
    const similarity = result.similarity;
    let path = umaru.sdcard + "/Download/"+keyGenerator()+".mp4";

    api.sendMessage({
      body: `Name: ${title}\nSimilarity: ${similarity}`,
      attachment: fs.createReadStream(path),
    }, event.threadID, null, event.messageID);
  } catch (err) {
    api.unsendMessage(replyMessage);
    api.sendMessage({ body: err.message }, event.threadID, null, event.messageID);
    console.log(err);
  }
};
