import fs from 'fs';
import axios from 'axios';
export const setup = {
  name: "girlnude",
  version: "1.0.0",
  permission: "Users",
  creator: "CallmeSun, John Lester",
  description: "Random Nude Photo Nude is very beautiful and eye-pleasing (Note This is a photo command 18+ Consider Before Using)",
  category: "nsfw",
  usages: [""],
  cooldown: 10,
  isPrefix: true
};
export const domain = {"girlnude": setup.name}
export const execCommand = async function({api, event, kernel, umaru, args, keyGenerator,    translate}) {
    let money = (umaru.data.users[event.senderID] && umaru.data.users[event.senderID].money) ? umaru.data.users[event.senderID].money: 0
        if(money <= 300) {
         return api.sendMessage((await translate("💵 You need 300$ to see the photo!", event, null, true)),event.threadID,event.messageID);
        }  else {
          let link = ["https://i.imgur.com/T5BPkRG.jpg","https://i.imgur.com/69MT3Wg.jpg","https://i.imgur.com/z6EtvVm.jpg","https://i.imgur.com/hf3KluZ.jpg","https://i.imgur.com/9XxaYI3.jpg","https://i.imgur.com/rCSoCaA.jpg","https://i.imgur.com/6olWIAr.jpg","https://i.imgur.com/AcKfCpt.jpg","https://i.imgur.com/OA6wMjp.jpg","https://i.imgur.com/WBUspj9.jpg","https://i.imgur.com/GBzR0aY.jpg","https://i.imgur.com/EefsUX3.jpg","https://i.imgur.com/kWqwF1K.jpg","https://i.imgur.com/tUee6NZ.jpg","https://i.imgur.com/NJSUN9k.jpg","https://i.imgur.com/GxPSGo9.jpg","https://i.imgur.com/junGPIa.jpg","https://i.imgur.com/fj0WV5S.jpg","https://i.imgur.com/trR1T6P.jpg","https://i.imgur.com/5GPy7MZ.jpg","https://i.imgur.com/kPpcoFe.jpg","https://i.imgur.com/DibHjLg.jpg","https://i.imgur.com/lzY1HP3.jpg","https://i.imgur.com/z7oHPeD.jpg","https://i.imgur.com/2kW0UrZ.jpg","https://i.imgur.com/2TJXTM8.jpg","https://i.imgur.com/hHkxDMt.jpg","https://i.imgur.com/H7vs8c6.jpg","https://i.imgur.com/jVSz5tX.jpg","https://i.imgur.com/vF32mr2.jpg","https://i.imgur.com/BoJDDpm.jpg","https://i.imgur.com/GbAkVR3.jpg","https://i.imgur.com/aMw2mEz.jpg","https://i.imgur.com/egPMyvA.jpg","https://i.imgur.com/OPZDGUY.jpg","https://i.imgur.com/dxbjwmx.jpg","https://i.imgur.com/FNQQETm.jpg","https://i.imgur.com/hT7bbZr.jpg","https://i.imgur.com/0Eg5ZN4.jpg","https://i.imgur.com/Qle3LJi.jpg","https://i.imgur.com/pzJq8ay.jpg","https://i.imgur.com/NyqSI83.jpg","https://i.imgur.com/p41qMvY.jpg","https://i.imgur.com/p7EiSkE.jpg","https://i.imgur.com/JYUOHUd.jpg","https://i.imgur.com/cWxtrc2.jpg","https://i.imgur.com/2pSSMtl.jpg","https://i.imgur.com/DAnirH8.jpg","https://i.imgur.com/8XyrCGu.jpg","https://i.imgur.com/I7rtkwT.jpg","https://i.imgur.com/KCo1P0u.jpg","https://i.imgur.com/GLIwmQk.jpg","https://i.imgur.com/Mue8s3E.jpg","https://i.imgur.com/Fak0Ahg.jpg","https://i.imgur.com/EDsi80I.jpg","https://i.imgur.com/JvVpF6W.jpg","https://i.imgur.com/I3CE748.jpg","https://i.imgur.com/CH0PxJP.jpg","https://i.imgur.com/3T1q41U.jpg","https://i.imgur.com/WD3uX9V.jpg","https://i.imgur.com/7sS6lji.jpg","https://i.imgur.com/kFAfAC3.jpg","https://i.imgur.com/EpyMadP.jpg","https://i.imgur.com/9AJt2Tt.jpg","https://i.imgur.com/55EbaeY.jpg","https://i.imgur.com/xRJSAmJ.jpg","https://i.imgur.com/kXA2fSX.jpg","https://i.imgur.com/dy1YlJs.jpg","https://i.imgur.com/0LlpoXG.jpg","https://i.imgur.com/Kof1KXr.jpg","https://i.imgur.com/xIgnYGo.jpg","https://i.imgur.com/4cFgFZq.jpg","https://i.imgur.com/d8k4a6G.jpg","https://i.imgur.com/eraz44H.jpg","https://i.imgur.com/uSHLM8y.jpg","https://i.imgur.com/2iy9KnD.jpg","https://i.imgur.com/Aew0gjm.jpg","https://i.imgur.com/sxXm5cI.jpg","https://i.imgur.com/2or8urJ.jpg","https://i.imgur.com/cslJLNt.jpg","https://i.imgur.com/zQztjGM.jpg","https://i.imgur.com/dyluWmm.jpg","https://i.imgur.com/CgAc5ux.jpg","https://i.imgur.com/Z5ph1wc.jpg","https://i.imgur.com/0bRLqAR.jpg","https://i.imgur.com/x68KtYI.jpg","https://i.imgur.com/cAich41.jpg","https://i.imgur.com/BMcYATY.jpg","https://i.imgur.com/E9PYK7J.jpg","https://i.imgur.com/1oaM7ai.jpg","https://i.imgur.com/Urx9Ijl.jpg","https://i.imgur.com/QYGOZuK.jpg"];
          await umaru.createJournal(event);
              let { data } = await axios.get(encodeURI(link[Math.floor(Math.random() * link.length)]), {responseType: "stream"});
              let path = umaru.sdcard+"/Pictures/"+keyGenerator()+".jpg";
              await kernel.writeStream(path, data);
              return api.sendMessage({body: (await translate("Dads really like it😼\n» Costs: -300$ «", event, null, true)),attachment: fs.createReadStream(path)}, event.threadID, async() => {
                await umaru.deleteJournal(event);
                await fs.promises.unlink(path);
                umaru.data.users[event.senderID].money -= 300;
                await umaru.save();
              }, event.messageID)
       }
}