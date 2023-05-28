import { Injectable } from '@nestjs/common';import {Csrf} from "ncsrf";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClassesService } from 'src/classes/classes.service';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { Grade, GradeDocument } from './entities/grade.entity';

@Injectable()
export class GradesService {
  constructor(@InjectModel(Grade.name)private gradeModel: Model<GradeDocument>, private classesService: ClassesService){}

  async create(createGradeDto: CreateGradeDto) {
    const createdGrade = new this.gradeModel(createGradeDto);
    return createdGrade.save();
  }

  async gradeTest(createGradeDto: CreateGradeDto) {
    return this.create(createGradeDto);
  }

  async findAll() {
    const grades = await this.gradeModel.find().populate('student',"first_name last_name").populate('subject','title code');
    return grades;
  }

  async getClassGrades(id: string, subj: string) {
    const students = await this.classesService.findOne(id);
    const studentGrades = await this.gradeModel.find({student: { $in: students.students},subject: subj }).exec();
    return studentGrades;
  }

  async getStudentGrades(id: string){
    return await this.gradeModel.find({student: id}).populate("subject");
  }

  async update(id: string, updateGradeDto: UpdateGradeDto) {
    return await this.gradeModel.findOneAndUpdate({_id: id},{ $set: {...updateGradeDto}});
  }

  async remove(id: string) {
    return this.gradeModel.findOneAndDelete({_id: id});
  }

}
