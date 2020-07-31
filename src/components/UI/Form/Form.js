import React, { useState } from 'react';
import './Form.css';

import Input from './Input/Input';

const Form = (props) => {
  // State
  const [inputs, setInputs] = useState(props.inputs);
  const [isFormValid, setIsFormValid] = useState(false);

  function isValid(inputId, isValid) {
    const formData = { ...inputs };
    const formEl = {
      ...formData[inputId],
    };

    if (isValid === formEl.isValid) return;

    formEl.isValid = isValid;

    formData[inputId] = formEl;

    setInputs({ ...formData });

    // Form validation
    let formIsValid = true;
    for (const inputId in formData) {
      formIsValid = !!formData[inputId].isValid && formIsValid;
    }
    setIsFormValid(formIsValid);
  }

  function submitForm(event) {
    event.preventDefault();

    if (!isFormValid) return;

    // TODO : Prévention contre les injections malveillantes
    let values = {};
    for (const id in inputs)
      values[id] = inputs[id].value.trim();

    props.callback(values);
  }

  function onInputChange(inputId, isValid, event) {
    const formData = {
      ...inputs,
    };

    formData[inputId].value = event.target.value;
    formData[inputId].isValid = isValid;
    setInputs(formData);

    let formIsValid = true;
    for (const inputId in formData) {
      formIsValid = !!formData[inputId].isValid && formIsValid;
    }
    setIsFormValid(formIsValid);
  }

  // Elements
  const formInputs = [];
  for (const id in inputs) {
    formInputs.push({
      id: id,
      config: inputs[id],
    });
  }

  const form = (
    <form onSubmit={submitForm}>
      {formInputs.map((input) => (
        <Input
          id={input.id}
          key={input.id}
          label={input.config.label}
          elementType={input.config.type}
          elementConfig={input.config.config}
          validation={input.config.rules}
          value={input.config.value}
          errorMessage={input.config.message}
          isValid={isValid}
          changed={(event, isValid) =>
            onInputChange(input.id, isValid, event)
          }
        />
      ))}

      <button type='submit' disabled={!isFormValid}>
        {props.buttonLabel ? props.buttonLabel : 'Envoyer'}
      </button>
    </form>
  );

  return <div className='Form'>{form}</div>;
};

export default Form;
