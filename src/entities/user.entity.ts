import { randomUUID } from 'node:crypto';
import bcrypt from 'bcryptjs';

export default class User {
  id: string;
  name: string;
  email: string;
  password: string;
  photo: string;
  repositories: string[];
  securityKeys: string[];

  constructor(user) {
    this.id = user.id ?? randomUUID();
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.photo = user.photo ?? '';
    this.repositories = user.repositories ?? [];
    this.securityKeys = user.securityKeys ?? [];
  }

  validate() {
    if (!this.id || !this.name || !this.email || !this.password) {
      throw new Error('Missing required fields for user.');
    }
  }

  encryptPassWord() {
    return bcrypt.hashSync(this.password, 10);
  }

  getUser() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password === undefined ? '' : this.encryptPassWord(),
      photo: this.photo,
      repositories: this.repositories,
      securityKeys: this.securityKeys,
    };
  }
}
