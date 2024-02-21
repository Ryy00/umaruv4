const axios = require('axios');

module.exports.config = {
    name: "Echo",
    version: "2.1.0",
    credits: "August Quinn",
    description: "A Character AI",
    commandCategory: "AI",
    usages: "Echo [prompt]",
    cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
    const { threadID, senderID } = event;
    const prompt = args.join(" ");

    if (!prompt) {
        api.sendMessage("Hello! How can I assist you today? Is there something specific you would like to know or discuss? I'm here to help!", threadID, event.messageID);
        return;
    }

    try {
        const userName = await getUserName(api, senderID);
        const characterAI = "https://echo2.august-quinn-api.repl.co/prompt";

        const response = await axios.post(characterAI, { prompt, userName, uid: senderID });

        if (response.data && response.data.chatbotResponse) {
            const chatbotResponse = response.data.chatbotResponse;
            api.sendMessage(chatbotResponse, threadID, event.messageID);
        } else {
            api.sendMessage("Error processing the prompt. Please try again later.", threadID, event.messageID);
        }
    } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        api.sendMessage("Error processing the prompt. Please try again later.", threadID, event.messageID);
    }
};

async function getUserName(api, userID) {
    try {
        const name = await api.getUserInfo(userID);
        return name[userID]?.firstName || "Friend";
    } catch (error) {
        console.error("Error getting user name:", error);
        return "Friend";
    }
};
