const { Client } = require("discord.js")
const ms = require("ms")
const mongoose = require("mongoose")
const DSU = require("dbdsoftuishardstats");
const mongodbURL = process.env.MONGODBURL

module.exports = {
    name: "ready",

    /**
    * @param {Client} client
    */
    async execute(client) {

        const { user, ws } = client

        client.player.init(user.id)

        console.log(`${user.tag} is now online!`)

        setInterval(() => {

            const ping = ws.ping

            user.setActivity({
                name: `zeenbot.xyz | ${client.guilds.cache.size} servers`,
                type: 5,
            })

        }, ms("5s"))

        require('../../Structures/Handlers/Premium')(client)

        if (!mongodbURL) return

        mongoose.connect(mongodbURL, {

            useNewUrlParser: true,
            useUnifiedTopology: true

        }).then(() => {

            console.log("Connected to Database!")

        }).catch(err => console.log(err))

    }
}