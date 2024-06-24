"use client"
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Crafter } from '@/lib/types';
import { useAuth } from '@clerk/nextjs';
import { ProfileForm } from './ProfileForm';

const ProfileData = () => {
    const [profileData, setProfileData] = useState<Crafter | undefined>();
    const {userId} = useAuth();
    useEffect(() => {
        async function fetchProfile() {
            const response = await axios.get(`/api/crafter/profile?id=${userId}`);
            setProfileData(response.data);
        }
        if(userId){
            fetchProfile();
        } else{
            console.log("sign in");
        }
    }, []);

    return (
        <div className=''>
            {
                profileData &&
                <ProfileForm initialProfileData={profileData} update={true}/>
            }
        </div>
    )
}

export default ProfileData