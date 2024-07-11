import {useState} from 'react'
import type {TableColumnsType} from 'antd'
import {Divider, Flex, Input, Table, Tag} from 'antd'
import {SearchOutlined} from '@ant-design/icons'

export default function User() {
  interface DataType {
    userId: React.Key;
    userName: string;
    nickName: string;
    email: string;
    phone: string;
    regChannel: string;
    createTime: string;
  }

  const columns: TableColumnsType<DataType> = [
    {title: 'id', dataIndex: 'userId'},
    {title: '用户名', dataIndex: 'userName'},
    {title: '昵称', dataIndex: 'nickName'},
    {title: '邮箱', dataIndex: 'email'},
    {title: '手机号', dataIndex: 'phone', render: (text: string) => <Tag color={'green'}>{text}</Tag>},
    {title: '注册渠道', dataIndex: 'regChannel', render: (text: string) => <Tag color={'green'}>{text}</Tag>},
    {title: '创建时间', dataIndex: 'createTime'}
  ]
  let [loading, setLoading] = useState(false)
  const {Search} = Input
  const data: DataType[] = [
    {
      userId: 1,
      userName: 'admin1',
      nickName: '管理员1',
      email: 'admin1@admin.com',
      phone: '12345678901',
      regChannel: '用户管理',
      createTime: '2021-01-01'
    },
    {
      userId: 2,
      userName: 'admin2',
      nickName: '管理员2',
      email: 'admin2@admin.com',
      phone: '12345678902',
      regChannel: '用户管理',
      createTime: '2021-01-01'
    },
    {
      userId: 3,
      userName: 'admin3',
      nickName: '管理员3',
      email: 'admin3@admin.com',
      phone: '12345678903',
      regChannel: '用户管理',
      createTime: '2021-01-01'
    },
    {
      userId: 4,
      userName: 'admin4',
      nickName: '管理员4',
      email: 'admin4@admin.com',
      phone: '12345678904',
      regChannel: '用户管理',
      createTime: '2021-01-01'
    },
    {
      userId: 5,
      userName: 'admin5',
      nickName: '管理员5',
      email: 'admin5@admin.com',
      phone: '12345678905',
      regChannel: '用户管理',
      createTime: '2021-01-01'
    },
  ]
  const onSearch = (value: string) => {
    setLoading(!loading)
    console.log(value)
  }

  return (<>
    <Flex>
      <Search placeholder="请输入用户名、手机号或邮箱查询" allowClear enterButton={<div><SearchOutlined/> 查询</div>}
              onSearch={onSearch} loading={loading} style={{width: 350}}/>
    </Flex>
    <Divider/>
    <Table rowSelection={{type: 'checkbox'}} columns={columns} dataSource={data} rowKey={'userId'}/>
  </>)
}
