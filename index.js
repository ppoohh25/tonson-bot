const {Client, Intents, MessageEmbed} = require('discord.js')
const dotenv = require('dotenv')
const axios = require('axios')
const chart = require('chart.js')
dotenv.config()

const prefix = ';'

const url_tcas65 = 'https://media.discordapp.net/attachments/906186108650528808/910210700692049920/IMG_9777.jpg?width=705&height=393'
const url_schedule_1 = 'https://media.discordapp.net/attachments/869667633719545959/904565695344435240/IMG_9521.jpg?width=810&height=462'
const url_schedule_2 = 'https://media.discordapp.net/attachments/869667633719545959/904565695092768808/IMG_9522.jpg?width=810&height=453'
const url_gatpat_img = 'https://media.discordapp.net/attachments/906186108650528808/910210699999985684/IMG_9779.jpg?width=502&height=502'
const url_9saman_img = 'https://media.discordapp.net/attachments/906186108650528808/910210700218101860/IMG_9778.jpg?width=502&height=502'
const url_mytcas = 'https://www.mytcas.com/news/announcement-61'
const url_mytcas_img = 'https://media.discordapp.net/attachments/906186108650528808/910442373576806420/9k.png'
const url_github = 'https://github.com/lnwtxn'
const url_ig =  'https://www.instagram.com/kitton._/'
const url_facebook = 'https://web.facebook.com/Thunder2004/'
const url_quote = 'https://zenquotes.io/api/quotes'
const url_covid = 'https://covid19.ddc.moph.go.th/api/Cases/today-cases-all'
const url_MOPH_img = 'https://media.discordapp.net/attachments/910557153356550164/911654142768996352/logo_web.png'
const url_slim = 'https://watasalim.vercel.app/api/quotes/random'

const client  = new Client(
    { 
        intents:[
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_MESSAGES
        ]   
    }
)

client.on('ready', () => {
    console.log('Ready');
    client.user.setActivity(';command', {type: 'PLAYING'})  
})

//=================== class schedule ================
client.on('message', msg => {
    
    if (msg.content === prefix+'schedule_1') {
        const schedule_1 = new MessageEmbed()
            .setColor('#ffb703')
	        .setTitle(':memo: ตารางสอน ชั้นมัธยมศึกษาปีที่ 6/3 (สัปดาห์ที่ 1)')
	        .setDescription('**:bangbang: อย่าลืมเช็คชื่อในแต่ละคาบ :bangbang:**')
	        .setImage(url_schedule_1)
            .setFooter('อ้างอิงข้อมูลจาก ฝ่ายวิชาการโรงเรียนมารีวิทยากบินทร์บุรี')
        msg.channel.send({ embeds: [schedule_1] });
    }
    
    if (msg.content === prefix+'schedule_2') {
        const schedule_2 = new MessageEmbed()
            .setColor('#ffb703')
            .setTitle(':memo: ตารางสอน ชั้นมัธยมศึกษาปีที่ 6/3 (สัปดาห์ที่ 2)')
            .setDescription('**:bangbang: อย่าลืมเช็คชื่อในแต่ละคาบ :bangbang:**')
            .setImage(url_schedule_2)
            .setFooter('อ้างอิงข้อมูลจาก ฝ่ายวิชาการโรงเรียนมารีวิทยากบินทร์บุรี')
        msg.channel.send({ embeds: [schedule_2] });
    }
})

//=================== gatpat & saman schedule ================
client.on("message", (msg) => {
    if (msg.content === prefix+'gatpat') {
        const now = new Date();
        const gat_day = new Date();
        gat_day.setFullYear(2022,2,12)
        const total = gat_day - now
        const txt_totalday = Math.floor(total / (1000*60*60*24))

        const gat = new MessageEmbed()
            .setColor('#9b2226')
	        .setTitle(':hourglass: ตารางสอบ Gat & Pat')
            .setURL(url_mytcas)
	        .setDescription(`====== **เหลือเวลาเตรียมตัวอีก ${txt_totalday} วัน** ======`)
	        .setImage(url_gatpat_img)
            .setFooter('อ้างอิงข้อมูลจาก www.mytcas.com', url_mytcas_img)
        msg.channel.send({ embeds: [gat] });
    }

    if (msg.content === prefix+'saman') {
        const now = new Date();
        const saman_day = new Date();
        saman_day.setFullYear(2022,2,19)
        const total = saman_day - now
        const txt_totalday = Math.floor(total / (1000*60*60*24))

        const saman = new MessageEmbed()
            .setColor('#9b2226')
            .setURL(url_mytcas) 
	        .setTitle(':hourglass: ตารางสอบ 9 วิชาสามัญ')
	        .setDescription(`====== **เหลือเวลาเตรียมตัวอีก ${txt_totalday} วัน** ======`)
	        .setImage(url_9saman_img)
            .setFooter('อ้างอิงข้อมูลจาก www.mytcas.com', url_mytcas_img)
        msg.channel.send({ embeds: [saman] });
    }

    if (msg.content === prefix+'tcas65') {
        const tcas65 = new MessageEmbed()
            .setColor('#9b2226')
            .setURL(url_mytcas) 
	        .setTitle(':date: ปฏิทิน TCAS65')
	        .setImage(url_tcas65)
            .setFooter('อ้างอิงข้อมูลจาก www.mytcas.com', url_mytcas_img)
        msg.channel.send({ embeds: [tcas65] });
    }
})  

//=================== command ================
client.on("message", (msg) => {
    if (msg.content === prefix+'command') {
        const command = new MessageEmbed()
            .setColor('#03045e')
	        .setTitle(':file_folder: Command List')
	        .setDescription('**:red_circle: Prefix : `;`**'+ 
                            '\n\n**:school: Schedule** \n`;schedule_1` = `ดูตารางสอน สัปดาห์ที่ 1` \n `;schedule_2` = `ดูตารางสอน สัปดาห์ที่ 2`'+ 
                            '\n\n**:memo: Test Schudule**\n `;gatpat` = `ดูตารางสอบ Gat & Pat และดูเวลาเตรียมตัว`'+ 
                            '\n `;saman` = `ดูตารางสอบ 9 วิชาสามัญ และดูเวลาเตรียมตัว` \n `;tcas65` = `ดูปฏิทิน TCAS65`'+ 
                            '\n\n **:speech_left: Message API** \n `;covid` = `ดูรายงานโควิดประจำวัน` \n `;inspire` = `ดูแรงบันดาลใจ`'+
                            '\n`;watasalim` = `ดูวาทกรรมสลิ่ม`'+
                            '\n\n **:mag_right: About** \n `;dev` = `ข้อมูลผู้พัฒนา`')
        msg.channel.send({ embeds: [command] });
    }

    if (msg.content === prefix+'dev') {
        const dev = new MessageEmbed()
            .setColor('#03045e')
            .setTitle(':computer: Developer Profile')
            .setDescription('**This Bot is Develop by : <@400087960428609536> **'+ 
                            `\n\n :envelope: **Contact Me** \n :link: My Github : ${url_github}`+
                            `\n :link: My Facebook : ${url_facebook} \n :link: My Instagram : ${url_ig}`)
        msg.channel.send({embeds: [dev]})
    }
})

//===================== inspirational quotes ==================
client.on("message", (msg) => {
    if (msg.content === prefix+'inspire') {
        //get api form https://zenquotes.io/api/quotes
        axios.get(url_quote).then(res => {
            var quote = res.data[0].q
            var name = res.data[0].a
            const inspite_quote = new MessageEmbed()
                .setColor('#3c096c')
                .setTitle(':speech_balloon: Inspirational Quotes')
                .setDescription(`**${quote}** \n ${name}`)
            msg.channel.send({embeds: [inspite_quote]})
        })
    }
})


//============ covid tracker ===============
client.on("message", (msg) => {
    if (msg.content === prefix+'covid') {

        // api covid 19 thailand form https://covid19.ddc.moph.go.th/api/Cases/today-cases-all
        //อ้างอิงข้อมูล กรมควบคุมโรค
        axios.get(url_covid).then(res => {
            var txn_date = res.data[0].txn_date
            var update_date = res.data[0].update_date

            var new_case = res.data[0].new_case
            var total_case = res.data[0].total_case
            var new_death = res.data[0].new_death
            var total_death = res.data[0].total_death
            var new_recovered = res.data[0].new_recovered
            var total_recovered = res.data[0].total_recovered

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
        })
    }
})


//================== watasalim ======================
//https://watasalim.vercel.app/api api ทั้งหมด

const url_weather = 'http://api.openweathermap.org/data/2.5/weather?q=Nonthaburi,TH'
client.on("message", (msg) => {
    if (msg.content === prefix+'watasalim') {
        axios.get(url_slim).then(res => {
            const slim = res.data.quote.body
            const slim_embed = new MessageEmbed()
                .setColor('#ffb703')
                .setTitle(':speech_balloon: วาทกรรมสลิ่มสุดเจ๋ง')
                .setDescription(`**${slim}**`)
            msg.channel.send({embeds: [slim_embed]})
        })
    }

    
})


client.login(process.env.TOKEN)