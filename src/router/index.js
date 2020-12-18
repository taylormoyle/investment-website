import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: '/',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
        },
        {
            path: '/create-account',
            name: 'Create Account',
            component: () => import(/* webpackChunkName: "create-account" */ '../views/CreateAccount.vue')
        },
        {
            path: '/disqualification',
            name: 'Disqualification',
            component: () => import(/* webpackChunkName: "disqualification" */ '../views/Disqualification.vue')
        },
    ],
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
})

export default router
