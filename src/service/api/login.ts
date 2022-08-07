import { request } from '../http';

interface Itest {
  data: string;
}
/* get方法测试 */
export function fetachGet() {
  return request.get('/getAPI');
}
/* post方法测试 */
export function fetachPost(params: Itest) {
  return request.post('/postAPI', params);
}
/* delete方法测试 */
export function fetachDelete() {
  return request.Delete('/deleteAPI');
}
/* put方法测试 */
export function fetachPut(params: Itest) {
  return request.put('/putAPI', params);
}
/* patch方法测试 */
export function fetachPatch(params: Itest) {
  return request.patch('/patchAPI', params);
}
