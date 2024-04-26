import { request } from '../http'

export function fetchAllRoutes() {
  return request.Get<Service.ResponseResult<AppRoute.RowRoute[]> >('/getUserRoutes')
}
