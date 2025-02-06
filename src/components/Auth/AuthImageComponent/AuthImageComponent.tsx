import illustration from '../../../assets/images/illustration.png'
import styles from './style.module.scss';

const AuthImageComponent = () => {
    return (
        <div className={styles.wrapper}>
            <img src={illustration} alt="skeleton image" className={styles.image}/>
        </div>
    );
};

export default AuthImageComponent;