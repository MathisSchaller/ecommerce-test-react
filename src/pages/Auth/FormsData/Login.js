const email = 'mathis.schaller.pro@gmail.com';
const password = 'Abc1234!';

const formInputs = {
  email: {
    type: 'input',
    label: 'E-Mail',
    config: {
      type: 'email',
      placeholder: 'email@example.com',
    },
    rules: {
      required: true,
      minLength: 5,
      maxLength: 65,
      pattern: '[a-zA-Z0-9.\\-_]+@[a-zA-Z0-9]+\\.[a-zA-Z]+',
    },
    value: email,
    message:
      'Email must be at least 2 characters long and composed of letters and numbers.',
  },
  password: {
    type: 'input',
    label: 'Mot de passe',
    config: {
      type: 'password',
      placeholder: 'password',
    },
    rules: {
      required: true,
      minLength: 6,
      maxLength: 65,
    },
    value: password,
    message: 'Password must be minimum 6 characters long.',
  },
};

export default formInputs;
