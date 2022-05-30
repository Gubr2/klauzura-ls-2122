export default class TextSeparate {
  constructor() {}

  separate(selector) {
    this.text = document.querySelectorAll(selector)

    this.text.forEach((text) => {
      this.toLetter = []
      this.joinedLetters = []

      this.toWords = text.innerHTML.split(' ')

      this.toWords.forEach((word, index) => {
        this.toLetter[index] = word.split('')
      })

      this.toLetter.forEach((letter, index) => {
        this.joinedLetters[index] = '<span>' + letter.join('</span><span>') + '</span>'
      })

      this.joinedWords = '<span>' + this.joinedLetters.join('</span> <span>') + '</span>'
      text.innerHTML = this.joinedWords
    })
  }

  separateObject(selector) {
    this.text = selector

    this.text.forEach((text, index) => {
      this.toLetter = []
      this.joinedLetters = []

      this.toWords = text.split(' ')

      this.toWords.forEach((word, index) => {
        this.toLetter[index] = word.split('')
      })

      this.toLetter.forEach((letter, index) => {
        this.joinedLetters[index] = '<span>' + letter.join('</span><span>') + '</span>'
      })

      this.joinedWords = '<span>' + this.joinedLetters.join('</span> <span>') + '</span>'
      selector[index] = this.joinedWords
    })
  }

  createTags(selector) {
    this.text = selector

    this.text.forEach((text, index) => {
      this.text[index] = text.toString()
      this.toLetter = []
      this.joinedLetters = []

      this.toWords = this.text[index].split(',')

      this.joinedWords = '<p class="tag">' + this.toWords.join('</p><p class="tag">') + '</p>'
      selector[index] = this.joinedWords
    })
  }
}
