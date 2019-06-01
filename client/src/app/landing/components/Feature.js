import React from 'react';

export default function feature({className, heading, text}) {
  return (
    <section className={className}>
      <h3>{heading}</h3>
      <p>{text}</p>
    </section>
  )
}