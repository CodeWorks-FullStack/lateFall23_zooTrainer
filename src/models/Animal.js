import { Schema } from "mongoose";

// REVIEW animal is a One to Many relationship
// Animals are one to many relationships because the animal can only have a relation to ONE exhibit. Meanwhile the exhibit (parent) can have MANY animals linked to it.
//        [exhibit]
//      ↗️   ⬆️   ↖️
// [animal][animal][animal]

export const AnimalSchema = new Schema({
  name: {type: String, required: true, minLength: 3, maxLength: 25},
  emoji: {type: String, required: true},
  exhibitId: {type: Schema.Types.ObjectId, ref: 'Exhibit', required: true}
},{toJSON: {virtuals: true}})
// NOTE virtual properties, are properties on an object, that don't exist on the object in the database, but CAN exist on the object for your response


AnimalSchema.virtual('exhibit',
{
  localField: 'exhibitId', // what here will match
  foreignField: '_id', // what there will match
  ref: 'Exhibit', // what is 'there'?
  justOne: true // keeps our return from being an array
})
