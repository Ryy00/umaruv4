import fs from "fs-extra";
export const setup = {
  name: "joinNoti",
  version: "40.0.0",
  creator: "John Lester",
  description: "Welcome card when members added and notification of bot",
  setEvent: ["log:subscribe"],
  screenshot: ["/media/welcome/screenshot/Screenshot_20230903_093157.jpg"]
}
export const exec = async function({api, event, key, umaru, readImage, keyGenerator, kernel, Users, Threads}) {
  let getKey = keyGenerator();
  let ownId = api.getCurrentUserID();
  if(umaru.data['AutoLeave']['Mode'] == false && event.logMessageData.addedParticipants.some(a => a.userFbId == ownId)) {
    let msg = `❑ Prefix: ${umaru.config.prefix}\n❑ Commands: ${umaru.client.allCommandsName.length}\n❑ Events: ${umaru.client.umaruEvents.length}\n❑ Users: ${umaru.allUserID.length}\n❑ Threads: ${umaru.allThreadID.length+umaru.allInactiveThreadID.length}\n\nThank you for using this bot, have fun using it.`;
    return api.sendMessage(msg, event.threadID);
  } else {
  let name = "";
  let currentNum = (event.participantIDs.length - event.logMessageData.addedParticipants.length) + 1;
  let cou = ""
  for (let i = 0; i < event.logMessageData.addedParticipants.length; i++) {
    name += `${event.logMessageData.addedParticipants[i].fullName}, `;
    cou += `${currentNum++},` 
  }
         let welcome = umaru.config.Addons.Welcome.replace("{threadname}", await Threads.getName(event.threadID)).replace("{name}", name).replace("{num}", cou);
         let Welcome = welcome.replace(/\,th/g, "th");
         let randomiz = ["0", "1",,"2", "0", "1","2", "0", "1","2"];
         let randomize = randomiz[Math.floor(Math.random() * randomiz.length)];
  switch (umaru.config.WelcomeMode) {
   case 'canvas':
     getCanvas()
     break;
     case 'image':
       getImage()
       break;
       case 'gif':
         getGif()
         break;
         case 'none':
           getNone()
           break;
           case 'video':
             getVideo()
             break;
    case 'gifcanvas':
      getGifCanvas();
      break;
             case 'random':
               if(randomize == "0") {
                 getRandom()
               } else if(randomize == "2") {
                 getGifCanvas();
               } {
                 getCanvas()
               }
               break;
  }
     async function getCanvas() {
       let extensions = [".welcome.jpg",".welcome2.jpg"];
         let backgro = fs.readdirSync(umaru.mainPath + "/media/welcome/enable/canvas").filter(a => !extensions.some(i => a.endsWith(i)));
         let filePath = backgro[Math.floor(Math.random() * backgro.length)];
         let background = umaru.mainPath + "/media/welcome/enable/canvas/"+filePath
       if(typeof filePath === "undefined") return getNone();
    if (umaru.data['threads'][event.threadID] && umaru.data['threads'][event.threadID]['imageSrc'] === null) {
      try {
     let data = await kernel.readStream(['welcome'], {key: key, type: "welcome2", username: event.logMessageData.addedParticipants[event.logMessageData.addedParticipants.length - 1].fullName, groupname: await Threads.getName(event.threadID), memberLength: event.participantIDs.length, useravatar: await Users.getImage(event.logMessageData.addedParticipants[event.logMessageData.addedParticipants.length - 1].userFbId), background: await readImage(background)});
     await kernel.writeStream(umaru.sdcard + `/Pictures/${getKey}.jpg`, data)
              
  return api.sendMessage({body: Welcome, attachment: fs.createReadStream(umaru.sdcard + `/Pictures/${getKey}.jpg`) }, event.threadID, (err) => {
   if(fs.existsSync(umaru.sdcard + `/Pictures/${getKey}.jpg`)) fs.unlinkSync(umaru.sdcard + `/Pictures/${getKey}.jpg`);
   if(err) getNone()
  })
      } catch {
        return getNone();
      }
    } else {
      try {
  let data = await kernel.readStream(["welcome"], {key: key, type: "welcome1", username: event.logMessageData.addedParticipants[event.logMessageData.addedParticipants.length - 1].fullName, groupname: await Threads.getName(event.threadID), memberLength: event.participantIDs.length, groupavatar: await Threads.getImage(event.threadID),  useravatar: await Users.getImage(event.logMessageData.addedParticipants[event.logMessageData.addedParticipants.length - 1].userFbId), background: await readImage(background)});
  await kernel.writeStream(umaru.sdcard + `/Pictures/${getKey}.jpg`, data)

  return api.sendMessage({body: Welcome, attachment: fs.createReadStream(umaru.sdcard + `/Pictures/${getKey}.jpg`) }, event.threadID, (err) => {
   if(fs.existsSync(umaru.sdcard + `/Pictures/${getKey}.jpg`)) fs.unlinkSync(umaru.sdcard + `/Pictures/${getKey}.jpg`);
   if(err) getNone()
  })
        } catch {
          return getNone();
        }
}
}
     async function getGifCanvas() {
       let extensions = [".welcome.gif",".welcome2.gif"];
         let backgro = fs.readdirSync(umaru.mainPath + "/media/welcome/enable/gifcanvas").filter(a => !extensions.some(i => a.endsWith(i)));
         let filePath = backgro[Math.floor(Math.random() * backgro.length)];
         let background = umaru.mainPath + "/media/welcome/enable/gifcanvas/"+filePath
       if(typeof filePath === "undefined") return getNone();
    if (umaru.data['threads'][event.threadID]&& umaru.data['threads'][event.threadID]['imageSrc'] === null) {
      try {
     let data = await kernel.readStream(['welcome'], {key: key, type: "gifwelcome2", username: event.logMessageData.addedParticipants[event.logMessageData.addedParticipants.length - 1].fullName, groupname: await Threads.getName(event.threadID), memberLength: event.participantIDs.length, useravatar: await Users.getImage(event.logMessageData.addedParticipants[event.logMessageData.addedParticipants.length - 1].userFbId), background: await readImage(background)});
     await kernel.writeStream(umaru.sdcard + `/Pictures/${getKey}.gif`, data)

    return api.sendMessage({body: Welcome, attachment: fs.createReadStream(umaru.sdcard + `/Pictures/${getKey}.gif`) }, event.threadID, (err) => {
    if(fs.existsSync(umaru.sdcard + `/Pictures/${getKey}.gif`)) fs.unlinkSync(umaru.sdcard + `/Pictures/${getKey}.gif`);
    if(err) getNone()
    })
      } catch {
        return getNone();
      }
    } else {
      try {
    let data = await kernel.readStream(["welcome"], {key: key, type: "gifwelcome1", username: event.logMessageData.addedParticipants[event.logMessageData.addedParticipants.length - 1].fullName, groupname: await Threads.getName(event.threadID), memberLength: event.participantIDs.length, groupavatar: await Threads.getImage(event.threadID),  useravatar: await Users.getImage(event.logMessageData.addedParticipants[event.logMessageData.addedParticipants.length - 1].userFbId), background: await readImage(background)});
    await kernel.writeStream(umaru.sdcard + `/Pictures/${getKey}.gif`, data)

    return api.sendMessage({body: Welcome, attachment: fs.createReadStream(umaru.sdcard + `/Pictures/${getKey}.gif`) }, event.threadID, (err) => {
    if(fs.existsSync(umaru.sdcard + `/Pictures/${getKey}.gif`)) fs.unlinkSync(umaru.sdcard + `/Pictures/${getKey}.gif`);
    if(err) getNone()
    })
        } catch {
          return getNone();
        }
    }
    }
function getImage() {
 let extensions = [".jpg",".jpeg",".png"];
 let backgro = fs.readdirSync(umaru.mainPath + "/media/welcome/enable/random").filter(a => extensions.some(i => !a.endsWith(".mp4.jpg") && a.endsWith(i)));
 let filePath = backgro[Math.floor(Math.random() * backgro.length)];
 let background = umaru.mainPath + "/media/welcome/enable/random/"+filePath
 if(typeof filePath === "undefined") return getNone();
 return api.sendMessage({body: Welcome, attachment: fs.createReadStream(background) }, event.threadID, (err) => {
   if(err) getNone()
 })
}
function getVideo() {
 let extensions = [".mp4",".mov",".avi",".flv",".wmv",".mkv",".m4v",".mpg",".mpeg",".3gp",".webm"];
 let backgro = fs.readdirSync(umaru.mainPath + "/media/welcome/enable/random").filter(a => extensions.some(i => a.endsWith(i)));
 let filePath = backgro[Math.floor(Math.random() * backgro.length)];
 let background = umaru.mainPath + "/media/welcome/enable/random/"+filePath
 if(typeof filePath === "undefined") return getNone();
 return api.sendMessage({body: Welcome, attachment: fs.createReadStream(background) }, event.threadID, (err) => {
   if(err) getNone()
 })
}
function getGif() {
 let extensions = [".gif"];
 let backgro = fs.readdirSync(umaru.mainPath + "/media/welcome/enable/random").filter(a => extensions.some(i => a.endsWith(i)));
 let filePath = backgro[Math.floor(Math.random() * backgro.length)];
 let background = umaru.mainPath + "/media/welcome/enable/random/"+filePath;
 if(typeof filePath === "undefined") return getNone();
 return api.sendMessage({body: Welcome, attachment: fs.createReadStream(background) }, event.threadID, (err) => {
   if(err)  getNone()
 })
}
function getNone() {
   return api.sendMessage({body: Welcome}, event.threadID)
 }
 function getRandom() {
   let extensions = [".mp4",".mov",".avi",".flv",".wmv",".mkv",".m4v",".mpg",".mpeg",".3gp", ".webm",".jpg",".jpeg",".png",".gif"];
   let backgro = fs.readdirSync(umaru.mainPath + "/media/welcome/enable/random").filter(a => extensions.some(i => !a.endsWith(".mp4.jpg") && a.endsWith(i)));
   let filePath = backgro[Math.floor(Math.random() * backgro.length)];
   let background = umaru.mainPath + "/media/welcome/enable/random/"+filePath;
   if(typeof filePath === "undefined") return getNone();
   return api.sendMessage({body: Welcome, attachment: fs.createReadStream(background) }, event.threadID, (err) => {
     if(err) getNone()
   })
 }
  }
}