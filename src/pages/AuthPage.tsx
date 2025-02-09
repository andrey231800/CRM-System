import AuthForm from '../components/Auth/AuthForm/AuthForm';
import AuthImageComponent from '../components/Auth/AuthImageComponent/AuthImageComponent';

import styles from '../styles/auth.module.scss';

const AuthPage = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <AuthImageComponent/>
                <AuthForm/>
            </div>
        </div>
    );
};

export default AuthPage;