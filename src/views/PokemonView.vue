
<script setup> 
  import PokemonsList from "@/components/lists/PokemonsList.vue"; 
  import { usePokemonsStore } from '@/stores/pokemons.store.js';
  import { storeToRefs } from 'pinia';
  import { ref, computed  } from 'vue';

  const pokemonsStore = usePokemonsStore();
  const { pokemons } = storeToRefs(pokemonsStore);
  pokemonsStore.getItems();

  const searchQuery = ref('');
  const filteredItems = computed(() => {
    const filter = searchQuery.value.toLowerCase();
    return pokemons.value.filter(item => item.name.toLowerCase().includes(filter));
  });
</script>
<template> 
    <div class="mx-auto pt-[35px] px-[30px] md:px-0 md:w-[570px]">
      <form class="mb-5">
        <div class="relative text-gray-600 focus-within:text-gray-400">
          <span class="absolute inset-y-0 left-0 flex items-center pl-2">
            <button type="button" class="p-1 focus:outline-none focus:shadow-outline">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </button>
          </span>
          <input type="search" v-model="searchQuery" class="py-2 px-3 w-full rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900 h-[50px]" placeholder="Search..." autocomplete="off">
        </div>
      </form>
      <pokemons-list
        :items="filteredItems"
      /> 
    </div>  
</template>

<style>
 
</style>
