const fs = require('fs');
const path = require('path');
const crypt = require('crypto');

const privatePem = fs.readFileSync(path.join(__dirname, './rsa_private_key.pem'));
const publicPem = fs.readFileSync(path.join(__dirname, './rsa_public_key.pem'));

class CryptUtil {
    constructor() {
        this.privateKey = privatePem.toString();
        this.publicKey = publicPem.toString();
        this.encode = "base64";
    }

    rsa_private_decrypt(str, padding) {
        try {
            var key = padding !== undefined && padding !== null ? {
                key: this.privateKey,
                padding: padding
            } : this.privateKey;
            var dec = crypt.privateDecrypt(key, Buffer.from(str, this.encode));
            return dec.toString();
        } catch (e) {
            return false;
        }
    }

    rsa_public_encrypt(pwd, padding) {
        try {
            var key = padding !== undefined && padding !== null ? {
                key: this.publicKey,
                padding: padding
            } : this.publicKey;
            var enc = crypt.publicEncrypt(key, Buffer.from(pwd));
            return enc.toString(this.encode);
        } catch (e) {
            return false;
        }
    }
}

module.exports = new CryptUtil();