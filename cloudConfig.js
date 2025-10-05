const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');


cloudinary.config({
    // cloudinary.config mai hum configuration details paass krte h.
    // kisi cheez ko configure krne ka mtlb hota h  CHEEZO ko jodna TOH HUM apne BACKEND ko Apne Cloudinary account k saath jodne k liye kya kya cheez chahiye vo likhte h yaha.
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});




const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'wanderLust_Dev',
    allowedFormats: ['png', "jpg", "jpeg"]
  },
});



module.exports = {
    cloudinary,
    storage,
};