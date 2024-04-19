export interface Admin{
  first_name: string
  last_name: string
  email: string
  is_superuser: boolean
  // created_at: string
  // last_login: string
}


export interface Word{
  id: number
  sanskrit_word: string
  english_transliteration: string
  meaning_ids: [number]
}


export interface Meaning {
  id: number,
  sanskrit_word_id: number
  meaning: string
}


export interface Etymology{
  id: number,
  sanskrit_word_id: number
  meaning_id: number
  etymology: string
}


export interface Derivation{
  id: number,
  sanskrit_word_id: number
  meaning_id: number
  derivation: string
}