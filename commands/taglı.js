const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'taglı',
    aliases: ['taglı', 'taglı'],
    run: async(client, message, args) => {
        let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('#ff0000').setTimestamp().setThumbnail(message.author.avatarURL).setFooter('✩ Sword');
        let embed2 = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('#ffdd06').setTimestamp().setThumbnail(message.author.avatarURL).setFooter('✩ Sword');

        if (!client.config.yönetim.some(id => message.member.roles.cache.has(id))) {
            return message.channel.send(embed.setDescription("Yetkin yok knk!"))
        }

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.channel.send(embed.setDescription("Taglı Yapıcağın Kişiyi Belirt!"))

        await message.guild.members.cache.get(member.id).roles.add(client.config.taglı)
        message.react('<a:tik:835614965469544488>')
        message.channel.send(new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setDescription(`${member} adlı kullanıcıya <@&835544857605832782> rolü verildi`).setColor('#ffdd06').setTimestamp().setThumbnail(message.author.avatarURL).setFooter('Artık Taglısın <3'))

    }
}