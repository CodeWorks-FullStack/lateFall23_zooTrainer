import { Schema } from "mongoose";



// REVIEW Many to Many relationships
// show is a many to many relation ship, because it is the 'glue' that ties an 'account' and 'animal' together
// there can be many shows with repeat animals or many shows with repeat accounts, because an animal could perform in many shows, or a 'trainer' could also lead many shows.
//              [show]              |              [show]              |              [show]
//             ↙️    ↘️            |             ↙️    ↘️            |             ↙️    ↘️
// [account (👩‍🌾)]    [animal (🪿)] | [account (👩‍🌾)]    [animal (🐻‍❄️)] | [account (🧑‍⚕️)]    [animal (🐻‍❄️)]
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
