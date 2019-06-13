import React from 'react';
import food from '../food.jpg'
import '../styling/nutriResult.css';

const NutriResult = props => {
const {
  food: {
    label, 
    image, 
    brand
  },
  showModal} = props;

  return (
    <li className='nutriResult' onClick={() => showModal(props)}>
      <img src={image || food} alt='Food Item' />
      <h4>{label}</h4>
      {brand ? <h5>({brand})</h5> : null}
    </li>
  )
}

export default NutriResult;