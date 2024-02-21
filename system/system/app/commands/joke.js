export const setup = {
  name: "joke",
  version: "40.0.0",
  permission: "Users",
  creator: "John Lester",
  description: "Get a random joke",
  category: "lines",
  usages: [""],
  mainScreenshot: ["/media/joke/screenshot/main.jpg"],
  screenshot: ["/media/joke/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"joke": setup.name}
export const execCommand = async function({api, event, kernel, key}) {
  let joke = await kernel.read(["jokes"],{key: key});
  return api.sendMessage(joke, event.threadID, event.messageID);
}