import { Module } from '@nestjs/common';import {Csrf} from "ncsrf";
import { ParentsChildrenService } from './parents-children.service';
import { ParentsChildrenController } from './parents-children.controller';
import { ParentsChild, ParentsChildSchema } from './entities/parents-child.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [MongooseModule.forFeature([{name: ParentsChild.name, schema: ParentsChildSchema}]),UsersModule],
  controllers: [ParentsChildrenController],
  providers: [ParentsChildrenService]
})
export class ParentsChildrenModule {}
