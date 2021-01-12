(function () {
  const randomPassword = (function () {
    const randomFunctions = {
      lower: getRandomLower,
      upper: getRandomUpper,
      number: getRandomNumber,
      symbol: getRandomSymbol,
    };

    function getRandomUpper() {
      return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    }

    function getRandomLower() {
      return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    }

    function getRandomNumber() {
      return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
    }

    function getRandomSymbol() {
      let symbolSet = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
      return symbolSet[Math.floor(Math.random() * symbolSet.length)];
    }

    function generate(length, options) {
      // Map out the required options into a string array
      const requiredTypes = Object.keys(options).filter(o => options[o] === true);

      if (requiredTypes.length === 0) {
        return '';
      }
      /* Each character type will have equal percentage frequency except for instances where the length of the password is divisible with a remainder.In such instance, the remaining character types are randomized*/

      const generatedPassword = [];
      // Loop count to generate each character type in equal frequencies
      const eqFreqLoopCount = Math.floor(length / requiredTypes.length);
      // Loop count to generate the remaining characters
      const remainderLoopCount = length % requiredTypes.length;

      for (let i = 0; i < eqFreqLoopCount; i++) {
        requiredTypes.forEach(type => {
          generatedPassword.push(randomFunctions[type]());
        });
      }

      for (let i = 0; i < remainderLoopCount; i++) {
        let random = Math.floor(Math.random() * requiredTypes.length);
        generatedPassword.push(randomFunctions[requiredTypes[random]]());
      }

      // Let's shuffle and return the generated password
      return generatedPassword
        .map(a => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map(a => a.value)
        .join('');
    }

    return {
      generate: generate,
    };
  })();

  const passwordLengthEl = document.getElementById('password-length');
  const hasUppercaseEl = document.getElementById('has-uppercase');
  const hasLowercaseEl = document.getElementById('has-lowercase');
  const hasNumbersEl = document.getElementById('has-numbers');
  const hasSymbolEl = document.getElementById('has-symbols');
  const genPassEl = document.getElementById('gen-pass');
  const clipboardEl = document.getElementById('clipboard');
  const passwordOutput = document.getElementById('password-output');

  function copyToClipboard(password) {
    const textarea = document.createElement('textarea');
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    textarea.setSelectionRange(0, 9999);
    document.execCommand('copy');
    textarea.remove();
  }

  genPassEl.addEventListener('click', () => {
    const length = +passwordLengthEl.value;
    const lower = hasLowercaseEl.checked;
    const upper = hasUppercaseEl.checked;
    const number = hasNumbersEl.checked;
    const symbol = hasSymbolEl.checked;
    const options = { lower, upper, number, symbol };

    passwordOutput.innerText = randomPassword.generate(length, options);
  });

  clipboardEl.addEventListener('click', event => {
    if (!passwordOutput.innerText) {
      return;
    }
    copyToClipboard(passwordOutput.innerText);
    alert('Copied the text: ' + passwordOutput.innerText);
  });
})();
