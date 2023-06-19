import mongoose from "mongoose";
import bcrypt from "bcrypt";

interface IUser extends mongoose.Document {
    name: string;
    username: string;
    password: string;
}

const userSchema = new mongoose.Schema<IUser>({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

userSchema.pre<IUser>("save", async function (next) {
    if (!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);

    this.password = hash;
    next();
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
