import mongoose from 'mongoose'
import ValueSchema from '../models/Value'
import AccountSchema from '../models/Account'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Bugs = mongoose.model('Bug', AccountSchema);
  Notes = mongoose.model('Note', AccountSchema);
}

export const dbContext = new DbContext()
