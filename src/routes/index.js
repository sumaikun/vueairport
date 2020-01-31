import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import HelloWorld from '@/components/HelloWorld'
import UsersList from '@/pages/UsersList'
import UsersForm from '@/pages/UsersForm'
import RoomsList from '@/pages/RoomsList'
import RoomForm from '@/pages/RoomForm'
import Dashboard from '@/pages/Dashboard'
import Reports from '@/pages/Reports'
import ParametersList from '@/pages/ParametersList'
import auth from '@/utils/auth'

Vue.use(Router)

/* eslint-disable-next-line */
function requireAuth (to, from, next) {
    if (!auth.loggedIn()) {
        next({
        path: '/login',
        query: { redirect: to.fullPath }
        })
    } else {
        next()
    }
}


export default new Router({
    base: __dirname,
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
        { path: '/login', component: Login, name: 'Login' },        
        { path: '/bar', component: HelloWorld, name: 'Bar', beforeEnter: requireAuth },
        { path: '/users', component: UsersList, name: 'Users', beforeEnter: requireAuth },
        { path: '/userform', component: UsersForm, name: 'UserForm', beforeEnter: requireAuth },
        { path: '/dashboard', component: Dashboard, name: 'Dashboard', beforeEnter: requireAuth },
        { path: '/reports', component: Reports, name: 'Reports', beforeEnter: requireAuth },
        { path: '/reports/:type', component: Reports, name: 'ReportsFiltered', beforeEnter: requireAuth },
        { path: '/rooms', component: RoomsList, name: 'Rooms', beforeEnter: requireAuth },
        { path: '/roomform', component: RoomForm, name: 'RoomForm', beforeEnter: requireAuth },
        { path: '/parameters', component: ParametersList, name: 'Parameters', beforeEnter: requireAuth },
        { path: '/user/:id', component: UsersForm, name: 'User', beforeEnter: requireAuth },
        { path: '/', redirect: '/login' }
    ]
});