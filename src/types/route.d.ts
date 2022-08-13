declare namespace AppRoute {
  /** 单个路由的类型结构(动态路由模式：后端返回此类型结构的路由) */
  interface Route {
    /** 路由名称(路由唯一标识) */
    name: string;
    /** 路由路径 */
    path: string;
    /** 路由重定向 */
    redirect?: string;
    /**
     * 路由组件
     * - basic: 基础布局，具有公共部分的布局
     * - blank: 空白布局
     * - multi: 多级路由布局(三级路由或三级以上时，除第一级路由和最后一级路由，其余的采用该布局)
     * - self: 作为子路由，使用自身的布局(作为最后一级路由，没有子路由)
     */
    component?: any;
    /** 子路由 */
    children?: Route[];
    /** 路由描述 */
    meta?: RouteMeta;
    /** 路由属性 */
    // props?: boolean | Record<string, any> | ((to: any) => Record<string, any>);
  }
  /** 路由描述 */
  interface RouteMeta {
    /* 页面标题，通常必选。 */
    title?: string;
    /* 图标，一般配合菜单使用 */
    icon?: string;
    /* 是否需要登录权限。*/
    requiresAuth?: boolean;
    /* 可以访问的角色 */
    roles?: string[];
    /* 是否开启页面缓存 */
    keepAlive?: boolean;
    /* 有些路由我们并不想在菜单中显示，比如某些编辑页面。 */
    hideMenu?: boolean;
    /* 菜单排序。 */
    order?: number;
    /* 嵌套外链  */
    herf?: string;
  }
}
