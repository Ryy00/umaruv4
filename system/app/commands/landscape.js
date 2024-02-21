import fs from 'fs';
import axios from 'axios';

export const setup = {
  name: 'landscape',
  version: '40.0.0',
  permission: 'Users',
  creator: 'Lance Ajiro',
  description: 'Get a random landscape image.',
  category: 'image',
  usages: [''],
  cooldown: 5,
  isPrefix: true,
};

export const domain = { "landscape": setup.name };

export const execCommand = async function ({ api, event, kernel, key, umaru, keyGenerator }) {
  await umaru.createJournal(event);

  try {
    const response = await axios.get('https://source.unsplash.com/1600x900/?landscape', { responseType: 'stream' });
    const path = umaru.sdcard + '/Pictures/' + keyGenerator() + '.png';
    await kernel.writeStream(path, response.data);

    const message = { attachment: fs.createReadStream(path) };
    api.sendMessage(message, event.threadID, async () => {
      await umaru.deleteJournal(event);
      await fs.promises.unlink(path);
    }, event.messageID);
  } catch (error) {
    handleErrorResponse(api, event, error);
  } finally {
    await umaru.deleteJournal(event);
  }
};

function handleErrorResponse(api, event, error) {
  const errorMessage = error ? error.toString() : 'Error!';
  api.sendMessage(errorMessage, event.threadID, event.messageID);
  console.log(errorMessage);
}
