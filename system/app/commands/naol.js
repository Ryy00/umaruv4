export const setup = {
    name: "naol",
    version: "40.0.0",
    permission: "Users",
    creator: "John Lester",
    description: "naol",
    category: "No Prefix",
    usages: [""],
    cooldown: 60,
    isPrefix: true
  };
  export const execEvent = async function({api, event, cooldown, umaru, systemadmin}) {
      if(!systemadmin.includes(event.senderID) && cooldown.isCooldown(this.setup.name+event.senderID, this.setup.cooldown)) return;
      let input = ["naol", "sanaall", "sana all", "sana ol", "sanaol" , "sabaok"];
      if(event.body && input.some(a => event.body.toLowerCase().startsWith(a))) {
          cooldown.create(this.setup.name+event.senderID);
          return api.sendMessage("(2)", event.threadID, event.messageID)
      }
  }
  export const execCommand = async function({api, event}) {
      return api.sendMessage(`naol no prefix command when someone say "naol".`, event.threadID, event.messageID)
  }