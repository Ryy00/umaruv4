import * as logger from "../../lib/index.js";
import chalk from 'chalk';
import moment from 'moment-timezone';
import fs from 'fs-extra';
export const setup = {
  name: "console",
  version: "40.0.0",
  permission: "Administrator",
  creator: "John Lester",
  description: "View the live chat through console",
  category: "System",
  usages: ["on", "off"],
  cooldown: 5,
  isPrefix: true
}
export const execEvent = async function({event, Threads, Users, timeZone, isConsole, umaru}) {
  if(event.isGroup == true && umaru.config['console'] == true && umaru.data['threads'].hasOwnProperty(event.threadID)) {
  let time = moment.tz(timeZone).format("HH:mm:ss");
  
  if(isConsole === true) logger.thread(await Threads.getName(event.threadID), `${(await Users.getName(event.senderID))}: ${(event.attachments.length > 0) ? "sent a "+ event.attachments[0].type+"." : (event.body)}`)
  }
}
export const execCommand = async function({api, event}) {
  if(umaru.config.console == true) {
    umaru.config['console'] = false
    fs.writeFileSync(umaru.configPath, JSON.stringify(umaru.config, null, '\t'))
    return api.sendMessage("Console successfully disable", event.threadID, event.messageID)
  } else if(umaru.config.console == false) {
    umaru.config['console'] = true
    fs.writeFileSync(umaru.configPath, JSON.stringify(umaru.config, null, '\t'))
    return api.sendMessage("Console successfully enable", event.threadID, event.messageID)
  }
}