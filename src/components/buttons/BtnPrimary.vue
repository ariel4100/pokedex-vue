<script setup>
  defineProps({
    title: {
      type: String,
      required: true
    },
    href: {
      type: String, 
      default: '/'
    },
    type: {
      type: String, 
      default: ''
    },
    active: {
      type: Boolean, 
      default: false
    },
    icon: {
      type: String, 
      default: ''
    },
    width: {
      type: String, 
      default: ''
    },
  })
</script> 

<template> 
    <button v-if="type == 'button'" type="button">
      <span class="bg-[#F22539] active:bg-[#C00E20] text-white font-bold  rounded-full min-w-[131px] h-[44px] inline-flex justify-center items-center px-4">
        {{title}} 
      </span>
    </button>
    <RouterLink v-else v-slot="{  isActive, isExactActive }" :to="href" class="inline-flex text-lg">
      <span v-if="active" :class="isActive  ? 'bg-[#F22539]' : 'bg-[#BFBFBF]', width ? 'md:min-w-[275px]' : ''"  class="  text-white font-bold  rounded-full  min-w-[131px] h-[44px] px-4 inline-flex justify-center items-center">
        <slot name="icon"></slot> 
        {{title}} 
      </span>
      <span v-else class="bg-[#F22539] active:bg-[#C00E20] text-white font-bold  rounded-full min-w-[131px] h-[44px] inline-flex justify-center items-center px-4">
        {{title}} 
      </span>
    </RouterLink> 
</template>
