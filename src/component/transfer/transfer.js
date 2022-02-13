import React, { useEffect, useMemo, useState } from 'react'
import PropsType, { string } from 'prop-types'

import TransferBox from './transfer-box'

import './index.scss'

const noop = () => undefined

const Transfer = ({dataSource = [], render, onSelectChange, onChange, selectedKeys,  targetKeys, titles}) => {
  const dataCache = useMemo(() => {
    const map = new Map()
    dataSource.forEach(d => {
      map.set(d.key, d)
    })
    return map
  }, dataSource)
  const isControl = useMemo(() => !!selectedKeys, [selectedKeys])
  const [sourceSelectedKeys, setSourceSelectedkeys] = useState([])
  const [targetSelectedKeys, setTargetSelectedkeys] = useState([])
  useEffect(() => {
    // 受控模式, 更新内部状态
    if (isControl) {
      const src = [], target = []
      selectedKeys.forEach(key => {
        if (targetKeys.includes(key)) {
          target.push(key)
        } else {
          src.push(key)
        }
      })
      setSourceSelectedkeys(src)
      setTargetSelectedkeys(target)
    }
  }, [selectedKeys])
  const onSelect = (type, selectKeys) => {
      // !selectedKeys 判读是否是受控，若受控, 向上通知即可
    if (type === 'left') {
      !isControl && setSourceSelectedkeys(selectKeys)
      onSelectChange(selectKeys, targetSelectedKeys)
    } else {
      !isControl && setTargetSelectedkeys(selectKeys)
      onSelectChange(sourceSelectedKeys, selectKeys)
    }
  }
  const moveTo = (direction) => {
    const currentTargetKeys = [...targetKeys]
    if (direction === 'right') {
      // move to right add keys
      const nextTargetKeys = [...targetKeys, ...sourceSelectedKeys]
      onChange(nextTargetKeys, direction, sourceSelectedKeys)
      onSelect('left', [])
    } else {
      // move to right remove keys
      const nextTargetKeys = targetKeys.filter(key => !targetSelectedKeys.includes(key))
      onChange(nextTargetKeys, direction, targetSelectedKeys)
      onSelect('right', [])
    }
  }
  const targetData = useMemo(() => {
    return targetKeys.map(key => dataCache.get(key))
  }, [targetKeys, dataCache])
  const sorceData = useMemo(() => {
    const result = []
    dataSource.forEach(d => {
      if (!targetKeys.includes(d.key)) {
        result.push(dataCache.get(d.key))
      }
    })
    return result
  }, [targetKeys, dataCache])

  return (
      <div className='transfer'>
        <TransferBox 
          selectKeys={sourceSelectedKeys} 
          data={sorceData}
          render={render}
          title={titles[0]}
          onSelectChange={onSelect.bind(null, 'left')}
        />
        <div className='transfer-action'>
          {/* icon 暂时用这个，时间不是很多，见谅 */}
          <button disabled={!sourceSelectedKeys.length} className='transfer-action-btn transfer-btn-right' onClick={moveTo.bind(null, 'right')}>{'>'}</button>
          <button  disabled={!targetSelectedKeys.length}className='transfer-action-btn' onClick={moveTo.bind(null, 'left')}>{'<'}</button>
        </div>
        <TransferBox 
          title={titles[1]}
          selectKeys={targetSelectedKeys} 
          data={targetData}
          render={render}
          onSelectChange={onSelect.bind(null, 'right')}
        />
      </div>
  )
}

Transfer.propTypes = {
  dataSource: PropsType.arrayOf(PropsType.object),
  onSelectChange: PropsType.func,
  onChange: PropsType.func,
  render: PropsType.func,
  titles: PropsType.arrayOf(PropsType.string),
  selectedKeys: PropsType.arrayOf(PropsType.string),
  targetKeys: PropsType.arrayOf(PropsType.string),
}

Transfer.defaultProps = {
  dataSource: [],
  onSelectChange: noop,
  onChange: noop,
  render: undefined,
  titles: ['Source', 'Target'],
}

export default Transfer