import { encrypt, decrypt } from './crypto';

// Step 1: Define values to encrypt
const originalValues = ['standard_user', 'secret_sauce', 'John', 'Doe', '12345'];

// Step 2: Encrypt all values
const encryptedValues: string[] = [];
for (const value of originalValues) {
  const encrypted = encrypt(value);
  encryptedValues.push(encrypted);
  console.log(`Original: ${value} → Encrypted: ${encrypted}`);
}

// Step 3: Decrypt the encrypted values
console.log('\n--- Decryption ---');
for (const encrypted of encryptedValues) {
  const decrypted = decrypt(encrypted);
  console.log(`Encrypted: ${encrypted} → Decrypted: ${decrypted}`);
}
