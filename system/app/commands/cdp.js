const axios = require("axios");
const fs = require("fs-extra");

const cacheDirectory = `${__dirname}/tmp/`;

module.exports = {
  config: {
    name: "cdp",
    aliases: ["couple"],
    version: "1.0.0",
    author: "Lance Ajiro",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Get a couple display picture (DP)."
    },
    longDescription: {
      en: "This command provides a random couple DP."
    },
    category: "image",
    guide: {
      en: "{pn}"
    }
  },
  onStart: async function ({ api, event, args }) {

    try {
      const { data } = await axios.get(
        "https://milanbhandari.imageapi.repl.co/dp?apikey=xyzmilan"
      );
      const maleImg = await axios.get(data.male, { responseType: "arraybuffer" });
      fs.writeFileSync(cacheDirectory + "img1.png", Buffer.from(maleImg.data, "utf-8"));
      const femaleImg = await axios.get(data.female, { responseType: "arraybuffer" });
      fs.writeFileSync(cacheDirectory + "img2.png", Buffer.from(femaleImg.data, "utf-8"));

      const msg = "Here is your couple DP";
      const allImages = [
        fs.createReadStream(cacheDirectory + "img1.png"),
        fs.createReadStream(cacheDirectory + "img2.png")
      ];

      api.sendMessage({
        body: msg,
        attachment: allImages
      }, event.threadID, event.messageID);
    } catch (error) {
      console.error(error);
    }
  }
};
