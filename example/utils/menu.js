import storage from './storage'

const menuList = [
  {
    title: 'search-table',
    icon: 'ios-apps',
    children: [
      {
        title: '综合',
        routeName: 'search-table-multiple',
        includedPages: [
          {
            title: '基本调用',
            routeName: 'search-table-multiple-basic'
          },
          {
            title: '自定义slot额外内容',
            routeName: 'search-table-multiple-slot'
          },
          {
            title: '搜索区域收缩/展开',
            routeName: 'search-table-multiple-fold'
          }
        ]
      },
      {
        title: '搜索区域',
        routeName: 'search-table-field',
        includedPages: [
          {
            routeName: 'search-table-field-input'
          },
          {
            routeName: 'search-table-field-select'
          },
          {
            routeName: 'search-table-field-datepicker'
          },
          {
            routeName: 'search-table-field-radio'
          },
          {
            routeName: 'search-table-field-checkbox'
          },
          {
            routeName: 'search-table-field-switch'
          },
          {
            routeName: 'search-table-field-cascader'
          },
          {
            routeName: 'search-table-field-custom'
          }
        ]
      },
      {
        title: '表格结果',
        routeName: 'search-table-table',
        includedPages: [
          {
            routeName: 'search-table-table-basic'
          },
          {
            routeName: 'search-table-table-select'
          },
          {
            routeName: 'search-table-table-multiple'
          },
          {
            routeName: 'search-table-table-event'
          }
        ]
      }
    ]
  },
  {
    title: 'confirm-input',
    icon: 'logo-buffer',
    routeName: 'confirm-input'
  }
]

const homeMenu = {
  title: '首页',
  routeName: 'home'
}

class Menu {
  menuStorageName = 'menuList'
  /**
   * 获取侧边菜单数据源
   *
   * @returns
   * @memberof Menu
   */
  getSidebarMenuList() {
    let sidebarMenuList = storage.getSession(this.menuStorageName, [])
    if (sidebarMenuList.length) {
      return sidebarMenuList
    } else {
      let authMenuList = this.getAuthMenuList(menuList)
      storage.setSession(this.menuStorageName, authMenuList)
      return authMenuList
    }
  }
  getAuthMenuList(list) {
    // let permissions = helper.getUserInfo('permissions')
    let result = []
    list.forEach(
      ({
        code = '',
        title = '',
        icon = '',
        routeName = '',
        children = [],
        includedPages = []
      }) => {
        let item = {
          code,
          title,
          icon,
          routeName
        }

        if (children.length) {
          item.children = this.getAuthMenuList(children)
        }
        if (item.children && item.children.length) {
          item.routeName = item.children[0].routeName
        }
        if (includedPages.length) {
          item.includedPages = this.getAuthMenuList(includedPages)
        }
        if (item.includedPages && item.includedPages.length) {
          item.routeName = item.includedPages[0].routeName
        }
        if (!code || permissions.includes(code)) {
          result.push(item)
        }
      }
    )
    return result
  }
  clearSidebarMenuList() {
    storage.removeSession(this.menuStorageName)
  }
  /**
   * 获取当前侧边栏激活routerName
   *
   * @param {String} currentRouteName
   * @memberof Menu
   */
  getActiveRouteName(currentRouteName) {
    if (currentRouteName === homeMenu.routeName) return currentRouteName

    let currentSidebar = this.getCurrentSidebar(currentRouteName)

    if (!currentSidebar) return ''

    if (!currentSidebar.children || !currentSidebar.children.length) {
      return currentSidebar.routeName
    } else {
      return currentSidebar.children[0].routeName
    }
  }
  /**
   * 获取面包屑数据
   *
   * @param {String} currentRouteName
   * @memberof Menu
   */
  getBreadcrumbList(currentRouteName) {
    let result = []

    if (homeMenu.routeName === currentRouteName) {
      result.push(homeMenu)
    }
    let currentSidebar = this.getCurrentSidebar(currentRouteName)
    if (currentSidebar) {
      result.push(homeMenu)
      result.push({
        title: currentSidebar.title,
        routeName: currentSidebar.routeName
      })

      if (currentSidebar.children && currentSidebar.children.length) {
        let child = currentSidebar.children[0]
        result.push({
          title: child.title,
          routeName: child.routeName
        })
      }
    }
    return result
  }
  /**
   * 获取当前的菜单栏信息
   *
   * @param {String} currentRouteName
   * @memberof Menu
   */
  getCurrentSidebar(currentRouteName) {
    let menuList = this.getSidebarMenuList()
    return this.getSidebarByRouteName(menuList, currentRouteName)
  }
  getSidebarByRouteName(list, routeName) {
    for (let i = 0; i < list.length; i++) {
      let item = list[i]
      if (item.routeName && item.routeName === routeName) {
        return {
          ...item
        }
      }
      if (item.children && item.children.length) {
        let childResult = this.getSidebarByRouteName(item.children, routeName)
        if (childResult) {
          return {
            ...item,
            children: [childResult]
          }
        }
      }
      if (item.includedPages && item.includedPages.length) {
        let includedResult = this.getSidebarByRouteName(
          item.includedPages,
          routeName
        )
        if (includedResult) {
          return { ...item }
        }
      }
    }
  }
}

export default new Menu()
