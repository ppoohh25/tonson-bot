const {Client, Intents, MessageEmbed, MessageActionRow, MessageSelectMenu} = require('discord.js')
const dotenv = require('dotenv')
const axios = require('axios')

dotenv.config()

const prefix = ';'


const url_covid = 'https://covid19.ddc.moph.go.th/api/Cases/today-cases-all'
const url_MOPH_img = 'https://media.discordapp.net/attachments/910557153356550164/911654142768996352/logo_web.png'
const url_slim = 'https://watasalim.vercel.app/api/quotes/random'
const url_covid_province = 'https://covid19.ddc.moph.go.th/api/Cases/today-cases-by-provinces'
const prov = require('./province.json')
const url_tcas_university = 'https://api-tcas.herokuapp.com/'
const url_friend = 'https://mvk19-section3-api.herokuapp.com/'
const url_cheab_quote = 'https://cheab-quote.herokuapp.com'

const lib_schedule = require('./src/schedule.js')
const lib_gatpat = require('./src/gatpat.js')
const lib_saman = require('./src/saman.js')
const lib_tcas65 = require('./src/tcas65.js')
const lib_help = require('./src/help.js')
const lib_dev = require('./src/dev.js')

const client  = new Client({ intents:[Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]})

client.on('ready', () => {
    console.log('Ready');
    client.user.setActivity(';help | lnwtxn', {type: 'PLAYING'})  
})

client.on('messageCreate', async msg => {
    
    if (msg.content === prefix+'schedule') {
        msg.channel.send({ embeds: [lib_schedule.schedule] });
    }
    
    if (msg.content === prefix+'gatpat') {
        msg.channel.send({ embeds: [lib_gatpat.gatpat] });
    }

    if (msg.content === prefix+'saman') {
        msg.channel.send({ embeds: [lib_saman.saman] });
    }

    if (msg.content === prefix+'tcas65') {
        msg.channel.send({ embeds: [lib_tcas65.tcas65] });
    }

    if (msg.content === prefix+'help') {
        msg.channel.send({ embeds: [lib_help.help] });
    }
    
    if (msg.content === prefix+'dev') {
        msg.channel.send({embeds: [lib_dev.dev]})
    }
})


//===================== inspirational quotes ==================
client.on("messageCreate", async (msg) => {
    if (msg.content === prefix+'inspire') {
        const inspireData = async () => {
            const res = await axios.get(url_quote)
            const resdata = res.data
            return resdata
        }
        const fetch = await inspireData()
        const quote = fetch[0]
        var quoteinspire = quote.q
        var name =  quote.a

        const inspite_quote = new MessageEmbed()
            .setColor('#3c096c')
            .setTitle(':speech_balloon: Inspirational Quotes')
            .setDescription(`**${quoteinspire}** \n ${name}`)
        msg.channel.send({embeds: [inspite_quote]})
    }
})

//============ covid tracker ===============
client.on("messageCreate", async (msg) => {
    if (msg.content === prefix+'covid19 thailand') {

        // api covid 19 thailand form https://covid19.ddc.moph.go.th/api/Cases/today-cases-all
        //อ้างอิงข้อมูล กรมควบคุมโรค

        const covidthaiData = async () => {
            const res = await axios.get(url_covid)
            const resdata = res.data 
            return resdata
        }
        const fetch = await covidthaiData()
        const covidArr = fetch[0]

        var txn_date =  covidArr.txn_date
        var update_date =  covidArr.update_date
        var new_case =  covidArr.new_case
        var total_case =  covidArr.total_case
        var new_death = covidArr.new_death
        var total_death = covidArr.total_death
        var new_recovered =   covidArr.new_recovered
        var total_recovered = covidArr.total_recovered

        const covidEmbed = new MessageEmbed()
            .setColor('#001524')
            .setTitle(`:microbe: รายงานยอดผู้ติดเชื้อประจำวันที่ ${txn_date}`)
            .setDescription(`\`อัพเดตข้อมูล ${update_date}\``)
            .addFields(
                {name: 'ติดเชื้อเพิ่มวันนี้', value: `${new_case}`, inline: true},
                {name: 'ติดเชื้อสะสมในประเทศ', value: `${total_case}`, inline: true},
                {name: 'เสียชีวิตเพิ่ม', value: `${new_death}`, inline: true},
                {name: 'เสียชีวิตรวม', value: `${total_death}`, inline: true},
                {name: 'รักษาหาย', value: `${new_recovered}`, inline: true},
                {name: 'รักษาหายรวม', value: `${total_recovered}`, inline: true} 
            )
            .setFooter('อ้างอิงข้อมูลจาก กรมควบคุมโรค', url_MOPH_img)
        msg.channel.send({embeds: [covidEmbed]})
    }
})

//================== watasalim ======================
//https://watasalim.vercel.app/api api ทั้งหมด
client.on("messageCreate", async (msg) => {
    if (msg.content === prefix+'watasalim') {

        const salimData = async () => {
            const res = await axios.get(url_slim)
            const resdata = res.data
            return resdata
        }

        const fetch = await salimData()

        const wata = fetch.quote.body

        const slim_embed = new MessageEmbed()
            .setColor('#ffb703')
            .setTitle(':speech_balloon: วาทกรรมสลิ่ม')
            .setDescription(`**${wata}**`)
        msg.channel.send({embeds: [slim_embed]})
    }

    if (msg.content === prefix+'cheab') {

        const cheabData = async () => {
            const res = await axios.get(url_cheab_quote)
            const resdata = res.data
            return resdata
        }

        const fetch = await cheabData()
        let randomNum = Math.floor(Math.random() * fetch.quote.length)
        //msg.reply(`${fetch.quote[randomNum]}`)
        msg.reply(`${fetch.quote[randomNum]}`);

    }

})


//============= covid case province in thailand =======================
client.on("messageCreate", async (msg) => {

    if(!msg.content.startsWith(prefix) || msg.author.bot) return
    const commandBody = msg.content.slice(prefix.length)
    const args = commandBody.split(/ +/)
    const command = args.shift().toLowerCase()
    const ag = args.toString()

    if(command === 'covid') {

        try {
            const covidData = async () => {
                const res = await axios.get(url_covid_province)
                const datares = res.data
                return datares
            }
    
            const fetch = await covidData()
            const dataFetch = fetch[eval(`prov.`+`${ag.toLowerCase()}`)]
    
            const pro = dataFetch.province
            const txn_date = dataFetch.txn_date
            const update_date = dataFetch.update_date
            const new_case = dataFetch.new_case
            const total_case = dataFetch.total_case
            const new_death = dataFetch.new_death
            const total_death = dataFetch.total_death
           
            const covidprovinceEmbed = new MessageEmbed()
                    .setColor('#001524')
                    .setTitle(`:microbe: รายงานยอดผู้ติดเชื้อ ${pro} ประจำวันที่ ${txn_date}`)
                    .setDescription(`\`อัพเดตข้อมูล ${update_date}\``)
                    .addFields(
                        {name: 'ติดเชื้อเพิ่มวันนี้', value: `${new_case}`, inline: true},
                        {name: 'ติดเชื้อสะสมในจังหวัด', value: `${total_case}`, inline: true},
                        {name: 'เสียชีวิตเพิ่ม', value: `${new_death}`, inline: true},
                        {name: 'เสียชีวิตรวม', value: `${total_death}`, inline: true}
                    )
                    .setFooter('อ้างอิงข้อมูลจาก กรมควบคุมโรค', url_MOPH_img)
            msg.channel.send({embeds: [covidprovinceEmbed]})
        } catch (error) {

            msg.reply('No Data in Api!!!')
            return
        }

    } 

    if (command === 'tcas') { 

        try {
            const tcasData = async () => {
                const res = await axios.get(url_tcas_university)
                const resData = res.data
                return resData
            }

            const fetch = await tcasData()

            const name = eval(`fetch.${ag.toLowerCase()}.name`)
            const url = eval(`fetch.${ag.toLowerCase()}.url`)
            const img = eval(`fetch.${ag.toLowerCase()}.url_img`)

            const tcasEmbed = new MessageEmbed()
                .setColor('#001524')
                .setTitle(`:school: TCAS65 ${ag.toUpperCase()}`)
                .setDescription(`${name} \n${url}`)
                .setImage(`${img}`)
                .setFooter(`อ้างอิงข้อมูลจาก ${name}`)
            msg.channel.send({embeds: [tcasEmbed]})
        } catch (error) {
            msg.reply('No Data in Api!!!')
            return
        }   
    }

    if (command === 'friend') {
        try {
            const friendData = async () => {
                let res = await axios.get(url_friend)
                let resdata = res.data
                return resdata
            }

            const fetchData = await friendData()

            const name = eval(`fetchData.${ag.toLowerCase()}.name`)
            const nickname = eval(`fetchData.${ag.toLowerCase()}.nickname`)
            const ig = eval(`fetchData.${ag.toLowerCase()}.ig`)
            const img = eval(`fetchData.${ag.toLowerCase()}.url_img`)

            const friendEmbed = new MessageEmbed()
                .setColor('#001524')
                .setTitle(`:bookmark_tabs: Friend Information`)
                .setDescription(`ชื่อ-นามสกุล : ${name} \nชื่อเล่น : ${nickname} \nInstagram : ${ig}`)
                .setThumbnail(`${img}`)
                .setFooter(`อ้างอิงข้อมูลจาก https://github.com/lnwtxn`)
            msg.channel.send({embeds: [friendEmbed]})
        } catch (error) {

            msg.reply('No Data in Api!!!')
            return
        }

    }
})



client.login(process.env.TOKEN)