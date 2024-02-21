import e from "os";
import o from "moment-timezone";
import t from "fs";
import s from "path";

function r(e)
{
  let o = 0;
  const n = t.readdirSync(e);
  for (const m of n)
  {
    const n = s.join(e, m),
      a = t.statSync(n);
    a.isFile() ? o += a.size : a.isDirectory() && (o += r(n))
  }
  return o / 1024 / 1024
}
export const setup = {
  name: "system",
  version: "40.0.0",
  permission: "Administrator",
  creator: "John Lester",
  description: "Process Manager",
  category: "Utility",
  usages: "",
  cooldown: 0
};
let bb = r("../data").toFixed(2);
export const execCommand = async function(
{
  api: t,
  event: s,
  timeZone: n,
  umaru: m
})
{
  let a = `» Bot Information\n\n» System: UmaruV4\n» Commands: ${m.client.allCommandsName.length}\n» Events: ${m.client.umaruEvents.length}\n» Users: ${m.allUserID.length}\n» Threads: ${m.allThreadID.length+m.allInactiveThreadID.length}\n» OS: ${e.platform()} ${e.machine()}\n» Host: ${e.userInfo().username}@${e.hostname()}\n» Kernel: ${e.release()}\n» Platform: ${process.env.REPL_OWNER?"replit":process.env.CSB_SANDBOX_ID?"codesandbox":e.platform()}\n» NodeJS Memory: ${(process.memoryUsage().rss/1024/1024).toFixed(2)}MB\n» Date: ${o.tz(n).format("LLL")}\n» Database Storage: ${bb} MB\n» Runtime: ${Math.floor(process.uptime()/60/60) % 24} Minutes: ${Math.floor(process.uptime()/60) % 60} Seconds: ${Math.floor(process.uptime() % 60)}\n» Ping: ${Date.now() - parseInt(s.timestamp)} ms`;
  return t.sendMessage(a, s.threadID, s.messageID)
};