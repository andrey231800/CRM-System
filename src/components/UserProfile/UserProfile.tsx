import React, { useEffect, useState } from 'react';
import styles from './style.module.scss';
import { Button, Typography } from 'antd';
import { useGetUserProfileQuery, useLogoutMutation } from '../../store/api/authApi';

const UserProfile: React.FC = () => {

    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
    const [logout, {isLoading}] = useLogoutMutation();
    const {data: userInfo } = useGetUserProfileQuery();

    const {Text} = Typography;

    useEffect(() => {
        console.log(userInfo)
    }, [])

    const handleLogout = async () => {

        setIsButtonDisabled(true);

        try {
            await logout().unwrap()
            
            
        } catch(e) {
           console.log('error loggin out')
        } finally {
            setIsButtonDisabled(false);
        }
        
    }

    return (
        <div className={styles.wrapper}>
            
            <div className={styles.userInfo}>
                <div>
                    <Text>Useraname: </Text>
                    <Text>{userInfo?.username}</Text>
                </div>
                <div>
                    <Text>Email: </Text>
                    <Text>{userInfo?.email}</Text>
                </div>
                <div>
                    <Text>Phone: </Text>
                    <Text>{userInfo?.phoneNumber}</Text>
                </div>
                
            </div>

            {isLoading ? <span>Loading...</span> : null}
            <Button type='primary' onClick={handleLogout} disabled={isButtonDisabled}>Logout</Button>
            
        </div>
    );
};

export default UserProfile;