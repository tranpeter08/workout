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
    <div onClick={() => showModal(props)}>
      <h3>{label}</h3>
      {brand ? <h4>{brand}</h4> : null}
      <img src={image || food} width='200px' alt='Food Item' />
    </div>
  )
}

export default NutriResult;