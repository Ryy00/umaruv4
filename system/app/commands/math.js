import fs from 'fs';
import axios from 'axios';

export const setup = {
  name: 'math',
  version: '40.0.0',
  permission: 'Users',
  creator: 'alice',
  description: 'Calculator',
  category: 'Education',
  usages: ['1+1'],
  cooldown: 5,
  isPrefix: true,
};

export const domain = { "math": setup.name };

export const execCommand = async function ({ api, event, kernel, key, umaru, keyGenerator, prefix, usage, args }) {
  const { threadID, messageID } = event;
  const out = (msg) => api.sendMessage(msg, threadID, messageID);

  try {
    const key = 'T8J8YV-H265UQ762K';
    const content = event.type == 'message_reply' ? event.messageReply.body : args.join(' ');

    if (!content) {
      return usage(this, prefix, event);
    }

    if (content.indexOf('-p') == 0) {
      try {
        content = 'primitive ' + content.slice(3, content.length);
        const data = (await axios.get(`http://api.wolframalpha.com/v2/query?appid=${key}&input=${encodeURIComponent(content)}&output=json`)).data;

        if (content.includes('from') && content.includes('to')) {
          const value = data.queryresult.pods.find((e) => e.id == 'Input').subpods[0].plaintext;

          if (value.includes('≈')) {
            const a = value.split('≈');
            const b = a[0].split(' = ')[1];
            const c = a[1];
            return out(`Fractional: ${b}\nDecimal: ${c}`);
          } else return out(value.split(' = ')[1]);
        } else {
          return out((data.queryresult.pods.find((e) => e.id == 'IndefiniteIntegral').subpods[0].plaintext.split(' = ')[1]).replace('+ constant', ''));
        }
      } catch (e) {
        out(`${e}`);
      }
    } else if (content.indexOf('-g') == 0) {
      try {
        content = 'plot ' + content.slice(3, content.length);
        const data = (await axios.get(`http://api.wolframalpha.com/v2/query?appid=${key}&input=${encodeURIComponent(content)}&output=json`)).data;
        const src = data.queryresult.pods.some((e) => e.id == 'Plot') ? data.queryresult.pods.find((e) => e.id == 'Plot').subpods[0].img.src : data.queryresult.pods.find((e) => e.id == 'ImplicitPlot').subpods[0].img.src;
        const img = (await axios.get(src, { responseType: 'stream' })).data;
        img.pipe(fs.createWriteStream('./graph.png')).on('close', () => api.sendMessage({
          attachment: fs.createReadStream('./graph.png'),
        }, threadID, () => fs.unlinkSync('./graph.png'), messageID));
      } catch (e) {
        out(`${e}`);
      }
    } else if (content.indexOf('-v') == 0) {
      try {
        content = 'vector ' + content.slice(3, content.length).replace(/\(/g, '<').replace(/\)/g, '>');
        const data = (await axios.get(`http://api.wolframalpha.com/v2/query?appid=${key}&input=${encodeURIComponent(content)}&output=json`)).data;
        const src = data.queryresult.pods.find((e) => e.id == 'VectorPlot').subpods[0].img.src;
        const vector_length = data.queryresult.pods.find((e) => e.id == 'VectorLength').subpods[0].plaintext;
        let result;

        if (data.queryresult.pods.some((e) => e.id == 'Result')) {
          result = data.queryresult.pods.find((e) => e.id == 'Result').subpods[0].plaintext;
        }

        const img = (await axios.get(src, { responseType: 'stream' })).data;
        img.pipe(fs.createWriteStream('./graph.png')).on('close', () => api.sendMessage({
          body: !result ? '' : result + '\nVector Length: ' + vector_length,
          attachment: fs.createReadStream('./graph.png'),
        }, threadID, () => fs.unlinkSync('./graph.png'), messageID));
      } catch (e) {
        out(`${e}`);
      }
    } else {
      try {
        const data = (await axios.get(`http://api.wolframalpha.com/v2/query?appid=${key}&input=${encodeURIComponent(content)}&output=json`)).data;

        if (data.queryresult.pods.some((e) => e.id == 'Solution')) {
          const value = data.queryresult.pods.find((e) => e.id == 'Solution');
          const text = [];

          for (let e of value.subpods) {
            text.push(e.plaintext);
          }

          return out(text.join('\n'));
        } else if (data.queryresult.pods.some((e) => e.id == 'ComplexSolution')) {
          const value = data.queryresult.pods.find((e) => e.id == 'ComplexSolution');
          const text = [];

          for (let e of value.subpods) {
            text.push(e.plaintext);
          }

          return out(text.join('\n'));
        } else if (data.queryresult.pods.some((e) => e.id == 'Result')) {
          return out(data.queryresult.pods.find((e) => e.id == 'Result').subpods[0].plaintext);
        }
      } catch (e) {
        out(`${e}`);
      }
    }
  } catch (error) {
    out(`${error}`);
  }
};
