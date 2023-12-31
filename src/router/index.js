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
      path: '/random',
      name: 'RandomView',
      component: () => import('../views/randomView.vue')
    },
    
      {
      path: '/gameID/',
      name: 'GameIDView',
      component: () => import('../views/GameIDView.vue')
    },
    {
      path: '/create/:id',
      name: 'CreateRouteView',
      component: () => import('../views/CreateRouteView.vue')
    },

    {
      path: '/route/',
      name: 'ChooseMapView',
      component: () => import('../views/ChooseMapView.vue')
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
      path: '/lobby/:id',
      name: 'lobbyView',
      component: () => import('../views/lobbyView.vue'),
    },
    {
      path: '/game/:id',
      name: 'GameView',
      component: () => import('../views/GameView.vue'),
      props: (route) => ({
        playerName: route.query.playerName,
      }),
    },
    {
      path: '/createlobby/',
      name: 'CreateLobbyVeiw',
      component: () => import('../views/CreateLobbyView.vue')
    }
  ]
})

export default router
