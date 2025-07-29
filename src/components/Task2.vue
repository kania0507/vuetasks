<template>
  <div>
    <h2>Walidacja numeru PESEL</h2>
    <input
      v-model="pesel"
      @input="onInput"
      @paste.prevent="onPaste"
      placeholder="Wpisz numer PESEL"
      maxlength="11"
      inputmode="numeric"
      pattern="\d*"
      :class="{ valid: isLengthValid, invalid: pesel.length > 0 && !isLengthValid }"
    />
    <p v-if="pesel.length > 0 && !isLengthValid" class="error">
      PESEL musi mieć dokładnie 11 cyfr.
    </p>

    <button :disabled="!isLengthValid" @click="validate">Sprawdź</button>

    <p v-if="message" :class="{ success: message.includes('poprawny'), error: message.includes('niepoprawny') }">
      {{ message }}
    </p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const pesel = ref('')
const message = ref('')

const isLengthValid = computed(() => pesel.value.length === 11)

function onInput(e) {
  // Usuwamy wszystko co nie jest cyfrą
  let value = e.target.value.replace(/\D/g, '')
  if (value.length > 11) value = value.slice(0, 11)
  pesel.value = value
}

function onPaste(e) {
  // Zabezpieczamy wklejanie — pozwalamy tylko cyfry i max 11 znaków
  const paste = (e.clipboardData || window.clipboardData).getData('text')
  if (!/^\d*$/.test(paste)) {
    e.preventDefault()
  } else if (paste.length + pesel.value.length > 11) {
    e.preventDefault()
  }
}

function isValidPesel(p) {
  if (!/^\d{11}$/.test(p)) return false

  const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3]
  const sum = weights.reduce((acc, w, i) => acc + w * Number(p[i]), 0)
  const controlDigit = (10 - (sum % 10)) % 10
  if (controlDigit !== Number(p[10])) return false

  let year = Number(p.slice(0, 2))
  let month = Number(p.slice(2, 4))
  let day = Number(p.slice(4, 6))

  let century = 1900
  if (month > 80 && month < 93) {
    century = 1800
    month -= 80
  } else if (month > 0 && month < 13) {
    century = 1900
  } else if (month > 20 && month < 33) {
    century = 2000
    month -= 20
  } else if (month > 40 && month < 53) {
    century = 2100
    month -= 40
  } else if (month > 60 && month < 73) {
    century = 2200
    month -= 60
  } else {
    return false
  }

  year += century
  const date = new Date(year, month - 1, day)
  if (
    date.getFullYear() !== year ||
    date.getMonth() + 1 !== month ||
    date.getDate() !== day
  ) {
    return false
  }

  return true
}

function validate() {
  if (isValidPesel(pesel.value)) {
    message.value = 'PESEL jest poprawny ✅'
  } else {
    message.value = 'PESEL jest niepoprawny ❌'
  }
}
</script>

<style scoped>
input {
  font-size: 1.2rem;
  padding: 0.3em 0.5em;
  border: 2px solid #ccc;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.3s;
}

input.valid {
  border-color: green;
}

input.invalid {
  border-color: red;
}

.error {
  color: red;
  margin-top: 0.3em;
}

.success {
  color: green;
  margin-top: 0.6em;
}
</style>