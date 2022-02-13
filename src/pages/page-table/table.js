import react, {useState} from 'react'
import {Link} from 'react-router-dom'
import Table from '../../component/table';

const mockData = [];
for (let i = 0; i < 40; i++) {
  mockData.push({
    key: i.toString(),
    name: `content${i + 1}`,
    address: `description of content${i + 1}`,
    age: i % 4 === 0,
  });
}


const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '2',
    name: '胡彦祖胡彦祖胡彦祖胡彦祖胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
  {
    key: '3',
    name: '胡彦祖胡彦祖胡彦祖胡彦祖胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
  {
    key: '4',
    name: '胡彦祖胡彦祖胡彦祖胡彦祖胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
  {
    key: '5',
    name: '胡彦祖胡彦祖胡彦祖胡彦祖胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
  {
    key: '6',
    name: '胡彦祖胡彦祖胡彦祖胡彦祖胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
];

const columns = [
  {
    title: 'Full Name',
    width: 100,
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    width: 100,
    dataIndex: 'age',
    key: 'age',
  },
  { title: 'Column 1', dataIndex: 'address', key: '1' },
  { title: 'Column 2', dataIndex: 'address', key: '2' },
  { title: 'Column 3', dataIndex: 'address', key: '3' },
  { title: 'Column 4', dataIndex: 'address', key: '4' },
  { title: 'Column 5', dataIndex: 'address', key: '5' },
  { title: 'Column 6', dataIndex: 'address', key: '6' },
  { title: 'Column 7', dataIndex: 'address', key: '7' },
  { title: 'Column 8', dataIndex: 'address', key: '8' },
  {
    title: 'Action',
    key: 'operation',
    width: 100,
  },
];

const TransferDemo = () => {
  return (
    <div className='table-demo'>
      <Link to="/transfer">transfer demo</Link>
      <h3>拖拽</h3>
      <Table dataSource={dataSource} columns={columns} />
      <h3>多选</h3>
      <Table 
        rowKey={'key'}
        dataSource={dataSource} 
        rowSelection={{
          onChange: selectedKeys => console.log('onChange', selectedKeys),
          onSelect: (record, selected, selectedKeys) => console.log('onSelect', record, selected, selectedKeys),
          onSelectAll: (selected, selectedKeys) => console.log('onSelectAll', selected, selectedKeys)
        }} 
        columns={columns} 
      />
      <h3>单选</h3>
      <Table rowKey={'key'} dataSource={dataSource} rowSelection={{type: 'radio'}} columns={columns} />
    </div>
  )
}

export default TransferDemo