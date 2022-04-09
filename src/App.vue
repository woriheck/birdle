<template>
  <div>
    <div :key="`row-${row}`" v-for="row in board" class="flex flex-row">
      <TileComponent
        v-for="tile in row"
        :key="`tile-${tile}`"
        :letter="tile.letter"
      />
    </div>
  </div>
</template>

<script setup>
import TileComponent from './Tile.vue'

import { ref, reactive, computed } from 'vue'
import Tile from './js/tile'

const word = 'cat'
const guessAllowed = 5
const board = reactive(
  Array.from({length: guessAllowed}, () => {
    return Array.from({length: word.length}, () => new Tile);
  })
);

let currentRowIndex = ref(0)
let currentRow = computed(() => board[currentRowIndex.value])
let currentGuess = computed(() => currentRow.value.map(tile => tile.letter).join(''))


const play = function(e) {
  if (/^[A-z]$/.test(e.key)) {
    useGame( e.key)
  }
  else if (e.key === 'Enter') {
    useSubmitGuess()
  }
}

function useGame (key) {
  for (let tile of currentRow.value) {
    if (! tile.letter) {
      tile.fill(key)
      break
    }
  }
}

function useSubmitGuess() {
  if (currentGuess.value.length !== word.length) {
    return
  }

  if (currentGuess.value === word) {
    alert('WIN')
  } else {
    alert('Nope')
    currentRowIndex.value++
  }
}

window.addEventListener("keypress", play);
</script>

<style>
html, body, #app{
  height: 100%;
}
</style>