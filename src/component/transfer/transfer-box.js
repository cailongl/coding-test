import React, { useContext, useEffect, useMemo, useState } from 'react'
import c from 'classnames'
import Checkbox from '../checkbox'

const Item = ({dataItem = {}, onSelect, render, selectKeys = []}) => {
  const {key, title, description, disabled} = dataItem
  const checked = selectKeys.includes(key)
  return (
    <div 
      className={c('transfer-item hand', {
        'transfer-item-checked': checked, 
        'transfer-item-disabled': disabled
      })} 
      onClick={() => {
        !disabled && onSelect(key, !checked)
      }}
      title={description}
    >
      <Checkbox checked={checked} />
      <span className='transfer-item-text pl8'>
        {render ? render(dataItem) : title}
      </span>
    </div>
  )
}

const Title = ({title, totalCount, selectedCount, onChange, checked}) => {
  return (
    <div className='transfer-title-box'>
      <div className='transfer-title-inner'>
        <Checkbox className="hand" onChange={onChange} checked={checked} />
        <span className='pl8'>{`${selectedCount}/${totalCount}`}</span>
      </div>
      <span className='transfer-title'>{title}</span>
    </div>
  )
}

const TransferBox = ({data = [], selectKeys, onSelectChange, render, title}) => {
  const selectedAbledData = useMemo(() => {
    return data.filter(d => !d.disabled)
  }, [data])
  const onSelect = (key, selected) => {
    const currentKeys = [...selectKeys]
    if (selected) {
      // chose
      currentKeys.push(key)
    } else {
      // delete
      const index = currentKeys.indexOf(key)
      currentKeys.splice(index, 1)
    }
    onSelectChange(currentKeys)
  }
  const onChangeAll = checked => {
    const result = []
    if (checked) {
      selectedAbledData.forEach(d => {
        result.push(d.key)
      })
    }
    onSelectChange(result)
  }
  const {length} = selectKeys
  const checked = length && length === selectedAbledData.length
  return (
    <div className='transfer-box'>
      <Title onChange={onChangeAll} checked={checked} selectedCount={selectKeys.length} title={title} totalCount={data.length} />
      <div className='transfer-content'>
        {
          data.map(d => {
            return (
              <Item 
                key={d.key} 
                selectKeys={selectKeys} 
                dataItem={d} 
                render={render} 
                onSelect={onSelect}
              />
            )
          })
        }
      </div>
    </div>
  )
}

export default TransferBox