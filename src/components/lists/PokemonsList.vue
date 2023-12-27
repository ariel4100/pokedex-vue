<script setup>
import { usePokemonsStore } from '@/stores/pokemons.store.js';
import PokemonModal from '@/components/modals/PokemonModal.vue';
import { storeToRefs } from 'pinia'; 
import { ref } from 'vue';

const pokemonsStore = usePokemonsStore();
const { favorites } = storeToRefs(pokemonsStore);
pokemonsStore.getFavorites();

const props = defineProps({
  items: {
    type: Array,
    required: true
  }
})
const isModalOpen = ref(false);
const pokemon = ref({});

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => { 
  isModalOpen.value = false;
};

function addFavorite(item){
  let isAlreadyFavorite = isFavorite(item); 
   
  if (!isAlreadyFavorite) {
    usePokemonsStore().addFavorite(item) 
  } 
}
function removeFavorite(item){
  usePokemonsStore().removeFavorite(item)
}
function isFavorite(pokemon){
  if(favorites.value.length > 0){
    return favorites.value.some((fav) => fav.name === pokemon.name);
  }

  return false
}
async function showDetail(item){
  let res = await usePokemonsStore().showDetails(item.name) 
  pokemon.value = res.data
  isModalOpen.value = true;
}
 
</script>

<template>
  <div class="text-center pt-5" v-if="items.length == 0">
    <p class="font-bold text-3xl">Uh-oh!</p>
    <p class="font-medium text-lg mb-5">You look lost on your journey!</p>
    <btn-primary
      title="Go back home"
    /> 
  </div>
  <div class="" v-else>
    <ul class="" > 
      <li class="bg-white rounded-md px-3 py-2 h-[60px] flex items-center justify-center mb-3" v-for="(item,index) in items" :key="index">
        <p @click="showDetail(item)" class="text-2xl font-medium flex-1 capitalize cursor-pointer hover:opacity-70">{{ item.name }}</p> 
        <img alt="star" v-if="isFavorite(item)" @click="removeFavorite(item)" class="inline cursor-pointer" src="@/assets/star-active.svg"/> 
        <img alt="star" v-else @click="addFavorite(item)" class="inline cursor-pointer" src="@/assets/star-disabled.svg"/> 
      </li>
    </ul>

    <PokemonModal :isOpen="isModalOpen" @addFavorite="addFavorite" :favorites="favorites" @removeFavorite="removeFavorite" :pokemon="pokemon"  @close="closeModal" />

    <!-- Bottom bar -->
    <div class="">
      <section class="block fixed inset-x-0 bottom-0 z-10 bg-white shadow-[0_35px_60px_1px_rgba(0,0,0,0.3)] py-4">
        <div class="flex justify-center gap-5"> 
          <btn-primary
            title="All"
            href="/pokemons"
            active 
            width="275"
          >
            <template v-slot:icon>
              <img class="pr-2 " src="@/assets/icon-list.svg"/> 
            </template>
          </btn-primary>
          <btn-primary
            title="Favorites"
            href="/pokemons/favorites"
            active
            width="275"
          > 
            <template v-slot:icon>
              <img class="pr-2" src="@/assets/icon-star.svg"/> 
            </template>
          </btn-primary>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
 
</style>
