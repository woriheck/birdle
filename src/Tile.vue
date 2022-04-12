<template>
  <div :class="{'empty' : letter === ''}"
    class="tile outline outline-1 outline-[#496e9e]/[.1] text-[#496e9e] text-4xl font-semibold uppercase w-24 h-24 flex justify-center items-center"
  >
    <component :is="TileLetter">{{letter}}</component>
  </div>
</template>

<script setup>
import { computed, defineAsyncComponent } from 'vue'

const props = defineProps({
  letter: String,
  status: String
})

const capitalize = function(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

let TileLetter = computed(() => {
  var stat = capitalize(props.status)
  return defineAsyncComponent(() => import(`./Letter${stat}.vue`))
})
</script>