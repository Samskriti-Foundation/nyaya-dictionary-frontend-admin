export interface Admin{
  first_name: string
  last_name: string
  email: string
  is_superuser: boolean
  // created_at: string
  // last_login: string
}


type Translations = {
  [key: string]: string[];
}

export interface Meaning{
  meaning: string,
  meaning_id: number,
  etymologies: [string],
  derivations: [string],
  translations: Translations,
  reference_nyaya_texts: [
    {
      source: string,
      description: string
    }
  ],
  examples: [
    {
      example_sentence: string,
      applicable_modern_context: string
    }
  ],
  synonyms: [string],
  antonyms: [string],
}

export interface Word{
  id: number,
  sanskrit_word: string,
  english_transliteration: string,
  meanings: [Meaning],
}