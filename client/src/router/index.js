import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    perms: ['admin','editor']    control the page perms (you can set multiple perms)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all perms can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/baseParam',
    children: [{
      path: 'baseParam',
      name: 'BaseParam',
      component: () => import('@/views/baseParam/bridgeTower'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  {
    path: '/changepassword',
    component: Layout,
    redirect: '/changepassword',
    name: 'ChangePW',
    meta: { title: '修改密码', icon: 'tree' },
    hidden:true,
    children: [
      {
        path: '',
        name: 'ChangePassword',
        component: () => import('@/views/system/changepassword'),
        meta: { title: '修改密码', noCache: true, icon: ''},
        hidden: true
      },
    ]
  },

]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user perms
 */
export const asyncRoutes = [
  {
    path: '/baseParam',
    component: Layout,
    redirect: '/baseParam/bridgeTower',
    name: 'baseParam',
    meta: { title: '设计基本参数', icon: 'example', perms: ['workflow_manage']  },
    children: [
      {
        path: 'bridgeTower',
        name: 'bridgeTower',
        component: () => import('@/views/baseParam/bridgeTower'),
        meta: { title: '桥塔设计参数', icon: 'example', perms: ['workflow_index'] }
      },
      {
        path: 'mainLine',
        name: 'mainLine',
        component: () => import('@/views/baseParam/mainLine'),
        meta: { title: '主梁设计参数', icon: 'example', perms: ['workflow_index'] }
      },
      {
        path: 'stayCable',
        name: 'stayCable',
        component: () => import('@/views/baseParam/stayCable'),
        meta: { title: '斜拉索设计参数', icon: 'example', perms: ['workflow_index'] }
      },
    ]
  },
  {
    path: '/materialCharac',
    component: Layout,
    redirect: '/materialCharac/materialInput',
    name: 'materialInput',
    meta: { title: '材料特性', icon: 'example', perms: ['workflow_manage']  },
    children: [
      {
        path: 'materialInput',
        name: 'materialInput',
        component: () => import('@/views/materialCharac/materialInput'),
        meta: { title: '材料特性输入', icon: 'example', perms: ['workflow_index'] }
      },
    ]
  },
  {
    path: '/secProperty',
    component: Layout,
    redirect: '/secProperty/upper',
    name: 'secProperty',
    meta: { title: '截面特性', icon: 'example', perms: ['workflow_manage']  },
    children: [
      {
        path: 'upper',
        name: 'upper',
        component: () => import('@/views/secProperty/upper'),
        meta: { title: '上塔柱', icon: 'example', perms: ['workflow_index'] }
      },
      {
        path: 'mid',
        name: 'mid',
        component: () => import('@/views/secProperty/mid'),
        meta: { title: '中塔柱', icon: 'example', perms: ['workflow_index'] }
      },
      {
        path: 'down',
        name: 'down',
        component: () => import('@/views/secProperty/down'),
        meta: { title: '下塔柱', icon: 'example', perms: ['workflow_index'] }
      },
      {
        path: 'mainLine',
        name: 'mainLine',
        component: () => import('@/views/secProperty/mainLine'),
        meta: { title: '主梁', icon: 'example', perms: ['workflow_index'] }
      },
    ]
  },
  {
    path: '/stayCable',
    component: Layout,
    redirect: '/stayCable/middle',
    name: 'stayCable',
    meta: { title: '斜拉索布置', icon: 'example', perms: ['workflow_manage']  },
    children: [
      {
        path: 'middle',
        name: 'middle',
        component: () => import('@/views/stayCable/middle'),
        meta: { title: '中跨斜拉索', icon: 'example', perms: ['workflow_index'] }
      },
      {
        path: 'side',
        name: 'side',
        component: () => import('@/views/stayCable/side'),
        meta: { title: '边跨斜拉索', icon: 'example', perms: ['workflow_index'] }
      },
    ]
  },
  {
    path: '/resultParam',
    component: Layout,
    redirect: '/resultParam/index',
    name: 'resultParam',
    meta: { title: '求解设置', icon: 'example', perms: ['workflow_manage']  },
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/resultParam/index'),
        meta: { title: '求解参数设置', icon: 'example', perms: ['workflow_index'] }
      }
    ]
  },
  {
    path: '/resultView',
    component: Layout,
    redirect: '/resultView/index',
    name: 'resultView',
    meta: { title: '查看结果', icon: 'example', perms: ['workflow_manage']  },
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/resultView/index'),
        meta: { title: '查看结果', icon: 'example', perms: ['workflow_index'] }
      }

    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/user',
    name: 'System',
    meta: { title: '系统管理', icon: 'example', perms: ['system_manage'] },
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/system/user.vue'),
        meta: { title: '用户管理', icon: 'user', perms: ['user_manage'] }
      }
    ]
  },
  {
    path: '/develop',
    component: Layout,
    redirect: '/develop/perm',
    name: 'Develop',
    meta: { title: '开发配置', icon: 'example', perms: ['dev_set'] },
    children: [
      {
        path: 'perm',
        name: 'Perm',
        component: () => import('@/views/system/perm'),
        meta: { title: '权限菜单', icon: 'example', perms: ['perm_manage'] }
      },
      {
        path: 'form-gen-link',
        component: Layout,
        children: [
          {
            path: 'https://jakhuang.github.io/form-generator/',
            meta: { title: '表单设计器', icon: 'link', perms: ['dev_form_gen'] }
          }
        ]
      },
      {
        path: 'docs',
        component: Layout,
        children: [
          {
            path: process.env.VUE_APP_BASE_API + '/docs/',
            meta: { title: '接口文档', icon: 'link', perms: ['dev_docs'] }
          }
        ]
      },
      {
        path: 'swagger',
        component: Layout,
        children: [
          {
            path: process.env.VUE_APP_BASE_API + '/swagger/',
            meta: { title: 'Swagger文档', icon: 'link', perms: ['dev_docs'] }
          }
        ]
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
