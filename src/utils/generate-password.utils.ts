export const generatePassword = (length = 8): string => {
  const lowercaseCharset = 'abcdefghijklmnopqrstuvwxyz';
  const uppercaseCharset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numberCharset = '0123456789';

  const charset = lowercaseCharset + uppercaseCharset + numberCharset;
  let password = '';

  password += getRandomCharacter(lowercaseCharset);
  password += getRandomCharacter(uppercaseCharset);
  password += getRandomCharacter(numberCharset);

  for (let i = password.length; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);

    password += charset.charAt(randomIndex);
  }

  password = shuffleString(password);

  return password;
};

function getRandomCharacter(charset: string): string {
  const randomIndex = Math.floor(Math.random() * charset.length);

  return charset.charAt(randomIndex);
}

function shuffleString(str: string): string {
  const arr = str.split('');

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr.join('');
}
