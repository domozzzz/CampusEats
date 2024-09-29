import { useEffect } from 'react';
import { useAuth } from '../components/AuthProvider';
import supabase from '../supabase';


export default function ProfilePage() {
    const { auth, signOut} = useAuth();

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const { error } = await signOut();
            console.log(error);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <button onClick={handleLogout}>log out</button>
    );
}