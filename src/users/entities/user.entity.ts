import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import internal from 'stream';
import { Role } from '../enums/Role';

export type UserDocument = User & Document;

@Schema({
    timestamps:false,
})
export class User {
    @Prop({required:true, default:() => new mongoose.Types.ObjectId(), type: mongoose.Schema.Types.ObjectId})
_id: mongoose.Schema.Types.ObjectId;
    
    @Prop({required:true})
    username: string;

    @Prop({required:true})
    first_name: string;

    @Prop({required:true})
    last_name: string;

    @Prop({required:true, minlength: 11, maxlength: 11})
    PESEL: string;

    @Prop({required: true})
    address: [{
        city: string,
        postal: string,
        street: string,
        house_number: number,
        flat_number: number,
    }];

    @Prop({required: true})
    email: string;

    @Prop({required: true, minlength: 8})
    password: string;

    @Prop({required: false, default: null})
    refresh_token: string;

    @Prop({required: false, type: Array, enum: Role, default: Role.STUDENT})
    roles: Array<Role>;
}

export const UserSchema=SchemaFactory.createForClass(User);