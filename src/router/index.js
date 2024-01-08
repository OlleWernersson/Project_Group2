import { createRouter, createWebHistory } from 'vue-router'
import StartView from '../views/StartView.vue'
import RandomView from '../views/randomView.vue'
import GameIDView from '../views/GameIDView.vue'
import CreateRouteView from '../views/CreateRouteView.vue'
import ChooseMapView from '../views/ChooseMapView.vue'
import ResultView from '../views/ResultView.vue'
import joinView from '../views/joinView.vue'
import lobbyView from '../views/lobbyView.vue'
import GameView from '../views/GameView.vue'
import CreateLobbyVeiw from '../views/CreateLobbyView.vue'
import GameResultView from '../views/GameResultView.vue'
import JoinLobbyView from '../views/JoinLobbyView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Start',
      component: StartView
    },
      {
      path: '/gameID/',
      name: 'GameIDView',
      component: GameIDView
    },
    {
      path: '/create/:id',
      name: 'CreateRouteView',
      component: CreateRouteView
    },

    {
      path: '/route/',
      name: 'ChooseMapView',
      component: ChooseMapView
    },

    {
      path: '/result/',
      name: 'ResultView',
      component: ResultView
    },
    {
      path: '/join/',
      name: 'joinView',
      component: joinView
    },
    {
      path: '/lobby/:id',
      name: 'lobbyView',
      component: lobbyView,
      props: (route) => ({
        initialPlayerName: route.query.playerName,
      }),
    },
    {
      path: '/game/:id',
      name: 'GameView',
      component: GameView,
      props: (route) => ({
        playerName: route.query.playerName,
      }),
    },
    {
      path: '/createlobby/',
      name: 'CreateLobbyVeiw',
      component: CreateLobbyVeiw
    },
    {
      path: '/gameResult/:id',
      name: 'GameResultView',
      component: GameResultView
    },
    {
      path: '/joinLobby/:id',
      name: 'JoinLobbyView',
      component: JoinLobbyView
    }
  ]
})

export default router
