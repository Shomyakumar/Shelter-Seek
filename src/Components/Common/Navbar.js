import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from 'react-redux'

import { RxCross1, RxHamburgerMenu } from "react-icons/rx";

export default function Navbar(){

    const {token}=useSelector((state)=>state.auth);
    const {user}=useSelector((state)=>state.profile);
    console.log("user is",user);
    const[active,setActive]=useState(false);

    return(
        <div className="bg-[#f2f0f7] z-0">
            <div className="w-11/12 max-w-[1200px] mx-auto py-4 flex justify-between items-center">
                <Link to="/">
                    <p className="text-2xl font-semibold text-indigo-900 ">Shelter Seek</p>
                </Link>
                <nav className="flex gap-10">
                    <ul className="hidden md:flex items-center gap-10 ">
                        <li className=" border-b-2 border-transparent hover:border-indigo-800"><Link to='/' >Home</Link></li>
                        <li className=" border-b-2 border-transparent hover:border-indigo-800"><Link to='/about' >About</Link></li>
                        <li className=" border-b-2 border-transparent hover:border-indigo-800"><Link to='/rooms' >Find Rooms</Link></li>
                    </ul>
                    <div className="flex items-center gap-10">
                        {
                            token===null&&(
                                <Link to="/login">
                                    <button className=" px-4 py-2 rounded-md border-2 border-indigo-900 font-semibold hover:scale-95 hover:bg-indigo-800
                                     hover:text-white transition-all duration-200 text-indigo-900 hidden md:block">Log in</button>
                                </Link>
                            )
                        }
                        {
                            token===null &&(
                                <Link to="/signup">
                                <button className=" px-4 py-2 rounded-md border-2 border-indigo-900 font-semibold hover:scale-95 hover:bg-indigo-800
                                 hover:text-white transition-all duration-200 text-indigo-900 hidden md:block">Sign up</button>
                                </Link>
                            )
                        }
                        {
                                user!==null &&
                                    <div className=" hidden md:block  ">
                                        <Link to="/profile">

                                        <img className="rounded-full aspect-square w-[50px] object-top object-cover" src={user.image} alt="user-image"></img>
                                       
                                        </Link>
                                            
                                    </div>
                        }
                        {
                            <div className='md:hidden text-indigo-900 text-xl z-20' onClick={()=>setActive(!active)}>
                            {

                                active?(<RxCross1/>):(<RxHamburgerMenu/>)
                            }
                            </div>
                        }
                        {
                            active && (

                            <div className={`  p-4 absolute top-1 right-1 z-10 bg-indigo-200 min-w-[50%] rounded-l-md`}>
                                <ul className="flex flex-col items-start  gap-4 pt-8 ">
                                    <li  onClick={()=>setActive(!active) } className=" border-b-2 border-transparent hover:border-indigo-800 text-lg"><Link to='/' >Home</Link></li>
                                    <li  onClick={()=>setActive(!active) } className=" border-b-2 border-transparent hover:border-indigo-800 text-lg"><Link to='/about' >About</Link></li>
                                    <li  onClick={()=>setActive(!active) } className=" border-b-2 border-transparent hover:border-indigo-800 text-lg"><Link to='/rooms' >Find Rooms</Link></li>
                                </ul>
                                
                                <div className="flex flex-col gap-4 mt-4">

                                    {
                                        token===null&&(
                                            <Link to="/login">
                                                <button  onClick={()=>setActive(!active)}  className=" px-4 py-2 rounded-md border-2 border-indigo-900 font-semibold hover:scale-95 hover:bg-indigo-800
                                                hover:text-white transition-all duration-200 text-indigo-900 ">Log in</button>
                                            </Link>
                                        )
                                    }
                                    {
                                        token===null &&(
                                            <Link to="/signup">
                                            <button  onClick={()=>setActive(!active)}  className=" px-4 py-2 rounded-md border-2 border-indigo-900 font-semibold hover:scale-95 hover:bg-indigo-800
                                            hover:text-white transition-all duration-200 text-indigo-900">Sign up</button>
                                            </Link>
                                        )
                                    }
                                    {
                                        user!==null &&
                                        <div onClick={()=>setActive(!active) } className=" ">
                                            <Link to='/profile'>
                                                <img className="rounded-full max-w-[80px] aspect-square object-cover object-top" src={user.image} alt="user-image"></img>

                                            </Link>
                                            
                                        </div>
                                    }
                                </div>
                            </div>
                            )
                        }
                        
                    </div>
                </nav>
            </div>
        </div>
    )
}