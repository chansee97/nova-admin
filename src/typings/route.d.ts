declare namespace AppRoute {
  /** 路由描述 */
  interface RouteMeta {
  /* 页面标题，通常必选。 */
    title: string
    /* 图标，一般配合菜单使用 */
    icon?: string
    /* 是否需要登录权限。 */
    requiresAuth?: boolean
    /* 可以访问的角色 */
    roles?: Auth.RoleType[]
    /* 是否开启页面缓存 */
    keepAlive?: boolean
    /* 有些路由我们并不想在菜单中显示，比如某些编辑页面。 */
    hide?: boolean
    /* 菜单排序。 */
    order?: number
    /* 嵌套外链  */
    herf?: string
    /** 当前路由需要选中的菜单项(用于跳转至不在左侧菜单显示的路由且需要高亮某个菜单的情况) */
    activeMenu?: string
    /** 当前路由是否会被添加到Tab中 */
    withoutTab?: boolean
    /** 当前路由是否会被固定在Tab中,用于一些常驻页面 */
    pinTab?: boolean
  }
  /** 单个路由的类型结构(动态路由模式：后端返回此类型结构的路由) */
  interface baseRoute {
    /** 路由名称(路由唯一标识) */
    name: string
    /** 路由路径 */
    path: string
    /** 路由重定向 */
    redirect?: string
    /* 页面组件地址 */
    componentPath?: string | null
    // 路由id
    id: numnber
    // 父级路由id，顶级页面为0
    pid: number
  }

  type RowRoute = {
    [K in keyof RouteMeta as `meta.${K}`]?: RouteMeta[K]
  } & baseRoute

  interface Route extends baseRoute {
    /** 子路由 */
    children?: Route[]
    /* 页面组件 */
    component: any
    /** 路由描述 */
    meta: RouteMeta
  }

}
