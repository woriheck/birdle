<template>
  <div class="flex flex-row">
    <!-- <LogoComponent /> -->
  </div>
  <div class="relative text-white rounded-2xl m-auto"
    style="background-image: linear-gradient(153deg, #1c2b45 13%, #0c1321 85%), linear-gradient(149deg, #fec63b 3%, rgba(254, 198, 59, 0) 80%)">
    <span
      class="content-none block absolute -inset-[7px] -z-10 rounded-2xl"
      style="background-image: linear-gradient(138deg, #6ba0e2 -20%, #131e32 105%);"
    />

    <div :key="`row-${index}`" v-for="(row, index) in board" class="flex flex-row animate-pulse-background"
      :class="{'row current': currentRowIndex === index }">
      <TileComponent
        v-for="(tile, tileIndex) in row"
        :key="`tile-${tileIndex}`"
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
import LogoComponent from './Logo.vue'
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


.row.current .tile.empty:first-of-type {
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