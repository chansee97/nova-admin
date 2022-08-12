import Mock from 'mockjs';

export function resultSuccess(data: any, { msg = 'success' } = {}) {
  return Mock.mock({
    code: 200,
    data,
    msg,
  });
}
export function resultFailed(data: any, { msg = 'failed' } = {}) {
  return Mock.mock({
    code: 400,
    data,
    msg,
  });
}
