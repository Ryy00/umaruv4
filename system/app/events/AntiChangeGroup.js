import fs from "fs-extra";
export const setup = {
  name: "AntiChangeGroup",
  version: "40.0.0",
  creator: "John Lester",
  setEvent: ["log:thread-image", "change_thread_image", "log:thread-name", "log:thread-color", "log:thread-icon", "log:user-nickname", "log:thread-admins", "log:unsubscribe"],
  description: "Prevent changing"
}
export const exec = async function({api, event, Threads, Users, umaru, translate}) {
  try {
  const admins =  await Threads.getAdminIDs(event.threadID)
  let ownId = api.getCurrentUserID();
  if(umaru.config.adminbot.includes(event.author)) return;
  if(admins.includes(ownId) && event.logMessageType == 'log:thread-admins' && umaru.data['threads'][event.threadID]['AntiChangeGroup']['admin'] == true && (event.logMessageData.ADMIN_EVENT == "add_admin" || event.logMessageData.ADMIN_EVENT == "remove_admin") && event.author != ownId && event.logMessageData.TARGET_ID != ownId) {
    let True = (event.logMessageData.ADMIN_EVENT == "add_admin") ? false : (event.logMessageData.ADMIN_EVENT == "remove_admin") ? true: true
    api.changeAdminStatus(event.threadID, event.logMessageData.TARGET_ID, True, async(err) => {
        if (err) return;
        return api.sendMessage((await translate(`🛡 Anti-change group admin is enabled. Make sure you turn it off before changing the admin.`, event, null, true)), event.threadID, event.messageID);
    });
}
if(admins.includes(ownId) && event.logMessageType == 'log:unsubscribe' && umaru.data['threads'][event.threadID]['AntiChangeGroup']['admin'] == true && admins.includes(event.logMessageData.leftParticipantFbId) && event.author != ownId && event.author != event.logMessageData.leftParticipantFbId) {
  function addAdmin() {
    api.changeAdminStatus(event.threadID, event.logMessageData.leftParticipantFbId, true, async(err) => {
      if (err) return;
      return api.sendMessage((await translate(`🛡 Anti-change group admin is enabled. Make sure you turn it off before changing the admin.`, event, null, true)), event.threadID, event.messageID);
  });
  }
  if(event.participantIDs.includes(event.logMessageData.leftParticipantFbId)) {
            api.changeAdminStatus(event.threadID, event.author, false, () => {
              api.addUserToGroup(event.logMessageData.leftParticipantFbId, event.threadID, addAdmin)
            })
  } else {
    addAdmin();
  }
}
  if(admins.includes(event.author)) return;
    if ((event.logMessageType == 'log:thread-image' || event.type == 'change_thread_image') && umaru.data['threads'][event.threadID]['AntiChangeGroup']['photo'] == true && umaru.data['threads'][event.threadID]['imageSrc'] !== null && event.author != ownId)  {
      api.changeGroupImage(fs.createReadStream(`${umaru.systemPath + "/data/Threads/"}${event.threadID}/photo.png`), event.threadID, async(err) => {
        if (err) return;
       return api.sendMessage((await translate("🛡 Anti-change group photo is enabled. Make sure you turn it off before changing your group photo.", event, null, true)), event.threadID, event.messageID)
      })
    }
      if(event.logMessageType == 'log:thread-name' && umaru.data['threads'][event.threadID]['AntiChangeGroup']['name'] == true && event.author != ownId) {
      api.setTitle(umaru.data['threads'][event.threadID]['threadName'], event.threadID, async (err) => {
        if (err) return;
        return api.sendMessage((await translate("🛡 Anti-change group name is enabled. Make sure you turn it off before changing your group name.", event, null, true)), event.threadID, event.messageID)
      })
      }

      if(event.logMessageType == 'log:thread-color' && umaru.data['threads'][event.threadID]['AntiChangeGroup']['theme'] == true && event.author != ownId) {
        api.changeThreadColor(umaru.data['threads'][event.threadID]['threadTheme'].id || "3259963564026002", event.threadID, async(err) => {
          if (err) return;
          return api.sendMessage((await translate("🛡 Anti-change group theme is enabled. Make sure you turn it off before changing your group theme.", event, null, true)), event.threadID, event.messageID)
        })
      }

      if(event.logMessageType == 'log:thread-icon' && umaru.data['threads'][event.threadID]['AntiChangeGroup']['emoji'] == true && event.author != ownId) {
        api.changeThreadEmoji((umaru.data['threads'][event.threadID]['emoji'] === null) ? "" : umaru.data['threads'][event.threadID]['emoji'], event.threadID, async (err) => {
          if (err) return;
          return api.sendMessage((await translate("🛡 Anti-change group emoji is enabled. Make sure you turn it off before changing your group emoji.", event, null, true)), event.threadID, event.messageID)
        })
      }
    if(event.logMessageType == 'log:user-nickname' && umaru.data['threads'][event.threadID] && umaru.data['threads'][event.threadID]['AntiChangeGroup'] && umaru.data['threads'][event.threadID]['AntiChangeGroup']['nickname'] == true && event.author != ownId) {
        const nicknames = await Threads.getNickname(event.threadID)
        api.changeNickname((nicknames[event.logMessageData.participant_id]) ? nicknames[event.logMessageData.participant_id] : umaru.data['users'][event.logMessageData.participant_id].firstName, event.threadID, event.logMessageData.participant_id, async (err) => {
          if (err) return;
          let name = await Users.getName(event.logMessageData.participant_id);
          return api.sendMessage((await translate((event.author == event.logMessageData.participant_id) ? "🛡 Anti-change group nickname is enabled. Make sure you turn it off before changing your nickname." : `🛡 Anti-change group nickname is enabled. Make sure you turn it off before changing the {{1}} nickname.`, event, null, true)).replace("{{1}}", name), event.threadID, event.messageID)
        })
    }
  } catch (e) {
    console.log(e)
  }
}