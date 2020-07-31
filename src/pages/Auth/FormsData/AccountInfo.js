const AccountInfo = ({ lastname, firstname, gender }) => {
  return {
    firstname: {
      type: 'input',
      label: 'Prénom',
      config: {
        type: 'text',
        placeholder: 'John',
      },
      rules: {
        minLength: 2,
        maxLength: 65,
        pattern: '[A-Za-zÀ-ÿ]+',
      },
      value: firstname || '',
      message:
        'First name min 2 characters, letters only. Not required if you are a registred company.',
    },
    lastname: {
      type: 'input',
      label: 'Nom de famille / Entreprise',
      config: {
        type: 'text',
        placeholder: 'Doe',
      },
      rules: {
        required: true,
        minLength: 2,
        maxLength: 65,
        pattern: '[A-Z]+',
      },
      value: lastname || '',
      message:
        'Last name min 2 characters, CAPITAL letters only',
    },
    gender: {
      type: 'select',
      label: 'Genre',
      config: {
        options: [
          {
            value: 'mme',
            alias: 'Madame',
          },
          {
            value: 'mlle',
            alias: 'Mademoiselle',
          },
          {
            value: 'm',
            alias: 'Monsieur',
          },
        ],
      },
      rules: {
        required: true,
      },
      value: gender || 'mme',
      message: 'First name min 2 characters, letters only',
    },
  };
};

export default AccountInfo;
