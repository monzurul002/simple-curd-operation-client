import { useLoaderData } from "react-router-dom";

const Update = () => {
    const user = useLoaderData()
    const handleUpdate = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const updateInfo = { name, email }

        fetch(`http://localhost:3000/user/${user._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updateInfo)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    return alert("Data has been modified.")
                }
            })
    }
    return (
        <div>
            <h2>Update Now <br /> {user.name}</h2>

            <form onSubmit={handleUpdate} >
                <input type="text" name="name" id="" defaultValue={user.name} /> <br />
                <input type="email" name="email" id="" defaultValue={user.email} /> <br />
                <input type="submit" value="Submit" />
            </form>

        </div>
    );
};

export default Update;