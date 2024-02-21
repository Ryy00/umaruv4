import fs from 'fs';
import axios from 'axios';
export const setup = {
    name: "video",
    version: "40.0.0",
    permission: "Users",
    creator: "John Lester",
    description: "Get a video through youtube",
    category: "media",
    usages: ["[title]"],
    mainScreenshot: ["/media/video/screenshot/1.jpg", "/media/video/screenshot/2.jpg"],
    screenshot: ["/media/video/screenshot/1.jpg", "/media/video/screenshot/2.jpg"],
    cooldown: 30,
    isPrefix: true
};
export const domain = {"video": setup.name}
export const execCommand = async function({api, args, event, prefix, kernel, key, reply, usage, keyGenerator,   umaru, translate}) {
    if(args.length === 0) return usage(this, prefix, event);
    let { ID } = await reply.read({
        name: this.setup.name,
        author: event.senderID
    });
    if(typeof ID === "string") api.unsendMessage(ID);
    await umaru.createJournal(event);
    let data = await kernel.read(["videometa"], {key: key, search: args.join(" ")});
    let text = (await translate("🔎 There are {{1}} search results here:", event, null, true)).replace("{{1}}", data.length)+"\n";
    let read = [];
    let dir = [];
    let format = {"1": "⓵","2":"⓶","3":"⓷","4":"⓸","5":"⓹","6":"⓺","7":"⓻","8":"⓼","9":"⓽","10":"⓾"};
    for(let i = 0; i < data.length; i++) {
        let path = umaru.sdcard+"/Pictures/"+keyGenerator()+".jpg";
        let order = (i+1).toString();
        text += order.replace(order, format[order])+" "+"《 "+data[i].duration+" 》"+data[i].title+"\n\n";
        let thumbnail = (await axios.get(data[i].thumbnail, {responseType: "stream"})).data;
        await kernel.writeStream(path, thumbnail);
        dir.push(path);
        read.push(fs.createReadStream(path));
    }
    text += await translate("» Reply with the order number that you want to choose.", event, null, true);
   return api.sendMessage({body: text, attachment: read}, event.threadID, async (err, info) => {
        let ctx = {
            name: this.setup.name,
            author: event.senderID,
            ID: info.messageID,
            data: data
        }
        await reply.create(ctx);
        await umaru.deleteJournal(event);
        for(const item of dir) {
            await fs.promises.unlink(item)
        }
    }, event.messageID)
}
export const execReply = async function({api, args, kernel, key, event, reply,   umaru, keyGenerator, translate}) {
    let ctx = {
        name: this.setup.name,
        author: event.senderID
    }
    let { data } = await reply.read(ctx);
    let { ID } = await reply.read(ctx);
    let choose = parseInt(args.join(" "));
    if(isNaN(choose) || !(data.length >= choose)) return;
    api.unsendMessage(ID);
    for(let i = 0; i < data.length; i++) {
        if((i+1) === choose) {
            try {
            let video = await kernel.read(["video"], {key: key, url: data[i].url, defaultLink: true});
            if(video && video.success == false) return api.sendMessage((await translate("⚠️ An error occurred:", event, null, true))+" "+data.msg, event.threadID, event.messageID);
            await umaru.createJournal(event);
            let getVideo = await kernel.readStream(["getVideo"], {key: key, ID: video.ID, defaultLink: video.defaultLink});
            let path = umaru.sdcard + "/Download/"+keyGenerator()+".mp4";
            await kernel.writeStream(path, getVideo);
            api.sendMessage({body: data[i].title, attachment: fs.createReadStream(path)}, event.threadID, async (e) => {
                await umaru.deleteJournal(event);
                await fs.promises.unlink(path);
              if(e) return api.sendMessage((await translate("⚠️ An error occurred", event, null, true)), event.threadID, event.messageID)
            },event.messageID);
        } catch (e) {
            await umaru.deleteJournal(event);
            return api.sendMessage((await translate("⚠️ An error occurred", event, null, true)),  event.threadID, event.messageID)
        }
            break;
            
        }
    }
}