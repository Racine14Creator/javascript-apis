import mongoose from "mongoose"

const testSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type:String}
}, {timestamps: true})

export const Test = mongoose.models.Test || mongoose.model("Test", testSchema);

export default Test