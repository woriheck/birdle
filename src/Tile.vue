<template>
  <div class="w-24 h-24 flex justify-center items-center outline outline-1 outline-white text-white text-4xl">
    {{letter}}
  </div>
</template>

<script setup>
const props = defineProps({
  letter: String
})
</script>