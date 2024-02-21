export const setup = {
    name: "tid",
    version: "40.0.0",
    permission: "Users",
    creator: "John Lester",
    description: "Get thread ID in the current group chat",
    category: "General",
    usages: "",
    mainScreenshot: ["/media/tid/screenshot/main.jpg"],
    screenshot: ["/media/tid/screenshot/main.jpg"],
    cooldown: 0,
    isPrefix: true
}
export const domain = {"tid": setup.name};
export const execCommand = async function({api, event, translate}) {
    return api.sendMessage((await translate(`🌠 Here's the TID: {{1}}`, event, null, true)).replace("{{1}}", event.threadID), event.threadID, event.messageID)
}