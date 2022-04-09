export default class Tile {
  letter = '';
  status = '';

  fill(letter) {
    this.letter = letter.toLowerCase()
  }

  empty() {
    this.letter = ''
  }

  updateStatus(guessWord, word) {
    this.status = word.includes(this.letter) ? 'present' : 'absent'

    if (guessWord.indexOf(this.letter) === word.indexOf(this.letter)) {
      this.status = 'correct'
    }
  }
}