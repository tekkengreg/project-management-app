import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    userModel
      .updateOne(
        { email: 'toto@email.com' },
        {
          _id: '9e155b92-65bd-4cb7-9ce4-d89b16c64e47',
          email: 'toto@email.com',
          password: 'tatata',
        },
        { upsert: true },
      )
      .then(() => console.log('User created'));
  }

  async findOne(email: string) {
    return await this.userModel.findOne({ email });
  }
}
