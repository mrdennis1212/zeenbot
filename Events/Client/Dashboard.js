const { Client, ChannelType, EmbedBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder} = require("discord.js")
const config = require('./config.json');
const SoftUI = require('dbd-soft-ui');
let DBD = require('discord-dashboard');
const PermissionsDB = require("../../Structures/Schemas/Permissions")
const WelcomeDB = require("../../Structures/Schemas/Welcome")
const GeneralLogsDB = require("../../Structures/Schemas/LogsChannel")
const LogsSwitchDB = require("../../Structures/Schemas/GeneralLogs")
const LevelDB = require("../../Structures/Schemas/Level")
const voiceDB = require("../../Structures/Schemas/VoiceSystem")
const TicketDB = require("../../Structures/Schemas/Ticket")
const TicketSetupDB = require("../../Structures/Schemas/TicketSetup")
const antiLinkDB = require("../../Structures/Schemas/anitLink")
const reportChannelDB = require("../../Structures/Schemas/ReportChannel")
const verificationDB = require("../../Structures/Schemas/Verification")

module.exports = {
    name: "ready",

    /**
     * @param {Client} client 
     */
    async execute(client) {

        const { user } = client

        let Information = []
        let Moderation = []
        let Economy = []
        let Community = []
        let Tickets = []
        let Giveaway = []

        const info = client.commands.filter(x => x.category === "Information")
        const mod = client.commands.filter(x => x.category === "Moderation")
        const eco = client.commands.filter(x => x.category === "Economy")
        const com = client.commands.filter(x => x.category === "Community")
        const tick = client.commands.filter(x => x.category === "Tickets")
        const give = client.commands.filter(x => x.category === "Giveaway")

        CommandPush(info, Information)
        CommandPush(tick, Tickets)
        CommandPush(give, Giveaway)
        CommandPush(mod, Moderation)
        CommandPush(eco, Economy)
        CommandPush(com, Community)

        await DBD.useLicense(config.dbd.license)
        DBD.Dashboard = DBD.UpdatedClass()

        const Dashboard = new DBD.Dashboard({

            port: config.dbd.port,
            client: config.discord.client,
            redirectUri: `${config.dbd.domain}${config.dbd.redirectUri}`,
            domain: config.dbd.domain,
            ownerIDs: config.dbd.ownerIDs,
            useThemeMaintenance: false,
            useTheme404: true,
            acceptPrivacyPolicy: true,
            bot: client,
            guildAfterAuthorization: {
                use: true,
                guildId: "1057986397081980948"
            },
            theme: SoftUI({
                locales: {
                    enUS: {
                        name: 'English',
                        index: {
                            feeds: ["Current Users", "CPU", "System Platform", "Server Count"],
                            card: {
                                category: "zeenbot",
                                title: "zeenbot's new Panel - The center of everything",
                                description: "Welcome to the zeenbot panel where you can control the core features to the bot.",
                                footer: "Invite the Bot",
                                link: {
                                    enabled: true,
                                    url: "https://discord.com/api/oauth2/authorize?client_id=1047099666182967317&permissions=8&scope=bot%20applications.commands"
                                }
                            },
                            feedsTitle: "Feeds",
                            graphTitle: "Graphs",
                        },
                        blacklisted: {
                            title: "Blacklisted",
                            subtitle: "Access denied",
                            description: "Unfortunately it seems that you have been blacklisted from the dashboard.",
                            button: {
                                enabled: false,
                                text: "Return",
                                link: "https://google.com"
                            }
                        },
                        manage: {
                            settings: {
                                memberCount: "Members",
                                info: {
                                    info: "Info",
                                    server: "Server Information"
                                }
                            }
                        },
                        privacyPolicy: {
                            title: "Privacy Policy",
                            description: "Privacy Policy and Terms of Service",
                            pp: "Complete Privacy Policy",
                        },
                        partials: {
                            sidebar: {
                                dash: "Dashboard",
                                manage: "Manage Guilds",
                                commands: "Commands",
                                pp: "Privacy Policy",
                                admin: "Admin",
                                account: "Account Pages",
                                login: "Sign In",
                                logout: "Sign Out"
                            },
                            navbar: {
                                home: "Home",
                                pages: {
                                    manage: "Manage Guilds",
                                    settings: "Manage Guilds",
                                    commands: "Commands",
                                    pp: "Privacy Policy",
                                    admin: "Admin Panel",
                                    error: "Error",
                                    credits: "Credits",
                                    debug: "Debug",
                                    leaderboard: "Leaderboard",
                                    profile: "Profile",
                                    maintenance: "Under Maintenance",
                                }
                            },
                            title: {
                                pages: {
                                    manage: "Manage Guilds",
                                    settings: "Manage Guilds",
                                    commands: "Commands",
                                    pp: "Privacy Policy",
                                    admin: "Admin Panel",
                                    error: "Error",
                                    credits: "Credits",
                                    debug: "Debug",
                                    leaderboard: "Leaderboard",
                                    profile: "Profile",
                                    maintenance: "Under Maintenance",
                                }
                            },
                            preloader: {
                                text: "Page is loading..."
                            },
                            premium: {
                                title: "Want more from zeenbot?",
                                description: "Check out premium features below!",
                                buttonText: "Get Premium",
                                button: {
                                    url: "https://google.com"
                                }
                            },
                            settings: {
                                title: "Site Configuration",
                                description: "Configurable Viewing Options",
                                theme: {
                                    title: "Site Theme",
                                    description: "Make the site more appealing for your eyes!",
                                },
                                language: {
                                    title: "Site Language",
                                    description: "Select your preffered language!",
                                }
                            }
                        }
                    },
                    deDE: {
                        name: 'Deutsch',
                        index: {
                            feeds: ["Current Users", "CPU", "System Platform", "Server Count"],
                            card: {
                                category: "zeenbot",
                                title: "zeenbot's neues Panel - The Zentrum von allem",
                                description: "Herzlich willkommen im zeenbot-Panel, wo Sie die Kernfunktionen des Bots steuern können.",
                                footer: "Lade den Bot ein",
                                link: {
                                    enabled: true,
                                    url: "https://discord.com/api/oauth2/authorize?client_id=1047099666182967317&permissions=8&scope=bot%20applications.commands"
                                }
                            },
                            feedsTitle: "Feeds",
                            graphTitle: "Graphen",
                        },
                        blacklisted: {
                            title: "Blacklisted",
                            subtitle: "Zugriff verweigert",
                            description: "Leider sieht es so aus, als wärst du für das Dashboard gesperrt.",
                            button: {
                                enabled: false,
                                text: "Return",
                                link: "https://google.com"
                            }
                        },
                        manage: {
                            settings: {
                                memberCount: "Mitglieder",
                                info: {
                                    info: "Info",
                                    server: "Server Informationen"
                                }
                            }
                        },
                        privacyPolicy: {
                            title: "Datenschutzbestimmungen",
                            description: "DDatenschutzbestimmungen und ABGs",
                            pp: "Datenschutzbestimmungen",
                        },
                        partials: {
                            sidebar: {
                                dash: "Dashboard",
                                manage: "Server verwalten",
                                commands: "Commands",
                                pp: "Datenschutzbestimmungen",
                                admin: "Admin",
                                account: "Account Seite",
                                login: "Anmelden",
                                logout: "Abmelden"
                            },
                            navbar: {
                                home: "Home",
                                pages: {
                                    manage: "Server verwalten",
                                    settings: "Server verwalten",
                                    commands: "Commands",
                                    pp: "Datenschutzbestimmungen",
                                    admin: "Admin Panel",
                                    error: "Error",
                                    credits: "Credits",
                                    debug: "Debug",
                                    leaderboard: "Leaderboard",
                                    profile: "Profil",
                                    maintenance: "Wartungsarbeiten",
                                }
                            },
                            title: {
                                pages: {
                                    manage: "Server verwalten",
                                    settings: "Server verwalten",
                                    commands: "Commands",
                                    pp: "Datenschutzbestimmungen",
                                    admin: "Admin Panel",
                                    error: "Error",
                                    credits: "Credits",
                                    debug: "Debug",
                                    leaderboard: "Leaderboard",
                                    profile: "Profil",
                                    maintenance: "Wartungsarbeiten",
                                }
                            },
                            preloader: {
                                text: "Seite lädt..."
                            },
                            premium: {
                                title: "Du willst mehr von zeenbot?",
                                description: "Sieht dir unsere Premium Features an!",
                                buttonText: "Premium erhalten",
                                button: {
                                    url: "https://google.com"
                                }
                            },
                            settings: {
                                title: "Webseiten Konfiguration",
                                description: "Verfügbare Einstellunge",
                                theme: {
                                    title: "Seiten Thema",
                                    description: "Passe die Seite an!",
                                },
                                language: {
                                    title: "Sprache",
                                    description: "Wähle deine Sprache aus!",
                                }
                            }
                        }
                    }
                },
                customThemeOptions: {
                    index: async ({ req, res, config }) => {
                        return {
                            values: [],
                            graph: {},
                            cards: [],
                        }
                    },
                },
                websiteName: "zeenbot",
                colorScheme: "blue",
                supporteMail: "support@zeenbot.de",
                icons: {
                    favicon: 'https://cdn.discordapp.com/attachments/1041329286969294858/1058348553715580938/z-black.png',
                    noGuildIcon: "https://cdn.discordapp.com/attachments/1041329286969294858/1058321546197868625/abstract-black-low-poly-wallpaper-preview.jpeg",
                    sidebar: {
                        darkUrl: 'https://cdn.discordapp.com/attachments/1041329286969294858/1058348553392627723/z-white.png',
                        lightUrl: 'https://cdn.discordapp.com/attachments/1041329286969294858/1058348553715580938/z-black.png',
                        hideName: true,
                        borderRadius: false,
                        alignCenter: true
                    },
                },
                index: {
                    card: {
                        category: "zeenbot",
                        title: "zeenbot's new Panel - The center of everything",
                        description: "Welcome to the zeenbot panel where you can control the core features to the bot.",
                        image: "https://cdn.discordapp.com/attachments/1041329286969294858/1044984586528096286/zlogo.png",
                        footer: "Invite the Bot",
                        link: {
                            enabled: true,
                            url: "https://discord.com/api/oauth2/authorize?client_id=1047099666182967317&permissions=8&scope=bot%20applications.commands"
                        }
                    },
                    graph: {
                        enabled: false,
                        lineGraph: false,
                        title: 'Memory Usage',
                        tag: 'Memory (MB)',
                        max: 100
                    },
                },
                blacklisted: {
                    title: "Blacklisted",
                    subtitle: "Access denied",
                    description: "Unfortunately it seems that you have been blacklisted from the dashboard.",
                    button: {
                        enabled: false,
                        text: "Return",
                        link: "https://google.com"
                    }
                },
                sweetalert: {
                    errors: {},
                    success: {
                        login: "Successfully logged in.",
                    }
                },
                preloader: {
                    image: "https://cdn.discordapp.com/attachments/1041329286969294858/1044984586528096286/zlogo.png",
                    spinner: false,
                    text: "Page is loading",
                },
                premium: {
                    enabled: true,
                    card: {
                        title: "Want more from zeenbot?",
                        description: "Check out premium features below!",
                        bgImage: "https://cdn.discordapp.com/attachments/1041329286969294858/1044984586528096286/zlogo.png",
                        button: {
                            text: "Become Premium",
                            url: "https://google.comgoogle.de"
                        }
                    }
                },
                admin: {
                    pterodactyl: {
                        enabled: false,
                        apiKey: "apiKey",
                        panelLink: "https://panel.website.com",
                        serverUUIDs: []
                    }
                },

                commands: [
                    {
                        category: "Information",
                        subTitle: "Information Commands",
                        aliasesDisabled: false,
                        list: Information
                    },
                    {
                        category: "Tickets",
                        subTitle: "Ticket Commands",
                        aliasesDisabled: false,
                        list: Tickets
                    },
                    {
                        category: "Giveaways",
                        subTitle: "Giveaway Commands",
                        aliasesDisabled: false,
                        list: Giveaway
                    },
                    {
                        category: "Economy",
                        subTitle: "Economy Commands",
                        aliasesDisabled: false,
                        list: Economy
                    },
                    {
                        category: "Community",
                        subTitle: "Community Commands",
                        aliasesDisabled: false,
                        list: Community
                    },
                    {
                        category: "Moderation",
                        subTitle: "Moderation Commands",
                        aliasesDisabled: false,
                        list: Moderation
                    },
                ],

            }),
            settings: [

                // Permissions
                {
                    categoryId: "general",
                    categoryName: "General Settings",
                    categoryDescription: "Setup the general settings for the bot",
                    categoryImageURL: 'https://cdn.discordapp.com/attachments/1041329286969294858/1060266044498903212/general.png',
                    categoryOptionsList: [
                        {
                            optionId: "mods",
                            optionName: "Moderators",
                            optionDescription: "Set the role for the mods/Admins",
                            optionType:  DBD.formTypes.rolesSelect(false),
                            getActualSet: async ({ guild }) => {
                                let data = await PermissionsDB.findOne({ Guild: guild.id }).catch(err => { })
                                if (data) return data.ID
                                else return null
                            },
                            setNew: async ({ guild, newData }) => {

                                let data = await PermissionsDB.findOne({ Guild: guild.id }).catch(err => { })

                                if (!newData) newData = null

                                if (!data) {

                                    data = new PermissionsDB({
                                        Guild: guild.id,
                                        ID: newData,
                                    })

                                    await data.save()

                                } else {

                                    data.ID = newData
                                    await data.save()

                                }

                                return

                            }
                        },
                        {
                            optionId: "anitlink",
                            optionName: "Antilink",
                            optionDescription: "Enabled or Disable the Anti Link feature",
                            optionType:  DBD.formTypes.switch(false),
                            getActualSet: async ({ guild }) => {
                                let data = await antiLinkDB.findOne({ Guild: guild.id }).catch(err => { })
                                if (data) return data.logs
                                else return null
                            },
                            setNew: async ({ guild, newData }) => {

                                let data = await antiLinkDB.findOne({ Guild: guild.id }).catch(err => { })

                                if (!newData) newData = null

                                if (!data) {

                                    data = new antiLinkDB({
                                        Guild: guild.id,
                                        logs: newData,
                                    })

                                    await data.save()

                                } else {

                                    data.logs = newData
                                    await data.save()

                                }

                                return

                            }
                        },
                        {
                            optionId: "alnch",
                            optionName: "Anti Link ignored channels",
                            optionDescription: "Set or reset the categories to be ignored",
                            optionType: DBD.formTypes.channelsMultiSelect(false, false, channelTypes = [ChannelType.GuildText]),
                            getActualSet: async ({ guild }) => {
                                let data = await antiLinkDB.findOne({ Guild: guild.id }).catch(err => { })
                                if (data) return data.ignoredChannels
                                else return null
                            },
                            setNew: async ({ guild, newData }) => {

                                let data = await antiLinkDB.findOne({ Guild: guild.id }).catch(err => { })

                                if (!newData) newData = null

                                if (!data) {

                                    data = new antiLinkDB({
                                        Guild: guild.id,
                                        logs: false,
                                        ignoredChannels: newData
                                    })

                                    await data.save()

                                } else {

                                    data.ignoreChannels = newData
                                    await data.save()

                                }

                                return

                            }
                        },
                        {
                            optionId: "reportch",
                            optionName: "Report Channel",
                            optionDescription: "Set or disable the report channel",
                            optionType:  DBD.formTypes.channelsSelect(false, channelTypes = [ChannelType.GuildText]),
                            getActualSet: async ({ guild }) => {
                                let data = await reportChannelDB.findOne({ Guild: guild.id }).catch(err => { })
                                if (data) return data.Channel
                                else return null
                            },
                            setNew: async ({ guild, newData }) => {

                                let data = await reportChannelDB.findOne({ Guild: guild.id }).catch(err => { })

                                if (!newData) {
                                    newData = null
                                    let data = await reportChannelDB.findOne({ Guild: guild.id }).catch(err => { })
                                    if (!data) return

                                    await reportChannelDB.deleteOne({ Guild: guild.id }).catch(err => { })
                                }

                                if (!data) {

                                    data = new reportChannelDB({
                                        Guild: guild.id,
                                        Channel: newData,
                                    })

                                    await data.save()

                                } else {

                                    data.Channel = newData
                                    await data.save()

                                }

                                return

                            }
                        },
                    ]
                },

                // Verification
                {
                    categoryId: "verification",
                    categoryName: "Verification Settings",
                    categoryDescription: "Setup the verification settings for the bot",
                    categoryImageURL: 'https://cdn.discordapp.com/attachments/1041329286969294858/1060266044498903212/general.png',
                    categoryOptionsList: [
                        {
                            optionId: "verify",
                            optionName: "Verification",
                            optionDescription: "Enabled or Disable the Verification feature",
                            optionType:  DBD.formTypes.switch(false),
                            getActualSet: async ({ guild }) => {
                                let data = await verificationDB.findOne({ Guild: guild.id }).catch(err => { })
                                if (data) return data.Enabled
                                else return null
                            },
                            setNew: async ({ guild, newData }) => {
                                let data = await verificationDB.findOne({ Guild: guild.id }).catch(err => { })

                                if (!newData) newData = null

                                if (!data) {

                                    data = new verificationDB({
                                        Guild: guild.id,
                                        Enabled: newData,
                                        Role: null,
                                        Channel: null,
                                        MessageID: null,
                                        TimeOut: 30000,
                                        Message: "Please verify yourself by clicking the button below"
                                    })

                                    await data.save()

                                } else {

                                    data.Enabled = newData
                                    await data.save()

                                }

                                const channel = client.channels.cache.get(data.Channel);

                                // console.log("Channel is set to : " + channel)

                                if (newData == true) {
                                    let message = await channel.send({
                                        embeds: [
                                            new EmbedBuilder()
                                                .setColor(client.color)
                                                .setTitle("✅ | Verification")
                                                .setDescription(data.Message)
                                                .setFooter({ text: "powered by zeenbot", iconURL: 'https://cdn.discordapp.com/attachments/1041329286969294858/1058348553392627723/z-white.png' })
                                                .setTimestamp()
                                        ],
                                        components: [
                                            new ActionRowBuilder().addComponents(
                                                new ButtonBuilder()
                                                    .setLabel("Verify")
                                                    .setStyle(ButtonStyle.Secondary)
                                                    .setCustomId("verify")
                                            )
                                        ]
                                    })
                                    let messageID = message.id;

                                    data.MessageID = messageID;
                                    await data.save();
                                }

                                if (newData == false) {
                                    let message = data.MessageID;
                                    message.delete();
                                }

                                return
                            },
                            allowedCheck: async ({guild,user}) => {
                                let data = await verificationDB.findOne({ Guild: guild.id }).catch(err => { })
                                if (!data) return {allowed: false, errorMessage: "No Data found yet! Please set the verification settings first!"}
                                if (!data.Role) return {allowed: false, errorMessage: "You are missing the verification role"}
                                if (!data.Channel) return {allowed: false, errorMessage: "You are missing the verification channel"}
                                return {
                                    allowed: true,
                                    errorMessage: null
                                };
                            },
                        },
                        {
                            optionId: "verifych",
                            optionName: "Verification Channel",
                            optionDescription: "Set or reset the server's verification channel",
                            optionType: DBD.formTypes.channelsSelect(false, channelTypes = [ChannelType.GuildText]),
                            getActualSet: async ({ guild }) => {
                                let data = await verificationDB.findOne({ Guild: guild.id }).catch(err => { })
                                if (data) return data.Channel
                                else return null
                            },
                            setNew: async ({ guild, newData }) => {

                                let data = await verificationDB.findOne({ Guild: guild.id }).catch(err => { })

                                if (!newData) newData = null

                                const channel = client.channels.cache.get(newData);

                                console.log("Channel is set to : " + channel)

                                if (!data) {

                                    data = new verificationDB({
                                        Guild: guild.id,
                                        Enabled: false,
                                        Role: null,
                                        Channel: newData,
                                        MessageID: null,
                                        TimeOut: 30000,
                                        Message: "Please verify yourself by clicking the button below"
                                    })

                                    await data.save()

                                    if (data.Enabled === true) {
                                        let message = await channel.send({
                                            embeds: [
                                                new EmbedBuilder()
                                                    .setColor(client.color)
                                                    .setTitle("✅ | Verification")
                                                    .setDescription(data.Message)
                                                    .setFooter({ text: "powered by zeenbot", iconURL: 'https://cdn.discordapp.com/attachments/1041329286969294858/1058348553392627723/z-white.png' })
                                                    .setTimestamp()
                                            ],
                                            components: [
                                                new ActionRowBuilder().addComponents(
                                                    new ButtonBuilder()
                                                        .setLabel("Verify")
                                                        .setStyle(ButtonStyle.Secondary)
                                                        .setCustomId("verify")
                                                )
                                            ]
                                        })
                                        let messageID = message.id;

                                        data.MessageID = messageID;
                                        await data.save();
                                    }

                                } else {

                                    let channelChanged = false

                                    if (data.Channel !== newData) {
                                        channelChanged = true
                                    }

                                    const oldChannel = client.channels.cache.get(newData);

                                    data.Channel = newData
                                    await data.save()

                                    if (channelChanged) {
                                        if (data.Enabled === true) {
                                            let message = await channel.send({
                                                embeds: [
                                                    new EmbedBuilder()
                                                        .setColor(client.color)
                                                        .setTitle("✅ | Verification")
                                                        .setDescription(data.Message)
                                                        .setFooter({ text: "powered by zeenbot", iconURL: 'https://cdn.discordapp.com/attachments/1041329286969294858/1058348553392627723/z-white.png' })
                                                        .setTimestamp()
                                                ],
                                                components: [
                                                    new ActionRowBuilder().addComponents(
                                                        new ButtonBuilder()
                                                            .setLabel("Verify")
                                                            .setStyle(ButtonStyle.Secondary)
                                                            .setCustomId("verify")
                                                    )
                                                ]
                                            })
                                            let messageID = message.id;

                                            let oldMessageID = data.MessageID;

                                            // oldChannel.messages.fetch(oldMessageID).then(msg => msg.delete());
                                            oldChannel.messages.fetch(oldMessageID).then(message => console.log(message.content));

                                            data.MessageID = messageID;
                                            await data.save();
                                        }
                                    }

                                }

                                return

                            }
                        },
                        {
                            optionId: "verifyto",
                            optionName: "Verification Timeout",
                            optionDescription: "Set verification timeout in ms (1000ms = 1s)",
                            optionType: DBD.formTypes.input(30000, 1000, 120000),
                            getActualSet: async ({ guild }) => {
                                let data = await verificationDB.findOne({ Guild: guild.id }).catch(err => { })
                                if (data) return data.TimeOut
                                else return null
                            },
                            setNew: async ({ guild, newData }) => {

                                let data = await verificationDB.findOne({ Guild: guild.id }).catch(err => { })

                                if (!newData) newData = null

                                if (!data) {

                                    data = new verificationDB({
                                        Guild: guild.id,
                                        Enabled: false,
                                        Role: null,
                                        Channel: null,
                                        MessageID: null,
                                        TimeOut: newData,
                                        Message: "Please verify yourself by clicking the button below"
                                    })

                                    await data.save()

                                } else {

                                    data.TimeOut = newData
                                    await data.save()

                                }

                                return

                            }
                        },
                        {
                            optionId: "verifyrole",
                            optionName: "Verification Role",
                            optionDescription: "Set the role that should be given to verified users",
                            optionType: DBD.formTypes.rolesSelect(false, false),
                            getActualSet: async ({ guild }) => {
                                let data = await verificationDB.findOne({ Guild: guild.id }).catch(err => { })
                                if (data) return data.Role
                                else return null
                            },
                            setNew: async ({ guild, newData }) => {

                                let data = await verificationDB.findOne({ Guild: guild.id }).catch(err => { })

                                if (!newData) newData = null

                                if (!data) {

                                    data = new verificationDB({
                                        Guild: guild.id,
                                        Enabled: false,
                                        Role: newData,
                                        Channel: null,
                                        MessageID: null,
                                        TimeOut: 30000,
                                        Message: "Please verify yourself by clicking the button below"
                                    })

                                    await data.save()

                                } else {

                                    data.Role = newData
                                    await data.save()

                                }

                                return

                            }
                        },
                        {
                            optionId: "verifymsg",
                            optionName: "Verification Message",
                            optionDescription: "Set message that should be sent in the embed",
                            optionType: DBD.formTypes.input("Please verify yourself by clicking the button below", 1, 200, false),
                            getActualSet: async ({ guild }) => {
                                let data = await verificationDB.findOne({ Guild: guild.id }).catch(err => { })
                                if (data) return data.Message
                                else return null
                            },
                            setNew: async ({ guild, newData }) => {

                                let data = await verificationDB.findOne({ Guild: guild.id }).catch(err => { })

                                if (!newData) newData = null

                                const channel = client.channels.cache.get(newData);

                                if (!data) {

                                    data = new verificationDB({
                                        Guild: guild.id,
                                        Enabled: false,
                                        Role: null,
                                        Channel: null,
                                        MessageID: null,
                                        TimeOut: 30000,
                                        Message: newData
                                    })

                                    await data.save()

                                    if (data.Enabled === true) {
                                        let message = await channel.send({
                                            embeds: [
                                                new EmbedBuilder()
                                                    .setColor(client.color)
                                                    .setTitle("✅ | Verification")
                                                    .setDescription(data.Message)
                                                    .setFooter({ text: "powered by zeenbot", iconURL: 'https://cdn.discordapp.com/attachments/1041329286969294858/1058348553392627723/z-white.png' })
                                                    .setTimestamp()
                                            ],
                                            components: [
                                                new ActionRowBuilder().addComponents(
                                                    new ButtonBuilder()
                                                        .setLabel("Verify")
                                                        .setStyle(ButtonStyle.Secondary)
                                                        .setCustomId("verify")
                                                )
                                            ]
                                        })
                                        let messageID = message.id;

                                        data.MessageID = messageID;
                                        await data.save();
                                    }

                                } else {

                                    data.Message = newData
                                    await data.save()

                                    let messageChanged = false

                                    if (data.Message !== newData) {
                                        messageChanged = true
                                    }

                                    if (messageChanged) {
                                        console.log("message changed")
                                        if (data.Enabled === true) {
                                            let message = await channel.send({
                                                embeds: [
                                                    new EmbedBuilder()
                                                        .setColor(client.color)
                                                        .setTitle("✅ | Verification")
                                                        .setDescription(data.Message)
                                                        .setFooter({ text: "powered by zeenbot", iconURL: 'https://cdn.discordapp.com/attachments/1041329286969294858/1058348553392627723/z-white.png' })
                                                        .setTimestamp()
                                                ],
                                                components: [
                                                    new ActionRowBuilder().addComponents(
                                                        new ButtonBuilder()
                                                            .setLabel("Verify")
                                                            .setStyle(ButtonStyle.Secondary)
                                                            .setCustomId("verify")
                                                    )
                                                ]
                                            })
                                            let messageID = message.id;

                                            let oldMessageID = data.MessageID;

                                            channel.fetchMessage(oldMessageID.then(msg => msg.delete()))

                                            data.MessageID = messageID;
                                            await data.save();
                                        }
                                    }

                                }

                                return

                            }
                        },
                    ]
                },

                // Welcome System

                {
                    categoryId: "welcome",
                    categoryName: "Welcome System",
                    categoryDescription: "Setup the Welcome Channel",
                    categoryImageURL: 'https://cdn.discordapp.com/attachments/1041329286969294858/1058429901549600768/welcome.png',
                    categoryOptionsList: [
                        {
                            optionId: "welch",
                            optionName: "Welcome Channel",
                            optionDescription: "Set or reset the server's welcome channel",
                            optionType: DBD.formTypes.channelsSelect(false, channelTypes = [ChannelType.GuildText]),
                            getActualSet: async ({ guild }) => {
                                let data = await WelcomeDB.findOne({ Guild: guild.id }).catch(err => { })
                                if (data) return data.Channel
                                else return null
                            },
                            setNew: async ({ guild, newData }) => {

                                let data = await WelcomeDB.findOne({ Guild: guild.id }).catch(err => { })

                                if (!newData) newData = null

                                if (!data) {

                                    data = new WelcomeDB({
                                        Guild: guild.id,
                                        Channel: newData,
                                        Msg: null,
                                        DM: false,
                                        DMMessage: null,
                                        Content: false,
                                        Embed: false
                                    })

                                    await data.save()

                                } else {

                                    data.Channel = newData
                                    await data.save()

                                }

                                return

                            }
                        },
                        {
                            optionId: "welmsg",
                            optionName: "Welcome Message",
                            optionDescription: "Set the welcome messsage",
                            optionType: DBD.formTypes.input("Welcome to my server!", 1, 256, false, false),
                            getActualSet: async ({ guild }) => {
                                let data = await WelcomeDB.findOne({ Guild: guild.id }).catch(err => { })
                                if (data) return data.Msg
                                else return null
                            },
                            setNew: async ({ guild, newData }) => {

                                let data = await WelcomeDB.findOne({ Guild: guild.id }).catch(err => { })

                                if (!newData) newData = null

                                if (!data) {

                                    data = new WelcomeDB({
                                        Guild: guild.id,
                                        Channel: null,
                                        Msg: newData,
                                        DM: false,
                                        DMMessage: null,
                                        Content: false,
                                        Embed: false

                                    })

                                    await data.save()

                                } else {

                                    data.Msg = newData
                                    await data.save()

                                }

                                return

                            }
                        },
                        {
                            optionId: "weldm",
                            optionName: "Welcome DM",
                            optionDescription: "Enable or Disable Welcome Message (in DM)",
                            optionType: DBD.formTypes.switch(false),
                            getActualSet: async ({ guild }) => {
                                let data = await WelcomeDB.findOne({ Guild: guild.id }).catch(err => { })
                                if (data) return data.DM
                                else return false
                            },
                            setNew: async ({ guild, newData }) => {

                                let data = await WelcomeDB.findOne({ Guild: guild.id }).catch(err => { })

                                if (!newData) newData = false

                                if (!data) {

                                    data = new WelcomeDB({
                                        Guild: guild.id,
                                        Channel: null,
                                        Msg: null,
                                        DM: newData,
                                        DMMessage: null,
                                        Content: false,
                                        Embed: false
                                    })

                                    await data.save()

                                } else {

                                    data.DM = newData
                                    await data.save()

                                }

                                return

                            }
                        },
                        {
                            optionId: "weldmopt",
                            optionName: "Welcome DM Options",
                            optionDescription: "Send Content",
                            optionType: DBD.formTypes.switch(false),
                            themeOptions: {
                                minimalbutton: {
                                    first: true
                                }
                            },
                            getActualSet: async ({ guild }) => {
                                let data = await WelcomeDB.findOne({ Guild: guild.id }).catch(err => { })
                                if (data) return data.Content
                                else return false
                            },
                            setNew: async ({ guild, newData }) => {

                                let data = await WelcomeDB.findOne({ Guild: guild.id }).catch(err => { })

                                if (!newData) newData = false

                                if (!data) {

                                    data = new WelcomeDB({
                                        Guild: guild.id,
                                        Channel: null,
                                        Msg: null,
                                        DM: false,
                                        DMMessage: null,
                                        Content: newData,
                                        Embed: false
                                    })

                                    await data.save()

                                } else {

                                    data.Content = newData
                                    await data.save()

                                }

                                return

                            }
                        },
                        {
                            optionId: "welcembed",
                            optionName: "",
                            optionDescription: "Send Embed",
                            optionType: DBD.formTypes.switch(false),
                            themeOptions: {
                                minimalbutton: {
                                    last: true
                                }
                            },
                            getActualSet: async ({ guild }) => {
                                let data = await WelcomeDB.findOne({ Guild: guild.id }).catch(err => { })
                                if (data) return data.Embed
                                else return false
                            },
                            setNew: async ({ guild, newData }) => {

                                let data = await WelcomeDB.findOne({ Guild: guild.id }).catch(err => { })

                                if (!newData) newData = false

                                if (!data) {

                                    data = new WelcomeDB({
                                        Guild: guild.id,
                                        Channel: null,
                                        Msg: null,
                                        DM: false,
                                        DMMessage: null,
                                        Content: false,
                                        Embed: newData
                                    })

                                    await data.save()

                                } else {

                                    data.Embed = newData
                                    await data.save()

                                }

                                return

                            }
                        },
                        {
                            optionId: "weldmmsg",
                            optionName: "Welcome Message (In DM)",
                            optionDescription: "Send a message to DM of newly joined member",
                            optionType: DBD.formTypes.embedBuilder({
                                username: user.username,
                                avatarURL: user.avatarURL(),
                                defaultJson: {
                                    content: "Welcome",
                                    embed: {
                                        description: "Welcome"
                                    }
                                }
                            }),
                            getActualSet: async ({ guild }) => {
                                let data = await WelcomeDB.findOne({ Guild: guild.id }).catch(err => { })
                                if (data) return data.DMMessage
                                else return null
                            },
                            setNew: async ({ guild, newData }) => {

                                let data = await WelcomeDB.findOne({ Guild: guild.id }).catch(err => { })

                                if (!newData) newData = false

                                if (!data) {

                                    data = new WelcomeDB({
                                        Guild: guild.id,
                                        Channel: null,
                                        Msg: null,
                                        DM: false,
                                        DMMessage: newData,
                                        Content: false,
                                        Embed: false
                                    })

                                    await data.save()

                                } else {

                                    data.DMMessage = newData
                                    await data.save()

                                }

                                return

                            }
                        },
                    ]
                },

                // Logging System

                {
                    categoryId: "logs",
                    categoryName: "Logging System",
                    categoryDescription: "Setup channels for General & Invite Logger",
                    categoryImageURL: 'https://cdn.discordapp.com/attachments/1041329286969294858/1058429900584910948/log.png',
                    categoryOptionsList: [
                        {
                            optionId: "gench",
                            optionName: "General Logger Channel",
                            optionDescription: "Set or reset the server's logger channel",
                            optionType: DBD.formTypes.channelsSelect(false, channelTypes = [ChannelType.GuildText]),
                            getActualSet: async ({ guild }) => {
                                let data = await GeneralLogsDB.findOne({ Guild: guild.id }).catch(err => { })
                                if (data) return data.Channel
                                else return null
                            },
                            setNew: async ({ guild, newData }) => {

                                let data = await GeneralLogsDB.findOne({ Guild: guild.id }).catch(err => { })

                                if (!newData) newData = null

                                if (!data) {

                                    data = new GeneralLogsDB({
                                        Guild: guild.id,
                                        Channel: newData,
                                        IgnoreChannels: null
                                    })

                                    await data.save()

                                } else {

                                    data.Channel = newData
                                    await data.save()

                                }

                                return

                            }
                        },
                        {
                            optionId: "ignch",
                            optionName: "Ignored Categories",
                            optionDescription: "Set or reset the categories to be ignored",
                            optionType: DBD.formTypes.channelsMultiSelect(false, false, channelTypes = [ChannelType.GuildCategory]),
                            getActualSet: async ({ guild }) => {
                                let data = await GeneralLogsDB.findOne({ Guild: guild.id }).catch(err => { })
                                if (data) return data.IgnoreChannels
                                else return null
                            },
                            setNew: async ({ guild, newData }) => {

                                let data = await GeneralLogsDB.findOne({ Guild: guild.id }).catch(err => { })

                                if (!newData) newData = null

                                if (!data) {

                                    data = new GeneralLogsDB({
                                        Guild: guild.id,
                                        Channel: null,
                                        IgnoreChannels: newData
                                    })

                                    await data.save()

                                } else {

                                    data.IgnoreChannels = newData
                                    await data.save()

                                }

                                return

                            }
                        },
                        {
                            optionId: "memjoin",
                            optionName: "Configure Logger System",
                            optionDescription: "Member Joined",
                            optionType: DBD.formTypes.switch(false),
                            themeOptions: {
                                minimalbutton: {
                                    first: true
                                }
                            },
                            getActualSet: async ({ guild }) => {
                                let data = await LogsSwitchDB.findOne({ Guild: guild.id }).catch(err => { })
                                if (data) return data.MemberJoin
                                else return false
                            },
                            setNew: async ({ guild, newData }) => {

                                let data = await LogsSwitchDB.findOne({ Guild: guild.id }).catch(err => { })

                                if (!newData) newData = false

                                if (!data) {

                                    data = new LogsSwitchDB({
                                        Guild: guild.id,
                                        MemberJoin: newData
                                    })

                                    await data.save()

                                } else {

                                    data.MemberJoin = newData
                                    await data.save()

                                }

                                return

                            }
                        },
                        {
                            optionId: "memleaved",
                            optionName: "",
                            optionDescription: "Member Left",
                            optionType: DBD.formTypes.switch(false),
                            themeOptions: {
                                minimalbutton: {
                                    first: true
                                }
                            },
                            getActualSet: async ({ guild }) => {
                                let data = await LogsSwitchDB.findOne({ Guild: guild.id }).catch(err => { })
                                if (data) return data.MemberLeave
                                else return false
                            },
                            setNew: async ({ guild, newData }) => {

                                let data = await LogsSwitchDB.findOne({ Guild: guild.id }).catch(err => { })

                                if (!newData) newData = false

                                if (!data) {

                                    data = new LogsSwitchDB({
                                        Guild: guild.id,
                                        MemberLeave: newData
                                    })

                                    await data.save()

                                } else {

                                    data.MemberLeave = newData
                                    await data.save()

                                }

                                return

                            }
                        },
                        {
                            optionId: "memrole",
                            optionName: "",
                            optionDescription: "Member Role",
                            optionType: DBD.formTypes.switch(false),
                            themeOptions: {
                                minimalbutton: {
                                    first: true
                                }
                            },
                            getActualSet: async ({ guild }) => {
                                let data = await LogsSwitchDB.findOne({ Guild: guild.id }).catch(err => { })
                                if (data) return data.MemberRole
                                else return false
                            },
                            setNew: async ({ guild, newData }) => {

                                let data = await LogsSwitchDB.findOne({ Guild: guild.id }).catch(err => { })

                                if (!newData) newData = false

                                if (!data) {

                                    data = new LogsSwitchDB({
                                        Guild: guild.id,
                                        MemberRole: newData
                                    })

                                    await data.save()

                                } else {

                                    data.MemberRole = newData
                                    await data.save()

                                }

                                return

                            }
                        },
                        {
                            optionId: "memnick",
                            optionName: "",
                            optionDescription: "Member Nickname",
                            optionType: DBD.formTypes.switch(false),
                            themeOptions: {
                                minimalbutton: {
                                    minimalbutton: true
                                }
                            },
                            getActualSet: async ({ guild }) => {
                                let data = await LogsSwitchDB.findOne({ Guild: guild.id }).catch(err => { })
                                if (data) return data.MemberNick
                                else return false
                            },
                            setNew: async ({ guild, newData }) => {

                                let data = await LogsSwitchDB.findOne({ Guild: guild.id }).catch(err => { })

                                if (!newData) newData = false

                                if (!data) {

                                    data = new LogsSwitchDB({
                                        Guild: guild.id,
                                        MemberNick: newData
                                    })

                                    await data.save()

                                } else {

                                    data.MemberNick = newData
                                    await data.save()

                                }

                                return

                            }
                        },
                        {
                            optionId: "chntpc",
                            optionName: "",
                            optionDescription: "Channel Topic",
                            optionType: DBD.formTypes.switch(false),
                            themeOptions: {
                                minimalbutton: {
                                    minimalbutton: true,
                                }
                            },
                            getActualSet: async ({ guild }) => {
                                let data = await LogsSwitchDB.findOne({ Guild: guild.id }).catch(err => { })
                                if (data) return data.ChannelTopic
                                else return false
                            },
                            setNew: async ({ guild, newData }) => {

                                let data = await LogsSwitchDB.findOne({ Guild: guild.id }).catch(err => { })

                                if (!newData) newData = false

                                if (!data) {

                                    data = new LogsSwitchDB({
                                        Guild: guild.id,
                                        ChannelTopic: newData
                                    })

                                    await data.save()

                                } else {

                                    data.ChannelTopic = newData
                                    await data.save()

                                }

                                return

                            }
                        },
                        {
                            optionId: "membst",
                            optionName: "",
                            optionDescription: "Member Boost",
                            optionType: DBD.formTypes.switch(false),
                            themeOptions: {
                                minimalbutton: {
                                    last: true,
                                }
                            },
                            getActualSet: async ({ guild }) => {
                                let data = await LogsSwitchDB.findOne({ Guild: guild.id }).catch(err => { })
                                if (data) return data.MemberBoost
                                else return false
                            },
                            setNew: async ({ guild, newData }) => {

                                let data = await LogsSwitchDB.findOne({ Guild: guild.id }).catch(err => { })

                                if (!newData) newData = false

                                if (!data) {

                                    data = new LogsSwitchDB({
                                        Guild: guild.id,
                                        MemberBoost: newData
                                    })

                                    await data.save()

                                } else {

                                    data.MemberBoost = newData
                                    await data.save()

                                }

                                return

                            }
                        },
                        {
                            optionId: "rolest",
                            optionName: "",
                            optionDescription: "Role Status",
                            optionType: DBD.formTypes.switch(false),
                            themeOptions: {
                                minimalbutton: {
                                    first: true,
                                }
                            },
                            getActualSet: async ({ guild }) => {
                                let data = await LogsSwitchDB.findOne({ Guild: guild.id }).catch(err => { })
                                if (data) return data.RoleStatus
                                else return false
                            },
                            setNew: async ({ guild, newData }) => {

                                let data = await LogsSwitchDB.findOne({ Guild: guild.id }).catch(err => { })

                                if (!newData) newData = false

                                if (!data) {

                                    data = new LogsSwitchDB({
                                        Guild: guild.id,
                                        RoleStatus: newData
                                    })

                                    await data.save()

                                } else {

                                    data.RoleStatus = newData
                                    await data.save()

                                }

                                return

                            }
                        },
                        {
                            optionId: "chnst",
                            optionName: "",
                            optionDescription: "Channel Status",
                            optionType: DBD.formTypes.switch(false),
                            themeOptions: {
                                minimalbutton: {
                                    minimalbutton: true,
                                }
                            },
                            getActualSet: async ({ guild }) => {
                                let data = await LogsSwitchDB.findOne({ Guild: guild.id }).catch(err => { })
                                if (data) return data.ChannelStatus
                                else return false
                            },
                            setNew: async ({ guild, newData }) => {

                                let data = await LogsSwitchDB.findOne({ Guild: guild.id }).catch(err => { })

                                if (!newData) newData = false

                                if (!data) {

                                    data = new LogsSwitchDB({
                                        Guild: guild.id,
                                        ChannelStatus: newData
                                    })

                                    await data.save()

                                } else {

                                    data.ChannelStatus = newData
                                    await data.save()

                                }

                                return

                            }
                        },
                        {
                            optionId: "emjst",
                            optionName: "",
                            optionDescription: "Emoji Status",
                            optionType: DBD.formTypes.switch(false),
                            themeOptions: {
                                minimalbutton: {
                                    minimalbutton: true,
                                }
                            },
                            getActualSet: async ({ guild }) => {
                                let data = await LogsSwitchDB.findOne({ Guild: guild.id }).catch(err => { })
                                if (data) return data.EmojiStatus
                                else return false
                            },
                            setNew: async ({ guild, newData }) => {

                                let data = await LogsSwitchDB.findOne({ Guild: guild.id }).catch(err => { })

                                if (!newData) newData = false

                                if (!data) {

                                    data = new LogsSwitchDB({
                                        Guild: guild.id,
                                        EmojiStatus: newData
                                    })

                                    await data.save()

                                } else {

                                    data.EmojiStatus = newData
                                    await data.save()

                                }

                                return

                            }
                        },
                        {
                            optionId: "memban",
                            optionName: "",
                            optionDescription: "Member Ban",
                            optionType: DBD.formTypes.switch(false),
                            themeOptions: {
                                minimalbutton: {
                                    last: true,
                                }
                            },
                            getActualSet: async ({ guild }) => {
                                let data = await LogsSwitchDB.findOne({ Guild: guild.id }).catch(err => { })
                                if (data) return data.MemberBan
                                else return false
                            },
                            setNew: async ({ guild, newData }) => {

                                let data = await LogsSwitchDB.findOne({ Guild: guild.id }).catch(err => { })

                                if (!newData) newData = false

                                if (!data) {

                                    data = new LogsSwitchDB({
                                        Guild: guild.id,
                                        MemberBan: newData
                                    })

                                    await data.save()

                                } else {

                                    data.MemberBan = newData
                                    await data.save()

                                }

                                return

                            }
                        },
                    ]
                },

                // Level
                {
                    categoryId: "level",
                    categoryName: "Levels",
                    categoryDescription: "Setup the level system for the bot",
                    categoryImageURL: 'https://cdn.discordapp.com/attachments/1041329286969294858/1058429900173877358/level.png',
                    categoryOptionsList: [
                        {
                            optionId: "levelchannel",
                            optionName: "Level Up Channel",
                            optionDescription: "Set the channel for the level up notifications",
                            optionType: DBD.formTypes.channelsSelect(false, channelTypes = [ChannelType.GuildText]),
                            getActualSet: async ({ guild }) => {
                                let data = await LevelDB.findOne({ Guild: guild.id }).catch(err => { })
                                if (data) return data.Channel
                                else return null
                            },
                            setNew: async ({ guild, newData }) => {

                                let data = await LevelDB.find({ Guild: guild.id }).catch(err => { })

                                if (!newData) newData = null

                                if (!data) {

                                    data = new LevelDB({
                                        Guild: guild.id,
                                        Channel: newData,
                                    })

                                    await data.save()

                                } else {

                                    for (const d of data) {
                                        d.Channel = newData
                                        await d.save()
                                    }

                                }

                                return

                            }
                        },
                        {
                            optionId: "levelcardbg",
                            optionName: "Level card background URL",
                            optionDescription: "Set the background image for the level card",
                            optionType: DBD.formTypes.input("https://wallpaper.dog/large/961978.jpg", 1, 200, false, false),
                            getActualSet: async ({ guild }) => {
                                let data = await LevelDB.findOne({ Guild: guild.id }).catch(err => { })
                                if (data) return data.BackgroundImage
                                else return null
                            },
                            setNew: async ({ guild, newData }) => {

                                let data = await LevelDB.find({ Guild: guild.id }).catch(err => { })

                                if (!newData) newData = null

                                if (!data) {

                                    data = new LevelDB({
                                        Guild: guild.id,
                                        BackgroundImage: newData,
                                    })

                                    await data.save()

                                } else {

                                    // Iterate through the array and update the data
                                    for (const d of data) {
                                        d.BackgroundImage = newData
                                        await d.save()
                                    }

                                }

                                return

                            }
                        }
                    ]
                },

                // Voice Hubs
                {
                    categoryId: "voicehubs",
                    categoryName: "Voice Hubs",
                    categoryDescription: "Setup the voice Hub for the server",
                    categoryImageURL: 'https://cdn.discordapp.com/attachments/1041329286969294858/1059955138413990028/voice.png',
                    categoryOptionsList: [
                        {
                            optionId: "hub",
                            optionName: "Hub",
                            optionDescription: "Set the channel for the voice hub",
                            optionType: DBD.formTypes.channelsSelect(false, channelTypes = [ChannelType.GuildVoice]),
                            getActualSet: async ({ guild }) => {
                                let data = await voiceDB.findOne({ GuildID: guild.id }).catch(err => { })
                                if (data) return data.ChannelID
                                else return null
                            },
                            setNew: async ({ guild, newData }) => {

                                let data = await voiceDB.findOne({ GuildID: guild.id }).catch(err => { })

                                if (!newData) newData = null

                                if (!data) {

                                    data = new voiceDB({
                                        GuildID: guild.id,
                                        ChannelID: newData,
                                    })

                                    await data.save()

                                } else {

                                    data.ChannelID = newData
                                    await data.save()

                                }

                                return

                            }
                        },
                        {
                            optionId: "hublimit",
                            optionName: "Hub User Limit",
                            optionDescription: "Set the max user size for the voice hub",
                            optionType: DBD.formTypes.input("3", 1, 2, false, false),
                            getActualSet: async ({ guild }) => {
                                let data = await voiceDB.findOne({ GuildID: guild.id }).catch(err => { })
                                if (data) return data.MaxSize
                                else return null
                            },
                            setNew: async ({ guild, newData }) => {

                                let data = await voiceDB.findOne({ GuildID: guild.id }).catch(err => { })

                                if (!newData) newData = null

                                if (!data) {

                                    data = new voiceDB({
                                        GuildID: guild.id,
                                        MaxSize: newData,
                                    })

                                    await data.save()

                                } else {

                                    data.MaxSize = newData
                                    await data.save()

                                }

                                return

                            }
                        }
                    ]
                },

                // Tickets System
                {
                    categoryId: "tickets",
                    categoryName: "Tickets",
                    categoryDescription: "Setup the Tickets for the server",
                    categoryImageURL: 'https://cdn.discordapp.com/attachments/1041329286969294858/1059955137977786428/tickets.png',
                    categoryOptionsList: [
                        {
                            optionId: "panel",
                            optionName: "Panel Channel",
                            optionDescription: "Set the channel for the panel hub",
                            optionType: DBD.formTypes.channelsSelect(false, channelTypes = [ChannelType.GuildText]),
                            getActualSet: async ({ guild }) => {
                                let data = await TicketSetupDB.findOne({ GuildID: guild.id }).catch(err => { })
                                if (data) return data.Channel
                                else return null
                            },
                            setNew: async ({ guild, newData }) => {

                                let data = await TicketSetupDB.findOne({ GuildID: guild.id }).catch(err => { })

                                if (!newData) newData = null

                                if (!data) {

                                    data = new TicketSetupDB({
                                        GuildID: guild.id,
                                        Channel: newData,
                                    })

                                    await data.save()

                                } else {

                                    data.Channel = newData
                                    await data.save()

                                }

                                return

                            }
                        },
                        {
                            optionId: "message",
                            optionName: "Ticket message",
                            optionDescription: "Set the message to be send when a ticket is being opened (use {member.user.tag} to get the user name)",
                            optionType: DBD.formTypes.input("Our team will contact you shortly. Please describe your issue.", 1, 200, false, false),
                            getActualSet: async ({ guild }) => {
                                let data = await TicketSetupDB.findOne({ GuildID: guild.id }).catch(err => { })
                                if (data) return data.Response
                                else return null
                            },
                            setNew: async ({ guild, newData }) => {

                                let data = await TicketSetupDB.findOne({ GuildID: guild.id }).catch(err => { })

                                if (!newData) newData = null

                                if (!data) {

                                    data = new TicketSetupDB({
                                        GuildID: guild.id,
                                        Response: newData,
                                    })

                                    await data.save()

                                } else {

                                    data.Response = newData
                                    await data.save()

                                }

                                return

                            }
                        },
                        {
                            optionId: "ticketpingstaff",
                            optionName: "Ping Staff",
                            optionDescription: "Set if the bot should ping the Ticket Handlers when a ticket is opened",
                            optionType: DBD.formTypes.switch(false),
                            getActualSet: async ({ guild }) => {
                                let data = await TicketSetupDB.findOne({ GuildID: guild.id }).catch(err => { })
                                if (data) return data.PingStaff
                                else return null
                            },
                            setNew: async ({ guild, newData }) => {

                                let data = await TicketSetupDB.findOne({ GuildID: guild.id }).catch(err => { })

                                if (!newData) newData = null

                                if (!data) {

                                    data = new TicketSetupDB({
                                        GuildID: guild.id,
                                        PingStaff: newData,
                                    })

                                    await data.save()

                                } else {

                                    data.PingStaff = newData
                                    await data.save()

                                }

                                return

                            }
                        },
                        {
                            optionId: "category",
                            optionName: "Panel category",
                            optionDescription: "Set the channel category for the tickets",
                            optionType: DBD.formTypes.channelsSelect(false, channelTypes = [ChannelType.GuildCategory]),
                            getActualSet: async ({ guild }) => {
                                let data = await TicketSetupDB.findOne({ GuildID: guild.id }).catch(err => { })
                                if (data) return data.Category
                                else return null
                            },
                            setNew: async ({ guild, newData }) => {

                                let data = await TicketSetupDB.findOne({ GuildID: guild.id }).catch(err => { })

                                if (!newData) newData = null

                                if (!data) {

                                    data = new TicketSetupDB({
                                        GuildID: guild.id,
                                        Category: newData,
                                    })

                                    await data.save()

                                } else {

                                    data.Category = newData
                                    await data.save()

                                }

                                return

                            }
                        },
                        {
                            optionId: "transscript",
                            optionName: "Transcript Channel",
                            optionDescription: "Set the transcript channel for the tickets",
                            optionType: DBD.formTypes.channelsSelect(false, channelTypes = [ChannelType.GuildText]),
                            getActualSet: async ({ guild }) => {
                                let data = await TicketSetupDB.findOne({ GuildID: guild.id }).catch(err => { })
                                if (data) return data.Transcripts
                                else return null
                            },
                            setNew: async ({ guild, newData }) => {

                                let data = await TicketSetupDB.findOne({ GuildID: guild.id }).catch(err => { })

                                if (!newData) newData = null

                                if (!data) {

                                    data = new TicketSetupDB({
                                        GuildID: guild.id,
                                        Transcripts: newData,
                                    })

                                    await data.save()

                                } else {

                                    data.Transcripts = newData
                                    await data.save()

                                }

                                return

                            }
                        },
                        {
                            optionId: "handlers",
                            optionName: "Ticket Support Role",
                            optionDescription: "Set the Ticket support role for the tickets",
                            optionType: DBD.formTypes.rolesSelect(false, false),
                            getActualSet: async ({ guild }) => {
                                let data = await TicketSetupDB.findOne({ GuildID: guild.id }).catch(err => { })
                                if (data) return data.Handlers
                                else return null
                            },
                            setNew: async ({ guild, newData }) => {

                                let data = await TicketSetupDB.findOne({ GuildID: guild.id }).catch(err => { })

                                if (!newData) newData = null

                                if (!data) {

                                    data = new TicketSetupDB({
                                        GuildID: guild.id,
                                        Handlers: newData,
                                    })

                                    await data.save()

                                } else {

                                    data.Handlers = newData
                                    await data.save()

                                }

                                return

                            }
                        },
                        {
                            optionId: "everyone",
                            optionName: "Everyone Role",
                            optionDescription: "Set the everyone role for the tickets",
                            optionType: DBD.formTypes.input("ROLE ID", 18, 20, false, true),
                            getActualSet: async ({ guild }) => {
                                let data = await TicketSetupDB.findOne({ GuildID: guild.id }).catch(err => { })
                                if (data) return data.Everyone
                                else return null
                            },
                            setNew: async ({ guild, newData }) => {

                                let data = await TicketSetupDB.findOne({ GuildID: guild.id }).catch(err => { })

                                if (!newData) newData = null

                                if (!data) {

                                    data = new TicketSetupDB({
                                        GuildID: guild.id,
                                        Everyone: newData,
                                    })

                                    await data.save()

                                } else {

                                    data.Everyone = newData
                                    await data.save()

                                }

                                return

                            }
                        },
                        {
                            optionId: "description",
                            optionName: "Description",
                            optionDescription: "Set the text to be shown in your Ticket",
                            optionType: DBD.formTypes.input("Click one of the buttons below to open a ticket", 1, 512, false, true),
                            getActualSet: async ({ guild }) => {
                                let data = await TicketSetupDB.findOne({ GuildID: guild.id }).catch(err => { })
                                if (data) return data.Description
                                else return null
                            },
                            setNew: async ({ guild, newData }) => {

                                let data = await TicketSetupDB.findOne({ GuildID: guild.id }).catch(err => { })

                                if (!newData) newData = null

                                if (!data) {

                                    data = new TicketSetupDB({
                                        GuildID: guild.id,
                                        Description: newData,
                                    })

                                    await data.save()

                                } else {

                                    data.Description = newData
                                    await data.save()

                                }

                                return

                            }
                        },
                        {
                            optionId: "buttons",
                            optionName: "Buttons",
                            optionDescription: "Set the text to be shown the buttons",
                            optionType: DBD.formTypes.input("[ \"Click me\", \"Mee too!\", \"Well me too!\", \"I dont wanna be missed!\" ]", 1, 512, false, true),
                            getActualSet: async ({ guild }) => {
                                let data = await TicketSetupDB.findOne({ GuildID: guild.id }).catch(err => { })
                                if (data) return data.Buttons
                                else return null
                            },
                            setNew: async ({ guild, newData }) => {

                                let data = await TicketSetupDB.findOne({ GuildID: guild.id }).catch(err => { })

                                if (!newData) newData = null

                                if (!data) {

                                    data = new TicketSetupDB({
                                        GuildID: guild.id,
                                        Buttons: newData,
                                    })

                                    await data.save()

                                } else {

                                    data.Description = newData
                                    await data.save()

                                }

                                return

                            }
                        }
                    ]
                },

            ]

        })

        Dashboard.init()

    }
}

function CommandPush(filteredArray, CategoryArray) {

    filteredArray.forEach(obj => {

        let cmdObject = {
            commandName: obj.name,
            commandUsage: obj.usage,
            commandDescription: obj.description,
            commandAlias: "None"
        }

        CategoryArray.push(cmdObject)

    })

}