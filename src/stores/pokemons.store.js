import { defineStore } from 'pinia';

import axios from 'axios';
import { ref } from 'vue';
import { useRoute } from 'vue-router'

const baseUrl = `https://pokeapi.co/api/v2`;

 
export const usePokemonsStore = defineStore('pokemons', () => {

  const pokemons = ref([]); 
  const favorites = ref(JSON.parse(localStorage.getItem('favorites-pokemons')) || []); 
  const isLoader = ref(false); 

  async function getItems() {
    const res = await axios.get(`${baseUrl}/pokemon`) 
    pokemons.value = res.data.results 
 
  }
  async function showDetails(name) {
    const res = await axios.get(`${baseUrl}/pokemon/${name}`);   
    return res
  }
  function getFavorites() {
    favorites.value = JSON.parse(localStorage.getItem('favorites-pokemons')) || []
    return favorites.value
  }
  function addFavorite(item) {
    favorites.value.push(item)
    localStorage.setItem('favorites-pokemons',JSON.stringify(favorites.value))  
 
  }
  function removeFavorite(item) {
    let index = favorites.value.findIndex((fav) => fav.name === item.name)
    favorites.value.splice(index,1)
    localStorage.setItem('favorites-pokemons',JSON.stringify(favorites.value))  
 
  }
 
  return { getItems, pokemons, favorites, showDetails, addFavorite, getFavorites, removeFavorite, isLoader }
  
});