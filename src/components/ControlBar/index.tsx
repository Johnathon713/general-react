import React, {useEffect, useState} from "react";
import {Button, Checkbox, CheckboxProps, Flex, Popconfirm} from "antd";
import {BarsOutlined} from "@ant-design/icons";

const ControlBar: React.FC = ({elements = [], columns = []}) => {
  const [data, setData] = useState({allList: [], checkedList: [], checkAll: false});
  const indeterminate = data.checkedList.length > 0 && data.checkedList.length < data.allList.length;

  const onChange = (list: string[]) => {
    setData({...data, checkedList: list, checkAll: list.length === data.allList.length})
  };

  const onCheckAllChange: CheckboxProps['onChange'] = (e) => {
    setData({...data, checkedList: e.target.checked ? data.allList : [], checkAll: e.target.checked})
  }

  const confirm = () => {

  }

  const cancel = () => {

  }
  useEffect(() => {
    const allList: string[] = [], checkedList: string[] = []
    let checkAll: boolean = false
    for (let i = 0; i < columns.length; i++) {
      allList.push(columns[i].title)
      if (!columns[i].hidden) {
        checkedList.push(columns[i].title)
      }
    }
    if (allList.length === checkedList.length && allList.length !== 0) {
      checkAll = true
    }
    setData({...data, allList: allList, checkedList: checkedList, checkAll: checkAll})
  }, [columns])
  return (<Flex gap="middle" style={{marginTop: '16px'}}>
    <Flex gap="middle" wrap style={{width: '100%'}}>{elements}</Flex>
    <Popconfirm
      placement="leftTop"
      title="选择要展示的列"
      description={<>
        <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={data.checkAll}>全选</Checkbox>
        <Checkbox.Group options={data.allList} value={data.checkedList} onChange={onChange} style={{display: 'grid'}}/>
      </>}
      onConfirm={confirm}
      onCancel={cancel}
      style={{flexShrink: 0}}
    >
      <Button icon={<BarsOutlined/>}></Button>
    </Popconfirm>
  </Flex>)
}
export default ControlBar
