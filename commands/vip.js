const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'vip',
    aliases: ['special', 'vip'],
    run: async(client, message, args) => {
        let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('#ff0000').setTimestamp().setThumbnail(message.author.avatarURL).setFooter('✩ Sword');
        let embed2 = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('#ffdd06').setTimestamp().setThumbnail(message.author.avatarURL).setFooter('✩ Sword');

        if (!client.config.yönetim.some(id => message.member.roles.cache.has(id))) {
            return message.channel.send(embed.setDescription("Komutu kullanan kullanıcıda yetki bulunmamakta!"))
        }

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.channel.send(embed.setDescription("Kullanıcı bulunamadı veya etiketlenmedi!"))

        await message.guild.members.cache.get(member.id).roles.add(client.config.vipRoles)
        message.react('<a:tik:835614965469544488>')
        message.channel.send(new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setDescription(`${member} adlı kullanıcıya <@&835544857605832778> rolü verildi`).setColor('#ffdd06').setTimestamp().setThumbnail(message.author.avatarURL).setFooter('Kullanıcı .e/.k komutları ile kayıt edilebilir!'))

    }
}