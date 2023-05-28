import { Module } from '@nestjs/common';import {Csrf} from "ncsrf";
import { AssignedTestsService } from './assigned-tests.service';
import { AssignedTestsController } from './assigned-tests.controller';
import { AssignedTest, AssignedTestSchema } from './entities/assigned-test.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassesModule } from 'src/classes/classes.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [MongooseModule.forFeature([{name: AssignedTest.name, schema: AssignedTestSchema}]),ClassesModule,UsersModule],
  controllers: [AssignedTestsController],
  providers: [AssignedTestsService],
})
export class AssignedTestsModule {}
