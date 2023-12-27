import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { usePokemonsStore } from '@/stores/pokemons.store.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    }, 
    {
      path: '/pokemons',
      name: 'pokemons',
      component: () => import('../views/PokemonView.vue')
    },
    {
      path: '/pokemons/favorites',
      name: 'pokemons.favorites', 
      component: () => import('../views/FavoritesView.vue')
    }
  ]
})
router.beforeEach((to, from, next) => {
  const pokemonsStore = usePokemonsStore();
  pokemonsStore.isLoader = true
  setTimeout(() => {
    pokemonsStore.isLoader = false
  }, 2000);
  next(); 
});
 
export default router
