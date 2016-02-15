/**
 * Created by meathill on 16/2/15.
 *
 * 将 FileReader 封装成 Promise 对象
 *
 * @param {File} file
 * @param {Object} [options=null] 配置参数
 * @param {string} options.accept 支持的文件类型
 * @returns {Promise}
 */
export default function reader (file, options) {
  options = options || {};
  return new Promise(function (resolve, reject) {
    let reader = new FileReader();

    reader.onload = function () {
      resolve(reader);
    };
    reader.onerror = reject;

    if (options.accept && !new RegExp(options.accept).test(file.type)) {
      reject({
        code: 1,
        msg: 'wrong file type'
      });
    }

    if (!file.type || /^text\//i.test(file.type)) {
      reader.readAsText(file);
    } else {
      reader.readAsDataURL(file);
    }
  });
}