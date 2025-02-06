import { Button, Form, Input, Typography } from 'antd';
import icon from './../../../assets/images/icon.png';
import styles from './style.module.scss';

const {Title} = Typography;
import { Link } from 'react-router';
import { useRegisterMutation } from '../../../store/api/authApi';
import { UserRegistration } from '../../../types/IAuth';
import { useDispatch } from 'react-redux';
import { modalActions } from '../../../store/slices/modalSlice';

type FormData = UserRegistration & {confirm?: string};

const RegistrationForm = () => {

    const [register, {isLoading}] = useRegisterMutation();

    const [form] = Form.useForm();

    const dispatch = useDispatch();
    const handleOpenModal = (title: string, content: string, buttonType?: string) => {
        dispatch(modalActions.open({title, content, buttonType}))
    }

    const onFinish = async (formData: FormData) => {
        delete formData.confirm;

        try {

            await register(formData).unwrap()
            console.log('user registered successfully!');
            handleOpenModal('Success!', 'Now you can login to your account!', 'registration');

        } catch(e) {
            if(e && typeof e === 'object' && 'originalStatus' in e) {
                if(e.originalStatus === 409) {
                    console.log('User already exists')
                    handleOpenModal('Error! User already exists', 'Please try another username');
                }

                if(e.originalStatus === 400) {
                    console.log('Wrong input data')
                    handleOpenModal('Error! Wrong input data', 'Please try to input another');
                }
            }
        } finally {
            form.resetFields();
        }
    }

    return (
        <div className={styles.container}>

            <div className={styles.content}>
                <div className={styles.logo}>
                    <img src={icon} alt="auth icon" />
                </div>

                <div className={styles.top_text}>
                    <Title level={2} className={styles.title}>
                        Create your Account
                    </Title>
                </div>

                <Form
                    className={styles.form}
                    onFinish={onFinish}
                    form={form}
                    labelWrap
                    labelAlign="left"
                    wrapperCol={{ flex: 1 }}
                    colon={false}
                    style={{ maxWidth: "500px"}}
                >

                    <Form.Item
                        name="username"
                        label="User Name"
                        required={false}
                        className={styles.label}
                        wrapperCol={{span: 24}}
                        labelCol={{span: 24}}
                        rules={[
                            {required: true, message: "Please enter your user name!" },
                            {min: 1, message: 'User name must be more than 0 symbols!'},
                            {max: 60, message: 'User name must be less than 60 symbols!'},
                            {pattern: /^[a-zA-ZА-Яа-я]*$/, message: 'Please input login in the correct form!'}
                        ]}
                    >
                        <Input
                            type="username"
                            placeholder='Pupkin'
                            className={styles.input}
                        />
                    </Form.Item>

                    <Form.Item
                        name="login"
                        label="Login"
                        required={false}
                        className={styles.label}
                        wrapperCol={{span: 24}}
                        labelCol={{span: 24}}
                        rules={[
                            { required: true, message: "Please enter your login!", whitespace: true},
                            {min: 2, message: 'Login must be more than 1 symbol!'},
                            {max: 60, message: 'Login must be less than 60 symbols!'},
                            {pattern: /^[a-zA-Z]*$/, message: 'Please input login in the correct form!'}
                        ]}
                    >
                        <Input
                            type="login"
                            placeholder='Pupkin228'
                            className={styles.input}
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        hasFeedback
                        label="Password"
                        required={false}
                        className={styles.label}
                        wrapperCol={{span: 24}}
                        labelCol={{span: 24}}
                        rules={[
                            {required: true, message: "Please enter your password!"},
                            {min: 6, message: 'Minimum symbols for password - 6'},
                            {max: 60, message: 'Maximum symbols for password - 6'},
                         ]}
                    >
                        <Input.Password 
                            type='password' 
                            placeholder='*****************'
                            className={styles.input}
                        />
                    </Form.Item>

                    <Form.Item
                        name="confirm password"
                        label="Confirm Password"
                        required={false}
                        className={styles.label}
                        wrapperCol={{span: 24}}
                        labelCol={{span: 24}}
                        rules={[
                            { required: true, message: "Please confirm your password!" },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                  if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                  }
                                  return Promise.reject(new Error('The new password that you entered do not match!'));
                                },
                            })
                        ]}
                        dependencies={['password']}
                        hasFeedback
                    >
                        <Input.Password 
                            type='password' 
                            placeholder='*****************'
                            className={styles.input}
                        />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: "Please enter your email!"}, { type: 'email', message: "It's not valid email!" }]}
                        label="Email"
                        required={false}
                        className={styles.label}
                        wrapperCol={{span: 24}}
                        labelCol={{span: 24}}
                    >
                        <Input
                            type="email"
                            placeholder='mail@abc.com'
                            className={styles.input}
                        />
                    </Form.Item>

                    <Form.Item
                        name="phoneNumber"
                        label="Phone Number"
                        required={false}
                        className={styles.label}
                        wrapperCol={{span: 24}}
                        labelCol={{span: 24}}
                        rules={[
                            {
                                // type: "number",
                                pattern: /^\+?(?:\d{1,4})?\d{6,14}$/,
                                message: "Phone number must be between 10 to 15 digits.",
                            },
                        ]}
                    >
                        <Input
                            type="phoneNumber"
                            placeholder=''
                            className={styles.input}
                        />
                    </Form.Item>

                    {isLoading ?
                        <span>Loading...</span> :
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                block 
                                className={styles.submit_button}
                                style={{marginTop: "26px", backgroundColor: "#7F265B", padding: "22px", fontFamily: "Nunito Sans", fontSize: "18px", fontWeight: 800}}
                            >
                                Sign Up
                            </Button>
                    </Form.Item>
                    }

                </Form>

                <div
                    className={styles.back}
                >
                    <Link to='/auth/login' style={{textDecoration: 'none', color: "#7F265B", fontFamily: "Nunito Sans", fontSize: "14px"}}>
                        <span>Back to LogIn</span>
                    </Link> 
                </div>

            </div>

        </div>
    );
};

export default RegistrationForm;