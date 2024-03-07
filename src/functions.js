function isClickedOutsideOfModal(event, node) {
  if (node.current && !node.current.contains(event.target)) {
    return true;
  }
  return false;
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function theTypewriter({leftStaticStr = "", words, rightStaticStr = "", speed = 100, cursor = ''}) {

  let currentWordIndex = Math.floor(Math.random() * words.length);
  let currentLetterIndex = 0;
  let isDeleting = false;

  async function type() {

    const currentWord = words[currentWordIndex];

    if (isDeleting) {
      document.getElementById('search-field').placeholder = leftStaticStr + currentWord.substring(0, currentLetterIndex - 1) + cursor + rightStaticStr;
      currentLetterIndex--;

      if (currentLetterIndex === 0) {
        isDeleting = false;
        currentWordIndex = Math.floor(Math.random() * words.length);
      }
    }
    else {
      document.getElementById('search-field').placeholder = leftStaticStr + currentWord.substring(0, currentLetterIndex + 1) + cursor + rightStaticStr;
      currentLetterIndex++;

      if (currentLetterIndex === currentWord.length) {
        await sleep(2000);
        isDeleting = true;
      }
    }
  }

  setInterval(type, speed);

  return words.join(' ');
}


function theGetImage(name) {
  
  try {
    const image = require(`./assets/images/${name}`);
    const value = image ? image : null;
    return value;
  }
  catch (exception) {
    console.log(`Image with name "${name}" does not exist.`);
    return null;
  }
}


function memoFunc(func) {

  var cache = {};

  return function (...args) {

    const key = JSON.stringify(args);

    if (key in cache) {
      return cache[key];
    }
    else {
      const result = func(...args);
      cache[key] = result;
      return result;
    }
  };
}


const typewriter = memoFunc(theTypewriter); // TODO: Function optimization : should run only when in use
const getImage = memoFunc(theGetImage);

export { isClickedOutsideOfModal, typewriter, getImage };