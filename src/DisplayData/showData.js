import React, { useState, useEffect } from 'react'
import './showData.scss'
// import Axios from 'axios';
function MyComponent() {
    const Axios = require('axios');
    const [page, setPage] = useState([])
    const [TotPage, setTotPage] = useState('')
    const [currPage, setCurrPage] = useState('')
    const [userData, setUserData] = useState([])

    useEffect(() => {
        Axios.get("https://reqres.in/api/users?page=2").then((response) => {
            console.log(response.data, "res")
            let apidata = []
            response.data.data.map((data, index) =>
                apidata.push({
                    id: data.id,
                    email: data.email,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    avatar: data.avatar
                })
            )
            console.log(apidata, "api")
            setUserData(apidata)
            setTotPage(response.data.total_pages)
            setCurrPage(response.data.page)
        })

    }, [])

    useEffect(() => {
        let pages = []
        for (let i = 1; i <= TotPage; ++i) {
            pages.push(i)
        }
        console.log(pages, "pages")
        setPage(pages)
    }, [TotPage])

    const PageCall=(page)=>{
        Axios.get(`https://reqres.in/api/users?page=${page}`).then((response) => {
            console.log(response.data, "res")
            let apidata = []
            response.data.data.map((data, index) =>
                apidata.push({
                    id: data.id,
                    email: data.email,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    avatar: data.avatar
                })
            )
            console.log(apidata, "api")
            setUserData(apidata)
            setTotPage(response.data.total_pages)
            setCurrPage(response.data.page)
        })
    }
    
    return (
        <div>
            <center>
            <div style={{width:"100%",fontSize:"20px",fontWeight:600,textAlign:"center", padding:"5px"}}>Display User Data</div>
            <table className="user_table">
                <th>ID</th>
                <th>Email ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Profile</th>
                {userData.map((data) => {
                    return (
                        <tr>
                            <td>{data.id}</td>
                            <td>{data.email}</td>
                            <td>{data.first_name}</td>
                            <td>{data.last_name}</td>
                            <td><img src={data.avatar}></img></td>
                        </tr>)
                })}
            </table>
            <div className="div_page">
                {page.map((i) => {
                    return (
                        <span className={i == currPage && "active_page"} onClick={()=>PageCall(i)}>{i}</span>)
                })}
            </div>
            </center>
        </div>
    )
}
export default MyComponent;