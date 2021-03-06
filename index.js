const Telegraf = require('telegraf');
const app = new Telegraf('574562058:AAFJb0WlzSOKvoZVmCasirUCqekGxtRWLS0');
const axios = require('axios'); // add axios
const rn = require('random-number'); // random-number

app.command('/r', (ctx) =>{
  const subreddit = ctx.message.text.replace('/r ','');

  // random post selector
  const randomNr = rn.generator({
    min:  2,
    max:  26,
    integer: true
  })
  const rand = randomNr();
  
  axios
    .get(`https://reddit.com/r/${subreddit}/hot.json?sort=hot&t=all`)
    .then(res => {
      // data recieved from Reddit
      const data = res.data.data;

      // if subbreddit does not exist
      if (data.children.length < 1)
        return ctx.reply("The subreddit couldn't be found.");

      
      const link = `${data.children[rand].data.url}`;
      const title = `${data.children[rand].data.title}`;
      
      ctx.reply(title + '\n' + link);
      //ctx.reply(link);
    })

    // if there's any error in request
    .catch(err => ctx.reply("The subreddit couldn't be found."));
});

app.command('/help', (ctx) =>{
  ctx.reply('List of commands: \n/r <subreddit name> \n/subs \n/spam')
});

app.command('/subs', (ctx) =>{
  ctx.reply(`Poputal subreddit list:

  todayilearned
  pics
  aww
  EarthPorn
  mildlyinteresting
  Jokes
  tifu
  GetMotivated
  Unexpected
  CrappyDesign
  preetygirls
  `)
});

app.command('/spam', (ctx) =>{
  ctx.reply(`SPAM




























SPAM`)
});

app.startPolling();