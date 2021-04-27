const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'kız',
    aliases: ['kız', 'k', 'girl', 'bayan'],
    run: async(client, message, args) => {
        let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('#ff0000').setTimestamp().setThumbnail(message.author.avatarURL).setFooter('Sword');
        let embed2 = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('#640032').setTimestamp().setThumbnail(message.author.avatarURL).setFooter('Sword');

        if (!client.config.mods.some(id => message.member.roles.cache.has(id))) {
            return message.channel.send(embed.setDescription("Komutu kullanan kullanıcıda yetki bulunmamakta!"))
        }

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.channel.send(embed.setDescription("Kullanıcı bulunamadı veya etiketlenmedi!"))

        let name = args[1]
        if (!name) return message.channel.send(embed.setDescription("Kullanıcı için bi isim yazılmak zorunda!"))

        let age = args[2]
        if (!age) return message.channel.send(embed.setDescription("Kullanıcı için bir yaş yazılmak zorunda!"))

        if (!["0000"].some(ss => member.user.username.toLowerCase().includes(ss)) && member.user.discriminator !== "etiket varsa koyun yoksa 0000 yapın örnek : 0099 şeklinde yazın" && !message.guild.members.cache.get(member.id).roles.cache.has('835544857584992294' && '835544857584992294')) {
            return message.channel.send(new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setDescription("Kullanıcının kayıt olabilmesi için boost basmalı veya tag almalı!").setTimestamp().setThumbnail(message.author.avatarURL).setFooter('Vip almak için : .vip @kullanıcı/id'))
        }
        message.guild.members.cache.get(member.id).setNickname(`✩ ${name} | ${age}`)
        db.push(`isimler_${member.id}`, ` \`${name} | ${age}\` (<@&835544857594429454>)`);
        db.set(`kayıt_${member.id}`, true)
        db.add(`kız_${message.author.id}`, 1)
        await message.guild.members.cache.get(member.id).roles.remove(client.config.unregisteres)
        await message.guild.members.cache.get(member.id).roles.add(client.config.girlroles)
        await message.guild.members.cache.get(member.id).roles.add(client.config.girlroles2)
        message.react('<a:tik:835614965469544488>')
        message.channel.send(embed2.setDescription(`${member} **adlı kullanıcı \`Kadın\` Olarak Kayıt Edildi!**`)
.setFooter('✩ Sword')

        )
    }
}