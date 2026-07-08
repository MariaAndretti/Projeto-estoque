import { useEffect, useState } from "react";
import api from "../services/api";

function User() {

 const [users, setUsers] = useState([]);
 const [name, setName] = useState("");
 const [email, setEmail] = useState("");
 const [passwd, setPasswd] = useState("");


async function registerUsers() {

 const response = await api.get("/user");
setUsers(response.data);

}}