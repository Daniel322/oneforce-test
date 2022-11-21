import {
  Injectable,
  OnModuleInit,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import * as dynamoose from 'dynamoose';
import { Model } from 'dynamoose/dist/Model';

import { User } from './entities/user.entity';
import { userSchema } from './user.schema';
import { userMockData } from './data/data';

@Injectable()
export class UsersService implements OnModuleInit {
  private db: Model<User>;
  private readonly logger = new Logger('Users service');

  constructor() {
    this.db = dynamoose.model<User>('users', userSchema);
  }

  async onModuleInit() {
    try {
      this.logger.log('user service init!');
      const { count } = await this.db.query('type').eq('user').count().exec();
      if (!count) {
        this.logger.log('starting to insert data!');
        for await (const item of userMockData) {
          await this.db.create(item);
        }
        this.logger.log('finishing to insert data!');
      }
    } catch (error) {
      this.logger.error(error);
    }
  }

  async findAll() {
    return this.db
      .query('type')
      .eq('user')
      .where('dateJoined')
      .sort('ascending')
      .exec();
  }

  async findOne(id: number): Promise<User> {
    const [user] = await this.db.query('id').eq(id).exec();
    if (!user) {
      throw new NotFoundException('user with this id not found');
    }
    return user;
  }
}
