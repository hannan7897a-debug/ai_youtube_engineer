import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  secure: true,
  url: process.env.CLOUDINARY_URL
});

export default cloudinary;
