import AuthLayout from '../components/Auth/AuthLayout/AuthLayout';

import styles from '../styles/auth.module.scss';
import RegistrationForm from '../components/Auth/RegistrationForm/RegistrationForm';

const RegistrationPage = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <AuthLayout/>
                <RegistrationForm/>
            </div>
        </div>
    );
};

export default RegistrationPage;