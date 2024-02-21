import axios from 'axios';

export const setup = {
  name: "linkshortener",
  version: "1.0.0",
  permission: "Users",
  creator: "Lance Ajiro",
  description: "Shorten a URL using a URL shortener service.",
  category: "Utility",
  usages: "[link]",
  cooldown: 5,
  isPrefix: true,
};

export const domain = { "linkshortener": setup.name };

export const execCommand = async function ({ api, event, args, translate }) {
  if (args.length === 0) {
    return usage(this, prefix, event);
  } else {
    const text = args.join(" ");
    const encodedParams = new URLSearchParams();
    encodedParams.append("url", text);
    const options = {
      method: "POST",
      url: "https://url-shortener-service.p.rapidapi.com/shorten",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Host": "url-shortener-service.p.rapidapi.com",
        "X-RapidAPI-Key": "04357fb2e1msh4dbe5919dc38cccp172823jsna0869f87acc3",
      },
      data: encodedParams,
    };

    try {
      const response = await axios.request(options);
      return api.sendMessage(`Shortened Url: ${response.data.result_url}`, event.threadID, event.messageID);
    } catch (error) {
      console.error(error);
      return api.sendMessage("An error occurred while shortening the URL. Please try again later.", event.threadID, event.messageID);
    }
  }
};
