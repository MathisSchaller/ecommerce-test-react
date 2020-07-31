import React, { useState, useEffect } from 'react';

import './Input.css';

// Vérifications simple de bonne formation de la requete
// mais non vérification de bonne cohérence avec la BD
const checkValidity = (value, rules) => {
  let isValid = true;
  if (!rules) return isValid;

  if (rules.required) isValid = value !== '' && isValid;
  else if (value.length === 0) return isValid;
  if (rules.minLength)
    isValid = value.length >= rules.minLength && isValid;
  if (rules.maxLength)
    isValid = value.length <= rules.maxLength && isValid;
  if (rules.min || rules.min === 0)
    isValid = +value >= +rules.min && isValid;
  if (rules.max) isValid = +value <= +rules.max && isValid;
  if (rules.step && rules.min)
    isValid = (value - rules.min) % rules.step === 0 && isValid;
  if (rules.pattern)
    isValid = RegExp(rules.pattern).test(value) && isValid;

  return isValid;
};

const Input = (props) => {
  const [isUntouched, setIsUntouched] = useState(true);

  const isValid = checkValidity(props.value, props.validation);
  let isValidClass = ' Invalid';
  if (isValid) isValidClass = ' Valid';
  if (isUntouched) isValidClass = '';

  useEffect(() => {
    if (props.isValid) props.isValid(props.id, isValid);
  }, [props, isValid]);

  const changeMuttator = (event) => {
    if (isUntouched) setIsUntouched(false);
    const isValid = checkValidity(
      event.target.value.trim(),
      props.validation
    );
    props.changed(event, isValid);
  };

  const sharedProps = {
    className: 'InputElement' + isValidClass,
    value: props.value,
    ...props.validation,
    onChange: (event) => changeMuttator(event),
  };

  let inputEl = null;
  switch (props.elementType) {
    case 'textarea':
      inputEl = (
        <textarea {...sharedProps} {...props.elementConfig} />
      );
      break;
    case 'select':
      inputEl = (
        <select {...sharedProps}>
          {props.elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.alias}
            </option>
          ))}
        </select>
      );
      break;
    case 'input':
    default:
      inputEl = (
        <input {...sharedProps} {...props.elementConfig} />
      );
  }

  let message = props.errorMessage;

  return (
    <div className='Input'>
      <label className='Label'>{props.label}</label>
      {inputEl}
      <span className={'Info' + isValidClass}>?</span>
      <div className='PopupMessage'>{message}</div>
    </div>
  );
};

export default Input;
