import Mock from 'mockjs';

export function resultSuccess(data: any, msg?:string ) {
  return Mock.mock({
    code: 200,
    data,
    msg: msg || 'success',
  });
}
export function resultFailed(data: any, msg?: string ) {
  return Mock.mock({
    code: 500,
    data,
    msg: msg || 'failed',
  });
}
