import { Module } from '@nestjs/common';import {Csrf} from "ncsrf";
import { GradesService } from './grades.service';
import { GradesController } from './grades.controller';
import { Grade, GradeSchema } from './entities/grade.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { TestsModule } from 'src/tests/tests.module';
import { UsersModule } from 'src/users/users.module';
import { ClassesModule } from 'src/classes/classes.module';

@Module({
  imports: [MongooseModule.forFeature([{name: Grade.name, schema: GradeSchema}]), TestsModule, UsersModule, ClassesModule],
  controllers: [GradesController],
  providers: [GradesService]
})
export class GradesModule {}
