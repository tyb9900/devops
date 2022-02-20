import React, { useState, useEffect } from 'react';
const Home = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [users, setUsers] = useState([]);

    function addUser() {
        fetch("http://localhost:5000/create-user/");
        window.location.href = '/';
    }

    useEffect(() => {
        fetch("http://localhost:5000/users/")
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true);
                    setUsers(data);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div>
                <button onClick={addUser}>Add User</button>
                <ul>
                    {users.map(user => (
                        <li key={user.id}>
                            Name : "
                            {user.name}
                            " Address : "
                            {user.address}"
                        </li>
                    ))}
                </ul></div>
        );
    }
}
export default Home;