import { Injectable } from '@nestjs/common';import {Csrf} from "ncsrf";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subject } from 'rxjs';
import { UsersService } from 'src/users/users.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { SubjectDocument } from './entities/subject.entity';

@Injectable()
export class SubjectsService {
  constructor(@InjectModel(Subject.name)private subjectModel: Model<SubjectDocument>, private teacherService: UsersService){}

  async create(createSubjectDto: CreateSubjectDto) {
    const createdSubject = new this.subjectModel(createSubjectDto);
    return createdSubject.save();
  }

  async findAll() {
    const subjects = await this.subjectModel.find().populate('teachers');
    return subjects;
  }

  async findOne(id: string) {
    return await this.subjectModel.findOne({ _id: id});
  }

  async update(id: string, updateSubjectDto: UpdateSubjectDto) {
    return await this.subjectModel.findOneAndUpdate({_id: id},{ $set: {...updateSubjectDto}});
  }

  async remove(id: string) {
    return this.subjectModel.findByIdAndDelete(id);
  }

  async addTeacher(id: string, id2: string){
    const subject= await this.subjectModel.findOne({ _id:id});
    const teacher= await this.teacherService.findOne(id2);
    subject.teachers.push(teacher);
    return subject.save();
  }

  async removeTeacher(id: string, id2: number){
    const subject= await this.subjectModel.findOne({ _id:id});
    subject.teachers.splice(id2,1);
    return subject.save();
  }

  async getNames(){
    let names = [];
    names = await this.subjectModel.find().select('title code');
    return names;
  }

  async getTeacherSubjects(id){
    let names = [];
    names = await this.subjectModel.find({teachers: id}).select('_id code title');
    return names;
  }
}
