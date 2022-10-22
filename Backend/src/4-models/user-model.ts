import mongoose from "mongoose";

export interface IUserModel extends mongoose.Document {
     firstName: string;
     lastName: string;
     email: string;
     userID: number;
     password: string;
     city: string;
     street: string;
     token: string;
     isAdmin: boolean;
}

export const UserSchema = new mongoose.Schema<IUserModel>({
    firstName:{
        type: String,
        required: [true, "Missing First name"],
        minlength: [2, "First Name too short"],
        maxlength: [20, "First Name too long"],
        trim: true,
    },
    lastName:{
        type: String,
        required: [true, "Missing Last Name"],
        minlength: [2, "Last Name too short"],
        maxlength: [20, "Last Name too long"],
        trim: true,
    },
    email:{
        type:String,
        required: [true, "Missing Email"],
    },
    userID:{
        type: Number,
        required: [true, "Missing ID number"],
        minlength: [8, "ID number too short"],
        maxlength: [9, "ID number too long"],
    },
    password:{
        type: String,
        required: [true, "Missing Password"],
    },
    city:{
        type: String,
        required: [true, "Missing City"],
    },
    street:{
        type: String,
        required: [true, "Missing Street"],
    },
    token:{
        type: String,
    },
    isAdmin:{
        type: Boolean,
    }
  }, {
    versionKey: false,
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: { virtuals: true}
  });

export const UserModel = mongoose.model<IUserModel>("UserModel", UserSchema, "users");