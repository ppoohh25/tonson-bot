const {Client, Intents, MessageEmbed} = require('discord.js')
const dotenv = require('dotenv')
const axios = require('axios')

dotenv.config()

const prefix = ';'

const url_tcas65 = 'https://media.discordapp.net/attachments/906186108650528808/910210700692049920/IMG_9777.jpg?width=705&height=393'
const url_schedule = 'https://media.discordapp.net/attachments/912032605845741578/912032636053123103/image0.jpg?width=759&height=499'
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
    
    if (msg.content === prefix+'schedule') {
        const schedule = new MessageEmbed()
            .setColor('#ffb703')
	        .setTitle(':memo: ตารางสอน ชั้นมัธยมศึกษาปีที่ 6/3 (online)')
	        .setDescription('**:bangbang: อย่าลืมเช็คชื่อในแต่ละคาบ :bangbang:**')
	        .setImage(url_schedule)
            .setFooter('อ้างอิงข้อมูลจาก ฝ่ายวิชาการโรงเรียนมารีวิทยากบินทร์บุรี')
        msg.channel.send({ embeds: [schedule] });
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
                            '\n\n**:school: Class Schedule** \n`;schedule` = `ดูตารางสอน online` '+ 
                            '\n\n**:memo: TCAS65 Schudule**\n `;gatpat` = `ดูตารางสอบ Gat & Pat และดูเวลาเตรียมตัว` \n `;tcas ชื่อย่อของมหาวิทยาลัย` = `ดูข้อมูล Admission`'+ 
                            '\n `;saman` = `ดูตารางสอบ 9 วิชาสามัญ และดูเวลาเตรียมตัว` \n `;tcas65` = `ดูปฏิทิน TCAS65`'+ 
                            '\n\n **:speech_left: Message API** \n `;covid19 thailand` = `ดูรายงานโควิดประจำวัน`\n`;covid ชื่อจังหวัด` = `ดูรายงานโควิดประจำจังหวัด`'+
                            ' \n `;inspire` = `ดูแรงบันดาลใจ`'+
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
    if (msg.content === prefix+'covid19 thailand') {

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
client.on("message", (msg) => {
    if (msg.content === prefix+'watasalim') {
        axios.get(url_slim).then(res => {
            const slim = res.data.quote.body
            const slim_embed = new MessageEmbed()
                .setColor('#ffb703')
                .setTitle(':speech_balloon: วาทกรรมสลิ่ม')
                .setDescription(`**${slim}**`)
            msg.channel.send({embeds: [slim_embed]})
        })
    }
})


//============= covid case province in thailand =======================
const url_covid_province = 'https://covid19.ddc.moph.go.th/api/Cases/today-cases-by-provinces'
const prov = require('./province.json')
const url_tcas_university = 'https://api-tcas.herokuapp.com/'
client.on("message", (msg) => {
    const commandBody = msg.content.slice(prefix.length)
    const args = commandBody.split(/ +/)
    const command = args.shift().toLowerCase()
    const ag = args.toString()
    if(command === 'covid') {
        
        //console.log(eval(`province.`+`${ag}`));
        axios.get(url_covid_province).then(res => {
            var provincecovid = res.data[eval(`prov.`+`${ag.toLowerCase()}`)];
            //console.log(provincecovid);
            //console.log(res.data);
            var pro = provincecovid.province
            var txn_date = provincecovid.txn_date
            var update_date = provincecovid.update_date
            var new_case = provincecovid.new_case
            var total_case = provincecovid.total_case
            var new_death = provincecovid.new_death
            var total_death = provincecovid.total_death
    
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
        })
    } 
    if (command === 'tcas') { 
        axios.get(url_tcas_university).then(res => {
            
            const fetch = eval(`res.data.${ag.toLowerCase()}`)
            const tcasEmbed = new MessageEmbed()
                .setColor('#001524')
                .setTitle(`:school: TCAS65 ${ag.toUpperCase()}`)
                .setDescription(`${fetch.name} \n${fetch.url}`)
                .setImage(`${fetch.url_img}`)
                .setFooter(`อ้างอิงข้อมูลจาก ${fetch.name}`)
            msg.channel.send({embeds: [tcasEmbed]})
        })
    }
})

client.login(process.env.TOKEN)