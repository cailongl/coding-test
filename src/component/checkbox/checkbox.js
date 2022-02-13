import React from 'react'
import c from 'classnames'

import './index.scss'

const Checkbox = ({onChange = () => undefined, className, checked}) => {
  return (
    <input 
      checked={checked} 
      className={c('checkbox', className)} 
      type="checkbox" 
      onChange={e => onChange(e.target.checked)} 
    />
  )
}

export default Checkbox