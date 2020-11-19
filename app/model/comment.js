
// eslint-disable-next-line strict
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const CommentSchema = new Schema({
    __v: { type: Number, select: false },
    article_id: { type: Schema.Types.ObjectId, required: true, ref: 'Article' },
    vid: { type: Schema.Types.ObjectId, required: true, ref: 'Visitor' },
    content: { type: String, required: true },
    children: [
      {
        vid: { type: Schema.Types.ObjectId, required: true, ref: 'Visitor' },
        to_vid: { type: Schema.Types.ObjectId, required: true, ref: 'Visitor' },
        content: { type: String, required: true },
        createdAt: { type: Date, required: true, default: Date.now },
      },
    ],
  }, { timestamps: true });
  return mongoose.model('Comment', CommentSchema);
};
