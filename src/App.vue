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
import { ref, reactive } from 'vue'
import TileComponent from './Tile.vue'
import Tile from './js/Tile'

// reactive state
const wordLength = 3
const guessAllowed = 5
const board = reactive(
  Array.from({length: guessAllowed}, () => {
    return Array.from({length: wordLength}, () => new Tile);
  })
);

let currentRowIndex = 0

const keyPressHandler = (e) => {
  const key = String.fromCharCode(e.keyCode)
  if (!/^[A-z]$/.test(key)) {
    return
  }

  for (let tile of board[currentRowIndex]) {
    if (! tile.letter) {
      tile.fill(key)
      break
    }
  }
};

window.addEventListener("keypress", keyPressHandler);
</script>

<style>
html, body, #app{
  height: 100%;
}
</style>