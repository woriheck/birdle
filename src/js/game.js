


// const useGame = function (board, key) {
//   for (let tile of board.value) {
//     if (! tile.letter) {
//       tile.fill(key)
//       break
//     }
//   }
// }

const useSubmitGuess= function (guess, word, currentRowIndex) {
  if (guess.length !== word.length) {
    return
  }

  if (guess === word) {
    alert('WIN')
  } else {
    alert('Nope')
    currentRowIndex.value++
  }
}

export {
  // useGame,
  useSubmitGuess
}