import { Button, Modal } from 'antd';
import { modalActions } from '../../store/slices/modalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Link, Outlet } from 'react-router';

const AppModal = () => {

    const dispatch = useDispatch();
    const {visible, content, title, buttonType} = useSelector((state: RootState) => state.modal);

    const handleClose = () => {
        dispatch(modalActions.close())
    }

    const handleFooterChoose = (): JSX.Element => {
        if(buttonType === 'registration') {
            return ( <Button key="ok" type="primary" onClick={handleClose}>
                    <Link to='/auth/login'>
                        <span>Back to LogIn</span>
                    </Link> 
                </Button>)
        } 

        return <Button key="ok" type="primary" onClick={handleClose}>ОК</Button>
        
    }

    return (
        <div>
            <Modal
                open={visible}
                title={title}
                onOk={handleClose}
                onCancel={handleClose}
                footer={[
                    handleFooterChoose()
                ]}
            >
                <span>
                    {content}
                </span>
            </Modal>    
            <Outlet/>
        </div>
       
    );
};

export default AppModal;