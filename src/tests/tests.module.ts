import { Module } from '@nestjs/common'; import { Csrf } from "ncsrf";
import { TestsService } from './tests.service';
import { TestsController } from './tests.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestSchema } from './entities/test.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Test.name, schema: TestSchema }]), UsersModule],
  controllers: [TestsController],
  providers: [TestsService],
  exports: [TestsService]
})
export class TestsModule {

}
