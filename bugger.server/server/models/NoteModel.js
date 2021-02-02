import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Bug = new Schema(
  {

    content: { type: String, required: true },
    bugId: { type: String, ref: 'Bug', required: true },
    creatorId: { type: String },
    flagged: { type: String, enum: ['pending', 'completed', 'rejected'] }
    // creatorEmail: { type: String, required: true }
  }, { timestamps: true, toJSON: { virtuals: true } }
)
Bug.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default Bug
