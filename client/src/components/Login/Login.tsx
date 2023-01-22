import { Button, Checkbox, Form, Input } from 'antd';
import Modal from 'antd/es/modal/Modal';
import React, { ReactNode, useEffect, useState } from 'react';

type Props = {
  onOpenLogin: boolean;
  handleOpenLogin: (value: boolean) => void;
};

export default function Login({ handleOpenLogin, onOpenLogin }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    handleOpenLogin(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    handleOpenLogin(false);
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
    handleOpenLogin(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    if (onOpenLogin) {
      showModal();
    } else {
      setIsModalOpen(false);
    }
  }, [onOpenLogin]);
  return (
    <>
      <Modal
        title='Basic Modal'
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          name='basic'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item
            label='Username'
            name='username'
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Password'
            name='password'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name='remember'
            valuePropName='checked'
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type='primary' htmlType='submit'>
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
