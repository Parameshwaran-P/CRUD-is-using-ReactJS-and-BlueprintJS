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
   setUser((user)=>{user.map()})
  }
  const handleUpdate=()=>{
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

  const handleDelete=()=>{

  }
  return (
    <div className="App">
      <table>
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
          <td><EditableText onChange={value=>onChangehandle(value=users.id, 'email', value)} value= {users.email}></EditableText></td>
          <td><EditableText onChange={value=>onChangehandle(value=users.id, 'website', value)} value={users.email} /></td>
          <td><Button intent='primary' onClick={handleUpdate}>Upadate</Button>
              &nbsp;<Button intent='danger' onClick={handleDelete}>Delete</Button></td>
           </tr>)}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td><InputGroup value={newName} onChange={(e)=>setNewname(e.target.value)}/></td>
            <td><InputGroup value={newEmail} onChange={(e)=>setNewemail(e.target.value)} /></td>
            <td><InputGroup value={newWebsite} onChange={(e)=>setNewwebsite(e.target.value)}/></td>
            <td><Button intent='success' onClick={addUser}>Adduser</Button></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default App;
