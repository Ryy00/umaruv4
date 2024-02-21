export const setup = {
  name: "pickuplines",
  version: "40.0.0",
  permission: "Users",
  creator: "John Lester",
  description: "Get a random pickuplines",
  category: "lines",
  usages: [""],
  mainScreenshot: ["/media/pickuplines/screenshot/main.jpg"],
  screenshot: ["/media/pickuplines/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"pickuplines": setup.name}
export const execCommand = async function({api, event, kernel, key}) {
  let pickupline = await kernel.read(["pickuplines"],{key: key});
  return api.sendMessage(pickupline, event.threadID, event.messageID);
}