import { Module } from '@nestjs/common';import {Csrf} from "ncsrf";
import { SubjectsService } from './subjects.service';
import { SubjectsController } from './subjects.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Subject } from 'rxjs';
import { SubjectSchema } from './entities/subject.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [MongooseModule.forFeature([{name: Subject.name, schema: SubjectSchema}]), UsersModule],
  controllers: [SubjectsController],
  providers: [SubjectsService],
  exports: [SubjectsService]
})
export class SubjectsModule {}
