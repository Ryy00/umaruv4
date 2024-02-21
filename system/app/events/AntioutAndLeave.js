import fs from "fs-extra";
export const setup = {
    name: "AntioutAndLeave",
    setEvent: ["log:unsubscribe"],
    creator: "John Lester",
    version: "40.0.0",
    description: "Prevent members from leaving the group and Leaving card when members kick or leave",
    screenshot: ["/media/antiout/screenshot/Screenshot_20231018_235657.jpg", "/media/leave/screenshot/Screenshot_20230903_093108.jpg", "/media/leave/screenshot/Screenshot_20230903_120008.jpg"]
  }
  export const exec = async function({api, event, key, Users, umaru, keyGenerator, Threads, readImage, kernel, getAdminIDs, setData}) {
    if(typeof umaru.data['threads'][event.threadID]['antiout'] === "undefined") {
        umaru.data['threads'][event.threadID]['antiout'] = true
      await umaru.save();
    }
      let getKey = keyGenerator();
      const admins = await Threads.getAdminIDs(event.threadID);
      let ownId = api.getCurrentUserID();
    if(admins.includes(ownId) && umaru.data['threads'][event.threadID]['AntiChangeGroup']['admin'] == true && admins.includes(event.logMessageData.leftParticipantFbId) && event.author != ownId && event.author != event.logMessageData.leftParticipantFbId) return;
      if(event.logMessageData.leftParticipantFbId === ownId) return;
      let reason = (event.logMessageData.leftParticipantFbId === event.author) ? umaru.config.Addons.Leave.left : umaru.config.Addons.Leave.remove;
     let greet = umaru.config.Addons.Leave.goodbye.replace("{name}", await Users.getName(event.logMessageData.leftParticipantFbId)).replace("{reason}", reason);
     let randomiz = ["0", "2", "1", "2", "0", "1", "0", "1"];
     let randomize = randomiz[Math.floor(Math.random() * randomiz.length)];
    async function getCanvas() {
    let extensions = [".leave.jpg",".leave2.jpg"];
     let backgro = fs.readdirSync(umaru.mainPath + "/media/leave/enable/canvas").filter(a => !extensions.some(i => a.endsWith(i)));
     let filePath = backgro[Math.floor(Math.random() * backgro.length)];
     let background = umaru.mainPath + "/media/leave/enable/canvas/"+filePath;
     if(typeof filePath === "undefined") return getNone();
    if (umaru.data['threads'][event.threadID]['imageSrc'] === null) {
try {
    let data = await kernel.readStream(['leave'], {key: key, type: "leave2", username: await Users.getName(event.logMessageData.leftParticipantFbId), memberLength: event.participantIDs.length, useravatar: await Users.getImage(event.logMessageData.leftParticipantFbId), background: await readImage(background)});

    await kernel.writeStream(umaru.sdcard + `/Pictures/${getKey}.jpg`, data);
    return api.sendMessage({body: greet, attachment: fs.createReadStream(umaru.sdcard + `/Pictures/${getKey}.jpg`) }, event.threadID, (err) => {
    if(fs.existsSync(umaru.sdcard + `/Pictures/${getKey}.jpg`)) fs.unlinkSync(umaru.sdcard + `/Pictures/${getKey}.jpg`);
    if(err) getNone()
    })
  }  catch {
         return getNone();
      }
    } else {
      try {
    let data = await kernel.readStream(["leave"], {key: key, type: "leave1", username: await Users.getName(event.logMessageData.leftParticipantFbId), groupname: await Threads.getName(event.threadID), memberLength: event.participantIDs.length, groupavatar: await Threads.getImage(event.threadID),  useravatar: await Users.getImage(event.logMessageData.leftParticipantFbId), background: await readImage(background)});
    await kernel.writeStream(umaru.sdcard + `/Pictures/${getKey}.jpg`, data)
    return api.sendMessage({body: greet, attachment: fs.createReadStream(umaru.sdcard + `/Pictures/${getKey}.jpg`) }, event.threadID, (err) => {
    if(fs.existsSync(umaru.sdcard + `/Pictures/${getKey}.jpg`)) fs.unlinkSync(umaru.sdcard + `/Pictures/${getKey}.jpg`);
    if(err) getNone()
    })
        }  catch {
           return getNone();
        }
    }
    }
    async function getGifCanvas() {
    let extensions = [".leave.gif",".leave2.gif"];
     let backgro = fs.readdirSync(umaru.mainPath + "/media/leave/enable/gifcanvas").filter(a => !extensions.some(i => a.endsWith(i)));
     let filePath = backgro[Math.floor(Math.random() * backgro.length)];
     let background = umaru.mainPath + "/media/leave/enable/gifcanvas/"+filePath;
     if(typeof filePath === "undefined") return getNone();
    if (umaru.data['threads'][event.threadID]['imageSrc'] === null) {
    try {
    let data = await kernel.readStream(['leave'], {key: key, type: "gifleave2", username: await Users.getName(event.logMessageData.leftParticipantFbId), memberLength: event.participantIDs.length, useravatar: await Users.getImage(event.logMessageData.leftParticipantFbId), background: await readImage(background)});

    await kernel.writeStream(umaru.sdcard + `/Pictures/${getKey}.gif`, data);
    return api.sendMessage({body: greet, attachment: fs.createReadStream(umaru.sdcard + `/Pictures/${getKey}.gif`) }, event.threadID, (err) => {
    if(fs.existsSync(umaru.sdcard + `/Pictures/${getKey}.gif`)) fs.unlinkSync(umaru.sdcard + `/Pictures/${getKey}.gif`);
    if(err) getNone()
    })
    }  catch {
         return getNone();
      }
    } else {
      try {
    let data = await kernel.readStream(["leave"], {key: key, type: "gifleave1", username: await Users.getName(event.logMessageData.leftParticipantFbId), groupname: await Threads.getName(event.threadID), memberLength: event.participantIDs.length, groupavatar: await Threads.getImage(event.threadID),  useravatar: await Users.getImage(event.logMessageData.leftParticipantFbId), background: await readImage(background)});
    await kernel.writeStream(umaru.sdcard + `/Pictures/${getKey}.gif`, data)
    return api.sendMessage({body: greet, attachment: fs.createReadStream(umaru.sdcard + `/Pictures/${getKey}.gif`) }, event.threadID, (err) => {
    if(fs.existsSync(umaru.sdcard + `/Pictures/${getKey}.gif`)) fs.unlinkSync(umaru.sdcard + `/Pictures/${getKey}.gif`);
    if(err) getNone()
    })
        }  catch {
           return getNone();
        }
    }
    }
    function getImage() {
    let extensions = [".jpg",".jpeg",".png"];
    let backgro = fs.readdirSync(umaru.mainPath + "/media/leave/enable/random").filter(a => extensions.some(i => !a.endsWith(".mp4.jpg") && a.endsWith(i)));
    let filePath = backgro[Math.floor(Math.random() * backgro.length)];
    let background = umaru.mainPath + "/media/leave/enable/random/"+filePath;
    if(typeof filePath === "undefined") return getNone();
    return api.sendMessage({body: greet, attachment: fs.createReadStream(background) }, event.threadID, (err) => {
    if(err) getNone()
    })
    }
    function getVideo() {
    let extensions = [".mp4",".mov",".avi",".flv",".wmv",".mkv",".m4v",".mpg",".mpeg",".3gp",".webm"];
    let backgro = fs.readdirSync(umaru.mainPath + "/media/leave/enable/random").filter(a => extensions.some(i => a.endsWith(i)));
    let filePath = backgro[Math.floor(Math.random() * backgro.length)];
    let background = umaru.mainPath + "/media/leave/enable/random/"+filePath;
    if(typeof filePath === "undefined") return getNone();
    return api.sendMessage({body: greet, attachment: fs.createReadStream(background) }, event.threadID, (err) => {
    if(err) getNone()
    })
    }
    function getGif() {
    let extensions = [".gif"];
    let backgro = fs.readdirSync(umaru.mainPath + "/media/leave/enable/random").filter(a => extensions.some(i => a.endsWith(i)));
    let filePath = backgro[Math.floor(Math.random() * backgro.length)];
    let background = umaru.mainPath + "/media/leave/enable/random/"+filePath;
    if(typeof filePath === "undefined") return getNone();
    return api.sendMessage({body: greet, attachment: fs.createReadStream(background) }, event.threadID, (err) => {
    if(err)  getNone()
    })
    }
    function getNone() {
    return api.sendMessage({body: greet}, event.threadID)
    }
    function getRandom() {
    let extensions = [".mp4",".mov",".avi",".flv",".wmv",".mkv",".m4v",".mpg",".mpeg",".3gp", ".webm",".jpg",".jpeg",".png",".gif"];
    let backgro = fs.readdirSync(umaru.mainPath + "/media/leave/enable/random").filter(a => extensions.some(i => !a.endsWith(".mp4.jpg") && a.endsWith(i)));
    let filePath = backgro[Math.floor(Math.random() * backgro.length)];
    let background = umaru.mainPath + "/media/leave/enable/random/"+filePath;
    if(typeof filePath === 'undefined') return getNone();
    return api.sendMessage({body: greet, attachment: fs.createReadStream(background) }, event.threadID, (err) => {
    if(err) getNone()
    })
    }
    if(umaru.data['threads'][event.threadID] && umaru.data['threads'][event.threadID]['antiout'] == true && event.author == event.logMessageData.leftParticipantFbId) {
        let name = await Users.getName(event.logMessageData.leftParticipantFbId);
        api.addUserToGroup(event.logMessageData.leftParticipantFbId, event.threadID, (error, info) => {
            if (error) {
             api.sendMessage(`❎ Unable to re-add member ${name} to the group`, event.threadID);
              switch (umaru.config.LeaveMode) {
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
                     } else {
                       getCanvas()
                     }
                     break;
              }
            } else {
                api.sendMessage(`✅ Active anti-out mode. ${name} has been re-added to the group!`, event.threadID);
            }
           })
    } else {
      switch (umaru.config.LeaveMode) {
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
          case 'gifcanvas':
            getGifCanvas();
            break;
         case 'video':
           getVideo()
           break;
        case 'random':
         if(randomize == "0") {
           getRandom()
         } else if(randomize == "2") {
            getGifCanvas();
         } else {
           getCanvas()
         }
         break;
      }
    }
  }