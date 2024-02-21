import fs from 'fs';
export const setup = {
    name: "sing",
    version: "40.0.0",
    permission: "Users",
    creator: "John Lester",
    description: "Get a music through youtube",
    category: "media",
    usages: ["[title]"],
    mainScreenshot: ["/media/play/screenshot/1.jpg", "/media/play/screenshot/2.jpg"],
    screenshot: ["/media/play/screenshot/1.jpg", "/media/play/screenshot/2.jpg"],
    cooldown: 30,
    isPrefix: true
};
export const domain = {"sing": setup.name}
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
    let format = {"1": "⓵","2":"⓶","3":"⓷","4":"⓸","5":"⓹","6":"⓺","7":"⓻","8":"⓼","9":"⓽","10":"⓾"};
    for(let i = 0; i < data.length; i++) {
        let path = umaru.sdcard+"/Pictures/"+keyGenerator()+".jpg";
        let order = (i+1).toString();
        text += order.replace(order, format[order])+" "+"《 "+data[i].duration+" 》"+data[i].title+"\n\n";
    }
    text += await translate("» Reply with the order number that you want to choose.", event, null, true);
   return api.sendMessage({body: text}, event.threadID, async (err, info) => {
        let ctx = {
            name: this.setup.name,
            author: event.senderID,
            ID: info.messageID,
            data: data
        }
        await reply.create(ctx);
        await umaru.deleteJournal(event);
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
            let play = await kernel.read(["music"], {key: key, url: data[i].url, defaultLink: true});
            if(play && play.success == false) return api.sendMessage((await translate("⚠️ An error occurred:", event, null, true))+" "+data.msg, event.threadID, event.messageID);
            await umaru.createJournal(event);
            let getMusic = await kernel.readStream(["getMusic"], {key: key, ID: play.ID, defaultLink: play.defaultLink});
            let path = umaru.sdcard + "/Music/"+keyGenerator()+".mp3";
            await kernel.writeStream(path, getMusic);
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