'use client'

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PiUser } from "react-icons/pi";
import { CiUser } from "react-icons/ci";
import { IoEyeOffOutline } from "react-icons/io5";
import { VscEye } from "react-icons/vsc";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { LuMailPlus } from "react-icons/lu";
import { HiOutlineLogout } from "react-icons/hi";
import { TbEyeClosed } from "react-icons/tb";

import Loading from '../../Components/Loading/index.jsx'

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const router = useRouter();

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const token = getCookie('access_token');

            if (!token) {
                setError('No token found');
                return router.push('/');
            }

            try {
                const response = await fetch('http://127.0.0.1:8000/api/v1/users/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    return router.push('/');
                }

                const data = await response.json();
                const newData = data[0];
                setUserData(newData);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchUserData();
    }, []);

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!userData) {
        return <Loading />;
    }

    return (
        <main className="w-full bg-slate-50">
            <section className='w-full bg-fuchsia-800 flex flex-col'>
                <div className='w-full p-5 flex justify-between items-center'>
                    <div className='w-20 h-20 bg-fuchsia-950 rounded-full flex items-center justify-center'>
                        <CiUser color='#ffffff' size={50}/>
                    </div>
                    <ul className='flex gap-7 items-center'>
                        <li><VscEye color='#ffffff' size={35} /></li>
                        <li><AiOutlineQuestionCircle  color='#ffffff' size={30} /></li>
                        <li><HiOutlineLogout color='#ffffff' size={30} /></li>
                    </ul>
                </div>

                <div className='w-full px-5 pb-5'>
                    <h1 className='text-3xl text-slate-50 font-semibold'>Olá, {userData.first_name} {userData.last_name}</h1>
                </div>
            </section>

            <section className="w-full bg-slate-50 border-b">
                <div className='p-5 flex flex-col gap-2'>
                    <h1 className='text-2xl font-semibold'>Conta</h1>
                    <h1 className='text-3xl font-bold'>R$ {userData.amount}</h1>
                </div>

            </section>


        </main>
    );
};

export default Profile;