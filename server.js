const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const db = require('quick.db');
const moment = require('moment')
require('moment-duration-format')
const commands = client.commands = new Discord.Collection();
const aliases = client.aliases = new Discord.Collection();

fs.readdirSync('./commands', { encoding: 'utf8' }).filter(file => file.endsWith(".js")).forEach((files) => {
    let command = require(`./commands/${files}`);
    if (!command.name) return console.log(`Hatalı Kod Dosyası => [/commands/${files}]`)
    commands.set(command.name, command);
    if (!command.aliases || command.aliases.length < 1) return
    command.aliases.forEach((otherUses) => { aliases.set(otherUses, command.name); })
})



//  WATCHING  : !ping izliyor
//  LISTENING : !ping dinliyor
//  PLAYING   : !ping oynuyor 
//  STREAMING : !ping yayında
////----------------------- READY KISMI -----------------------\\\\
client.on('ready', () => {
    client.user.setPresence({ activity: { name: '✩Sword 💖 Emirhan' }, status: 'online' })
    client.channels.cache.get('835544858604470336').join() // ses kanalı İD
    console.log(`Bot ${client.user.tag} Adı İle Giriş Yaptı!`);
  })
////----------------------- CONFIG KISMI -----------------------\\\\
client.config = {
    vipRoles: ['835544857605832778'], //vip
    taglı: ['835544857605832782'], //taglı
    şüpheli: ['835544857584992290'], //şüpheli
    unregisteres: ['835544857584992294'], // kayıtsız
    maleRoles: ['835544857594429451'], // erkek
    maleRoles2: ['835544857594429450'], // erkek2
    girlroles: ['835544857594429454'], // bayan
    girlroles2: ['835544857594429453'], // bayan
    mods: ["835544857623003182"], // yetkili
    channelID: '835544857916473348', // kayıt kanalı
    yönetim: ['835544857682116629'] // üst yönetim
}
////----------------------- PREFİX KISMI -----------------------\\\\
client.on('message', message => {
    const prefix = ".";// prefix
    if (!message.guild || message.author.bot || !message.content.startsWith(prefix)) return;
    const args = message.content.slice(1).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
    if (!cmd) return;
    cmd.run(client, message, args)
})

client.on('guildMemberAdd', member =>
 { 
member.roles.add(client.config.unregisteres)
});
////----------------------- HEM ETİKET HEMDE TAG ROL KISMI -----------------------\\\\
client.on("userUpdate", async function(oldUser, newUser) { // kod codaredan alınıp editlenmiştir!
    const guildID = "835544857552093224"//sunucu
    const roleID = "835544857605832782"//taglırolü
    const tag = "✩"//tag
    const chat = '835544859581612062'// chat
    const log2 = '835544863767658504' // log kanalı
  
    const guild = client.guilds.cache.get(guildID)
    const role = guild.roles.cache.find(roleInfo => roleInfo.id === roleID)
    const member = guild.members.cache.get(newUser.id)
    const embed = new Discord.MessageEmbed().setAuthor(member.displayName, member.user.avatarURL({ dynamic: true })).setColor('#ff0000').setTimestamp().setFooter.setFooter('✩ Sword');
    if (newUser.username !== oldUser.username) {
        if (oldUser.username.includes(tag) && !newUser.username.includes(tag)) {
            member.roles.remove(roleID)
            client.channels.cache.get(log2).send(embed.setDescription(` ${newUser} isminden \`✩\` çıkartarak ailemizden ayrıldı!`))
        } else if (!oldUser.username.includes(tag) && newUser.username.includes(tag)) {
            member.roles.add(roleID)
            client.channels.cache.get(chat).send(``)
            client.channels.cache.get(log2).send(embed.setDescription(`  ${newUser} ismine \`✩\` alarak ailemize katıldı`))
        }
    }
   if (newUser.discriminator !== oldUser.discriminator) {
        if (oldUser.discriminator == "0099" && newUser.discriminator !== "0099") {
            member.roles.remove(roleID)
            client.channels.cache.get(log2).send(embed.setDescription(`  <@!' + newUser + '> etiketinden \`0099\` çıkartarak ailemizden ayrıldı!`))
        } else if (oldUser.discriminator !== "0099" && newUser.discriminator == "0099") {
            member.roles.add(roleID)
            client.channels.cache.get(log2).send(embed.setDescription(`  <@!' + newUser + '> etiketine \`0099\` alarak ailemize katıldı`))
            client.channels.cache.get(chat).send(`<`)
        }
    }
  
  })
////----------------------- HOŞGELDİN MESAJI KISMI -----------------------\\\\
client.on('guildMemberAdd', (member) => {

    const mapping = {
        " ": "",
        "0": "0", // sayı iDleri
        "1": "1",
        "2": "2",
        "3": "3",
        "4": "4",
        "5": "5",
        "6": "6",
        "7": "7",
        "8": "8",
        "9": "9",
    };
    var toplamüye = member.guild.memberCount
    var emotoplamüye = `${toplamüye}`.split("").map(c => mapping[c] || c).join("")
    let memberDay = (Date.now() - member.user.createdTimestamp);
    let createAt = moment.duration(memberDay).format("Y [Yıl], M [ay], W [hafta], DD [gün]")
    let createAt2 = moment.duration(memberDay).format("DD [gün], HH [saat], mm [dakika]")
    if (memberDay > 604800000) {
        client.channels.cache.get(client.config.channelID).send(`:tada: Sword'a hoş geldin ${member} !

Hesabın \`${createAt} önce\` oluşturulmuş. 

Sunucu kurallarımız <#835555203021144085> kanalında belirtilmiştir. Unutma sunucu içerisinde ki ceza işlemlerin kuralları okuduğunu varsayarak gerçekleştirilecek.

Seninle beraber ${emotoplamüye} kişi olduk! Sol tarafta bulunan \`V.Confirmed\` odalarından birine girerek kayıt işlemini gerçekleştirebilirsin
<@&835544857623003182>`)
    } else {
        client.channels.cache.get(client.config.channelID).send(
            new Discord.MessageEmbed()
            .setAuthor(member.user.username, member.user.avatarURL({ dynamic: true }))
            .setDescription(`${member}, Adlı Kullanıcı Sunucuya Katıldı Hesabı **${createAt2}** Önce Açıldığı İçin Şüpheli!`)
            .setTimestamp()
            .setThumbnail(member.user.avatarURL({ dynamic: true }))
            .setFooter(`✩Sword`))
          
    }
})



////----------------------- TAG MESAJ KISMI -----------------------\\\\
client.on('message', msg => {
    if (msg.content === '!tag') {
        msg.channel.send(`✩`); // tagı yazınız
    } else if (msg.content === 'tag') {
        msg.channel.send(`✩`);// tagı yazınız
    } else if (msg.content === '.tag') {
        msg.channel.send(`✩`);// tagı yazınız
    } else if (msg.content === '-tag') {
        msg.channel.send(`✩`);// tagı yazınız
    } else if (msg.content === ".rol-ver") {
        msg.guild.members.cache.forEach(x => {
            x.roles.add("835544857605832782")
        })
    }
});


////----------------------- TAG TARAMASI KISMI -----------------------\\\\
setInterval(() => {
    const server = client.guilds.cache.get("835544857552093224"); //Server ID 
    server.member.id.cache.forEach(async member => {
        if (member.roles.cache.has("835544857552093224") || member.roles.cache.has("835544857552093224")) return; //EVERYONE ROL İD

/*   Yasaklı Tag    */
   if(member.user.username.includes("tasaklıTAG")){
        member.roles.set(["Yasaklı Tag Rol ID"]).catch(() => {}) 
    }


 if (member.user.username.includes("")) {
            await member.roles.add("").catch(() => {})
        }
        if (!member.user.username.includes("")) {
            await member.roles.set("")
        }
    })
}, 60 * 1000)// 60(60 saniye) kısmını değiştirebilirsiniz


client.login(process.env.token)