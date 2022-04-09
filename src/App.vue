<template>
  <div>
    <h1 class="text-white text-center mb-5 text-xl">
      BATTLE WORDLE
    </h1>
    <div :key="`row-${row}`" v-for="row in board" class="flex flex-row">
      <TileComponent
        v-for="tile in row"
        :key="`tile-${tile}`"
        :letter="tile.letter"
        :status="tile.status"
      />
    </div>
    <div class="fixed bottom-10 right-20 text-white text-2xl">
      {{message}}
    </div>
  </div>
</template>

<script setup>
import TileComponent from './Tile.vue'
import { ref, reactive, computed } from 'vue'
import Tile from './js/tile'

const word = 'cat'
const guessAllowed = 3
const board = reactive(
  Array.from({length: guessAllowed}, () => {
    return Array.from({length: word.length}, () => new Tile)
  })
)

let currentRowIndex = ref(0)
let state = ref('')
let message = ref('')
let currentRow = computed(() => board[currentRowIndex.value])
let currentGuess = computed(() => currentRow.value.map(tile => tile.letter).join(''))
let remainingGueses = computed(() => guessAllowed - currentRowIndex.value - 1)


const onKeyDown = function(e) {
  message.value = ''

  if (/^[A-z]$/.test(e.key)) {
    fillTile(e.key)
  } else if (e.key === 'Enter') {
    submitGuess()
  } else if (e.key === 'Backspace') {
    emptyTile()
  }
}

function fillTile (key) {
  for (let tile of currentRow.value) {
    if (! tile.letter) {
      tile.fill(key)
      break
    }
  }
}

function emptyTile (key) {
  for (let tile of [...currentRow.value].reverse()) {
    if (tile.letter) {
      tile.empty()
      break
    }
  }
}

function submitGuess() {
  if (currentGuess.value.length !== word.length) {
    return
  }

  for (let tile of currentRow.value) {
    tile.updateStatus(currentGuess.value, word)
  }

  if (currentGuess.value === word) {
    state.value = 'complete'
    return message.value = "Yow Win!"
  }

  if (remainingGueses.value === 0) {
    state.value = 'complete'
    return message.value = "Game Over, You Lose"
  }

  message.value = "Incorrect"
  currentRowIndex.value++
}

window.addEventListener("keydown", onKeyDown)
</script>

<style>
html, body, #app{
  height: 100%
}
</style>