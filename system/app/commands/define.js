import fs from 'fs';
import axios from 'axios';
import google from 'googlethis';

export const setup = {
  name: 'define',
  version: '1.0.0',
  permission: 'Users',
  creator: 'Lance Ajiro',
  description: 'Retrieves the definition of the specified word using Google Dictionary.',
  category: 'dictionary',
  usages: ['[words]'],
  cooldown: 5,
  isPrefix: true,
};

export const domain = { "define": setup.name };

export const execCommand = async function ({ api, event, kernel, umaru, keyGenerator, args, prefix, usage }) {
  try {
    let text = args.join(" ");
  if (!text) return usage(this, prefix, event);
    await umaru.createJournal(event);

    const word = args.join(' ');
    const options = {
      additional_params: {
        hl: 'en',
      },
    };

    const query = `define ${word}`;
    const response = await google.search(query, options);
    const dictionary = response.dictionary;

    if (dictionary) {
      let messageText = '';

      messageText += `Word: ${dictionary.word}\n`;
      messageText += `Phonetic: ${dictionary.phonetic}\n\n`;

      dictionary.definitions.forEach((definition, index) => {
        messageText += `Definition ${index + 1}: ${definition}\n`;
      });

      messageText += '\nExamples:\n';
      dictionary.examples.forEach((example, index) => {
        messageText += `Example ${index + 1}: ${example}\n`;
      });

      const audioUrl = dictionary.audio;
      if (audioUrl) {
        const audioPath = `${umaru.sdcard}/Pictures/${keyGenerator()}.mp3`;
        await downloadFile(audioUrl, audioPath);
        const audioAttachment = fs.createReadStream(audioPath);
        return api.sendMessage(
          { body: messageText, attachment: audioAttachment },
          event.threadID,
          async () => {
            await fs.promises.unlink(audioPath);
            await umaru.deleteJournal(event);
          },
          event.messageID
        );
      } else {
        return api.sendMessage(
          { body: messageText },
          event.threadID,
          async () => {
            await umaru.deleteJournal(event);
          },
          event.messageID
        );
      }
    } else {
      return api.sendMessage(
        { body: 'No definition found for the specified word.' },
        event.threadID,
        async () => {
          await umaru.deleteJournal(event);
        },
        event.messageID
      );
    }
  } catch (err) {
    console.error(`Error retrieving word definition: ${err}`);
    return api.sendMessage(
      { body: 'Failed to retrieve word definition. Please try again later.' },
      event.threadID,
      async () => {
        await umaru.deleteJournal(event);
      },
      event.messageID
    );
  }
};

async function downloadFile(url, outputPath) {
  const response = await axios.get(url, { responseType: 'stream' });
  const writer = fs.createWriteStream(outputPath);
  await new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
    response.data.pipe(writer);
  });
}
