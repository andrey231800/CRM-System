import styles from '../styles/auth.module.scss';
import RegistrationForm from '../components/Auth/RegistrationForm/RegistrationForm';
import AuthImageComponent from '../components/Auth/AuthImageComponent/AuthImageComponent';

const RegistrationPage = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <AuthImageComponent/>
                <RegistrationForm/>
            </div>
        </div>
    );
};

export default RegistrationPage;