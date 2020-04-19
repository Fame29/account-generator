const Discord = require("discord.js");
const bot = new Discord.Client();
const prefix = "/";
var fs = require("fs");
var lineReader = require("line-reader");
var async = require("async");
const firstline = require("firstline");
const generated = new Set();
var os = require("os");
var express = require('express');

bot.on('ready', function(){
    bot.user.setGame(`${bot.users.size} Users | /help`, 'https://www.twitch.tv/oltores78/');
})
bot.on("message", async message =>{
    if(message.content === prefix + "help"){
    var help_embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setThumbnail("https://cdn.discordapp.com/attachments/685545362596823246/692871443263914034/OIPEV8I93Q7.jpg")
    .setTitle("Voici les différentes commandes de disponible :")
    .setDescription("Pour utiliser le bot vous devez utiliser le prefix / suivit de votre commande.")
    .addField(":tada: Gen _4_", "`gen + type de compte` `add + type de compte` `create + type de compte` `service` ")
    .addField(":gear: Les utilitaires _3_", "`stats` `test` `restock + type de compte`")
    .setTimestamp()
    .setFooter("Codé par Fame#0001")
    message.channel.sendMessage(help_embed)
    console.log("commande d'aide demandée")
}
})

bot.on("message", async message =>{
    if(message.content === prefix + "service"){
    var help_embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setThumbnail("https://cdn.discordapp.com/attachments/685545362596823246/692871443263914034/OIPEV8I93Q7.jpg")
    .setTitle("Voici les différents services de disponible :")
    .setDescription("Pour générer un compte vous devez faire /gen + service souhaité.")
    .addField(":gear: Voici les services de disponible actuellement : _8_", "`spotify` `minecraft` `hulu` `fortnite` `uplay` `pornhub` `udemy` `steam` ")
    .setTimestamp()
    .setFooter("Codé par Fame#0001")
    message.channel.sendMessage(help_embed)
    console.log("commande de service demandée")
}
})


bot.on("message", message => {
   // if (message.channel.id === "701416717095796816") { //This will make the bot work only in that channel
        if (message.author.bot) return;
        var command = message.content
            .toLowerCase()
            .slice(prefix.length)
            .split(" ")[0];

        if (command === "test") {
            message.channel.send("Test terminé, le bot est fonctionnel");
        }

        if (command === "gen") {
            if (generated.has(message.author.id)) {
                message.channel.send(
                    "Attendez 15 minutes avant de générer un autres compte ! " +
                    message.author
                );
            } else {
                let messageArray = message.content.split(" ");
                let args = messageArray.slice(1);
                if (!args[0])
                    return message.reply("Veuillez mettre le service que vous souhaitez gen");
                var fs = require("fs");
                const filePath = __dirname + "/" + args[0] + ".txt";

                fs.readFile(filePath, function (err, data) {
                    if (!err) {
                        data = data.toString();
                        var position = data.toString().indexOf("\n");
                        var firstLine = data.split("\n")[0];
                        message.author.send(firstLine);
                        console.log(firstline);
                        if (position != -1) {
                            data = data.substr(position + 1);
                            fs.writeFile(filePath, data, function (err) {
                                const embed = {
                                    title: "Votre compte a été généré",
                                    description: "Regarde tes messages privés pour avoir le compte",
                                    color: 8519796,
                                    timestamp: "2019-04-04T14:16:26.398Z",
                                    footer: {
                                        icon_url:
                                            "https://cdn.discordapp.com/avatars/530778425540083723/7a05e4dd16825d47b6cdfb02b92d26a5.png",
                                        text: "Dev par Fame#0001"
                                    },
                                    thumbnail: {
                                        url:
                                            "http://www.compartosanita.it/wp-content/uploads/2019/02/right.png"
                                    },
                                    author: {
                                        name: "GenBot",
                                        url: "https://discordapp.com",
                                        icon_url: bot.displayAvatarURL
                                    },
                                    fields: []
                                };
                                message.channel.send({ embed });
                                generated.add(message.author.id);
                                setTimeout(() => {
                                    // Removes the user from the set after a minute
                                    generated.delete(message.author.id);
                                }, 150000);
                                if (err) {
                                    console.log(err);
                                }
                            });
                        } else {
                            message.channel.send(
                                "Désolé mais le service que tu souhaites générer est en rupture de stock.."
                            );
                        }
                    } else {
                        message.channel.send(
                            "Désolé mais ce service n'héxiste pas dans notre base de donnée."
                        );
                    }
                });
            }
        }
        else
            if (command === "stats") {

                message.channel.send(`Voici le nombre de personne qui je surveille : ${bot.users.size}`)
            }

        if (command === "add") {
            if (!message.member.hasPermission("ADMINISTRATOR"))
                return message.reply("Désolé mais vous ne pouvez pas faire ça car vous n'êtes pas admin !");
            var fs = require("fs");
            let messageArray = message.content.split(" ");
            let args = messageArray.slice(1);
            var account = args[0]
            var service = args[1]
            const filePath = __dirname + "/" + args[1] + ".txt";
            fs.appendFile(filePath, os.EOL + args[0], function (err) {
                if (err) return console.log(err);
                message.channel.send("C'est fait !")
            });


        }
        if (command === "create") {
            if (!message.member.hasPermission("ADMINISTRATOR"))
                return message.reply("Désolé mais vous ne pouvez pas faire ça car vous n'êtes pas admin !");
            var fs = require("fs");
            let messageArray = message.content.split(" ");
            let args = messageArray.slice(1);
            const filePath = __dirname + "/" + args[0] + ".txt";
            fs.writeFile(filePath, 'first:first', function (err) {
                if (err) throw err;
                message.channel.send("C'est fait !")
            });
        }
        if (command === "restock") {
            let messageArray = message.content.split(" ");
            let args = messageArray.slice(1);
            if (!message.member.hasPermission("ADMINISTRATOR"))
                return message.reply("Désolé mais vous ne pouvez pas faire ça car vous n'êtes pas admin !");
            if (!args[0])
                return message.reply(
                    "Veuillez spécifier le type de compte que vous avez restock."
                );
            message.channel.send(
                "@everyone " +
                "Des comptes**" +
                args[0] +
                "**" +
                " ont été restock par " +
                "<@" +
                message.author.id +
                ">"
            );
        }
 //   }
});

bot.login("Njk4NjIxOTU1NTEwODk0NTky.XpIhMg.4NYdO-JGoS8ZxuwxQGjcqwyPxnc");
