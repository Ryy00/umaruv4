import fs from "fs";
import axios from "axios";

export const setup = {
  name: "binary",
  aliases: [],
  version: "40.0.0",
  permission: "Users",
  creator: "Lance Ajiro",
  description: "Convert text to binary and decode binary to text.",
  category: "Utility",
  usages: ["[text]", "-decode [BinaryText]"],
  cooldown: 5,
  isPrefix: true,
};

export const domain = { binary: setup.name };

export const execCommand = async function ({ api, event, kernel, key, umaru, keyGenerator, args }) {
  await umaru.createJournal(event);

  try {
    const input = args[0]

    if (input.startsWith("-decode")) {
      const binaryText = args.splice(1).join(" ");
      const decodedText = binaryToText(binaryText);

      api.sendMessage(`${decodedText}`, event.threadID, event.messageID);
    } else {
      if (input) {
        const binaryText = textToBinary(input);
        api.sendMessage(`${binaryText}`, event.threadID, event.messageID);
      } else {
        api.sendMessage("Please type a text to convert to binary.", event.threadID, event.messageID);
      }
    }
  } catch (error) {
    console.error(error);
    api.sendMessage("An error occurred while processing the command.", event.threadID);
  } finally {
    await umaru.deleteJournal(event);
  }
};

const textToBinary = (text) => {
  return text.split('').map(char => char.charCodeAt(0).toString(2)).join(' ');
};

const binaryToText = (binaryText) => {
  return binaryText.split(' ').map(binaryChar => String.fromCharCode(parseInt(binaryChar, 2))).join('');
};
