export const setup = {
  name: "teach",
  version: "40.0.0",
  permission: "Users",
  creator: "John Lester",
  description: "Teach the simsimi",
  category: "chatbot",
  usages: ["[ask] -> [answer]"],
  mainScreenshot: ["/media/teach/screenshot/main.jpg"],
  screenshot: ["/media/teach/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"teach": setup.name}
export const execCommand = async function({api, event, key, kernel, umaru, args, keyGenerator, Users, context, translate, usage, prefix}) {
  if(args.length === 0) return usage(this, prefix, event);
  let text = args.join(" ");
  if(!text.includes("->")) return usage(this, prefix, event);
  let ask = text.split("->")[0].trim();
  let answer = text.split("->")[1].trim();
  if(ask === "" || typeof answer == "undefined" || answer == "") return usage(this, prefix, event);
  let data = await kernel.read(["teach"], {key: key, id: event.senderID, ask: ask, answer: answer});
  if(data.success == true) {
    let msg = `✨ Successfully teach\n\nAsk: ${ask}\nAnswer: ${answer}`;
    return api.sendMessage(msg, event.threadID, event.messageID)
  } else {
    return api.sendMessage((await translate("⚠️ An error occurred", event, null, true)),  event.threadID, event.messageID)
  }
}