let id = ["237318537087806","237321127087547","237317790421214","237319140421079","237318950421098","237320717087588","237317987087861","237318747087785","237318230421170","237320493754277","237319783754348","237319333754393","237317540421239","237320883754238","237320150420978","237319520421041","1747081105603141","1747081465603105","1747083702269548","1747083968936188","1747084572269461","1747084802269438","1747085962269322","1747090242268894","1747087128935872","1747088982269020","1747089445602307","2041011389459668","2041011569459650","2041011726126301","2041011952792945","2041012109459596","2041012262792914","2041012539459553","2041012692792871","2041014432792697","2041014739459333","2041015016125972","2041015182792622","2041015329459274","2041015422792598","2041017422792398","2041020049458802","2041020599458747","2041021119458695","2041022029458604","812218136268496","812218136268496","812218136268496","584600128299186","584600138299185","584600151632517","584600161632516","584600171632515","584600184965847","584600211632511","584600218299177","584600224965843","584600231632509","584600241632508","584600254965840","584600261632506","584600274965838","584600281632504","584600288299170","584600294965836","584600301632502","584600311632501","584600311632501","584600321632500","584600328299166","584600334965832","584600381632494","584600341632498","584600348299164","584600354965830","584600361632496","584600368299162","584600374965828","584600388299160","584600394965826","584600401632492","584600408299158","193082767877327","193082841210653","193082987877305","193082861210651","193082804543990","193082827877321","193083044543966","193082891210648","193082974543973","193082874543983","193082931210644","193754774476793","193082917877312","193083001210637","193083031210634","193082944543976","193754761143461","193083087877295","193083104543960","193083121210625","193083071210630","526207648112667","526213888112043","526214684778630","526220108111421","526220308111401","526220691444696","526220814778017","526220978111334","526221104777988","526221564777942","526221711444594","526221971444568","526222804777818","526223631444402","526223978111034","526223751444390","526224854777613","526225001444265","526225161444249","526225314777567","1841028362616606","1841028499283259","1841028419283267","1841028539283255","1841028482616594","1841028525949923","1841028555949920","1841028609283248","1841028622616580","1841028442616598","1841028635949912","1841028649283244","1841028379283271","1841028592616583","1841028402616602","1841028512616591","1841028289283280","1841028699283239","1841028685949907","526175969112693","526176959112594","526177209112569","526177569112533","526178635779093","237318537087806","237321127087547","237317790421214","237319140421079","237318950421098","237320717087588","237317987087861","237318747087785","237318230421170","237320493754277","237319783754348","237319333754393","237317540421239","237320883754238","237320150420978","237319520421041"];
export default async function({api, cron, currentDate, currentTime, allActiveThread, umaru, logger}) {
    if (umaru.config.Automated.AutoGreet == true) {
    let msg = (currentTime >= "00:00:00" && currentTime <= "03:59:59" ? "Good morning everyone":currentTime >= "04:00:00" && currentTime <= "06:59:59" ? "Good morning everyone. don't forget your breakfast":currentTime >= "07:00:00" && currentTime <= "10:59:59" ? "Good morning everyone":currentTime >= "11:00:00" && currentTime <= "12:59:59" ? "Good afternoon everyone. don't forget your lunch":currentTime >= "13:00:00" && currentTime <= "17:59:59" ? "Good afternoon everyone":currentTime >= "18:00:00" && currentTime <= "21:59:59" ? "Good evening everyone. don't forget your dinner":currentTime >= "20:00:00" && currentTime <= "23:59:59" ? "Good evening everyone" : "Hello everyone have a nice day");
  let emoji = ["😁","😉","😗","😙","😚","😘","🥰","😍","🤩","🥳","😇","😊","☺️","😏","😌","😶"," 🤔","🤫","🤭","🤗","😒","🙄","😤","🥺","😻"," 😼","😽","😾","❤️","💗","💋"];
  let cantSend = []
   cron.schedule(`1 0 */${umaru.config.Automated.AutoGreetSendPerHour} * * *`, () => {
     let sticker = id[Math.floor(Math.random() * id.length)];
     let cat = {sticker: sticker}
     let randomemoji = emoji[Math.floor(Math.random() * emoji.length)];
     if (umaru.config.Automated.AutoGreetWithSticker == true) {
       for (const idThread in allActiveThread) {
       api.sendMessage(`${msg} ${randomemoji}`, idThread, (error, info) => {
         if (error) {
           cantSend.push(idThread);
         } 
         api.sendMessage(cat, idThread)
       });
     }
     } else {
       for (const idThread in allActiveThread) {
       api.sendMessage(`${msg} ${randomemoji}`, idThread, (error, info) => {
         if (error) {
           cantSend.push(idThread);
         } 
       });
     }
     }

       if(cantSend.length !== 0) logger.log("AUTO GREET", `[!] Can't send message to ${cantSend.length} thread`);
  }, {
    scheduled: true,
    timezone: umaru.config.TimeZone
  });
    }
  
  if(umaru.config.Automated.HolidayAutoGreet == true) {
    if (umaru.config.TimeZone == "Asia/Manila" && currentDate == "02-25") {
      cron.schedule('59 0 */6 * * *', () => {
         for (const idThread in allActiveThread) {
         api.sendMessage("Happy EDSA Revolution Anniversary!!", idThread);
       }
    }, {
      scheduled: true,
      timezone: "Asia/Manila"
    });
    }

    if (umaru.config.TimeZone == "Asia/Manila" && currentDate == "04-09") {
      cron.schedule('59 0 */6 * * *', () => {
         for (const idThread in allActiveThread) {
         api.sendMessage("The Commision on Filipinos Overseas gives light to the valiance of Filipino veterans and soldiers who have fought for the democracy of the county against the Japanese troops. The Bataan Death March serves as a powerful symbol for the strong spirit and patriotism of the Filipino amidst despair. May we find inspiration from the heroic sacrifice displayed by those before us.\n\nMaligayang Araw ng Kagitingan!!", idThread);
       }
    }, {
      scheduled: true,
      timezone: "Asia/Manila"
    });
    }

    if (umaru.config.TimeZone == "Asia/Manila" && currentDate == "05-01") {
      cron.schedule('59 0 */6 * * *', () => {
         for (const idThread in allActiveThread) {
         api.sendMessage("To all hardworking employees: Happy Labor Day! And a special shout out to those who work hard to protect workers’ rights. Thank you all for making our world a better place to live and work in.", idThread);
       }
    }, {
      scheduled: true,
      timezone: "Asia/Manila"
    });
    }

    if (currentDate == "06-12") {
      cron.schedule('59 0 */6 * * *', () => {
         for (const idThread in allActiveThread) {
         api.sendMessage("Maligayang Araw ng Kalayaan!", idThread);
       }
    }, {
      scheduled: true,
      timezone: "Asia/Manila"
    });
    }

    if (currentDate == "11-01") {
      //November 1
      cron.schedule('59 0 */6 * * *', () => {
         for (const idThread in allActiveThread) {
         api.sendMessage("Happy Halloween everyone. I hope you have a spooky and great day. Eat, drink and be scary! Today's the day to eat candies and sweets to your heart's content!", idThread);
       }
    }, {
      scheduled: true,
      timezone: "Asia/Manila"
    });
    }

    if (umaru.config.TimeZone == "Asia/Manila" && currentDate == "11-30") {
      cron.schedule('59 0 */6 * * *', () => {
         for (const idThread in allActiveThread) {
         api.sendMessage("Happy Bonifacio day!", idThread);
       }
    }, {
      scheduled: true,
      timezone: "Asia/Manila"
    });
    }

    if (currentDate == "12-25") {

      cron.schedule('0 0 0 * * *', () => {
         for (const idThread in allActiveThread) {
         api.sendMessage("Merry Christmas everyone. I hope your holiday season is full of peace, joy and happiness. 🥰", idThread);
       }
    }, {
      scheduled: true,
      timezone: "Asia/Manila"
    });
      cron.schedule('59 0 */6 * * *', () => {
         for (const idThread in allActiveThread) {
         api.sendMessage("Merry Christmas everyone. I hope your holiday season is full of peace, joy and happiness. 🥰", idThread);
       }
    }, {
      scheduled: true,
      timezone: "Asia/Manila"
    });
    }

    cron.schedule('0 0 0 1 1 *', () => {
      // New Year
      for (const idThread in allActiveThread) {
         api.sendMessage("Happy new year everyone!. bring you more happiness, success, love and blessings! Praying that you have a truly remarkable and blissful year ahead! Happy new year to you and your family! I'm blessed to know that I have friends like you in my life this New Year.", idThread);
       }
    }, {
      scheduled: true,
      timezone: "Asia/Manila"
    });
    cron.schedule('0 5 0 1 1 *', () => {
      //New year
      for (const idThread in allActiveThread) {
         api.sendMessage("Happy new year everyone!. bring you more happiness, success, love and blessings! Praying that you have a truly remarkable and blissful year ahead! Happy new year to you and your family! I'm blessed to know that I have friends like you in my life this New Year.", idThread);
       }
    }, {
      scheduled: true,
      timezone: "Asia/Manila"
    });
  }
}