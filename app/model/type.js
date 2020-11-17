/* eslint-disable strict */
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const TypeSchema = new Schema({
    __v: { type: Number, select: false },
    typeName: { type: String, required: true },
  }, { timestamps: true });
  return mongoose.model('Type', TypeSchema);
};
