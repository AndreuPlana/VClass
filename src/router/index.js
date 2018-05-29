import Vue from 'vue';
import Router from 'vue-router';
import dashboard from '@/components/dashboard';
import terms from '@/components/terms';
import ViewEmployee from '@/components/ViewEmployee';
import Post from '@/components/Post';
import Login from '@/components/Login';
import reset from '@/components/reset';
import newpost from '@/components/newpost'
import Register from '@/components/Register';
import errorpage from '@/components/errorpage'
import firebase from 'firebase';

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/newpost',
      name: 'Nou Post',
      component: newpost,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/reset',
      name: 'reset',
      component: reset,
      meta: {
        requiresGuest :true      
      }
    },
    {
      path :'/terms',
      name : 'Termes i Condicions',
      component : terms,
      meta:{
        requiresAuth: false,
        requiresGuest: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/post/:postid',
      name: 'Post',
      component: Post
    },
    {
      path: '/error',
      name: 'ErrorPage',
      component: errorpage
    },
    {
      path: '*',
      redirect : '/error'
    },
    {
      path: '/:employee_id',
      name: 'view-employee',
      component: ViewEmployee,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

// Nav Guard
router.beforeEach((to, from, next) => {
  // Check for requiresAuth guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if NO logged user
    if (!firebase.auth().currentUser) {
      // Go to login
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    // Check if NO logged user
    if (firebase.auth().currentUser) {
      // Go to login
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else {
    // Proceed to route
    next();
  }
});

export default router;