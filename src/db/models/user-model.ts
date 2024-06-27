import bcrypt from "bcrypt";
import mongoose, { Document, Schema } from "mongoose";

// auth provider enum
export enum AuthProviderEnum {
    credentials = 'credentials',
    google = 'google'
}

// role enum
export enum UserRoleEnum {
    user = 'user',
    admin = 'admin'
}

// user schema 
export interface IUserModel extends Document {
    name: string;
    email: string;
    password?: string;
    authProvider?: AuthProviderEnum;
    role?: UserRoleEnum;
    isValidPassword: (password: string) => Promise<boolean>;
}

const userSchema: Schema = new Schema<IUserModel>({
    name: {
        type: Schema.Types.String,
        required: true
    },
    email: {
        type: Schema.Types.String,
        required: true,
        unique: true
    },
    password: {
        type: Schema.Types.String
    },
    authProvider: {
        type: Schema.Types.String,
        required: true,
        enum: AuthProviderEnum
    },
    role: {
        type: Schema.Types.String,
        required: true,
        enum: UserRoleEnum,
        default: UserRoleEnum.user
    },
}, {
    timestamps: true
})

// static methods
userSchema.methods.isValidPassword = async function (password: string) {
    return this.password ? await bcrypt.compare(password, this.password) : false;
};


// export model
const UserModel = mongoose.models.User || mongoose.model<IUserModel>('User', userSchema);
export default UserModel;