export function isDevanagariWord(word: string) {
  const devanagariRange = [0x0900, 0x097f]
  return [...word].every(
    (char) =>
      char.charCodeAt(0) >= devanagariRange[0] &&
      char.charCodeAt(0) <= devanagariRange[1]
  )
}

export function isKannadaWord(word: string) {
  const kannadaRange = [0x0c80, 0x0cff]
  return [...word].every(
    (char) =>
      char.charCodeAt(0) >= kannadaRange[0] &&
      char.charCodeAt(0) <= kannadaRange[1]
  )
}

export const indianLanguages = [
  "Assamese",
  "Bengali",
  "English",
  "Gujarati",
  "Hindi",
  "Kannada",
  "Kashmiri",
  "Konkani",
  "Malayalam",
  "Manipuri",
  "Marathi",
  "Nepali",
  "Odia",
  "Punjabi",
  "Sanskrit",
  "Sindhi",
  "Tamil",
  "Telugu",
  "Urdu",
]
