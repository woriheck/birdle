<template>
  <div
    class="w-24 h-24 flex justify-center items-center text-[#496e9e] font-semibold uppercase text-4xl outline outline-1 outline-[#496e9e]/[.1]"
    :class="{
      'bg-green-300'  : status == 'correct',
      'bg-yellow-300' : status == 'present',
      'bg-gray-300': status == 'absent',
    }"
    >
    {{letter}}
  </div>
</template>

<script setup>
const props = defineProps({
  letter: String,
  status: String
})
</script>