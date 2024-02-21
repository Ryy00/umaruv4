const colors = ["#408CFF","#37DEFF","#91DDFF","#46D8FF","#98DAFF","#B9D2FF","#6CB5FF","#88D0FF","#0FAEFF","#4EB3FF","#8378FF","#A9C0FF","#0C8AFF","#278BFF","#1BB5FF","#08F2FF","#9392FF","#03F8FF","#9294FF","#579DFF","#42F0FF","#9D97FF","#79B7FF","#BDADFF","#81FCFF","#4690FF","#819AFF","#0AE0FF","#97A6FF","#BDFAFF","#AB88FF","#8483FF","#0CD1FF","#B0B0FF","#BF98FF","#A6CFFF","#409CFF","#5DD4FF","#6688FF","#81FDFF","#0285FF","#40C3FF","#63FCFF","#62F9FF","#AC94FF","#78F7FF","#60ABFF","#56A3FF","#86EDFF","#7AEDFF","#7F95FF","#82FDFF","#03D1FF","#697AFF","#4FEAFF","#B691FF","#38DFFF","#8EBDFF","#1F86FF","#0DE7FF","#05F1FF","#0581FF","#05C9FF","#C1B5FF","#9EC7FF","#9BA4FF","#7DE9FF","#4686FF","#6F79FF","#6495FF","#8BFDFF","#969FFF","#BAA4FF","#36F2FF","#BE7FFF","#B5C4FF","#C5DCFF","#7FADFF","#3E8AFF","#09ACFF","#909AFF","#7DA0FF","#2188FF","#65A3FF","#23BCFF","#78EEFF","#A5E7FF","#AACCFF","#33B3FF","#03F3FF","#6085FF","#BB92FF","#3D9AFF","#9C9BFF","#78F0FF","#75E8FF","#3CF1FF","#379BFF","#8491FF","#16D9FF","#BFB2FF","#387EFF","#3EC6FF","#B7CFFF","#01ECFF","#24EAFF","#8ED5FF","#4CBCFF","#82D0FF","#26C9FF","#729AFF","#3CA6FF","#1DE3FF","#9693FF","#8F7AFF","#5DF3FF","#B3BBFF","#7DE2FF","#3EA1FF","#33EEFF","#8C97FF","#507EFF","#A9AEFF","#7FE6FF","#2B83FF","#428FFF","#959DFF","#40C0FF","#139DFF","#4ACCFF","#1892FF","#9F9CFF","#8ADFFF","#1DA0FF","#35EDFF","#B58DFF","#25BFFF","#7FAEFF"];
const timeColor = "#32B4FF";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import chalk from "chalk";
import fs from "fs";
let timeZone
try {
timeZone = JSON.parse(fs.readFileSync(join(__dirname, "../../config.json"))).TimeZone;
} catch {
  timeZone = "Asia/Manila";
}

import moment from "moment-timezone";
function rgb() {
  let con = colors[Math.floor(Math.random() * colors.length)];
  let convert = con.replace("#", "").match(/.{1,2}/g).map(a => Buffer.from(a, "hex").toJSON().data[0]);
  return convert
};

export const log = function(optional, text) {
  let time = moment.tz(timeZone).format("HH:mm:ss");
  if(!text) return console.log(`${chalk.hex(timeColor)("["+time+"]")} `+chalk.bold.hex("#FF0000").bold(`[ Error ] » `) + chalk.hex("#FFFFFF")(`${optional}`))
  if(optional.toLowerCase().includes("error")) return console.log(`${chalk.hex(timeColor)("["+time+"]")} `+chalk.bold.hex("#FF0000").bold(`[ Error ] » `) + text);

      if(optional == "KEY") {
       return console.info(`${chalk.hex(timeColor)("["+time+"]")} `+chalk.bold.rgb(...rgb()).bold(`[ ${optional} ] » `) + chalk.hex("#FFFFFF")(`${text}`))
      } else {
     return console.log(`${chalk.hex(timeColor)("["+time+"]")} `+chalk.bold.rgb(...rgb()).bold(`[ ${optional} ] » `) + chalk.hex("#FFFFFF")(`${text}`))
      }
}
export const logValue = function(optional, text) {
    let time = moment.tz(timeZone).format("HH:mm:ss");
    if(!text) return (`${chalk.hex(timeColor)("["+time+"]")} `+chalk.bold.hex("#FF0000").bold(`[ Error ] » `) + chalk.hex("#FFFFFF")(`${optional}`))
    if(optional.toLowerCase().includes("error")) return (`${chalk.hex(timeColor)("["+time+"]")} `+chalk.bold.hex("#FF0000").bold(`[ Error ] » `) + text);

       return (`${chalk.hex(timeColor)("["+time+"]")} `+chalk.bold.rgb(...rgb()).bold(`[ ${optional} ] » `) + chalk.hex("#FFFFFF")(`${text}`))
  }
export const custom = function(optional, text) {
  let time = moment.tz(timeZone).format("HH:mm:ss");
  if(!text) return console.log(`${chalk.hex(timeColor)("["+time+"]")} `+chalk.bold.hex("#FF0000").bold(`[ Error ] » `) + chalk.hex("#FFFFFF")(`${optional}`))
  if(optional.toLowerCase().includes("error")) return console.log(`${chalk.hex(timeColor)("["+time+"]")} `+chalk.bold.hex("#FF0000").bold(`[ Error ] » `) + text);

      if(optional == "KEY") {
       return console.info(`${chalk.hex(timeColor)("["+time+"]")} `+chalk.bold.rgb(...rgb()).bold(`${optional} » `) + chalk.hex("#FFFFFF")(`${text}`))
      } else {
     return console.log(`${chalk.hex(timeColor)("["+time+"]")} `+chalk.bold.rgb(...rgb()).bold(`${optional} » `) + chalk.hex("#FFFFFF")(`${text}`))
      }
}

export const thread = function(optional, text) {
  let time = moment.tz(timeZone).format("HH:mm:ss");
      if(optional == "KEY") {
        console.info(`${chalk.hex(timeColor)("["+time+"]")} `+chalk.bold.rgb(...rgb()).bold(`${optional} » `) + chalk.hex("#FFFFFF")(`${text}`))
      } else {
      console.log(`${chalk.hex(timeColor)("["+time+"]")} `+chalk.bold.rgb(...rgb()).bold(`${optional} » `) + chalk.hex("#FFFFFF")(`${text}`))
      }
}

export const value = rgb;

export const color = function(optional, text) {
  let time = moment.tz(timeZone).format("HH:mm:ss");
  if(!text) return console.log(`${chalk.hex(timeColor)("["+time+"]")} `+chalk.bold.hex("#FF0000").bold(`[ Error ] » `) + chalk.hex("#FF0000")(`${optional}`))
  if(optional.toLowerCase().includes("error")) return console.log(`${chalk.hex(timeColor)("["+time+"]")} `+chalk.bold.hex("#FF0000").bold(`[ Error ] » `) + text);
  let meta = rgb()
  let R = meta[0]
  let G = meta[1]
  let B = meta[2]

      if(optional == "KEY") {
       return console.info(`${chalk.hex(timeColor)("["+time+"]")} `+chalk.bold.rgb(R, G, B).bold(`[ ${optional} ] » `) + text)
      } else {
     return console.log(`${chalk.hex(timeColor)("["+time+"]")} `+chalk.bold.rgb(R, G, B).bold(`[ ${optional} ] » `) + text)
      }

}

export const umaru = function(text) {
  let time = moment.tz(timeZone).format("HH:mm:ss");
  let meta = rgb()
  let R = meta[0]
  let G = meta[1]
  let B = meta[2]
  if(!text) return console.log(`${chalk.hex(timeColor)("["+time+"]")} `+chalk.bold.hex("#FF0000").bold(`[ Error ] » `) + chalk.hex("#FFFFFF")(`${text}`))
  if (text) if(text.toLowerCase().includes("installing")) return console.log(`${chalk.hex(timeColor)("["+time+"]")} `+chalk.bold.rgb(R, G, B).bold(`[ Umaru ] » `) + text)
 
 return console.log(`${chalk.hex(timeColor)("["+time+"]")} `+chalk.bold.rgb(...rgb()).bold(`[ Umaru ] » `) + chalk.hex("#FFFFFF")(`${text}`))

}

export const sys = function(text) {
  let time = moment.tz(timeZone).format("HH:mm:ss");
  if(text) {
  if (text.toLowerCase().includes("error")) return  console.log(`${chalk.hex(timeColor)("["+time+"]")} `+chalk.bold.hex("#FF0000").bold(`[ System ] » `) + text);
    if (text.toLowerCase().includes("failed")) return  console.log(`${chalk.hex(timeColor)("["+time+"]")} `+chalk.bold.hex("#FF0000").bold(`[ System ] » `) + text);
    if (text.toLowerCase().includes("not found")) return  console.log(`${chalk.hex(timeColor)("["+time+"]")} `+chalk.bold.hex("#FF0000").bold(`[ System ] » `) + text);
  }
      let meta = rgb()
      let R = meta[0]
      let G = meta[1]
      let B = meta[2]
    return console.log(`${chalk.hex(timeColor)("["+time+"]")} `+chalk.bold.rgb(R, G, B).bold(`[ System ] » `) + text)
}
export const error = function(text) {
  let time = moment.tz(timeZone).format("HH:mm:ss");
  console.log(`${chalk.hex(timeColor)("["+time+"]")} `+chalk.bold.rgb(255, 0, 0).bold(`[ System ] » `) + text)
}

let meta = rgb()
let R = meta[0]
let G = meta[1]
let B = meta[2]
export const animation = function(text, consoles) {
  let time = moment.tz(timeZone).format("HH:mm:ss");
  if(typeof consoles !== "undefined") {
    fs.writeFileSync("../bin/log", consoles);
    process.stdout.cursorTo(0);
    process.stdout.write(`${chalk.hex(timeColor)("["+time+"]")} ` + chalk.rgb(R, G, B)(text))
  } else {
  process.stdout.cursorTo(0);
  process.stdout.write(`${chalk.hex(timeColor)("["+time+"]")} `+chalk.bold.rgb(R, G, B).bold(`[ Umaru ] » `) + text)
  }

  if(typeof consoles !== "undefined") console.log(`${chalk.hex(timeColor)("["+time+"]")} ` + chalk.rgb(R, G, B)(text), true);
}
export const animationError = function(text, consoles) {
  let time = moment.tz(timeZone).format("HH:mm:ss");
  if(typeof consoles !== "undefined") {
    fs.writeFileSync("../bin/log", consoles);
    process.stdout.cursorTo(0);
    process.stdout.write(`${chalk.hex(timeColor)("["+time+"]")} ` + chalk.rgb(255, 0, 0)(text))
  } else {
  process.stdout.cursorTo(0);
  process.stdout.write(`${chalk.hex(timeColor)("["+time+"]")} `+chalk.bold.rgb(255, 0, 0).bold(`[ Umaru ] » `) + text)
  }

  if(typeof consoles !== "undefined") console.log(`${chalk.hex(timeColor)("["+time+"]")} ` + chalk.rgb(R, G, B)(text), true);
}
export const count = function(text) {
  return chalk.rgb(Math.ceil(R / 1.4), Math.ceil(G / 1.4), B)(`${text}`)
}