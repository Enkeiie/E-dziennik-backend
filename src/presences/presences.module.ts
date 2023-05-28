import { Module } from '@nestjs/common';import {Csrf} from "ncsrf";
import { PresencesService } from './presences.service';
import { PresencesController } from './presences.controller';
import { Presence, PresenceSchema } from './entities/presence.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassesModule } from 'src/classes/classes.module';

@Module({
  imports: [MongooseModule.forFeature([{name: Presence.name, schema: PresenceSchema}]),ClassesModule],
  controllers: [PresencesController],
  providers: [PresencesService],
  exports: [PresencesService]
})
export class PresencesModule {}
