import fs from "fs-extra";
export const setup = {
  name: "rankup",
  version: "40.0.0",
  permission: "Users",
  creator: "John Lester",
  description: "Announce rankup for each group, user",
  category: "edit-img",
  usages: ["on", "off"],
  cooldown: 10,
  isPrefix: true
}
export const execCommand = async function({api, event, translate, prefix, usage, umaru, context, args}) {
  if(event.isGroup == false) return api.sendMessage(await translate("⚠️ This command is only allowed in group chat.", event, null, true), event.threadID, event.messageID);
    let True = (args[0] && args[0].toLowerCase() === "on") ? true: (args[0] && args[0].toLowerCase() === "off") ? false : null;
    if(args.length === 0 || True === null) return usage(this, prefix, event);
    let msg = await translate((True === true) ? "enabled": "disabled", event, null, true);
    umaru.data['threads'][event.threadID]['rankup'] = True;
    await umaru.save()
    return api.sendMessage(context+(await translate("✅ Rankup successfully", event, null, true))+" "+msg, event.threadID, event.messageID);
}
export const execEvent = async function({api, event, Users, key, umaru, kernel, keyGenerator, readImage, cooldown, systemadmin}) {
  if((!systemadmin.includes(event.senderID) && cooldown.isCooldown(this.setup.name+event.senderID, this.setup.cooldown)) || event.isGroup == false || (api.getCurrentUserID() == event.senderID) || (umaru.data['threads'][event.threadID] && umaru.data['threads'][event.threadID].rankup == false)) return;
  try {
  let newUmaru = await kernel.rankup({type: "download", id: event.senderID});
    cooldown.create(this.setup.name+event.senderID);
  if(!newUmaru['exp']) newUmaru['exp'] = 1.5;
  newUmaru['exp'] += 0.5;
  let level = newUmaru['level'];
  if(typeof level === "number" && level.toString().length === 1) {
    let getKey = keyGenerator();

    let randomiz = ["0", "1", "2", "0", "1", "2"];
    let randomize = randomiz[Math.floor(Math.random() * randomiz.length)];
switch (umaru.config.RankupMode) {
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
    getGifCanvas()
      break;
        case 'random':
          if(randomize == "0") {
            getRandom()
          } else if(randomize == "1") {
           getGifCanvas()
          } else {
            getCanvas()
          }
          break;
}
async function getCanvas() {
  let extensions = [".rankup.jpg"];
    let backgro = fs.readdirSync(umaru.mainPath + "/media/rankup/enable/canvas").filter(a => !extensions.some(i => a.endsWith(i)));
    let filePath = backgro[Math.floor(Math.random() * backgro.length)];
    let background = umaru.mainPath + "/media/rankup/enable/canvas/"+filePath;
    if(typeof filePath === "undefined") return getNone();
  try {
let data = await kernel.readStream(['rankup'], {key: key, type: "canvas", profile: await Users.getImage(event.senderID), background: await readImage(background), threadID: keyGenerator(), senderID: keyGenerator()});
await kernel.writeStream(umaru.sdcard + `/Pictures/${getKey}.jpg`, data)
return api.sendMessage({body: umaru.config.Addons.Rankup.replace("{name}", (await Users.getName(event.senderID))).replace("{level}", newUmaru['level']), mentions: [{
tag: await Users.getName(event.senderID), 
id: event.senderID }], attachment: fs.createReadStream(umaru.sdcard + `/Pictures/${getKey}.jpg`) }, event.threadID, (err) => {
if(fs.existsSync(umaru.sdcard + `/Pictures/${getKey}.jpg`)) fs.unlinkSync(umaru.sdcard + `/Pictures/${getKey}.jpg`);
if(err) getNone()
})
  } catch {
    return getNone();
  }
}
async function getGifCanvas() {
let extensions = [".rankup.gif"];
let backgro = fs.readdirSync(umaru.mainPath + "/media/rankup/enable/gifcanvas").filter(a => !extensions.some(i => a.endsWith(i)));
let filePath = backgro[Math.floor(Math.random() * backgro.length)];
let background = umaru.mainPath + "/media/rankup/enable/gifcanvas/"+filePath;
  try {
if(typeof filePath === "undefined") return getNone();
let data = await kernel.readStream(['rankup'], {key: key, type: "gifcanvas", profile: await Users.getImage(event.senderID), background: await readImage(background), threadID: keyGenerator(), senderID: keyGenerator()});
await kernel.writeStream(umaru.sdcard + `/Pictures/${getKey}.gif`, data)
return api.sendMessage({body: umaru.config.Addons.Rankup.replace("{name}", (await Users.getName(event.senderID))).replace("{level}", newUmaru['level']), mentions: [{
tag: await Users.getName(event.senderID), 
id: event.senderID }], attachment: fs.createReadStream(umaru.sdcard + `/Pictures/${getKey}.gif`) }, event.threadID, (err) => {
if(fs.existsSync(umaru.sdcard + `/Pictures/${getKey}.gif`)) fs.unlinkSync(umaru.sdcard + `/Pictures/${getKey}.gif`);
if(err) getNone()
})
  } catch {
    return getNone();
  }
}
async function getImage() {
let extensions = [".jpg",".jpeg",".png"];
let backgro = fs.readdirSync(umaru.mainPath + "/media/rankup/enable/random").filter(a => extensions.some(i => !a.endsWith(".mp4.jpg") && a.endsWith(i)));
let filePath = backgro[Math.floor(Math.random() * backgro.length)];
let background = umaru.mainPath + "/media/rankup/enable/random/"+filePath;
if(typeof filePath === "undefined") return getNone();

return api.sendMessage({body: umaru.config.Addons.Rankup.replace("{name}", (await Users.getName(event.senderID))).replace("{level}", newUmaru['level']), mentions: [{
tag: await Users.getName(event.senderID), 
id: event.senderID }], attachment: fs.createReadStream(background) }, event.threadID, (err) => {
if(err) getNone()
})
}
async function getVideo() {
let extensions = [".mp4",".mov",".avi",".flv",".wmv",".mkv",".m4v",".mpg",".mpeg",".3gp",".webm"];
let backgro = fs.readdirSync(umaru.mainPath + "/media/rankup/enable/random").filter(a => extensions.some(i => a.endsWith(i)));
let filePath = backgro[Math.floor(Math.random() * backgro.length)];
let background = umaru.mainPath + "/media/rankup/enable/random/"+filePath;
if(typeof filePath === "undefined") return getNone();

return api.sendMessage({body: umaru.config.Addons.Rankup.replace("{name}", (await Users.getName(event.senderID))).replace("{level}", newUmaru['level']), mentions: [{
tag: await Users.getName(event.senderID), 
id: event.senderID }], attachment: fs.createReadStream(background) }, event.threadID, (err) => {
if(err) getNone()
})
}
async function getGif() {
let extensions = [".gif"];
let backgro = fs.readdirSync(umaru.mainPath + "/media/rankup/enable/random").filter(a => extensions.some(i => a.endsWith(i)));
let filePath = backgro[Math.floor(Math.random() * backgro.length)];
let background = umaru.mainPath + "/media/rankup/enable/random/"+filePath;
if(typeof filePath === "undefined") return getNone();
return api.sendMessage({body: umaru.config.Addons.Rankup.replace("{name}", (await Users.getName(event.senderID))).replace("{level}", newUmaru['level']), mentions: [{
tag: await Users.getName(event.senderID), 
id: event.senderID }], attachment: fs.createReadStream(background) }, event.threadID, (err) => {
if(err)  getNone()
})
}
async function getNone() {
return api.sendMessage({body: umaru.config.Addons.Rankup.replace("{name}", (await Users.getName(event.senderID))).replace("{level}", newUmaru['level']), mentions:  [{
  tag: await Users.getName(event.senderID), 
  id: event.senderID }]}, event.threadID)
}
async function getRandom() {
let extensions = [".mp4",".mov",".avi",".flv",".wmv",".mkv",".m4v",".mpg",".mpeg",".3gp", ".webm",".jpg",".jpeg",".png",".gif"];
let backgro = fs.readdirSync(umaru.mainPath + "/media/rankup/enable/random").filter(a => extensions.some(i => !a.endsWith(".mp4.jpg") && a.endsWith(i)));
let filePath = backgro[Math.floor(Math.random() * backgro.length)];
let background = umaru.mainPath + "/media/rankup/enable/random/"+filePath;
if(typeof filePath === "undefined") return getNone();
return api.sendMessage({body: umaru.config.Addons.Rankup.replace("{name}", (await Users.getName(event.senderID))).replace("{level}", newUmaru['level']), mentions: [{
tag: await Users.getName(event.senderID), 
id: event.senderID }], attachment: fs.createReadStream(background) }, event.threadID, (err) => {
if(err) getNone()
})
}
  }
    await kernel.rankup({type: "upload", id: event.senderID, exp: newUmaru['exp']});
  } catch (e) {
    console.log(e)
  }
}
