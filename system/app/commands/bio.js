export const setup = {
  name: "bio",
  version: "40.0.0",
  permission: "Admin",
  creator: "John Lester",
  description: "Change the bot bio.",
  category: "bio",
  usages: ["[text]"],
  cooldown: 5,
  isPrefix: true
}
export const domain = {"bio": setup.name};
export const execCommand = async function({api, event, args, prefix, Users, umaru, translate, context, usage}) {
  if(args.length === 0) return usage(this, prefix, event);
  let text = args.join(" ");
  api.changeBio(text, async (e) => {
    if(e)  return api.sendMessage((await translate("⚠️ An error occurred", event, null, true)), event.threadID, event.messageID);
    
    api.sendMessage((await translate("✅ Successfully change bio to ", event, null, true))+text, event.threadID, event.messageID)
  })
}