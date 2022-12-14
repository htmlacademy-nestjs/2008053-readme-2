import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { UserModel } from './user.model';
import { CRUDRepo, User } from '@readme/shared-types';
import { getToggleAction } from '@readme/core';

import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository implements CRUDRepo<UserEntity, string, User> {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>) {
  }

  public async find() {
    return await this.userModel.find()
  }

  public async create(item: UserEntity): Promise<User> {
    const newUser = new this.userModel(item);
    return newUser.save();
  }

  public async destroy(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id);
  }

  public async findOne(id: string): Promise<User | null> {
    return await this.userModel
      .findOne({id})
      .exec();
  }

  public async findByEmail(email: string): Promise<User | null> {
    return await this.userModel
      .findOne({email})
      .exec();
  }

  public async update(id: string, item: UserEntity): Promise<User> {
    return await this.userModel
      .findByIdAndUpdate(id, item.toObject(), {new: true})
      .exec();
  }

  public async subscribe({_id}: User, {_id: subToID}: User): Promise<User> {
    const action = await getToggleAction(_id, subToID, this.userModel)

    return await this.userModel
      .findByIdAndUpdate( _id._id, { [`${action}`]: { subscriptions: subToID._id }}, { new: true })
      .exec()
  }

}
