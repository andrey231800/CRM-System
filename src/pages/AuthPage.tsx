import AuthForm from '../components/Auth/AuthForm/AuthForm';
import AuthLayout from '../components/Auth/AuthLayout/AuthLayout';

import styles from '../styles/auth.module.scss';

const AuthPage = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <AuthLayout/>
                <AuthForm/>
            </div>
        </div>
    );
};

export default AuthPage;