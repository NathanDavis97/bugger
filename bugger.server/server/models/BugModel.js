import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Bug = new Schema(
  {
    closed: { type: Boolean, required: true, default: false },
    description: { type: String, required: true },
    title: {
      type: String, required: true
    },
    // name: { type: String },
    modifiedDate: {
      type: Date
    },
    creatorId: { type: String, required: true },
    creatorEmail: { type: String }
  }, { timestamps: true, toJSON: { virtuals: true } }
)
Bug.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default Bug
