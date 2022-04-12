<template>
  <div class="flex flex-row">
    <!-- <LogoComponent /> -->
  </div>
  <div class="relative text-white rounded-2xl"
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
  <div class="mt-8" @click.stop="$event.target.matches('button') && onKeyDown($event.target.textContent)">
    <div class="flex flex-row justify-center" :key="`keyboard-row-${index}`" v-for="(keys, index) in keyboards">
      <button
        type="button"
        class="bg-[#c5c5c5] rounded m-[2px] h-[50px] min-w-[40px] p-3" 
        v-for="(key, index) in keys"
        :key="`keyboard-key-${index}`"
        :class="matchingTileForKey(key)?.status"
      >
        {{key}}
      </button>
    </div>
  </div>
</template>

<script setup>
import TileComponent from './Tile.vue'
import LogoComponent from './Logo.vue'
import { ref, reactive, computed } from 'vue'
import Tile from './js/tile'

const keyboards = [
  'QWERTYUIOP'.split(""), 
  'ASDFGHJKL'.split(""), 
  ['Enter', ...'ZXCVBNM'.split(""), 'Backspace']
]
const word = 'attack'
const guessAllowed = 5
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


const onKeyDown = function(key) {
  message.value = ''

  if (/^[A-z]$/.test(key)) {
    fillTile(key)
  } else if (key === 'Enter') {
    submitGuess()
  } else if (key === 'Backspace') {
    emptyTile()
  }
}

function keyboard (key) {
  alert(key)
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

function matchingTileForKey(key) 
{
  return board.flat()
    .filter((tile) => tile.status)
    .sort((a, b) => {
      return b.status === 'correct'
    })
    .find((tile) => tile.letter === key.toLowerCase())
}

window.addEventListener("keydown",  (e)=>{ 
  this.onkeydown(e.key)
})
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