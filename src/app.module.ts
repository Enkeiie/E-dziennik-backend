import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'; import { Csrf } from "ncsrf";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { TestsModule } from './tests/tests.module';
import { QuestionsModule } from './questions/questions.module';
import { AnswersModule } from './answers/answers.module';
import { SubjectsModule } from './subjects/subjects.module';
import { ClassesModule } from './classes/classes.module';
import { GradesModule } from './grades/grades.module';
import { PresencesModule } from './presences/presences.module';
import { AssignedTestsModule } from './assigned-tests/assigned-tests.module';
import { ParentsChildrenModule } from './parents-children/parents-children.module';
import * as csurf from 'csurf';
@Module({
  imports: [ConfigModule.forRoot(), UsersModule, AuthModule, MongooseModule.forRoot('mongodb+srv://root:root@demo-cluster.lsplp.mongodb.net/my-app'), TestsModule, QuestionsModule, AnswersModule, SubjectsModule, ClassesModule, GradesModule, PresencesModule, AssignedTestsModule, ParentsChildrenModule,],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
  }
}
