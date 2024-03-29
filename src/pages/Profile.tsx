import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Layout, Row, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../axios';
import { renderHeader } from '../utils/LayoutUtils';

const { Text } = Typography;
const Profile = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const dropDownItems = {
    items: [
      {
        key: 1,
        label: (
          <Button
            type={'text'}
            onClick={() => {
              navigate('/dashboard');
            }}
          >
            Dashboard
          </Button>
        ),
      },
      {
        key: 1,
        label: (
          <Button type={'text'} onClick={logout}>
            Logout
          </Button>
        ),
      },
    ],
  };

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    try {
      await api
        .get('/user/courses')
        .then(res => setCourses(res?.data?.courses));
    } catch (e) {
      console.log('Error on getting courses!!!', e);
    }
  };

  const renderCoursesItem = course => {
    let ratingColor = 'green';
    if (course?.rating < 3.5) {
      ratingColor = 'orange';
    }
    if (course?.rating < 2.5) {
      ratingColor = 'red';
    }
    return (
      <Card className={'mb-4'}>
        <Col className={'justify-between'}>
          <Text className={'text-lg font-bold flex'}>{course?.title}</Text>
          <Text style={{ fontSize: 16 }} className={'flex'}>
            {course?.description}
          </Text>
          <Text
            style={{ fontSize: 16 }}
            className={'flex'}
          >{`Instructor: ${course?.instructor}`}</Text>
          <Text className={'flex'} style={{ fontSize: 16 }}>
            Rating:
            <Text
              className={'font-bold'}
              style={{
                color: ratingColor,
                marginLeft: 4,
                fontSize: 16,
              }}
            >
              {course?.rating}
            </Text>
          </Text>
          <a
            style={{ fontSize: 16 }}
            className={'font-bold'}
            target="_blank"
            href={course?.url}
          >
            Go to course
          </a>
        </Col>
      </Card>
    );
  };
  const renderContent = () => {
    return (
      <Row style={{ padding: 24 }} className={'w-full'}>
        <Card title={'User info'} className={'w-full mb-4'}>
          <Row>
            <Col span={24}>
              <Text>Name: Son Nguyen</Text>
            </Col>
            <Col span={24}>
              <Text>Mail: abc@gmail.com</Text>
            </Col>
          </Row>
        </Card>
        <Col className={'w-full'}>
          <Text className={'text-2xl font-bold'}>
            Courses that you have learned
          </Text>
          <Col className={'mt-4'}>
            {courses?.length > 0 ? (
              courses.map(course => renderCoursesItem(course))
            ) : (
              <Col>
                <Col className={'mb-2'}>
                  <Text className={'text-lg'}>
                    Go to dashboard to explore more courses.
                  </Text>
                </Col>
                <Col>
                  <Button
                    className={'bg-white'}
                    onClick={() => {
                      navigate('/dashboard');
                    }}
                  >
                    Go to dashboard
                  </Button>
                </Col>
              </Col>
            )}
          </Col>
        </Col>
      </Row>
    );
  };
  return (
    <Layout>
      <>
        {renderHeader(navigate, logout, true, dropDownItems)}
        {renderContent()}
      </>
    </Layout>
  );
};

export default Profile;
