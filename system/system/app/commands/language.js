let langs = {"af":"Afrikaans","sq":"Albanian","am":"Amharic","ar":"Arabic","hy":"Armenian","as":"Assamese","ay":"Aymara","az":"Azerbaijani","bm":"Bambara","eu":"Basque","be":"Belarusian","bn":"Bengali","bh":"Bhojpuri","bs":"Bosnian","bg":"Bulgarian","ca":"Catalan","ceb":"Cebuano","ny":"Chichewa","zh-CN":"Chinese Simplified","zh-TW":"Chinese Traditional","co":"Corsican","hr":"Croatian","cs":"Czech","da":"Danish","dv":"Dhivehi","doi":"Dogri","nl":"Dutch","en":"English","eo":"Esperanto","et":"Estonian","ee":"Ewe","tl":"Filipino","fi":"Finnish","fr":"French","fy":"Frisian","gl":"Galician","ka":"Georgian","de":"German","el":"Greek","gn":"Guarani","gu":"Gujarati","ht":"Haitian Creole","ha":"Hausa","haw":"Hawaiian","he":"Hebrew","hi":"Hindi","hmn":"Hmong","hu":"Hungarian","is":"Icelandic","ig":"Igbo","ilo":"Ilocano","id":"Indonesian","ga":"Irish","it":"Italian","ja":"Japanese","jv":"Javanese","kn":"Kannada","kk":"Kazakh","km":"Khmer","rw":"Kinyarwanda","gom":"Konkani","ko":"Korean","kri":"Krio","ku":"Kurdish Kurmanji","ckb":"Kurdish Sorani","ky":"Kyrgyz","lo":"Lao","la":"Latin","lv":"Latvian","ln":"Lingala","lt":"Lithuanian","lg":"Luganda","lb":"Luxembourgish","mk":"Macedonian","mai":"Maithili","mg":"Malagasy","ms":"Malay","ml":"Malayalam","mt":"Maltese","mi":"Maori","mr":"Marathi","mni-Mtei":"Meiteilon Manipuri","lus":"Mizo","mn":"Mongolian","my":"Myanmar Burmese","ne":"Nepali","no":"Norwegian","or":"Odia Oriya","om":"Oromo","ps":"Pashto","fa":"Persian","pl":"Polish","pt":"Portuguese","pa":"Punjabi","qu":"Quechua","ro":"Romanian","ru":"Russian","sm":"Samoan","sa":"Sanskrit","gd":"Scots Gaelic","nso":"Sepedi","sr":"Serbian","st":"Sesotho","sn":"Shona","sd":"Sindhi","si":"Sinhala","sk":"Slovak","sl":"Slovenian","so":"Somali","es":"Spanish","su":"Sundanese","sw":"Swahili","sv":"Swedish","tg":"Tajik","ta":"Tamil","tt":"Tatar","te":"Telugu","th":"Thai","ti":"Tigrinya","ts":"Tsonga","tr":"Turkish","tk":"Turkmen","tw":"Twi","uk":"Ukrainian","ur":"Urdu","ug":"Uyghur","uz":"Uzbek","vi":"Vietnamese","cy":"Welsh","xh":"Xhosa","yi":"Yiddish","yo":"Yoruba","zu":"Zulu"}
let flag = {"af":"🇿🇦","sq":"🇦🇱","am":"🇪🇹","ar":"🇸🇦","hy":"🇦🇲","as":"🇮🇳","ay":"🏳","az":"🇦🇿","bm":"🇲🇱","eu":"🇪🇺","be":"🇧🇾","bn":"🇧🇩","bh":"🇮🇳","bs":"🇧🇦","bg":"🇧🇬","ca":"🇦🇩","ceb":"🇵🇭","ny":"🇲🇼","zh-CN":"🇨🇳","zh-TW":"🇹🇼","co":"🇫🇷","hr":"🇭🇷","cs":"🇨🇿","da":"🇩🇰","dv":"🇲🇻","doi":"🇮🇳","nl":"🇳🇱","en":"🇺🇸","eo":"🌍","et":"🇪🇪","ee":"🇬🇭","tl":"🇵🇭","fi":"🇫🇮","fr":"🇫🇷","fy":"🇳🇱","gl":"🇪🇸","ka":"🇬🇪","de":"🇩🇪","el":"🇬🇷","gn":"🇵🇾","gu":"🇮🇳","ht":"🇭🇹","ha":"🇳🇬","haw":"🇺🇸","he":"🇮🇱","hi":"🇮🇳","hmn":"🌍","hu":"🇭🇺","is":"🇮🇸","ig":"🇳🇬","ilo":"🇵🇭","id":"🇮🇩","ga":"🇮🇪","it":"🇮🇹","ja":"🇯🇵","jv":"🇮🇩","kn":"🇮🇳","kk":"🇰🇿","km":"🇰🇭","rw":"🇷🇼","gom":"🇮🇳","ko":"🇰🇷","kri":"🇸🇱","ku":"🇮🇶","ckb":"🇮🇶","ky":"🇰🇬","lo":"🇱🇦","la":"🇻🇦","lv":"🇱🇻","ln":"🇨🇬","lt":"🇱🇹","lg":"🇺🇬","lb":"🇱🇺","mk":"🇲🇰","mai":"🇮🇳","mg":"🇲🇬","ms":"🇲🇾","ml":"🇮🇳","mt":"🇲🇹","mi":"🇳🇿","mr":"🇮🇳","mni-Mtei":"🇮🇳","lus":"🇮🇳","mn":"🇲🇳","my":"🇲🇲","ne":"🇳🇵","no":"🇳🇴","or":"🇮🇳","om":"🇪🇹","ps":"🇦🇫","fa":"🇮🇷","pl":"🇵🇱","pt":"🇵🇹","pa":"🇮🇳","qu":"🇵🇪","ro":"🇷🇴","ru":"🇷🇺","sm":"🇼🇸","sa":"🇮🇳","gd":"🏴","nso":"🇿🇦","sr":"🇷🇸","st":"🇱🇸","sn":"🇿🇼","sd":"🇵🇰","si":"🇱🇰","sk":"🇸🇰","sl":"🇸🇮","so":"🇸🇴","es":"🇪🇸","su":"🇮🇩","sw":"🇹🇿","sv":"🇸🇪","tg":"🇹🇯","ta":"🇮🇳","tt":"🇷🇺","te":"🇮🇳","th":"🇹🇭","ti":"🇪🇷","ts":"🇿🇦","tr":"🇹🇷","tk":"🇹🇲","tw":"🇬🇭","uk":"🇺🇦","ur":"🇵🇰","ug":"🇺🇬","uz":"🇺🇿","vi":"🇻🇳","cy":"🏴","xh":"🇿🇦","yi":"🇮🇱","yo":"🇳🇬","zu":"🇿🇦"};
let langs2 = {"Tagalog": "tl"};
for(const item in langs) {
  langs2[langs[item]] = item;
}
import fs from "fs";
export const setup = {
    name: "language",
    version: "40.0.0",
    permission: "Users",
    creator: "John Lester",
    description: "Change the language",
    category: "System",
    usages: ["list [page number]",  "set me [language]", "set group [language]", "set system [language]", "reset me", "reset group","reset system"],
    cooldown: 5,
    isPrefix: true
};
export const domain = {"language": setup.name};
export const execCommand = async function({api, event, umaru, args,   usage, prefix, translate, Threads, systemadmin}) {
  if(args.length === 0) return usage(this, prefix, event);
  switch(args[0].toLowerCase()) {
    case "set":
      if(!args[1] || !args[2]) return usage(this, prefix, event);
      let set = args[1].toLowerCase();
      if(!["me", "group", "system"].some(a => a === set)) return usage(this, prefix, event)
      let _2 = args.splice(2).join(" ").toLowerCase().split(" ").map(a => a.replace(a[0], a[0].toUpperCase())).join(" ");
      let lang = (langs2.hasOwnProperty(_2)) ? langs2[_2] :  (langs.hasOwnProperty(_2.toLowerCase())) ?  _2.toLowerCase() : null;
      if(lang === null) return api.sendMessage((await translate("⚠️ Unsupported language. Use the {{1}} to display all supported languages.", event, null, true)).replace("{{1}}", prefix+"language list"), event.threadID, event.messageID);
      if(set == "me") {
         umaru.data['users'][event.senderID]['lang'] = lang;
         await umaru.save();
        return api.sendMessage((await translate("✅ Successfully change the language to "+langs[lang]+" "+flag[lang], event, null, false)), event.threadID, event.messageID)
      } else if(set == "group") {
        if(event.isGroup == false) return api.sendMessage(await translate("⚠️ This option is only allowed in group chat.", event, null, true), event.threadID, event.messageID);
        let threadAdmin = await Threads.getAdminIDs(event.threadID);
        if(!(threadAdmin.includes(event.senderID)? true:systemadmin.includes(event.senderID))) return api.sendMessage((await translate(umaru.config.permission_1, event, null, false)).replace("{{1}}", event.body), event.threadID, event.messageID);
        umaru.data['threads'][event.threadID]['lang'] = lang;
         await umaru.save();
        return api.sendMessage((await translate("✅ Successfully change the language to "+langs[lang]+" "+flag[lang], event, null, false)), event.threadID, event.messageID)
      } else if(set == "system") {
        if(!systemadmin.includes(event.senderID)) return Umaru.sendMessage((await translate(umaru.config.permission_2, event, null, false)).replace("{{1}}", event.body), event.threadID, event.messageID);
        umaru.config.language = lang;
        await fs.promises.writeFile(umaru.configPath, JSON.stringify(umaru.config, null, '\t'));
        return api.sendMessage((await translate("✅ Successfully change the language to "+langs[lang]+" "+flag[lang], event, null, false)), event.threadID, event.messageID)
      }
      break;
    case "reset":
      if(!args[1]) return usage(this, prefix, event);
      let reset = args[1].toLowerCase();
      if(!["me", "group", "system"].some(a => a === reset)) return usage(this, prefix, event);
      if(reset == "me") {
         delete umaru.data['users'][event.senderID]['lang'];
         await umaru.save();
         return api.sendMessage((await translate("✅ Successfully reset the language.", event, null, false)), event.threadID, event.messageID);
      } else if(reset == "group") {
        if(event.isGroup == false) return api.sendMessage(await translate("⚠️ This option is only allowed in group chat.", event, null, true), event.threadID, event.messageID);
        let threadAdmin = await Threads.getAdminIDs(event.threadID);
        if(!(threadAdmin.includes(event.senderID)? true:systemadmin.includes(event.senderID))) return api.sendMessage((await translate(umaru.config.permission_1, event, null, false)).replace("{{1}}", event.body), event.threadID, event.messageID);
         delete umaru.data['threads'][event.threadID]['lang'];
         await umaru.save();
        return api.sendMessage((await translate("✅ Successfully reset the language.", event, null, false)), event.threadID, event.messageID);
      } else if(reset == "system") {
        if(!systemadmin.includes(event.senderID)) return Umaru.sendMessage((await translate(umaru.config.permission_2, event, null, false)).replace("{{1}}", event.body), event.threadID, event.messageID);
        umaru.config.language = "default";
        await fs.promises.writeFile(umaru.configPath, JSON.stringify(umaru.config, null, '\t'));
        return api.sendMessage((await translate("✅ Successfully reset the language.", event, null, false)), event.threadID, event.messageID);
      }
      break;
    case "list":
      let msg = "🌐 Here's the supported language:\n\n";
      let la = Object.keys(langs2);
       let pages = parseInt(args.splice(1).join(" ").match(/\b\d+\b/g)) || 1;
      let page = 20;
      let data = [];
      let inf = "";
        data = la.slice((pages * page) - page, pages * page);
        inf =  "\n" + "Page: "+pages+"/"+Math.ceil(la.length / page);
      for (const item of data) {
        msg += flag[langs2[item]]+" "+item+" - "+langs2[item]+"\n"
      }
      return api.sendMessage(msg+inf, event.threadID, event.messageID)
      break;
    default:
      usage(this, prefix, event);
      break
  }
}