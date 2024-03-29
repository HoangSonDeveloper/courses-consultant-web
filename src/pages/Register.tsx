import React, { FC, useEffect } from 'react';
import {
  Button,
  Col,
  Form,
  Input,
  Layout,
  message,
  Row,
  Typography,
} from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';

const { Content } = Layout;
const { Text } = Typography;
const Register: FC<any> = ({ history }) => {
  const [form] = Form.useForm();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [isAuthenticated]);

  const onSignUp = async (values: any) => {
    const { email, password } = values;
    try {
      await axios
        .post('/register', { username: email, password })
        .then(value => {
          navigate('/profile');
        });
    } catch (e) {
      console.log(e);
      messageApi.error(e?.message);
    }
  };

  return (
    <Layout>
      {contextHolder}
      <Content
        style={{ height: '100vh' }}
        className={'justify-center items-center flex flex-col px-4'}
      >
        <Text
          style={{ color: '#2B4365' }}
          className={'text-3xl font-bold mb-6'}
        >
          CourseConsult
        </Text>
        <Form
          className={
            'bg-white px-8 py-4 pt-8 rounded-2xl w-full xl:w-1/4 lg:w-1/3 sm:w-2/3'
          }
          onFinish={onSignUp}
          form={form}
        >
          <Form.Item
            rules={[{ required: true, message: 'Email is required' }]}
            name={'email'}
          >
            <Col>
              <Row>
                <MailOutlined
                  style={{ color: '#2C4466' }}
                  className={'text-lg mr-2 font-medium'}
                />
                <Text
                  style={{ color: '#2C4466' }}
                  className={'text-lg font-medium'}
                >
                  Email address
                </Text>
              </Row>
              <Input className={'w-full mt-2 h-16'} />
            </Col>
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                min: 6,
                message: 'Password must be at least 6 characters long!',
              },
            ]}
            name={'password'}
          >
            <Col>
              <Row>
                <LockOutlined
                  style={{ color: '#2C4466' }}
                  className={'text-lg mr-2 font-medium'}
                />
                <Text
                  style={{ color: '#2C4466' }}
                  className={'text-lg font-medium'}
                >
                  Password
                </Text>
              </Row>
              <Input.Password className={'w-full mt-2 h-16'} />
            </Col>
          </Form.Item>
          <Form.Item
            dependencies={['password']}
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      'The two passwords that you entered do not match!',
                    ),
                  );
                },
              }),
            ]}
            name={'confirmedPassword'}
          >
            <Col>
              <Row>
                <LockOutlined
                  style={{ color: '#2C4466' }}
                  className={'text-lg mr-2 font-medium'}
                />

                <Text
                  style={{ color: '#2C4466' }}
                  className={'text-lg font-medium'}
                >
                  Re-enter password
                </Text>
              </Row>
              <Input.Password className={'w-full mt-2 h-16'} />
            </Col>
          </Form.Item>
          <Form.Item>
            <Row className={'justify-between w-full'}>
              <Button
                onClick={() => {
                  navigate('/');
                }}
                style={{ color: '#438ED2' }}
                className={'p-0 text-lg mb-2'}
                type={'text'}
              >
                Already have an account?
              </Button>
              <Button
                style={{ background: '#2B4365', width: '40%' }}
                htmlType={'submit'}
                type={'primary'}
                size={'large'}
              >
                Sign up
              </Button>
            </Row>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};

export default Register;
