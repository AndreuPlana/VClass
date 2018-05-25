import Vue from 'vue'
import Router from 'vue-router'
import dashboard from '@/components/dashboard'
import newEmployee from '@/components/newEmployee'
import ViewEmployee from '@/components/ViewEmployee'
import EditEmployee from '@/components/EditEmployee'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: dashboard
    },
    {
      path: '/new',
      name: 'newEmployee',
      component: newEmployee
    },
    {
      path: '/edit/:employee_id',
      name: 'editEmployee',
      component: EditEmployee
    },
    {
      path: '/:employee_id',
      name: 'view-employee',
      component: ViewEmployee
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }

  ]
})
