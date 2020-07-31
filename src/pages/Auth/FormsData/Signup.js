const signUpInputs = {
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
    value: '',
    message:
      'Email must be at least 2 characters long and composed of letters and numbers.',
  },
  password: {
    type: 'input',
    label: 'Mot de passe',
    config: {
      type: 'password',
      placeholder: 'Mot de passe',
    },
    rules: {
      required: true,
      minLength: 6,
      maxLength: 65,
    },
    value: '',
    message: 'Password must be minimum 6 characters long.',
  },
  confirm_password: {
    type: 'input',
    label: 'Confirmez votre mot de passe',
    config: {
      type: 'password',
      placeholder: 'Mot de passe',
    },
    rules: {
      required: true,
      minLength: 6,
      maxLength: 65,
    },
    value: '',
    message: 'Password must be minimum 6 characters long.',
  },
};

export default signUpInputs;
