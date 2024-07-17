'use client'

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                console.log(token)
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
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                const newData = data[0]
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
        return <p>Loading...</p>;
    }

    return (
        <main className="w-4/5 mx-auto h-screen flex flex-col items-center justify-center gap-10">
            <h1 className="text-fuchsia-950 font-sans font-bold text-7xl mb-10">MyBank</h1>
            <section className="w-full max-w-md px-6 py-8 bg-white shadow-md rounded-lg">
                <h2 className="text-xl font-bold mb-4">Profile</h2>
                <p><strong>First Name:</strong> {userData.first_name}</p>
                <p><strong>Last Name:</strong> {userData.last_name}</p>
                <p><strong>Username:</strong> {userData.username}</p>
                <p><strong>Email:</strong> {userData.email}</p>
                <p><strong>CPF:</strong> {userData.cpf}</p>
                <p><strong>Amount:</strong> {userData.amount}</p>
                <p><strong>Permissions:</strong> {userData.permissions}</p>
            </section>
        </main>
    );
};

export default Profile;
