<template>
  <div class="fixed top-20 text-white text-xl mb-10">
    {{message}}
  </div>
  <div class="relative text-white rounded-2xl">
    <span
      class="content-none block absolute -inset-[3px] -z-10 rounded-2xl"
    />

    <div :key="`row-${index}`" v-for="(row, index) in board" class="flex flex-row animate-pulse-background"
      :class="{'row current': currentRowIndex === index }">
      <TileBoard
        v-for="(tile, tileIndex) in row"
        :key="`tile-${tileIndex}`"
        :letter="tile.letter"
        :status="tile.status"
      />
    </div>
  </div>

  <Keyboard :board="board" @keyboard-press="play"/>
</template>

<script setup>
import TileBoard from './components/Tile.vue'
import Keyboard from './components/Keyboard.vue'
import LogoComponent from './Logo.vue'
import { ref, reactive, computed } from 'vue'
import Tile from './js/tile'


const word = 'eat'
const guessAllowed = word.length
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



function play (key) {
  if (state.value == 'complete') {
    return
  }
  message.value = ''

  if (/^[A-z]$/.test(key)) {
    fillTile(key)
  } else if (key === 'Enter') {
    submitGuess()
  } else if (key === 'Backspace') {
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

  let tword = [...word]
  currentRow.value.forEach(function(tile, index) {
    if (tile.letter === tword[index]) {
      tile.status = 'correct'
      tword[index] = ''
    }
  })

  currentRow.value.forEach(function(tile, index) {
    if (!tile.status) {
      if (tword.includes(tile.letter)) {
        tile.status = 'present'
      } else {
        tile.status = 'absent'
      }
    }
  })

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


window.addEventListener("keydown", (e) => state.value !== 'complete' && play(e.key))
</script>

<style>
html, body, #app{
  height: 100%
}

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

button.correct {
  background-color: #47d747;
}
button.present {
  background-color: #f7f749;
}
button.invalid {
  background-color: #ff3f3f;
}
button.absent {
  background-color: #888;
}
</style>