<template>
  <div :class="{'empty' : letter === ''}" class="tile outline outline-1 outline-[#496e9e]/[.1] text-[#496e9e] text-4xl font-semibold uppercase w-24 h-24 flex justify-center items-center">
    <component v-if="letter!==''" :is="TileStyle">{{letter}}</component>

    <LetterCorrect>{{letter}}</LetterCorrect>
<!--
    <span v-if="status === 'present'" class="text-[#f7f749]" style="text-shadow: 0 0 12px rgba(246, 171, 38, 0.42);">
      {{letter}}
    </span>
    <span v-if="status === 'absent'" class="text-[#ff3f3f]" style="text-shadow: 0 0 12px rgba(246, 38, 38, 0.42);">
      {{letter}}
    </span>
    <span v-if="status === ''">
      {{letter}}
     </span> -->
  </div>
</template>

<script setup>
import { computed, defineAsyncComponent } from 'vue'
import LetterCorrect from './LetterCorrect.vue'

const props = defineProps({
  letter: String,
  status: String
})

const capitalize = function(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}


let TileStyle = computed(() => {
  let c = `Letter${capitalize(props.status)}`
  defineAsyncComponent(() => import("./"+c+".vue"))
  return `letter-${props.status}`
})
console.log(TileStyle)
</script>