const axios = require('axios');
const fs = require('fs');
const request = require('request');
const cache = `${__dirname}/cache/`;

module.exports = {
  config: {
    name: "waifu",
    version: "1.2.0",
    author: "Lance Ajiro",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Sends a random waifu image."
    },
    longDescription: {
      en: "Sends a random waifu image from various categories. Usage: [category]"
    },
    category: "Anime",
    guide: {
      en: "Available categories: waifu, neko, shinobu, megumin, bully, cuddle, cry, hug, awoo, kiss, lick, pat, smug, bonk, yeet, blush, smile, wave, highfive, handhold, nom, bite, glomp, slap, kill, kick, happy, wink, poke, dance, cringe"
    }
  },
  onStart: async function ({ api, event, args, message }) {
    const category = args[0] ? args[0].toLowerCase() : "waifu";
    const validCategories = ["waifu", "neko", "shinobu", "megumin", "bully", "cuddle", "cry", "hug", "awoo", "kiss", "lick", "pat", "smug", "bonk", "yeet", "blush", "smile", "wave", "highfive", "handhold", "nom", "bite", "glomp", "slap", "kill", "kick", "happy", "wink", "poke", "dance", "cringe"];
    
    if (!validCategories.includes(category)) {
      message.reply(`Invalid category. Available categories: ${validCategories.join(", ")}`);
      return;
    }
    
    const url = `https://api.waifu.pics/sfw/${category}`;
    
    try {
      const response = await axios.get(url);
      const imageUrl = response.data.url;
    
      const callback = () => {
        message.reply({
          body: `Here's your ${category}:\n${imageUrl}`,
          attachment: fs.createReadStream(`${cache}${category}.png`)
        }, () => fs.unlinkSync(`${cache}${category}.png`));
      };
    
      const imageCachePath = `${cache}${category}.png`;
      if (fs.existsSync(imageCachePath)) {
        // If the image already exists in the cache, send it from the cache.
        callback();
      } else {
        // If the image doesn't exist in the cache, download it and save it to the cache.
        request(encodeURI(imageUrl)).pipe(fs.createWriteStream(imageCachePath)).on('close', callback);
      }
    } catch (error) {
      console.error(error);
      message.reply("Oops, something went wrong :(");
    }
  }
};
            