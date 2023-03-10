import { useState, FC } from "react";
import { HeartOutlined,HeartFilled , EditOutlined, DeleteFilled, MailOutlined, PhoneOutlined, GlobalOutlined} from '@ant-design/icons';
import {Card } from 'antd';
import { User } from "./interfaces/interfaces";
const {Meta} = Card

interface MyCardProps {
    editClick(target:User):any
    deleteClick(target:User):any
    user:User
}
const MyCard:FC<MyCardProps>  = ({user,editClick,deleteClick}) =>{
    const [isLiked,setIsLiked] = useState<Boolean>(false)
    return (<>
          <Card
        bordered
        style={{ margin:15,
          borderRadius: 2}}
        cover={
          <div style={{backgroundColor:"#f5f5f5", display:'flex',alignItems:'center',flexDirection:'column'}}>
            <img
            alt="example"
            src={`https://avatars.dicebear.com/v2/avataaars/${user.username}.svg?options[mood][]=happy`}
            style={{height:200,width:200}}
          />
          </div>
        }
        actions={[
          (isLiked ? <HeartFilled style={{fontSize:20,color:'red'}} onClick={()=>{
           setIsLiked(false)
          }} /> : <HeartOutlined style={{fontSize:20,color:'red'}} onClick={()=>{
            setIsLiked(true)
          }} />),
          <EditOutlined style={{fontSize:20  }} onClick={()=>editClick(user)} />,
          <DeleteFilled style={{fontSize:20}} onClick={()=>deleteClick(user)}/>,
        ]}
      >
        <Meta title={user.name}  style={{marginBottom:10}}/>
        <div className='info-line'>
            <MailOutlined style={{fontSize:18}}/>
            <p>{user.email}</p>
        </div>
        <div className='info-line'>
            <PhoneOutlined style={{fontSize:18}}/>
            <p>{user.phone}</p>
        </div>
        <div className='info-line'>
            <GlobalOutlined style={{fontSize:18}}/>
            <p>{user.website}</p>
        </div>
       
        </Card>
    </>)
}
export default MyCard