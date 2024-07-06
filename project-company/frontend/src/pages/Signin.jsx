import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const Signin = () => {
    const[username,setUsername] = useState("");
    const[password,setPassword] = useState("");
    const navigate = useNavigate()

    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />

        <InputBox onChange={e=>{
            setUsername(e.target.value)
        }} placeholder="harkirat@gmail.com" label={"Email"} />

        <InputBox onChange={e=>{
        setPassword(e.target.value)
        }} placeholder="123456" label={"Password"} />


        <div className="pt-4">
          <Button label={"Sign in"}  onClick={ async()=>{
            try {
                const res = await axios.post("http://localhost:3000/api/v1/users/signin", {
                    username,
                    password
                });
            
                // Assuming a successful response has a status of 200
                if (res.status === 200 && res.data.token) {
                    localStorage.setItem('token', res.data.token);
                    navigate('/dashboard');
                } else {
                    // Handle the case where the credentials are incorrect
                    console.error("Invalid credentials");
                    // Optionally, show an error message to the user
                }
            } catch (error) {
                console.error("Error during sign-in:", error);
                // Optionally handle the error, e.g., show a message to the user
            }
          }}/>
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
}