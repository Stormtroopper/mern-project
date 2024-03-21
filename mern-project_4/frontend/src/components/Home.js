import { React, useState, useEffect } from 'react'
import axios from "axios"
import Headers from './Headers'
axios.defaults.withCredentials = true
var rendered_once = true
const Home = () => {
    const [user, setUser] = useState();
    const refreshing = async () => {
        const res = await axios.get('http://localhost:3000/api/refresh'
            , { withCredentials: true, }).catch(e => console.log(e))
        const data = await res.data;
        return data;
    }
    const send_request = async () => {
        const res = await axios.get("http://localhost:5000/api/user", {
            withCredentials: true,
        }).catch(e => console.log(e))
        const data = await res.data;
        return data;
    }
    useEffect(() => {
        if (rendered_once) {
            rendered_once = false;
            send_request().then((data) => setUser(data.user))
        }
        let interval = setInterval(() => {
            refreshing().then(data => setUser(data))
        }, 1000 * 28);
        return () => clearInterval(interval)
    }, [])
    return (
        <div>
            <Headers />
            {user && <h1>{user.name}</h1>}
        </div>
    )
}

export default Home