import Vue from 'vue'
import Router from 'vue-router'
import NotesList from './views/NotesList.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'notes-list',
      component: NotesList
    },
    {
      path: '/change-note/:id',
      name: 'change-note',
      props: true,
      component: () => import(/* webpackChunkName: "about" */ './views/ChangeNote.vue')
    },
    {
      path: '/create-note',
      name: 'create-note',
      component: () => import(/* webpackChunkName: "about" */ './views/CreateNote.vue')
    }
  ]
})
