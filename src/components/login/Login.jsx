import React, { useState } from 'react'
import './Login.css'
import {auth, db} from '../../lib/firebase.js'
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import upload from '../../lib/upload.js';


const Login = () => {
    const [avatar, setAvatar] = useState({
        file: null,
        url: ""
    });

    const [loading, SetLoading] = useState(false);

    const handleAvatar = e =>{
        if(e.target.files[0]){
            setAvatar({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            });
        }
    };

    const handleLogin = async (e) =>{
        e.preventDefault();
        SetLoading(true)
        const formData = new FormData(e.target);
        const {email, password} = Object.fromEntries(formData);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("You are Logged in")
            toast.success("Login Successful")
        } catch (error) {
            console.log(error)
            toast.error(error)
        } finally{
            SetLoading(false)
        }
    };

    const handleRegister = async (e) =>{
        e.preventDefault();
        SetLoading(true)
        const formData = new FormData(e.target);
        const {username, email, password} = Object.fromEntries(formData);

        try {
            const res = await createUserWithEmailAndPassword(auth,email,password);
            const imgUrl = await upload(avatar.file) 
            await setDoc(doc(db, 'users', res.user.uid), {
                username,
                email,
                avatar: imgUrl,
                id: res.user.uid,
                blocked: [],
            });            
            await setDoc(doc(db, 'userchats', res.user.uid), {
                chats: [],
            });
            toast.success("Account Created. You can Login now!");
            console.log(email, password)
        } catch (error) {
            toast.error(error)
            console.log('Error Guy ',error)
        } finally{
            SetLoading(false)
        }
    };


  return (
    <div className='login'>
        <div className="item">
            <h2>Welcome Back!</h2>
            <form onSubmit={handleLogin} action="">
                <input type="text" placeholder='Email' name='email'/>
                <input type="password" placeholder='Password' name='password'/>
                <button disabled={loading}>{loading? "loading": "Sign In"}</button>
            </form>
        </div>

        <div className="separator"></div>

        <div className="item">
            <h2>Create an Account</h2>
            <form onSubmit={handleRegister}>
                <label htmlFor="file">
                    <img src={avatar.url || "./avatar.png"} alt="" />
                    Upload Image
                </label>
                <input type="file" id='file' onChange={handleAvatar} style={{display:'none'}}/>
                <input type="text" placeholder='Username' name='username'/>
                <input type="text" placeholder='Email' name='email'/>
                <input type="password" placeholder='Password' name='password'/>
                <button disabled={loading}>{loading? "loading": "Sign Up"}</button>
            </form></div>
    </div>
  )
}

export default Login