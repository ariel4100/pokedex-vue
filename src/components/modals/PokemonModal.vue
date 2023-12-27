<!-- Modal.vue -->
<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="absolute inset-0 bg-gray-800 opacity-75"></div>

    <div class="bg-white rounded-lg overflow-auto z-10 relative">
      <div class="text-right absolute right-0">
        <button @click="closeModal" class="p-2 focus:outline-none">
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 0C5.81855 0 0 5.81855 0 13C0 20.1815 5.81855 26 13 26C20.1815 26 26 20.1815 26 13C26 5.81855 20.1815 0 13 0ZM19.3742 16.4125C19.6206 16.6589 19.6206 17.0573 19.3742 17.3036L17.2984 19.3742C17.052 19.6206 16.6536 19.6206 16.4073 19.3742L13 15.9355L9.5875 19.3742C9.34113 19.6206 8.94274 19.6206 8.69637 19.3742L6.62581 17.2984C6.37944 17.052 6.37944 16.6536 6.62581 16.4073L10.0645 13L6.62581 9.5875C6.37944 9.34113 6.37944 8.94274 6.62581 8.69637L8.70161 6.62056C8.94798 6.37419 9.34637 6.37419 9.59274 6.62056L13 10.0645L16.4125 6.62581C16.6589 6.37944 17.0573 6.37944 17.3036 6.62581L19.3794 8.70161C19.6258 8.94798 19.6258 9.34637 19.3794 9.59274L15.9355 13L19.3742 16.4125Z" fill="white"/>
          </svg> 
        </button>
      </div>
      <div class=" bg-[url('@/assets/background.svg')] bg-center bg-cover h-[220px] md:w-[668px] w-[315px] flex justify-center items-end">
        <img class="pb-2 w-[180px]" :alt="pokemon.name" :src="pokemon.sprites.other['official-artwork'].front_default"/> 
      </div> 

 
      <div class="p-5 text-lg">  
         <p class="font-bold border-b-2 capitalize py-2 ">Name: {{ pokemon.name }}</p>
         <p class="font-bold border-b-2 capitalize  py-2 ">Weight: {{ pokemon.weight }}</p>
         <p class="font-bold border-b-2 capitalize  py-2 ">Height: {{ pokemon.height }}</p>
         <p class="font-bold border-b-2 capitalize  py-2 ">Types: {{ pokemonTypes(pokemon.types) }}</p>
         <div class="mt-5 flex justify-between items-center">
          <btn-primary
            title="Share to my friends"
            @click="shareMyFriends(pokemon)" 
            type="button"
          />
          <img alt="star" v-if="isFavorite(pokemon)" @click="emit('removeFavorite',pokemon)" class="inline cursor-pointer" src="@/assets/star-active.svg"/> 
          <img alt="star" v-else @click="emit('addFavorite',pokemon)" class="inline cursor-pointer" src="@/assets/star-disabled.svg"/> 

         </div>
      </div>
    </div>
  </div>
</template>

<script setup> 
import { ref, defineProps, defineEmits } from 'vue';
const emit = defineEmits(['close','isFavorite','removeFavorite','addFavorite'])
const { isOpen, favorites } = defineProps(['isOpen','pokemon','favorites']);
 
const closeModal = () => {
  emit('close');
};

function pokemonTypes(item){
  return item.map(u => u.type.name).join(', ')
}

function isFavorite(pokemon){
  if(favorites.length > 0){
    return favorites.some((fav) => fav.name === pokemon.name);
  }

  return false
}

function shareMyFriends(pokemon){ 
const elementoTemporal = document.createElement('textarea');
  let copyText = 'Name: ' + pokemon.name + ', Weight: ' + pokemon.weight + ', Height: ' + pokemon.height + ', Types: ' + pokemonTypes(pokemon.types);
  elementoTemporal.value = copyText; 
  document.body.appendChild(elementoTemporal); 
  elementoTemporal.select();
  document.execCommand('copy'); 
  document.body.removeChild(elementoTemporal); 
  console.log('Texto copiado al portapapeles:', copyText);
}
</script>

<style scoped> 
</style>