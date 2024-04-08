function isDevanagariWord(word: string) {
    const devanagariRange = [0x0900, 0x097F];
    return [...word].every(char => char.charCodeAt(0) >= devanagariRange[0] && char.charCodeAt(0) <= devanagariRange[1]);
}

function isKannadaWord(word: string) {
    const kannadaRange = [0x0C80, 0x0CFF];
    return [...word].every(char => char.charCodeAt(0) >= kannadaRange[0] && char.charCodeAt(0) <= kannadaRange[1]);
}