import axios from 'axios';
let langs = {"af":"Afrikaans","sq":"Albanian","am":"Amharic","ar":"Arabic","hy":"Armenian","as":"Assamese","ay":"Aymara","az":"Azerbaijani","bm":"Bambara","eu":"Basque","be":"Belarusian","bn":"Bengali","bh":"Bhojpuri","bs":"Bosnian","bg":"Bulgarian","ca":"Catalan","ceb":"Cebuano","ny":"Chichewa","zh-CN":"Chinese Simplified","zh-TW":"Chinese Traditional","co":"Corsican","hr":"Croatian","cs":"Czech","da":"Danish","dv":"Dhivehi","doi":"Dogri","nl":"Dutch","en":"English","eo":"Esperanto","et":"Estonian","ee":"Ewe","tl":"Filipino","fi":"Finnish","fr":"French","fy":"Frisian","gl":"Galician","ka":"Georgian","de":"German","el":"Greek","gn":"Guarani","gu":"Gujarati","ht":"Haitian Creole","ha":"Hausa","haw":"Hawaiian","he":"Hebrew","hi":"Hindi","hmn":"Hmong","hu":"Hungarian","is":"Icelandic","ig":"Igbo","ilo":"Ilocano","id":"Indonesian","ga":"Irish","it":"Italian","ja":"Japanese","jv":"Javanese","kn":"Kannada","kk":"Kazakh","km":"Khmer","rw":"Kinyarwanda","gom":"Konkani","ko":"Korean","kri":"Krio","ku":"Kurdish Kurmanji","ckb":"Kurdish Sorani","ky":"Kyrgyz","lo":"Lao","la":"Latin","lv":"Latvian","ln":"Lingala","lt":"Lithuanian","lg":"Luganda","lb":"Luxembourgish","mk":"Macedonian","mai":"Maithili","mg":"Malagasy","ms":"Malay","ml":"Malayalam","mt":"Maltese","mi":"Maori","mr":"Marathi","mni-Mtei":"Meiteilon Manipuri","lus":"Mizo","mn":"Mongolian","my":"Myanmar Burmese","ne":"Nepali","no":"Norwegian","or":"Odia Oriya","om":"Oromo","ps":"Pashto","fa":"Persian","pl":"Polish","pt":"Portuguese","pa":"Punjabi","qu":"Quechua","ro":"Romanian","ru":"Russian","sm":"Samoan","sa":"Sanskrit","gd":"Scots Gaelic","nso":"Sepedi","sr":"Serbian","st":"Sesotho","sn":"Shona","sd":"Sindhi","si":"Sinhala","sk":"Slovak","sl":"Slovenian","so":"Somali","es":"Spanish","su":"Sundanese","sw":"Swahili","sv":"Swedish","tg":"Tajik","ta":"Tamil","tt":"Tatar","te":"Telugu","th":"Thai","ti":"Tigrinya","ts":"Tsonga","tr":"Turkish","tk":"Turkmen","tw":"Twi","uk":"Ukrainian","ur":"Urdu","ug":"Uyghur","uz":"Uzbek","vi":"Vietnamese","cy":"Welsh","xh":"Xhosa","yi":"Yiddish","yo":"Yoruba","zu":"Zulu"};
let langs2 = {"Tagalog": "tl"};
for(const item in langs) {
  langs2[langs[item]] = item;
}

export const setup = {
    name: "trans",
    version: "40.0.0",
    permission: "Users",
    creator: "John Lester",
    description: "Text translation",
    category: "Translate",
    usages: ["[text]", "[text] | [en/vi/tl]", "[text] | [language]"],
    mainScreenshot: ["/media/trans/screenshot/main.jpg"],
    screenshot: ["/media/trans/screenshot/main.jpg"],
    cooldown: 5,
    isPrefix: true
  };
export const domain = {"trans": setup.name}
export const execCommand = async function({api, event, umaru, args,   usage, prefix}) {
    let text = args.join(" ");
    if (event.type !== "message_reply" && !text) return usage(this, prefix, event);
    let iso = "en";
    if(umaru.config.language !== "default") {
        iso = umaru.config.language;
    } else if(umaru.data['users'][event.senderID] && umaru.data['users'][event.senderID]['lang']) {
        iso = umaru.data['users'][event.senderID]['lang'];
      } else if (event.isGroup == true && umaru.data['threads'][event.threadID] && umaru.data['threads'][event.threadID]['lang']) {
        iso = umaru.data['threads'][event.threadID]['lang'];
      } else if(umaru.config.language !== "default") {
        iso = umaru.config.language;
      }

      if(event.type === "message_reply" && event.messageReply.body) {
        let lan = (text) ? text.trim().split(" ").map(a => a.replace(a[0], a[0].toUpperCase())).join(" ") : "";
        iso = (langs2.hasOwnProperty(lan)) ? langs2[lan] : (lan != "") ? lan.replace(lan[0], lan[0].toUpperCase()): (args.length === 0) ? iso : lan.toLowerCase();
        text = event.messageReply.body;
        if(args[0] && langs.hasOwnProperty(args[0].toLowerCase())) iso = args[0].toLowerCase();
      } else if(text.includes("|")) {
        let is = text.toLowerCase().split("|")[1].trim().split(" ").map(a => a.replace(a[0], a[0].toUpperCase())).join(" ");
        let lan = is;
        iso = (langs2.hasOwnProperty(lan)) ? langs2[lan] : lan.toLowerCase();
        text = text.split("|")[0].trim();
      }
    await umaru.createJournal(event);
    const trans = (await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${iso}&dt=t&q=${encodeURIComponent(text)}`)).data;
    let txt = '';
    for (const item of trans[0]) {
      if (item[0]) {
        txt += item[0];
      }
    };
    let flng = (trans[2] === trans[8][0][0]) ? trans[2] : trans[8][0][0];
    let flang1 = (langs.hasOwnProperty(iso)) ? langs[iso] : iso;
    let flang2 = (langs.hasOwnProperty(flng)) ? langs[flng] : flng;
    return api.sendMessage(`Translation: ${txt}\n- translated from ${flang2} to ${flang1}`, event.threadID, async() => {
      await umaru.deleteJournal(event);
    }, event.messageID)
}