import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/components/Layout/Layout'

// Pages
import Dashboard from '@/pages/Dashboard/Dashboard'
import Rooms from '@/pages/Rooms/Rooms'
import Courses from '@/pages/Courses/Courses'
import Professors from '@/pages/Professors/Professors'
import Icons from '@/pages/Icons/Icons'
import Times from '@/pages/Times/Times'
import Classes from '@/pages/Classes/Classes'
import Error from '@/pages/Error/Error'
import Login from '@/pages/Login/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      redirect: 'login',
      name: 'Layout',
      component: Layout,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'rooms',
          name: 'Rooms',
          component: Rooms
        },
        {
          path: 'courses',
          name: 'Courses',
          component: Courses
        },
        {
          path: 'Professors',
          name: 'Professors',
          component: Professors
        },
        {
          path: 'icons',
          name: 'Icons',
          component: Icons
        },
        {
          path: 'times',
          name: 'Times',
          component: Times
        },
        {
          path: 'classes',
          name: 'Classes',
          component: Classes
        }
      ]
    },
    {
      path: '*',
      name: 'Error',
      component: Error
    }
  ]
})
