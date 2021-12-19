const {MessageEmbed} = require('discord.js')

const url_gatpat_img = 'https://media.discordapp.net/attachments/906186108650528808/910210699999985684/IMG_9779.jpg?width=502&height=502'
const url_mytcas = 'https://www.mytcas.com/news/announcement-61'
const url_mytcas_img = 'https://media.discordapp.net/attachments/906186108650528808/910442373576806420/9k.png'

const now = new Date();
const gat_day = new Date();
gat_day.setFullYear(2022,2,12)
const total = gat_day - now
const txt_totalday = Math.floor(total / (1000*60*60*24))

const gatpat = new MessageEmbed()
    .setColor('#9b2226')
    .setTitle(':hourglass: ตารางสอบ Gat & Pat')
    .setURL(url_mytcas)
    .setDescription(`====== **เหลือเวลาเตรียมตัวอีก ${txt_totalday} วัน** ======`)
    .setImage(url_gatpat_img)
    .setFooter('อ้างอิงข้อมูลจาก www.mytcas.com', url_mytcas_img)

module.exports = {gatpat}
