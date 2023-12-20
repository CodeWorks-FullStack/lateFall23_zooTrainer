import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { ExhibitSchema } from '../models/Exhibit.js';
import { AnimalSchema } from '../models/Animal.js';
import { ShowSchema } from '../models/Show.js';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  Exhibits = mongoose.model('Exhibit', ExhibitSchema)

  Animals = mongoose.model('Animal', AnimalSchema)

  Shows = mongoose.model('Show', ShowSchema)
}

export const dbContext = new DbContext()
