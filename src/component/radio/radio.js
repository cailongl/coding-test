import React from 'react'
import c from 'classnames'

import './index.scss'

const Radio = ({onChange = () => undefined, className, checked}) => {
  return (
    <input 
      checked={checked} 
      className={c('radio', className)} 
      type="radio" 
      onChange={e => onChange(e.target.checked)} 
    />
  )
}

export default Radio