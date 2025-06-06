// utils/encrypt-env-value.ts
import { encrypt } from './crypto-util';

// //use for encrypting environment variables
// // npx ts-node utils/encrypt-env-value.ts
// const pass='secret_sauce'; 
// console.log(encrypt(pass));

const values = ['standard_user', 'secret_sauce', 'John', 'Doe', '502319'];
for(let i=0; i < values.length; i++) {
    const envVar = values[i];
    const encryptedValue = encrypt(envVar);
    console.log(`Encrypted value for ${envVar}: ${encryptedValue}`);

    

}

