<template>
  <div
    class="w-24 h-24 flex justify-center items-center outline outline-1 outline-white text-white text-4xl"
    :class="{
      'bg-green-300'  : status == 'correct',
      'bg-yellow-300' : status == 'present',
      'bg-gray-300': status == 'absent',
    }">
    {{letter}}
  </div>
</template>

<script setup>
const props = defineProps({
  letter: String,
  status: String
})
</script>