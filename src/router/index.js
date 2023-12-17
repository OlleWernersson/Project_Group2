import { createRouter, createWebHistory } from 'vue-router'
import StartView from '../views/StartView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Start',
      component: StartView
    },
      {
      path: '/poll/',
      name: 'PollView',
      component: () => import('../views/PollView.vue')
    },
    {
      path: '/create/',
      name: 'CreateRouteView',
      component: () => import('../views/CreateRouteView.vue')
    },
    {
      path: '/result/',
      name: 'ResultView',
      component: () => import('../views/ResultView.vue')
    },
    {
      path: '/join/',
      name: 'joinView',
      component: () => import('../views/joinView.vue')
    },
    {
      path: '/lobby/',
      name: 'lobbyView',
      component: () => import('../views/lobbyView.vue'),
      props: true,
    },
    {
      path: '/game/',
      name: 'GameView',
      component: () => import('../views/GameView.vue'),
      props: true,
    },
    {
      path: '/createlobby/',
      name: 'CreateLobbyVeiw',
      component: () => import('../views/CreateLobbyView.vue')
    }
  ]
})

export default router
