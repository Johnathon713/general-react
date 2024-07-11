import {useState} from 'react'
import {Button} from "antd";

export default function User() {
  const [name, setName] = useState('权限管理组件')
  return (<>
    <div>{name}</div>
    <Button onClick={() => setName(name + '@')}>按钮</Button>
  </>)
}
