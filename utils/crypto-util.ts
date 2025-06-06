import * as crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const key = crypto.createHash('sha256').update(String(process.env.SECRET_KEY)).digest('base64').substr(0, 32);

export function encrypt(text: string): string {
  const iv = crypto.randomBytes(16); 
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}

export function decrypt(encryptedText: string): string {
  if (typeof encryptedText !== 'string' || !encryptedText.includes(':')) {
    throw new Error('Invalid encrypted text format provided to decrypt()');
  }

  const [ivHex, encrypted] = encryptedText.split(':');
  if (!ivHex || !encrypted) {
    throw new Error('Encrypted text missing IV or ciphertext');
  }

  const ivBuffer = Buffer.from(ivHex, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, key, ivBuffer);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
