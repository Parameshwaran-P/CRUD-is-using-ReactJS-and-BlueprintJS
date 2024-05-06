import {Button, EditableText, InputGroup, Toaster} from '@blueprintjs/core'
import './App.css';
import { useEffect, useState } from 'react';

const AddToaster = Toaster.create({position:'top'})

function App() {
  const [user, setUser] = useState([]);
  const [newName, setNewname] = useState();
  const [newEmail, setNewemail] = useState();
  const [newWebsite, setNewwebsite] = useState();


  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((json)=>setUser(json))
  },[])


  const onChangehandle = (id, key, value) => {
   setUser(()=>{
   return user.map((users)=>{
      return users.id === id ? {...users, [key]:value} : users;
    })
   })
  }
  const handleUpdate=(id)=>{
    const users = user.find((users)=>
       users.id === id );
    fetch(`https://jsonplaceholder.typicode.com/users/10`,
    { 
      method:'PUT',
      body: JSON.stringify(users),
      headers: {
        'Content-type': 'application/json ; Charset=UTF-8 '
      }
    }
  )
  .then((response)=> response.json())
  .then(data=>{
  AddToaster.show({
    message: "Update User Successfully!",
    intent:'success',
    timeout: 3000
  })
  
  })


  }
  
    const addUser=()=>{
      const name= newName.trim()
      const email= newEmail.trim()
      const website = newWebsite.trim()

     if(name && email && website){
      fetch('https://jsonplaceholder.typicode.com/users',
        { 
          method:'POST',
          body: JSON.stringify({
            name,
            email,
            website
          }),
          headers: {
            'Content-type': 'application/json ; Charset=UTF-8 '
          }
        }
      )
      .then((response)=> response.json())
      .then((data)=>{setUser([...user, data])
      AddToaster.show({
        message: "Add User Successfully!",
        intent:'success',
        timeout: 3000
      })
      setNewname('');
      setNewemail('');
      setNewwebsite('')
      })
    }
  }

  const handleDelete=(id)=>{
  fetch(`https://jsonplaceholder.typicode.com/users/${id}`,
   {
     method: 'DELETE'
   } 
  )
  .then((response)=>{response.json()})
  .then((data)=>{
    setUser((user)=>{
      return user.filter(users=>
       users.id !== id
      )
    })
    AddToaster.show(
      {
        message: "Delete user successfully!",
        intent: "success",
        timeout: 3000
      }
    )
  })
  }
  return (
    <div className="App">
      <table border={1}>
        <thead>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Website</th>
          <th>Action</th>      
        </thead>
        <tbody>
          {user.map((users)=>
          <tr key={users.id}>
          <td>{users.id}</td>
          <td>{users.name}</td>
          <td><EditableText onChange={value=>onChangehandle(users.id, 'email', value)} value= {users.email}></EditableText></td>
          <td><EditableText onChange={value=>onChangehandle(users.id, 'website', value)} value={users.website} /></td>
          <td><Button intent='primary' onClick={() => handleUpdate(users.id)}>Upadate</Button>
              &nbsp;<Button intent='danger' onClick={() => handleDelete(users.id)}>Delete</Button></td>
           </tr>)}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td><InputGroup placeholder='Enter a name?' value={newName} onChange={(e)=>setNewname(e.target.value)} p/></td>
            <td><InputGroup placeholder='Enter a email?' value={newEmail} onChange={(e)=>setNewemail(e.target.value)} /></td>
            <td><InputGroup placeholder='Enter a website?' value={newWebsite} onChange={(e)=>setNewwebsite(e.target.value)}/></td>
            <td><Button intent='success' onClick={addUser}>Adduser</Button></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default App;
