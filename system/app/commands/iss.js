const axios = require('axios');
module.exports.config = {
  name: "iss",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "BerVer",
  description: "See the coordinates that the spacecraft is in Lac",
  commandCategory: "Tool",
  usages: "iss",
  cooldowns: 5
};
module.exports.run = async function({api,event,args}) {
  let jsonData = (await axios.get("http://api.open-notify.org/iss-now.json")).data;
  api.sendMessage(`Current location of International Space Station 🌌🌠🌃 \n-latitude: ${jsonData.iss_position.latitude}\n- Longitude: ${jsonData.iss_position.longitude}`, event.threadID, event.messageID);
}