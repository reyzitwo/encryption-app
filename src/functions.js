//текст в двоичное кодирование
export function UTF8ToBin(str){
    str = unescape(encodeURIComponent(str));
    let chr, index = 0, length = str.length, out = '';
    for(; index < length; index ++ ){
        chr = str.charCodeAt(index).toString( 2 );
        while( chr.length % 8 != 0 ){ chr = '0' + chr; }
        out = out + ' ' + chr;
    }

    return out;
};

//двоичное кодирование в текст
export function binToUTF8(str){
    str = str.replace(/\s/g, '')
    let i = 0, l = str.length, chr, out = '';
    for(; i < l; i += 8 ){
        chr = parseInt(str.substr( i, 8 ), 2).toString(16);
        out += '%' + ((chr.length % 2 == 0) ? chr : '0' + chr);
    }

    return decodeURIComponent(out);
};

//функция, сдвигающая алфавит на количество букв (shift)
function shiftAlphabet(shift) {
    let shiftedAlphabet = '' //новый алфавит
    let alphabet1 = window.alphabet.split('')

    alphabet1 = alphabet1.concat(alphabet1.splice(0, alphabet1.length - shift));
    shiftedAlphabet = alphabet1.join('')

    return shiftedAlphabet;
}

export function alphabetLetters(alphabet1) {
    let arrLetters = []
    let lengthAlphabet = Array.from(alphabet1)
    for (let i = 0; i < lengthAlphabet.length; i++) {
        arrLetters.push({value: i + 1, label: i + 1})
    }

    return arrLetters
}

export function encryptCaesarCipher(message, shift) {
    let shiftedAlphabet = shiftAlphabet(shift);
    let encryptedMessage = '';
    for (let i = 0; i < message.length; i++) {
        //если символа нет в алфавите - оставляем таким
        if (window.alphabet.indexOf(message[i].toUpperCase()) < 0) {
          encryptedMessage = encryptedMessage.concat(message[i]);
          continue
        }

        let indexOfLetter = window.alphabet.indexOf(message[i].toUpperCase());
        encryptedMessage = encryptedMessage.concat(shiftedAlphabet[indexOfLetter]);
    }

    return encryptedMessage.toLowerCase();
}

export function decryptCaesarCipher(message, shift) {
    let shiftedAlphabet = shiftAlphabet(shift);
    let encryptedMessage = '';
    for (let i = 0; i < message.length; i++) {
        if (message[i] == ' ') {
          encryptedMessage = encryptedMessage.concat(' ');
          continue
        };

        //если символа нет в алфавите - оставляем таким
        if (window.alphabet.indexOf(message[i].toUpperCase()) < 0) {
          encryptedMessage = encryptedMessage.concat(message[i]);
          continue
        }

        let indexOfLetter = shiftedAlphabet.indexOf(message[i].toUpperCase());
        encryptedMessage = encryptedMessage.concat(window.alphabet[indexOfLetter]);
    }

    return encryptedMessage.toLowerCase();
}

//русская морзе
let morseRus = {
  'а': '.-',
  'б': '-...',
  'в': '.--',
  'г': '--.',
  'д': '-..',
  'е': '.',
  'ж': '...-',
  'з': '--..',
  'и': '..',
  'й': '.---',
  'к': '-.-',
  'л': '.-..',
  'м': '--',
  'н': '-.',
  'о': '---',
  'п': '.--.',
  'р': '.-.',
  'с': '...',
  'т': '-',
  'у': '..-',
  'ф': '..-.',
  'х': '....',
  'ц': '-.-.',
  'ч': '---.',
  'ш': '----',
  'щ': '--.-',
  'ъ': '.--.-.',
  'ы': '-.--',
  'ь': '-..-',
  'э': '...-...',
  'ю': '..--',
  'я': '.-.-',
}

//английская морзе
let morseEng = {
  'a': '.-',
  'b': '-...',
  'c': '-.-.',
  'd': '--.',
  'e': '.',
  'f': '..-.',
  'h': '....',
  'i': '..',
  'j': '.---',
  'k': '-.-',
  'l': '.-..',
  'm': '--',
  'n': '-.',
  'o': '---',
  'p': '.--.',
  'q': '--.-',
  'r': '.-.',
  's': '...',
  't': '-',
  'u': '..-',
  'v': '...-',
  'w': '.--',
  'x': '-..-',
  'y': '-.--',
  'z': '--..',
}

//текст в морзе
export function encryptMorse(message, isRus) {
  let lang = isRus ? morseRus : morseEng
  let arrMessage = message.split('')
  for (let i = 0; i < arrMessage.length; i++) {
    if (lang[arrMessage[i].toLowerCase()] === undefined) {
      continue
    }

    arrMessage[i] = lang[arrMessage[i].toLowerCase() ]
  }

  return arrMessage.join(' ')
}


//расшифровка морзе
export function decryptMorse(message, isRus) {
  let lang = isRus ? morseRus : morseEng
  let arrMessage = message.split(' ')

  let langMorse = {}
  Object.entries(lang).forEach(([key, value]) => {
    langMorse[value] = key
  })

  for (let i = 0; i < arrMessage.length; i++) {
    if (langMorse[arrMessage[i]] === undefined) {
      continue
    }

    arrMessage[i] = langMorse[arrMessage[i]]
  }

  let decryptString = ''
  for (let i = 0; i < arrMessage.length; i++) {
    if (arrMessage[i] === '' && arrMessage[i + 1] === '') {
        decryptString += ' '
    } else {
        decryptString += arrMessage[i]
    }
  }

  return decryptString
}