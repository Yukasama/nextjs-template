const NAME_ADJECTIVES = [
  'cool',
  'kind',
  'calm',
  'bold',
  'wise',
  'neat',
  'fair',
  'glad',
  'keen',
  'rare',
  'pure',
  'warm',
  'wild',
  'firm',
  'fast',
  'deep',
  'vast',
  'soft',
  'hard',
  'rich',
]

const NAME_NOUNS = [
  'star',
  'rose',
  'wind',
  'flame',
  'wave',
  'stone',
  'leaf',
  'snow',
  'rain',
  'fire',
  'tree',
  'bird',
  'wolf',
  'bear',
  'lion',
  'fish',
  'frog',
  'hawk',
  'dear',
  'moon',
]

export const generateName = () => {
  const adjective =
    NAME_ADJECTIVES[Math.floor(Math.random() * NAME_ADJECTIVES.length)]
  const noun = NAME_NOUNS[Math.floor(Math.random() * NAME_NOUNS.length)]
  const numbers = Math.floor(Math.random() * 90_000 + 1000).toString()

  return `${adjective}-${noun}-${numbers}`
}
