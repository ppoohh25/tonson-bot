const {MessageEmbed} = require('discord.js')

const url_9saman_img = 'https://media.discordapp.net/attachments/906186108650528808/910210700218101860/IMG_9778.jpg?width=502&height=502'
const url_mytcas = 'https://www.mytcas.com/news/announcement-61'
const url_mytcas_img = 'https://media.discordapp.net/attachments/906186108650528808/910442373576806420/9k.png'

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

module.exports = {saman}