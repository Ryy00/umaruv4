import moment from "moment-timezone";
import fs from "fs";
export const setup = {
  name: "inf",
  version: "40.0.0",
  permission: "Users",
  creator: "John Lester",
  description: "Admin Information",
  category: "Info",
  usages: [""],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"inf": setup.name};
export const execCommand = async function({api, event, umaru, prefix, timeZone, Users}) {
  let msg = `———»ADMIN BOT«———\n❯ Bot Name: ${umaru.config.botname}\n❯ Bot Owner: ${(umaru.config.Anonymous == true) ? "Anonymous" :umaru.config.Owner}\n❯ Age: ${umaru.config.Age}\n❯ Gender: ${umaru.config.Gender}\n❯ Facebook: ${(umaru.config.Anonymous == true) ? "Anonymous" :umaru.config.Facebook}\n❯ Total Group: ${umaru.allThreadID.length + umaru.allInactiveThreadID.length}\n❯ Total Users: ${umaru.allUserID.length}\n❯ Bot Prefix: ${prefix}\n❯ Today is: ${moment.tz(timeZone).format("LLL")}\n❯ Thanks for using ${umaru.config.botname} Bot`;
let params = {body: msg}
if(umaru.config.Anonymous !== true) params['attachment'] = fs.createReadStream(await Users.getImage(umaru.config.adminbot[0], "dir"));
  return api.sendMessage(params,event.threadID, event.messageID);
}