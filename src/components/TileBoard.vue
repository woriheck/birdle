<template>
  <div class="text-white rounded-2xl relative mt-3">
    <span
      class="content-none block absolute -inset-[3px] -z-10 rounded-2xl"
    />
    <div :key="`row-${index}`" v-for="(row, index) in board"
      :class="{'row current': currentRowIndex === index }"
      class="flex flex-row animate-pulse-background w-full"
    >
      <Tile
        v-for="(tile, tileIndex) in row"
        :key="`tile-${tileIndex}`"
        :letter="tile.letter"
        :status="tile.status"
        :class="currentRowOutline(index)"
      />
    </div>
  </div>
</template>

<script setup>
import Tile from './Tile.vue'

const props = defineProps({
  board: Array,
  currentRowIndex: Number,
  state: String,
})

const currentRowOutline = function(index) {
  if (props.currentRowIndex != index) {
    return "outline-[#7cc0d8]/[.5]"
  }

  if (props.state === 'invalid_word') {
    return "outline-[#f87171]/[.5]"
  }

  return "outline-[#7cc0d8]/[.5]"
}

</script>

<style scoped>
.row.current .empty:first-child, :not(.empty) + .empty  {
    animation: fade 2s;
    animation-fill-mode: both;
    animation-iteration-count: infinite;
}

@keyframes fade {
    50% {
        background: rgba(255, 255, 255, .05)
    }
}
</style>