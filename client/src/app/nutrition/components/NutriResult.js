import React from 'react';
import food from '../food.jpg'

const NutriResult = props => {
const {
  food: {
    label, 
    image, 
    brand
  },
  showModal} = props;

  return (
    <li onClick={() => showModal(props)}>
      <img src={image || food} width='200px' alt='Food Item' />
      <h4>{label}</h4>
      {brand ? <h5>({brand})</h5> : null}
    </li>
  )
}

export default NutriResult;