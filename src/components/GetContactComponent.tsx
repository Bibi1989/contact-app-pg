import React from 'react'
import { List } from 'semantic-ui-react'

const ContactComponent: React.FC<{response: any, handleViewContact: any, handleDelete: any, handleEdit: any}> = ({response, handleViewContact, handleDelete, handleEdit}) => {
  return (
    <div style={{width: "65%", background: "#40427B", height: "85vh", padding: `30px 0`, overflow: `auto`}}>
    {response === undefined || response.map((show: any) => (
      <List key={show.id} divided style={{display: `flex`, justifyContent: `space-between`, marginBottom: `35px`, marginLeft: `0`, borderBottom: `1px solid #eee`, paddingBottom: `10px`, color: `orangered`}} >
        <List.Item onClick={() => handleViewContact(show === undefined || show.id)} style={{display: `flex`, justifyContent: `flex-start`, paddingLeft: `15px`, cursor: `pointer`}}>
          <div style={style}>
            <p style={{fontSize: `1.8em`}}>{show === undefined || show.first_name[0]}</p>
          </div>
          <List.Content>
            <List.Header style={{color: `#ddd`}}>{show === undefined || show.first_name} {show === undefined || show.last_name}</List.Header>
            <List.Description style={{color: `#ddd`, opacity: `0.5`}}>{show  === undefined || show.phone} {response=== undefined || response.last_name}</List.Description>
          </List.Content>
        </List.Item>
        <div style={{marginRight: `20px`}}>
          <i className="fa fa-edit" style={{paddingRight: `20px`, color: `teal`, fontSize: `1.4em`, cursor: `pointer`}} onClick={() => handleEdit(show.id)}></i>
          <i className="fa fa-trash" style={{color: `orangered`, fontSize: `1.4em`, cursor: `pointer`}} onClick={() => handleDelete(show.id)}></i>
        </div>
      </List>
      ))
    }
    </div>
  )
}
// {response=== undefined || response.first_name} {response=== undefined || response.last_name}

export default ContactComponent

const style = {
  width: `40px`,
  height: `40px`,
  display: `flex`,
  justifyContent: `center`,
  borderRadius: `50%`,
  border: `1px solid teal`,
  marginRight: `25px`,
}