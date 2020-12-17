// eslint-disable-next-line strict
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const VisitorSchema = new Schema({
    __v: { type: Number, select: false },
    nickname: { type: String, required: true },
    avatar: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    qq: { type: String, required: true },
  }, { timestamps: true });
  return mongoose.model('Visitor', VisitorSchema);
};
