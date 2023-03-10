import  { FC, useEffect, useState }  from 'react';

import { Col, Row,Card } from 'antd';
import { Button, Modal, Form, Input } from 'antd';

import MyCard from './MyCard';

import { User } from './interfaces/interfaces';

const App: FC = () => {
  const [isLoading,setIsLoading] = useState(true)
  const [userList,setUserList] = useState<User[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [target,setTarget] = useState<User|null>(null)
  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res=>res.json())
      .then(response=>{
        setUserList(response)
        setTimeout(()=>{
          setIsLoading(false)
        },2000)
      })
  },[]);

  const showModal = (target:User) => {
    console.log(target)
    setTarget(target)
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setTarget(null)
    setIsModalOpen(false);
  };

  const onFinish = (values: any) => {
    let list  = JSON.parse(JSON.stringify(userList))
    let index  = userList.findIndex((u)=>u.id == target?.id)
    if(index !== -1){
        list[index]['name'] = values.name
        list[index]['email'] = values.email
        list[index]['phone'] = values.phone
        list[index]['website']  = values.website
        setUserList(list)
    }
    setIsModalOpen(false)
  };

  const handleDelete = (target:User) => {
    let list  = JSON.parse(JSON.stringify(userList))
    let index  = userList.findIndex((u)=>u.id == target?.id)
    if(index !== -1){
      list.splice(index,1)
      setUserList(list)
    }
  }
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  if(isLoading){
    return(<div className='spinner'></div>)
  }
  return (<>
    <Row>
      {userList.length > 0 && (
        userList.map((item,index)=>{
          return (<Col lg={6} md={8} xs={24} key={index}>
            <MyCard user={item} editClick={(target)=>showModal(target)} deleteClick={handleDelete}/>
            </Col>)
        })
      )}
    </Row>
    <Modal title="Basic Modal" open={isModalOpen} onCancel={handleCancel}
    footer={null}
    destroyOnClose
    >
    <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ name:target?.name,email:target?.email,phone:target?.phone,website:target?.website}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <Input  />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'This field is required' },{
            type: 'email',
            message: 'Invalid email',
          }]}
        >
          <Input value={target?.email}/>
        </Form.Item>
          <Form.Item
          label="Phone"
          name="phone"
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <Input value={target?.phone}/>
          </Form.Item>
          <Form.Item
          label="Website"
          name="website"
          rules={[{ required: true, message:'This field is required' }]}
        >
          <Input value={target?.website} />
        </Form.Item>
        <div style={{display:'flex',flexDirection:'row', justifyContent:'flex-end', marginTop:40}} >
        <Button type="default" htmlType="button" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            OK
          </Button>
        </div>
          
      </Form>
    </Modal>
  </>
    
  );
}

export default App;
