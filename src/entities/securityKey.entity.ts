import bcrypt from 'bcryptjs';

export default class SecurityKey {
  reference: string;
  key: string;

  constructor(secKey) {
    this.reference = secKey.reference;
    this.key = secKey.key;
  }

  validate() {
    if (!this.reference || !this.key) {
      throw new Error('Missing required field(s) for creating key.');
    }
  }

  getKey() {
    return {
      reference: this.reference,
      key: bcrypt.hashSync(this.key, 10),
    };
  }
}
