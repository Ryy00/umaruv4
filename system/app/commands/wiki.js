export const setup = {
  name: "wiki",
  version: "40.0.0",
  permission: "Users",
  creator: "John Lester",
  description: "Containing information on all branches of knowledge",
  category: "Education",
  usages: ["[text]"],
  mainScreenshot: ["/media/wiki/screenshot/main.jpg"],
  screenshot: ["/media/wiki/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"wiki": setup.name}
export const execCommand = async function({api, event, key, kernel, args,   usage, prefix}) {
  let text = args.join(" ");
  if (!text) return usage(this, prefix, event);
  await umaru.createJournal(event);
  let info = await kernel.read(["wiki"], {key: key, text: text});
  return api.sendMessage(info, event.threadID, async() => {
    await umaru.deleteJournal(event);
  }, event.messageID)
}