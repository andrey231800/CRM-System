import { Button, Checkbox, ConfigProvider, Form, Input, Typography } from 'antd';
import { Link } from 'react-router';
import icon from './../../../assets/images/icon.png';
import styles from './style.module.scss';
import React from 'react';
import { AuthData } from '../../../types/IAuth';
import { useLoginMutation } from '../../../store/api/authApi';
import { useDispatch } from 'react-redux';
import { modalActions } from '../../../store/slices/modalSlice';

const {Text, Title} = Typography;

const AuthForm: React.FC = () => {

    const [form] = Form.useForm();
    const dispatch = useDispatch();


    const [login, {isLoading}] = useLoginMutation();

    const handleOpenModal = () => {
        dispatch(modalActions.open({content: "Please try again", title: "Wrong Login or Password"}))
    }

    const onFinish = async (formData: AuthData) => {
        try {

            // const res = await login({login: 'vkndnmtoi', password: 'asfre4fs'});

            await login(formData).unwrap()
                

        } catch(e) {
            console.log(e)

            handleOpenModal();

            // setIsError(true);
            // setTimeout(() => setIsError(false), 2000);
            
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
                        Login to your Account
                    </Title>
                    <Text strong className={styles.subtitle}>
                        See what is going on with your business
                    </Text>
                </div>

                <Form
                    className={styles.form}
                    onFinish={onFinish}
                    form={form}
                    style={{ maxWidth: "500px"}}
                >

                    <Form.Item
                        name="login"
                        label="Password"
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
                        label="Password"
                        required={false}
                        className={styles.label}
                        wrapperCol={{span: 24}}
                        labelCol={{span: 24}}
                        rules={[
                            { required: true, message: "Please enter your password!" },
                            {min: 6, message: 'Minimum symbols for password - 6'},
                            {max: 60, message: 'Maximum symbols for password - 6'},
                        ]}
                        hasFeedback
                    >
                        <Input.Password 
                            type='password' 
                            placeholder='*****************'
                            className={styles.input}
                        />
                    </Form.Item>


                    <Form.Item
                        
                    >
                        <div className={styles.options}>
                            <ConfigProvider theme={{token: {colorPrimary: "#7F265B"}}}>
                                <Checkbox
                                    style={{color: "#A1A1A1", fontFamily: "Nunito Sans", fontSize: "12px", textAlign: "center", display: 'flex', alignItems: "center"}}
                                    name="remember"
                                    className={styles.checkbox}
                                >
                                    Remember Me
                                </Checkbox>
                            </ConfigProvider>
                            
                            <a
                                href="#" 
                                className={styles.forgot}
                                style={{color: "#7F265B", fontFamily: "Nunito Sans", fontSize: "12px"}}
                            >
                                Forgot Password?
                            </a>
                            
                        </div>
                    </Form.Item>

                    {isLoading ? 
                        <div>Loading...</div> :
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                block 
                                className={styles.submit_button}
                                style={{marginTop: "0px", backgroundColor: "#7F265B", padding: "22px", fontFamily: "Nunito Sans", fontSize: "18px", fontWeight: 800}}
                            >
                                Login
                            </Button>
                        </Form.Item>
                    }

                    
                </Form>

                {/* {isError ? <span style={{textAlign: 'center', color: 'red'}}>Error Signing In</span> : null} */}

                <div
                    className={styles.register}
                >
                    <Text style={{color: "#828282"}}>Not Registered Yet? </Text>
                    <Link style={{color: "#7F265B", textDecoration: 'none', fontFamily: "Nunito Sans", fontSize: "15px"}} replace to='/auth/registration'>
                        <span>Create an account</span>
                    </Link>
                </div>

            </div>

        </div>
    );
};

export default AuthForm;