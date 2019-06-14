import React from 'react';

export default function NutriDetailLi({label, quantity, unit}) {
  const qty = Math.round(quantity * 100 / 100);

  return (
    <li >
      <strong className='nutrient-title'>{label}:</strong>
      <span>{qty} {unit}</span>
    </li>
  )
}