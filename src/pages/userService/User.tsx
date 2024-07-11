import {useState} from 'react'
import type {TableColumnsType} from 'antd'
import {Divider, Flex, Input, Table, Tag} from 'antd'
import {SearchOutlined} from '@ant-design/icons'
import request from "../../utils/request.ts";
import dayjs from "dayjs";

export default function User() {
  interface PageType {
    current: number
    size: number
    orders: Array<Order>
  }
  interface Order {
    column: string
    asc: boolean
  }

  interface UserParamType extends PageType {
    name: string
  }

  const searchParams: UserParamType = {current: 1, size: 10, orders: [], name: ''}
  const [searchResult, setSearchResult] = useState<PageDataType>({
    current: 1,
    pages: 1,
    records: [],
    size: 0,
    total: 0
  })

  interface ResultType {
    message: string
    status: number
    timestamp: string
    data: any
  }
  interface ResultPageType extends ResultType {
    data: PageDataType
  }
  interface PageDataType {
    current: number
    pages: number
    records: Array<any>
    size: number
    total: number
  }
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
    {title: '创建时间', dataIndex: 'createTime', render: (text: string) => dayjs(text).format('YYYY-MM-DD HH:mm:ss')},
  ]
  let [loading, setLoading] = useState(false)
  const {Search} = Input
  const onSearch = (value: string) => {
    searchParams.name = value
    setLoading(true)
    request.get('user/page', {params: searchParams}).then(res => {
      setSearchResult(res.data.data)
      setLoading(false)
      console.log(res)
    }).catch(error => {
      setLoading(false)
      console.log(error)
    })
  }

  return (<>
    <Flex gap={'middle'} wrap={true}>
      <Search placeholder="请输入用户名、手机号或邮箱查询" allowClear enterButton={<div><SearchOutlined/> 查询</div>}
              onSearch={onSearch} loading={loading} style={{width: 350}}/>
    </Flex>
    <Divider/>
    <Table rowSelection={{type: 'checkbox'}} columns={columns} dataSource={searchResult.records} rowKey={'userId'}/>
  </>)
}
