import { Injectable } from '@nestjs/common'; import { Csrf } from "ncsrf";
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import mongoose, { Model } from 'mongoose';
import { ClassesService } from 'src/classes/classes.service';
import { User } from 'src/users/entities/user.entity';
import { CreatePresenceDto } from './dto/create-presence.dto';
import { UpdatePresenceDto } from './dto/update-presence.dto';
import { Presence, PresenceDocument } from './entities/presence.entity';
import { value } from './enums/value';

@Injectable()
export class PresencesService {
  constructor(@InjectModel(Presence.name) private presenceModel: Model<PresenceDocument>, private classesService: ClassesService) { }

  async create(student: any, subject: any, present: value) {
    const gradeModel = {
      student: student,
      subject: subject,
      present: present,
    }
    const createdGrade = new this.presenceModel(gradeModel);
    return createdGrade.save();
  }

  async createForClass(presentStudentsList: User[], grade: string, subject: string) {
    const students = (await this.classesService.findOne(grade)).students;
    const absentStudentsIds = students.filter(student => {
      return !presentStudentsList.some(present => present._id == student._id)
    }).map(student => student._id);
    presentStudentsList.forEach(present => {
      console.log('X - ' + present._id);
      this.create(present._id, subject, value.PRESENT);
    });
    absentStudentsIds.forEach(present => {
      console.log('Y - ' + present);
      this.create(present.toString(), subject, value.ABSENT);
    });
  }

  async findAll() {
    return await this.presenceModel.find();
  }

  async getClassPresence(id: any, subj: any) {
    const students = await this.classesService.findOne(id);
    const studentGrades = await this.presenceModel.find({ student: { $in: students.students }, subject: subj }).exec();
    return studentGrades;
  }

  async getStudentPresence(id: any) {
    return await this.presenceModel.find({ student: new mongoose.Types.ObjectId(id) }).populate('subject');
  }

  async findOne(id: string) {
    return await this.presenceModel.findOne({ _id: id });
  }

  async update(id: string, updatePresenceDto: UpdatePresenceDto) {
    return await this.presenceModel.updateOne({ _id: id }, { $set: { ...updatePresenceDto } });
  }

  async remove(id: string, dates: any) {
    console.log(dates)
    const startTime = new Date(dates.createdAt - 30000);
    const endTime = new Date(dates.createdAt.getTime() + 30000);
    await this.presenceModel.deleteMany({
      $and: [
        { _id: { $ne: id } },
        { createdAt: { $gte: startTime, $lte: endTime } },
      ],
    });
  }
}
