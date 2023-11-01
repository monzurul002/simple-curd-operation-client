import { Link } from "react-router-dom"
import './App.css'
import { useEffect, useState } from "react";

function App() {

  // const loadUsers = useLoaderData();
  // const [users, setUsers] = useState(loadUsers)
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [users]);

  console.log(users);
  const handleSendToDb = (e) => {
    e.preventDefault()
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email }

    fetch('http://localhost:3000/user', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.insertedId) {
          return alert("Data has beeb inserted to Databse")
        }
      })


  }

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/user/${id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(data => {
        if (data.deletedCount == 1) {
          const remaining = users.filter(user => user._id !== id)
          setUsers(remaining)
        }
      })
  }

  return (
    <>
      <h2>Send do databse</h2>
      <form onSubmit={handleSendToDb} >

        <input type="text" name="name" id="" /> <br />
        <input type="email" name="email" id="" /> <br />
        <input type="submit" value="Submit" />
      </form>

      {/* <h2>{users.length}</h2> */}
      {
        users.map(user => <li
          key={user._id}
        >
          {user.name} : {user.email}  <button onClick={() => handleDelete(user._id)}>X</button>
          <Link to={`/user/${user._id}`}>Update </Link>


        </li>)
      }
    </>
  )
}

export default App
