import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { genSalt, hash } from 'bcrypt';
import { UserRole } from '../../common/constants';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    role: UserRole;

    @Prop({ required: true, select: false })
    password: string;

    @Prop({ required: false, default: [] })
    favorites: Array<string>;
}

const UserSchema = SchemaFactory.createForClass(User);

interface IUser extends Document {
    password?: string;
}

UserSchema.pre('save', async function <IUser>(next) {
    if (this.password) {
        const salt = await genSalt(10);
        this.password = await hash(this.password, salt);
        return next(null, this);
    }
    return next(null, this);
});

export const UserModel = { name: User.name, schema: UserSchema };
