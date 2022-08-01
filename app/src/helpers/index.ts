

const MATCH_QUOTES = /['"]+/g // this will remove quotes from the string components

const REGEX_MATCH_SINGLE_DOUBLE_QUOTES = /'(.*?)'|"(.*?)"/g


export const getWordParts= (message: string): string[] => {


  const quotedStrings = [...message.matchAll(REGEX_MATCH_SINGLE_DOUBLE_QUOTES)].map(item => item[0])
                    .map(item => item.replace(MATCH_QUOTES, '').trim())

  let stringParts = []

  const filteredStrings = message.replace(REGEX_MATCH_SINGLE_DOUBLE_QUOTES, '').trim().split(',').join(" ")


  stringParts = [...filteredStrings.split(" ")]


  stringParts = [...stringParts, ...quotedStrings].filter(item => item.trim()  !== '' && item !== ',').map(item => item.replace(',', '').trim())

  return stringParts;
}
