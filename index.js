const SPACE_DELIMITER_CHECK = /[\w\s]+/g

const COMMA_DELIMITER_CHECK =  /^\w+(,\w+)*$/g

const REGEX_MATCH_QUOTE = /".*?"/g

const REGEX_MATCH_WORD = /[\w]/g

const REGEX_MATCH_QUOTE_2 = /('[^'\\]*(?:\\.[^'\\]*)*')/g

const MATCH_QUOTES = /['"]+/g // this will remove quotes from the string components

const MATCH_TEXT_QUOTES = /"(.*?)"/g

const message = 'Hello world “Boston Red Sox” benjamin'

const REGEX_MATCH_SINGLE_DOUBLE_QUOTES = /'(.*?)'|"(.*?)"/g

const REGEX_MATCH_WORD_FULL = /\w+/g



function getWordParts(message){


  const quotedStrings = [...message.matchAll(REGEX_MATCH_SINGLE_DOUBLE_QUOTES)].map(item => item[0])
                    .map(item => item.replace(MATCH_QUOTES, '').trim())

  console.log('quoted strings> ', quotedStrings)

  let stringParts = []

    const filteredStrings = message.replace(REGEX_MATCH_SINGLE_DOUBLE_QUOTES, '').trim().split(',').join(" ")


  stringParts = [...filteredStrings.split(" ")]

  stringParts = [...stringParts, ...quotedStrings].filter(item => item.trim()  !== '' && item !== ',').map(item => item.replace(',', '').trim())

  return stringParts;
}

// const result = getWordParts("'Pepperoni Pizza', beer, you're")

const result = getWordParts("Hello world 'Boston Red Sox'")

console.log('result > ', result)
