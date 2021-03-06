/* eslint-disable strict */
const BaseController = require('./base');

const fs = require('fs');
const path = require('path');
const baseUrl = path.join(__dirname, '../public/img/');

class FileController extends BaseController {
  async create() {
    const { ctx } = this;
    let file = ctx.request.files[0];
    const url = baseUrl + file.filename;
    const Url = `http://127.0.0.1:7001/public/img/${file.filename}`;
    file = fs.readFileSync(file.filepath);
    fs.writeFileSync(url, file);
    this.success({ url: Url });
  }
  async destroy() {
    const { ctx } = this;
    const { id } = ctx.params;
    const url = baseUrl + id;
    fs.unlinkSync(url);
    this.message('删除成功');
  }
}

module.exports = FileController;
