<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { usePokemonsStore } from '@/stores/pokemons.store.js';
import { storeToRefs } from 'pinia'; 

const pokemonsStore = usePokemonsStore();
  const { isLoader } = storeToRefs(pokemonsStore);

</script>

<template> 
<div v-if="isLoader" class="">
  <div class="grid h-screen place-items-center px-5">
    <div class="text-center">
      <img alt="pokebola" class="mx-auto pb-10 animate-spin" src="@/assets/pokebola.svg"/> 
    </div> 
  </div>
</div>
<div v-else>
  <RouterView />
</div>
</template>

<style scoped>
 
</style>
