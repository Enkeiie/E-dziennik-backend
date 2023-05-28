import { Injectable } from '@nestjs/common';import {Csrf} from "ncsrf";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question } from 'src/questions/entities/question.entity';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { Test, TestDocument } from './entities/test.entity';

@Injectable()
export class TestsService {
  constructor(@InjectModel(Test.name)private testModel: Model<TestDocument>,){}

  async create(createTestDto: CreateTestDto) {
    const createdTest = new this.testModel(createTestDto);
    return createdTest.save();
  }

  async findAll() {
    const users = await this.testModel.find().populate('questions','header answers correct').populate('questions.answers','content');
    return users;
  }

  async findOne(id: string) {
    return await (await (await this.testModel.findOne({ _id: id})).populate("questions")).populate("questions.answers");
  }

  async findOneTests(id: string) {
    return await this.testModel.find({ author: id}).populate('questions','header answers correct').populate('questions.answers','content');;
  }

  async update(id: string, updateTestDto: UpdateTestDto) {
    return await this.testModel.findOneAndUpdate({_id: id},{ $set: {...updateTestDto}});
  }

  async remove(id: string) {
    return this.testModel.findOneAndDelete({_id: id});
  }
}
