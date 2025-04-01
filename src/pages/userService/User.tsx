import {useEffect, useRef, useState} from 'react'
import {Button, Divider, Flex, Form, Input, message, Modal, Radio, Table, TableColumnsType, Tag} from 'antd'
import {ExclamationCircleOutlined, SearchOutlined} from '@ant-design/icons'
import request from "../../utils/request.ts";
import dayjs from "dayjs";
import ControlBar from "../../components/ControlBar";

const {confirm} = Modal

const User: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const test = useRef(null)
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
    current: 1, pages: 1, records: [], size: 0, total: 0
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
    {title: 'id', dataIndex: 'userId', hidden: false},
    {title: '用户名', dataIndex: 'userName', hidden: true},
    {title: '昵称', dataIndex: 'nickName', hidden: false},
    {title: '邮箱', dataIndex: 'email', hidden: false},
    {title: '手机号', dataIndex: 'phone', render: (text: string) => <Tag color={'green'}>{text}</Tag>, hidden: false},
    {
      title: '注册渠道',
      dataIndex: 'regChannel',
      render: (text: string) => <Tag color={'green'}>{text}</Tag>,
      hidden: false
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      render: (text: string) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
      hidden: false
    }
  ]
  let [loading, setLoading] = useState(false)
  const {Search} = Input
  const onSearch = (value: string) => {
    searchParams.name = value
    setLoading(false)
    request.get('user_service/user/page', {params: searchParams}).then(res => {
      setSearchResult(res.data)
      setLoading(false)
      console.log(res)
    }).catch(error => {
      setLoading(false)
      console.log(error)
    })
  }

  const showAddModal = () => {
    setOpen(true)
  }

  const handleAddOk = () => {
    form.validateFields().then(values => {
      setConfirmLoading(true);
      values.id = null
      values.regChannel = '用户管理'
      request.post('user_service/user/save', values).then(res => {
        setOpen(false);
        setConfirmLoading(false);
        messageApi.success('新建成功')
        form.resetFields()
        onSearch('')
      }).catch(error => {
        setConfirmLoading(false)
        messageApi.error(<p>新建失败</p>, 100)
      })
    }).catch(errorInfo => {
    })
  }

  const handleAddCancel = () => {
    confirm({
      icon: <ExclamationCircleOutlined/>, content: "确定要取消操作吗？您的修改将不会保存。", onOk() {
        setOpen(false)
        setConfirmLoading(false)
        form.resetFields()
      }, onCancel() {
        console.log('Cancel');
      }
    })
  }
  const onFormLayoutChange = (changedValues, values) => {

  }

  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false);
  const [form] = Form.useForm();

  type FieldType = {
    userId: number,
    userName: string,
    nickName: string,
    password: string,
    gender: string,
    email: string,
    phone: string,
    regChannel: string
  }

  useEffect(() => {
    onSearch('')
    return () => {

    }
  }, [])

  return (<>
    <Flex gap={'middle'} wrap={true}>
      <Search placeholder="请输入用户名、手机号或邮箱查询" allowClear enterButton={<div><SearchOutlined/> 查询</div>}
              onSearch={onSearch} loading={loading} style={{width: 350}}/>
    </Flex>
    <ControlBar
      elements={<><Button type="primary" onClick={showAddModal}>新建</Button><Button type="primary"
                                                                                     danger>删除</Button></>}
      columns={columns}
    />
    <Divider/>
    <Table rowSelection={{type: 'checkbox'}} columns={columns} dataSource={searchResult.records} rowKey={'userId'}/>
    <Modal title="创建用户" open={open} onOk={handleAddOk} confirmLoading={confirmLoading} onCancel={handleAddCancel}>
      <Form form={form} onValuesChange={onFormLayoutChange} labelCol={{span: 4}}>
        <Form.Item<FieldType> label="用户名" rules={[{required: true, message: '请输入用户名'}]} name="userName">
          <Input placeholder="请输入用户名"/>
        </Form.Item>
        <Form.Item<FieldType> label="昵称" rules={[{required: true, message: '请输入昵称'}]} name="nickName">
          <Input placeholder="请输入昵称"/>
        </Form.Item>
        <Form.Item<FieldType> label="密码" rules={[{required: true, message: '请输入密码'}]} name="password">
          <Input placeholder="请输入密码"/>
        </Form.Item>
        <Form.Item<FieldType> label="确认密码" rules={[{required: true, message: '请再输入一遍密码'}]} name="password">
          <Input placeholder="请再输入一遍密码"/>
        </Form.Item>
        <Form.Item<FieldType> label="性别" rules={[{required: true, message: '请选择性别'}]} name="gender">
          <Radio.Group>
            <Radio.Button value="男">男</Radio.Button>
            <Radio.Button value="女">女</Radio.Button>
            <Radio.Button value="其他">其他</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item<FieldType> label="邮箱" rules={[{required: true, message: '请输入邮箱'}]} name="email">
          <Input placeholder="请输入邮箱"/>
        </Form.Item>
        <Form.Item<FieldType> label="手机号" rules={[{required: true, message: '请输入手机号'}]} name="phone">
          <Input placeholder="请输入手机号"/>
        </Form.Item>
      </Form>
    </Modal>
  </>)
}
export default User
