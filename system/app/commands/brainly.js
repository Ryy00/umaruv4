export const setup = {
    name: "brainly",
    version: "40.0.0",
    permission: "Users",
    creator: "John Lester",
    description: "Get answer using brainly",
    category: "Education",
    usages: ["ph [question]", "id [question]"],
    mainScreenshot: ["/media/brainly/screenshot/1.jpg", "/media/brainly/screenshot/2.jpg"],
    screenshot: ["/media/brainly/screenshot/1.jpg", "/media/brainly/screenshot/2.jpg"],
    cooldown: 5,
  isPrefix: true
};
export const execCommand = async function({api, args, event, prefix, kernel, key, reply, usage, translate}) {
    if(args.length === 0 || args.length === 1) return usage(this, prefix, event);
    let { ID } = await reply.read({
        name: this.setup.name,
        author: event.senderID
    });
    if(typeof ID === "string") api.unsendMessage(ID);
    let domain = args[0].toLowerCase();
    let data;
    if(domain === "ph" || domain === "id") {
     args.shift();
     data = await kernel.brainly({key: key, domain: domain, question: args.join(" ")});
    } else {
        return usage(this, prefix, event);
    }
    let format = {"1": "⓵","2":"⓶","3":"⓷","4":"⓸","5":"⓹","6":"⓺","7":"⓻","8":"⓼","9":"⓽","10":"⓾"}
    let text = (await translate("🔎 There are {{1}} search results here:", event, null, true)).replace("{{1}}", data.length)+"\n";
    for(let i = 0; i < data.length; i++) {
        let order = (i+1).toString();
        text += order.replace(order, format[order])+" "+ data[i].question+"\n\n";
    }
    text += await translate("» Reply with the order number that you want to choose.", event, null, true);
   return api.sendMessage(text, event.threadID, async (err, info) => {
        let ctx = {
            name: this.setup.name,
            author: event.senderID,
            ID: info.messageID,
            data: data,
            type: "brainly"
        }
        await reply.create(ctx)
    }, event.messageID)
}
export const execReply = async function({api, args, event, reply}) {
    let ctx = {
        name: this.setup.name,
        author: event.senderID
    }
    let { data, type } = await reply.read(ctx);
    if(type != "brainly") return;
    let choose = parseInt(args.join(" "));
    if(isNaN(choose) || !(data.length >= choose)) return;
    for(let i = 0; i < data.length; i++) {
        if((i+1) === choose) {
            api.sendMessage(data[i].answers, event.threadID, event.messageID);
            break;
        }
    }
}