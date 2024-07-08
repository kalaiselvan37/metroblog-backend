import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const Saveimages = async (imageBuffer, folderPath) => {
  try {
    const timestamp = new Date().getTime();
    const directoryPath = path.join(__dirname, '../../uploads', folderPath);
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }
    const filename = `${timestamp}_${Math.floor(Math.random() * 10000)}.png`;
    const filePath = path.join(directoryPath, filename);
    fs.writeFileSync(filePath, imageBuffer);
    const savedImagePath = `/uploads/${folderPath}/${filename}`;
    return savedImagePath;
  } catch (err) {
    console.error('Error saving image:', err);
    throw new Error('Error saving image');
  }
};

export { Saveimages };
