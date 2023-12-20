import { Schema } from "mongoose";



export const ExhibitSchema = new Schema({
  name: {type: String, required: true, maxLength: 100},
  biome: {type: String, required: true, enum: ['forrest', 'desert', 'arctic',
'tundra', 'savannah', 'swamp', 'oceanic', 'mesa', 'plains', 'jungle', 'tropical']},
  emoji: {type: String, required: true, default: '🌄'}
})
