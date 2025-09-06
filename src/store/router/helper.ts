/// <reference path="../../typings/global.d.ts" />
import type { MenuOption } from 'naive-ui'
import { $t, renderIcon } from '@/utils'
import { clone, isEmpty, min, pick } from 'radash'
import { RouterLink } from 'vue-router'
import arrayToTree from 'array-to-tree'

const metaFields: (keyof Entity.Menu)[]
  = ['title', 'icon', 'keepAlive', 'activePath', 'tabVisible', 'pinTab', 'menuType', 'linkPath', 'isLink', 'i18nKey']

export function createRoutes(routes: Entity.Menu[]) {
  // Structure the meta field
  const routerWithMeta: App.RouteRecord[] = clone(routes).map((i) => {
    const meta = pick(i, metaFields)
    return {
      name: `${i.title}_${i.id}`,
      path: i.path,
      component: i.component,
      meta,
      id: i.id,
      parentId: i.parentId || 0,
    }
  })

  // Generate routes, no need to import files for those with redirect
  const modules = import.meta.glob('@/views/**/*.vue')
  let resultRouter = routerWithMeta.map((item) => {
    if (item.component)
      item.component = modules[`/src/views${item.component}`]
    return item
  })
  // Generate route tree
  resultRouter = arrayToTree(resultRouter, {
    parentProperty: 'parentId',
  })
  // Set the correct redirect path for the route
  setRedirect(resultRouter)

  return resultRouter
}

// Generate an array of route names that need to be kept alive
export function generateCacheRoutes(routes: Entity.Menu[]) {
  return routes
    .filter(i => i.keepAlive)
    .map(i => i.title)
}

function setRedirect(routes: App.RouteRecord[]) {
  routes.forEach((route) => {
    if (route.children) {
      if (!route.redirect) {
        // Filter out a collection of child elements that are not hidden
        const visibleChilds = route.children.filter(child => !child.meta?.menuVisible)

        // Redirect page to the path of the first child element by default
        let target = visibleChilds[0]

        // Filter out pages with the order attribute
        const orderChilds = visibleChilds.filter(child => !isEmpty(child.meta.sort))

        if (orderChilds.length > 0)
          target = min(orderChilds, i => i.meta.sort!)!

        if (target)
          route.redirect = target.path
      }

      setRedirect(route.children)
    }
  })
}

/* 生成侧边菜单的数据 */
export function createMenus(userRoutes: Entity.Menu[]): MenuOption[] {
  const menus = transformAuthRoutesToMenus(userRoutes)
  // generate side menu
  return arrayToTree(menus, {
    parentProperty: 'parentId',
  })
}

// render the returned routing table as a sidebar
function transformAuthRoutesToMenus(userRoutes: Entity.Menu[]) {
  const homeRoute: Entity.Menu = {
    id: 9999999999999,
    parentId: 0,
    path: '/home',
    title: '首页',
    icon: 'icon-park-outline:analysis',
    menuVisible: true,
    menuType: 'page',
  }
  userRoutes.unshift(homeRoute)
  return userRoutes
    // filter menus that do not need to be displayed
    .filter(route => route.menuVisible !== false)
    //  Sort the menu according to the order size
    .sort((a, b) => {
      if (a.sort && b.sort)
        return a.sort - b.sort
      else if (a.sort)
        return -1
      else if (b.sort)
        return 1
      else return 0
    })
    // Convert to side menu data structure
    .map((item) => {
      const target: MenuOption = {
        id: item.id,
        parentId: item.parentId,
        label:
          (item.menuType !== 'directory')
            ? () =>
                h(
                  RouterLink,
                  {
                    to: {
                      path: item.path,
                    },
                  },
                  { default: () => $t(String(item.i18nKey), item.title) },
                )
            : () => $t(String(item.i18nKey), item.title),
        key: item.path,
        icon: item.icon ? renderIcon(item.icon) : undefined,
      }
      return target
    })
}
