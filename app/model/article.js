/* eslint-disable strict */
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const ArticleSchema = new Schema({
    __v: { type: Number, select: false },
    title: { type: String, required: true },
    article: { type: String, required: true },
    article_html: { type: String, required: true },
    desc: { type: String, required: true },
    views: { type: Number, required: true, default: 0 },
    count: { type: Number, required: true, default: 0 },
    comments: { type: [{ type: String }] },
    imgUrl: { type: String, required: true },
    type: { type: Schema.Types.ObjectId, ref: 'Type', required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  }, { timestamps: true });
  return mongoose.model('Article', ArticleSchema);
};
