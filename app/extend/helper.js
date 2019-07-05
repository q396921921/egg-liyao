/* eslint-disable jsdoc/require-param */
'use strict';
/**
 * 处理成功的相应
 */
exports.success = (ctx, res = null, msg = 'request success') => {
  const ts = (0 | Date.now() / 1000).toString();
  ctx.body = { code: 200, msg, ts, data: res };
  ctx.status = 200;
};
/**
 * 处理失败响应
 */
exports.error = (ctx, code, data) => {
  const msg = 'request error';
  const ts = (0 | Date.now() / 1000).toString();
  ctx.body = { code, ts, msg, data };
  ctx.status = code;
};
