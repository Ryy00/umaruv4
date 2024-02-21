export const setup = {
  name: "top",
  version: "40.0.0",
  permission: "Users",
  creator: "John Lester",
  description: "Top users and threads",
  category: "Rank",
  usages: ["user [page number]", "thread [page number]", "money [page number]"],
  cooldown: 0,
  isPrefix: true
}
export const execCommand = async function({api, event, args, Users, umaru, setData, key, kernel, usage, Threads, prefix}) {
  if(args.length === 0) return usage(this, prefix, event);
  if(args[0].toLowerCase() == "user") {
    let op = {};
    let top = {};
    let co = 0;
    for(const item in umaru.data.users) {
      if(umaru.data.users[item] && typeof umaru.data.users[item].exp == "number") {
        let newUmaru = await kernel.rankup({type: "download", id: item});
        co += 0.000000001;
        op[`${parseFloat((newUmaru.level)?newUmaru.level:0+co)}`] = item;
      }
    }
    let vectors = Object.keys(op).sort((a, b) => b - a);
      let pages = parseInt(args.splice(1).join(" ").match(/\b\d+\b/g)) || 1;
      let page = 20;
      let data = '';
      let ID = vectors;
      let datas;
      let infi = "\n\n";
      let haha = ""
        datas = ID.slice((pages * page) - page, pages * page);
        haha =  "\n" + "Page: "+pages+"/"+Math.ceil(ID.length / page)
      let count = (pages == 1) ? 1 : ((pages * page) - 10) + 1;
      for (const item of datas) {
        data += `${count++}. ${await Users.getName(op[item])} - level ${parseInt(Math.floor(item))}\n`
      }
     return api.sendMessage(`Top ${ID.length} Highest Ranked User` + infi +  data +haha, event.threadID, event.messageID);
  } else if(args[0].toLowerCase() == "thread") {
    let op = {};
    let top = {};
    for(const item in umaru.data.threads) {
      if(umaru.data.threads[item] && umaru.data.threads[item].messageCount) {
        op[`${umaru.data.threads[item].messageCount}`] = item;
      }
    }
      let vectors = Object.keys(op).sort((a, b) => b - a);
      let pages = parseInt(args.splice(1).join(" ").match(/\b\d+\b/g)) || 1;
      let page = 20;
      let data = '';
      let ID = vectors;
      let datas;
      let infi = "\n\n";
      let haha = ""
        datas = ID.slice((pages * page) - page, pages * page);
        haha =  "\n" + "Page: "+pages+"/"+Math.ceil(ID.length / page)
      let count = (pages == 1) ? 1 : ((pages * page) - 10) + 1;

      for (const item of datas) {
        data += `${count++}. ${await Threads.getName(op[item])}\nTID: ${op[item]}\nNumber of message: ${item} message\n\n`
      }

     return api.sendMessage(`Top ${ID.length} Groups Have The Most Number Of Message:` + infi +  data +haha, event.threadID, event.messageID);
  } else if(args[0].toLowerCase() == "money") {
    let op = {};
    let top = {};
    let co = 0;
    for(const item in umaru.data.users) {
      if(umaru.data.users[item] && typeof umaru.data.users[item].money == "number") {
        co += 0.000000001;
        op[`${parseFloat(umaru.data.users[item].money+co)}`] = item;
      }
    }
    let vectors = Object.keys(op).sort((a, b) => b - a);
      let pages = parseInt(args.splice(1).join(" ").match(/\b\d+\b/g)) || 1;
      let page = 20;
      let data = '';
      let ID = vectors;
      let datas;
      let infi = "\n\n";
      let haha = ""
        datas = ID.slice((pages * page) - page, pages * page);
        haha =  "\n" + "Page: "+pages+"/"+Math.ceil(ID.length / page)
      let count = (pages == 1) ? 1 : ((pages * page) - 10) + 1;
      for (const item of datas) {
        data += `${count++}. ${await Users.getName(op[item])} - ${parseInt(Math.floor(item))} 💵\n`
      }

     return api.sendMessage(`Top ${ID.length} People Richest On Server!:` + infi +  data +haha, event.threadID, event.messageID);
  } else {
    return usage(this, prefix, event);
  }
}