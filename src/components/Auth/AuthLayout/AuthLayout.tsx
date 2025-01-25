import illustration from '../../../assets/images/illustration.png'
import styles from './style.module.scss';

const AuthLayout = () => {
    return (
        <div className={styles.wrapper}>
            <img src={illustration} alt="skeleton image" className={styles.image}/>
        </div>
    );
};

export default AuthLayout;