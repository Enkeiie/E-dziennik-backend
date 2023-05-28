import { Injectable } from '@nestjs/common';import {Csrf} from "ncsrf";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubjectsService } from 'src/subjects/subjects.service';
import { UsersService } from 'src/users/users.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { Class, ClassDocument } from './entities/class.entity';

@Injectable()
export class ClassesService {
  constructor(@InjectModel(Class.name)private classModel: Model<ClassDocument>, private studentsService: UsersService, private subjectsService: SubjectsService){}

  async create(createClassDto: CreateClassDto) {
    const createdSubject = new this.classModel(createClassDto);
    return createdSubject.save();
  }

  async findAll() {
    const classes = await this.classModel.find().populate('students').populate('subjects').populate('subjects.teachers').populate('homeroomteacher');
    return classes;
  }

  async findOne(id: string): Promise<ClassDocument> {
    return await this.classModel.findOne({ _id: id});
  }

  async update(id: string, updateClassDto: UpdateClassDto) {
    return await this.classModel.findOneAndUpdate({_id: id},{ $set: {...updateClassDto}});
  }

  async remove(id: string) {
    return this.classModel.findOneAndDelete({_id: id});
  }

  async addStudent(id: string, id2: string){
    const classObj= await this.classModel.findOne({ _id:id});
    const student= await this.studentsService.findOne(id2);
    classObj.students.push(student);
    return classObj.save();
  }

  async removeStudent(id: string, id2: number){
    const classObj= await this.classModel.findOne({ _id:id});
    classObj.students.splice(id2,1);
    return classObj.save();
  }

  async addSubject(id: string, id2: string){
    const classObj= await this.classModel.findOne({ _id:id});
    const subject= await this.subjectsService.findOne(id2);
    classObj.subjects.push(subject);
    return classObj.save();
  }

  async removeSubject(id: string, id2: number){
    const classObj= await this.classModel.findOne({ _id:id});
    classObj.subjects.splice(id2,1);
    return classObj.save();
  }
  async getNames(id: string){
    let names = [];
    const subjs = await this.subjectsService.getTeacherSubjects(id);
    console.log(subjs);
    names = await this.classModel.find({ subjects: { $in: subjs } }).populate('subjects').exec();
    console.log(names);
    return names;
  }

  async getStudents(id: string){
    const studentIds = (await this.classModel.find({_id: id}).select('students -_id'));
    return studentIds;
  }
  async getStudentsNames(id: string){
    const studentNames = (await this.classModel.find({_id: id}).populate('students').select('students -_id'));
    return studentNames;
  }

  async getStudentClass(studentId: string){
    const myClass= await this.classModel.findOne({ students: { $in: [studentId] } }).populate('subjects').exec();
    return myClass;
  }

  async getTeacherClass(id: string){
    return await this.classModel.find({homeroomteacher: id}).populate('students').populate('subjects');
  }
}
