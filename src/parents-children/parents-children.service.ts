import { Injectable } from '@nestjs/common';import {Csrf} from "ncsrf";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateParentsChildDto } from './dto/create-parents-child.dto';
import { UpdateParentsChildDto } from './dto/update-parents-child.dto';
import { ParentsChild, ParentsChildDocument } from './entities/parents-child.entity';

@Injectable()
export class ParentsChildrenService {
  constructor(@InjectModel(ParentsChild.name)private parentChildModel: Model<ParentsChildDocument>){}

  async create(createParentsChildDto: CreateParentsChildDto) {
    return await new this.parentChildModel(createParentsChildDto).save();
  }

  async findAll() {
    return await this.parentChildModel.find().populate('studentId').populate('parentId');
  }

  async findOne(id: string) {
    return await this.parentChildModel.find({_id: id}).populate('studentId').populate('parentId');
  }

  async update(id: string, updateParentsChildDto: UpdateParentsChildDto) {
    return await this.parentChildModel.findOneAndUpdate({_id: id},{ $set: {...updateParentsChildDto}});
  }

  async remove(id: string) {
    return await this.parentChildModel.findByIdAndDelete({_id: id});
  }

  async findChildren(id: string) {
    return await this.parentChildModel.find({parentId: id}).populate('studentId');
  }
}
