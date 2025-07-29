<template>
  <div class="container">
    <h1>Przetasowanie liter w wyrazach (1. i ostatnia litera nienaruszona)</h1>
    <input type="file" accept=".txt" @change="handleFileUpload" />

    <div v-if="originalText" class="text-section">
      <h2>Oryginalny (oczyszczony) tekst:</h2>
      <pre>{{ originalText }}</pre>
    </div>

    <div v-if="shuffledText" class="text-section">
      <h2>Tekst po przetasowaniu:</h2>
      <pre>{{ shuffledText }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DOMPurify from 'dompurify'

const originalText = ref('')
const shuffledText = ref('')

// Wczytanie i sanityzacja pliku
const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = () => {
    let text = reader.result

    // Sanityzacja — usuwamy tagi i atrybuty
    const sanitized = DOMPurify.sanitize(text, {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: []
    })

    if (sanitized !== text) {
      alert('Plik zawierał podejrzane dane — został oczyszczony.')
    }

    originalText.value = sanitized
    shuffledText.value = shuffleText(sanitized)
  }

  reader.readAsText(file, 'UTF-8')
}

// Tasujemy środkowe litery każdego wyrazu
function shuffleText(text) {
  return text
    .split('\n')
    .map(line =>
      line.replace(/\p{L}+[\p{L}\p{M}'’\-]*\p{L}+|\p{L}/gu, word => shuffleWord(word))
    )
    .join('\n')
}

function shuffleWord(word) {
  if (word.length <= 3) return word

  const first = word[0]
  const last = word[word.length - 1]
  const middle = word.slice(1, -1).split('')

  // Tasowanie liter w środku
  for (let i = middle.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[middle[i], middle[j]] = [middle[j], middle[i]]
  }

  const shuffled = first + middle.join('') + last

  return preserveCase(word, shuffled)
}

// Zachowanie wielkości liter
function preserveCase(original, transformed) {
  return [...transformed].map((char, i) => {
    return original[i] && original[i] === original[i].toUpperCase()
      ? char.toUpperCase()
      : char.toLowerCase()
  }).join('')
}
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
  font-family: sans-serif;
  padding: 2rem;
}
.text-section {
  margin-top: 2rem;
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 6px;
  white-space: pre-wrap;
  word-break: break-word;
  pre {
    white-space: pre-wrap;
  }
}
</style>