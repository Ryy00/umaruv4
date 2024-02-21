import fs from 'fs';
import moment from 'moment-timezone';
export const setup = {
  name: "hi",
  version: "40.0.0",
  permission: "GroupAdmin",
  creator: "John Lester",
  description: "Hi greet.",
  category: "Other",
  usages: ["on", "off"],
  mainScreenshot: ["/media/hi/screenshot/main.jpg"],
  screenshot: ["/media/hi/screenshot/main.jpg"],
  cooldown: 60,
  isPrefix: true
};
export const execEvent = async function({api: e,event: a,cooldown: t,umaru: s,Users: r,systemadmin: n,timeZone: o, setData: b, translate: ca, args: p}) {
  if(a.isGroup == true && s.data.threads[a.threadID] && !s.data.threads[a.threadID].hasOwnProperty('hi')) {
    s.data.threads[a.threadID].hi = true
    await b();
  } else if(a.isGroup == false && s.data.users[a.threadID] && !s.data.users[a.threadID].hasOwnProperty('hi')) {
    s.data.users[a.threadID].hi = false
    await b();
  }
  if(a.isGroup == true && s.data.threads[a.threadID] && s.data.threads[a.threadID].hi == false) {
    return;
  } else if(a.isGroup == false && s.data.users[a.threadID] && s.data.users[a.threadID].hi == false) {
    return;
  }
  if (!n.includes(a.senderID) && t.isCooldown(this.setup.name + a.senderID, this.setup.cooldown)) return;
  if ((a.type == "message" || (a.type == "message_reply" && a.messageReply.senderID == e.getCurrentUserID())) && p[0] && ["hi", "hello", "hai", "yo", "hallow", "hola", "low"].some((e => p[0].toLowerCase() === e))) {
    t.create(this.setup.name + a.senderID);
    let s, n = await r.getName(a.senderID),
      d = ["237318537087806","237321127087547","237317790421214","237319140421079","237318950421098","237320717087588","237317987087861","237318747087785","237318230421170","237320493754277","237319783754348","237319333754393","237317540421239","237320883754238","237320150420978","237319520421041","1747081105603141","1747081465603105","1747083702269548","1747083968936188","1747084572269461","1747084802269438","1747085962269322","1747090242268894","1747087128935872","1747088982269020","1747089445602307","2041011389459668","2041011569459650","2041011726126301","2041011952792945","2041012109459596","2041012262792914","2041012539459553","2041012692792871","2041014432792697","2041014739459333","2041015016125972","2041015182792622","2041015329459274","2041015422792598","2041017422792398","2041020049458802","2041020599458747","2041021119458695","2041022029458604","812218136268496","812218136268496","812218136268496","584600128299186","584600138299185","584600151632517","584600161632516","584600171632515","584600184965847","584600211632511","584600218299177","584600224965843","584600231632509","584600241632508","584600254965840","584600261632506","584600274965838","584600281632504","584600288299170","584600294965836","584600301632502","584600311632501","584600311632501","584600321632500","584600328299166","584600334965832","584600381632494","584600341632498","584600348299164","584600354965830","584600361632496","584600368299162","584600374965828","584600388299160","584600394965826","584600401632492","584600408299158","193082767877327","193082841210653","193082987877305","193082861210651","193082804543990","193082827877321","193083044543966","193082891210648","193082974543973","193082874543983","193082931210644","193754774476793","193082917877312","193083001210637","193083031210634","193082944543976","193754761143461","193083087877295","193083104543960","193083121210625","193083071210630","526207648112667","526213888112043","526214684778630","526220108111421","526220308111401","526220691444696","526220814778017","526220978111334","526221104777988","526221564777942","526221711444594","526221971444568","526222804777818","526223631444402","526223978111034","526223751444390","526224854777613","526225001444265","526225161444249","526225314777567","1841028362616606","1841028499283259","1841028419283267","1841028539283255","1841028482616594","1841028525949923","1841028555949920","1841028609283248","1841028622616580","1841028442616598","1841028635949912","1841028649283244","1841028379283271","1841028592616583","1841028402616602","1841028512616591","1841028289283280","1841028699283239","1841028685949907","526175969112693","526176959112594","526177209112569","526177569112533","526178635779093","237318537087806","237321127087547","237317790421214","237319140421079","237318950421098","237320717087588","237317987087861","237318747087785","237318230421170","237320493754277","237319783754348","237319333754393","237317540421239","237320883754238","237320150420978","237319520421041"];
    let sd = ["584600294965836", "584600288299170", "554423787978809","554423661312155","554423831312138","554377321316789","554377321316789", "554423821312139","554377321316789","144884992352434", "144885129019087", "144885275685739", "144885089019091"];
    s = d[Math.floor(Math.random() * d.length)];
    let h = ["😁", "😉", "😗", "😙", "😚", "😘", "🥰", "😍", "🤩", "🥳", "😇", "😊", "☺️", "😏", "😌", "😶", "🤭","🤗","🥺", "😻", "😼", "😽",  "❤️", "💗", "💋"],
      i = h[Math.floor(Math.random() * h.length)],
      l = moment.tz(o).format("HH:mm:ss"),
      g = (l >= "00:00:00" && l <= "04:59:59" ? "Good morning" : l >= "05:00:00" && l <= "06:59:59" ? "Let's eat breakfast" : l >= "07:00:00" && l <= "10:59:59" ? "Good morning" : l >= "11:00:00" && l <= "12:59:59" ? "Let's eat lunch" : l >= "13:00:00" && l <= "17:59:59" ? "Good afternoon" : l >= "18:00:00" && l <= "19:59:59" ? "Let's eat dinner" : l >= "20:00:00" && l <= "23:59:59" ? "Good evening" : "Have a nice day");
    if (a.senderID == e.getCurrentUserID()) return;
    let M, m, c, f = moment.tz(o).format("LLLL"),
      u = moment.tz(o).format("MM-DD");
    if (f.toUpperCase().includes("SUN") && (M = ["have a great Sunday", `${g}`, "have a nice day"], m = M[Math.floor(Math.random() * M.length)]), f.toUpperCase().includes("MON") && (M = ["have a great Monday", `${g}`, "have a nice day"], m = M[Math.floor(Math.random() * M.length)]), f.toUpperCase().includes("TUE") && (M = ["have a great Tuesday", `${g}`, "have a nice day"], m = M[Math.floor(Math.random() * M.length)]), f.toUpperCase().includes("WED") && (M = ["have a great Wednesday", `${g}`, "have a nice day"], m = M[Math.floor(Math.random() * M.length)]), f.toUpperCase().includes("THU") && (M = ["have a great Thursday", `${g}`, "have a nice day"], m = M[Math.floor(Math.random() * M.length)]), f.toUpperCase().includes("FRI") && (M = ["have a great Friday", `${g}`, "have a nice day"], m = M[Math.floor(Math.random() * M.length)]), f.toUpperCase().includes("SAT") && (M = ["have a great Saturday", `${g}`, "have a nice day"], m = M[Math.floor(Math.random() * M.length)]), "11-01" == u && l > "19:00" && l <= "23:00") return s = "1905753229674838",
      void e.sendMessage((await ca(`Hi {{n}}, trick or treat Happy Halloween 👻`,a, null, true)).replace("{{n}}", n), a.threadID,
        ((t, r) => {
          e.sendMessage({
            sticker: s
          }, a.threadID)
        }), a.messageID);
    if ("12-25" == u) return M = ["Merry Christmas. I hope your holiday season is full of peace, joy and happiness", `${g}`, "have a nice day"], m = M[Math.floor(Math.random() * M.length)],
      void e.sendMessage((await ca(`Hi {{n}}, ${m} 🥰`,a, null, true)).replace("{{n}}", n), a.threadID,
        ((t, r) => {
          e.sendMessage({
            sticker: s
          }, a.threadID)
        }), a.messageID);
    if (l > "05:01" && l <= "07:00") return c = sd, s = c[Math.floor(Math.random() * c.length)],
      void e.sendMessage((await ca(`Hi {{n}}, ${m} {{i}}`,a, null, true)).replace("{{n}}", n).replace("{{i}}", i), a.threadID,
        ((t, r) => {
          e.sendMessage({
            sticker: s
          }, a.threadID)
        }), a.messageID);
    if (l > "11:01" && l <= "13:00") return c = sd, s = c[Math.floor(Math.random() * c.length)],
      void e.sendMessage((await ca(`Hi {{n}}, ${m} {{i}}`,a, null, true)).replace("{{n}}",n).replace("{{i}}", i), a.threadID,
        ((t, r) => {
          e.sendMessage({
            sticker: s
          }, a.threadID)
        }), a.messageID);
    if (l > "18:01" && l <= "20:00") return c = sd, s = c[Math.floor(Math.random() * c.length)],
      void e.sendMessage((await ca(`Hi {{n}}, ${m} {{i}}`,a, null, true)).replace("{{n}}",n).replace("{{i}}",i), a.threadID,
        ((t, r) => {
          e.sendMessage({
            sticker: s
          }, a.threadID)
        }), a.messageID);
    e.sendMessage((await ca(`Hi {{n}}, ${m} {{i}}`,a, null, true)).replace("{{n}}", n).replace("{{i}}", i), a.threadID, ((t, r) => {
      e.sendMessage({
        sticker: s
      }, a.threadID)
    }), a.messageID)
  }
};
export const execCommand = async function({api, event, umaru, translate,  args, context, usage, prefix}) {
  let True = (args[0] && args[0].toLowerCase() === "on") ? true: (args[0] && args[0].toLowerCase() === "off") ? false : null;
  if(args.length === 0 || True === null) return usage(this, prefix, event);
  let msg = await translate((True === true) ? "enabled": "disabled", event, null, true);
  if(event.isGroup == false && umaru.data['users'][event.threadID]) {
    umaru.data['users'][event.threadID]['hi'] = True;
    await umaru.save();
  } else if(event.isGroup == true && umaru.data['threads'][event.threadID]) {
      umaru.data['threads'][event.threadID]['hi'] = True;
      await umaru.save();
    }
  return api.sendMessage(context+(await translate("✅ Hi successfully", event, null, true))+" "+msg, event.threadID, event.messageID);
}
