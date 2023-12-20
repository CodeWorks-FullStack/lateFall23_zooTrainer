import { Schema } from "mongoose";




export const ShowSchema = new Schema({
  name: {type: String, required: true},
  showtime: {type: String, required: true, default: '12:00'},
  animalId: {type: Schema.Types.ObjectId, ref: 'Animal', required: true},
  accountId: {type: Schema.Types.ObjectId, ref: 'Account', required: true}
}, {toJSON: {virtuals: true}})

ShowSchema.virtual('animal', {
  localField: 'animalId',
  foreignField: '_id',
  ref: 'Animal',
  justOne: true
})

ShowSchema.virtual('trainer', {
  localField: 'accountId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})
