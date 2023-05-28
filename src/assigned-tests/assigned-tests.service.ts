import { Injectable } from '@nestjs/common';import {Csrf} from "ncsrf";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClassesService } from 'src/classes/classes.service';
import { UsersService } from 'src/users/users.service';
import { CreateAssignedTestDto } from './dto/create-assigned-test.dto';
import { UpdateAssignedTestDto } from './dto/update-assigned-test.dto';
import { AssignedTest, AssignedTestDocument } from './entities/assigned-test.entity';

@Injectable()
export class AssignedTestsService {
  constructor(@InjectModel(AssignedTest.name)private assignedTestModel: Model<AssignedTestDocument>, private classessService: ClassesService, private usersService : UsersService){}
  
  async create(createAssignedTestDto: CreateAssignedTestDto) {
    const obj = new this.assignedTestModel(createAssignedTestDto);
    console.log(obj);
    return obj.save();
  }

  async findAllStudentTests(classID: string) {
    return await this.assignedTestModel.find({classId: classID, expirationDate: { $gte: new Date() }}).populate("testId").populate("subjectId");
  }

  async findAllTeacherAssignedCurrentTests(teacherID: string) {
    return await this.assignedTestModel.find({teacherId: teacherID, expirationDate: { $gte: new Date() }}).populate('classId').populate('testId').populate("subjectId");
  }
  async findAllTeacherAssignedExpiredTests(teacherID: string) {
    return await this.assignedTestModel.find({teacherId: teacherID, expirationDate: { $lt: new Date() }}).populate('classId').populate('testId').populate("subjectId");
  }

  async update(id: string, updateAssignedTestDto: UpdateAssignedTestDto) {
    return await this.assignedTestModel.findOneAndUpdate({_id: id},{ $set: {...updateAssignedTestDto}});
  }

  async remove(id: string) {
    return await this.assignedTestModel.findOneAndDelete({_id: id});
  }
  
  async addSolvedId(id: string, id2: string) {
    const obj = await this.assignedTestModel.findOne({_id: id});
    console.log(obj);
    const student = await this.usersService.findOne(id2);
    console.log(student);
    obj.solvedIds.push(student);
    return obj.save();
  }
}
