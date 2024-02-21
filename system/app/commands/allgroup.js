export const setup = {
  name: "allgroup",
  version: "40.0.0",
  permission: "Admin",
  creator: "John Lester",
  description: "Lists of thread",
  category: "General",
  usages: ["[page number]"],
  cooldown: 10,
  isPrefix: true
};
export const domain = {"allgroup": setup.name};
export const execCommand = async function({api, event, args, Threads, umaru}) {
  let count = 0;
  let thread = [];
  for(const item in umaru.data.threads) {
    count += 1;
    thread.push(`${count}. ${await Threads.getName(item)}\n🔰 𝐓𝐈𝐃: ${item}`)
  }
  for(const item in umaru.data.threadBackup) {
    count += 1;
     thread.push(`${count}. ${await Threads.getName(item)}\n🔰 𝐓𝐈𝐃: ${item}`);
  }
  let page = parseInt(args[0]) || 1;
  let num = 50
  let i = 1 + page * num - 10;
  let cut = page * num - num;
  thread = thread.slice(cut, cut + num)
  let msg = `✨ There are currently ${umaru.allThreadID.length} groups\n\n${thread.join("\n")}\n\nPage: ${page}/${Math.ceil(umaru.allThreadID.length / num)}`;
  return api.sendMessage(msg, event.threadID, event.messageID)
}
