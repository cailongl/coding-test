import react, {useState} from 'react'
import { Link } from 'react-router-dom'

import Transfer from '../../component/transfer'

const mockData = [];
for (let i = 0; i < 40; i++) {
  mockData.push({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
    disabled: i % 4 === 0,
  });
}

const TransferDemo = () => {
  const [targetKeys, setTargetKeys] = useState(['1', '2'])
  const [selectedKeys, setSelectedKeys] = useState([])
  const onChange = (nextTargetKeys, direction, moveKeys) => {
    console.log('targetKeys:', nextTargetKeys)
    console.log('direction:', direction)
    console.log('moveKeys:', moveKeys)
    setTargetKeys(nextTargetKeys)
  }
  const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    console.log('sourceSelectedKeys:', sourceSelectedKeys)
    console.log('targetSelectedKeys:', targetSelectedKeys)
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys])
  }
  return (
    <div className='transfer-demo'>
      <div>
        <Link to="/table">table demo</Link>
        <h3>transfer component demo</h3>
        <Transfer 
          dataSource={mockData}
          onSelectChange={onSelectChange}
          targetKeys={targetKeys}
          onChange={onChange}
          selectedKeys={selectedKeys}
        />
      </div>
    </div>
    
  )
}

export default TransferDemo