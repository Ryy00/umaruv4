export const setup = {
    name: "nsfw",
    version: "40.0.0",
    permission: "GroupAdmin",
    creator: "John Lester",
    description: "Enable and disable the NSFW",
    category: "General",
    usages: [
        "on",
        "off"
    ],
    mainScreenshot: ["/media/nsfw/screenshot/main.jpg"],
    screenshot: ["/media/nsfw/screenshot/main.jpg"],
    cooldown: 5,
    isPrefix: true
};
export const domain = {"nsfw": setup.name}
export const execCommand = async function({api, event, args, prefix, usage, translate, context, umaru}) {
  if(event.isGroup == false) return api.sendMessage(await translate("⚠️ This command is only allowed in group chat.", event, null, true), event.threadID, event.messageID);
    let True = (args[0] && args[0].toLowerCase() === "on") ? true: (args[0] && args[0].toLowerCase() === "off") ? false : null;
    if(args.length === 0 || True === null) return usage(this, prefix, event);
    let msg = await translate((True === true) ? "enabled": "disabled", event, null, true);
    umaru.data['threads'][event.threadID]['nsfw'] = True;
    await umaru.save()
    return api.sendMessage(context+(await translate("✅ NSFW successfully", event, null, true))+" "+msg, event.threadID, event.messageID);
}