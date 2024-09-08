import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ username }).exec();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec(); // Returns all users from the collection
  }
  
  async createUser(username: string, password: string, name: string): Promise<User> {
    const newUser = new this.userModel({ username, password, name });
    return newUser.save();
  }
}
