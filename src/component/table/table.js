import React, { useEffect, useRef, useState, useMemo } from "react"
import c from 'classnames'

import Checkbox from '../checkbox'
import Radio from '../radio'
import CreateCover from './cover'
import './index.scss'

function check(value) {
  if (!value && value !== 0) {
    return false
  }
  return value
}

const coverDiv = new CreateCover()

const HeadTh = ({title, initWidth, className, disabledResize}) => {
  const [width, setWidth] = useState(initWidth)
  const domRef = useRef(null)
  const deltaXRef = useRef(0)
  
  const onMouseMove = e => {
    const moveX = e.clientX - deltaXRef.current
    const nextWidth = width + moveX
    setWidth(Math.round(nextWidth))
  }

  const onMouseUp = () => {
    coverDiv.hidden()
    window.removeEventListener('mousemove', onMouseMove, false)
    window.removeEventListener('mouseup', onMouseUp, false)
  }

  const onMouseDown = e => {
    deltaXRef.current = e.clientX
    coverDiv.show()
    window.addEventListener('mousemove', onMouseMove, false)
    window.addEventListener('mouseup', onMouseUp, false)
  }

  useEffect(() => {
    if (!initWidth && initWidth !== 0) {
      // 未有width， 初始化width
      const {current} = domRef
      const rect = current.getBoundingClientRect()
      setWidth(Math.round(rect.width))
    }
  }, [])
  return (
    <th style={{width}} className={className} ref={domRef}>
      <div className="table-cell">
        {title}
      </div>
      {!disabledResize && <div onMouseDown={onMouseDown} className="fake-border" />}
    </th>
  )
}
// rowSelection type: radio, checkbox
const TableRowSelect = ({onChange, isHead, checked, rowSelection = {}}) => {
  const {type = 'checkbox'} = rowSelection
  return (
    <div className="table-selection-box">
      {
        type === 'checkbox' ? (
          <Checkbox 
            onChange={onChange} 
            checked={checked} 
          /> 
        ) : (
          <Radio 
            className={c({'table-visible-hidden': isHead})} 
            onChange={onChange}  
            checked={checked}  
          />
        )
      }
    </div>
  )
}

const TableHead = ({columns = [], rowSelection, onSelect, checked}) => {
  return (
    <thead className="table-thead">
      <tr>
        {rowSelection && <HeadTh title={<TableRowSelect isHead rowSelection={rowSelection} onChange={selected => onSelect(selected)} checked={checked} />} disabledResize />}
        {
          columns.map(column => {
            const {key, title, width, resizeAble = true} = column
            return (
              <HeadTh key={key} title={title} disabledResize={!resizeAble} initWidth={width}/>
            )
          })
        }
      </tr>
    </thead>
  )
}

const TableTr = ({id, columns, data, rowClassName, onSelect, rowSelection, selectedKeys = []}) => {
  const checked = selectedKeys.includes(id)
  return (
    <tr className={c(rowClassName, {'table-row-selected': checked})}>
      {rowSelection &&  <td><TableRowSelect rowSelection={rowSelection} onChange={selected => onSelect(id, selected, data)} checked={checked} /></td>}
      {
        columns.map(column => {
          const {key, dataIndex} = column
          return (
            <td key={key}>
              <div className="table-cell">
                {data[dataIndex]}
              </div>
            </td>
          )
        })
      }
    </tr>
  )
}

// 因为时间缘故，实现一个简易版的，见谅
const Table = ({dataSource = [], columns, rowKey, rowClassName, rowSelection}) => {
  const [selectedKeys, setSelectedKeys] = useState([])
  const isControl = rowSelection ? rowSelection.selectedRowKeys : false
  const onSelect = (id, selected, record) => {
    const {type = 'checkbox', onSelect: rowOnSelect, onChange} = rowSelection
    let result = [...selectedKeys]
    if (type === 'checkbox') {
      // 多选
      if (selected) {
        result.push(id)
      } else {
        const index = result.indexOf(id)
        result.splice(index, 1)
      }
    } else {
      // 单选
      result = [id]
    }
    !isControl && setSelectedKeys(result)
    rowOnSelect && rowOnSelect(record, selected, result)
    onChange && onChange(result)
  }

  const onSelectAll = selected => {
    const {onSelectAll, onChange} = rowSelection
    const result = []
    if (selected) {
      dataSource.forEach((item, index) => {
        result.push(check(item[rowKey]) || String(index))
      })
    }
    !isControl && setSelectedKeys(result)
    onSelectAll && onSelectAll(selected, result)
    onChange && onChange(result)
  }

  useEffect(() => {
    if (rowSelection) {
      const {selectedRowKeys = []} = rowSelection
      setSelectedKeys(selectedRowKeys)
    }
  }, [rowSelection])
  return (
    <div className="table-box">
      <table className="table">
        <TableHead onSelect={onSelectAll} rowSelection={rowSelection} columns={columns}/>
        <tbody className="table-tbody">
          {
            dataSource.map((item, index) => {
              const id = check(item[rowKey]) || String(index)
              return <TableTr onSelect={onSelect} key={id} id={id} selectedKeys={selectedKeys} data={item} columns={columns} rowSelection={rowSelection} rowClassName={rowClassName}/>
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default Table