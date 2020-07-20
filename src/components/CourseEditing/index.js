import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Courses } from '../Courses';
import { fetchPlayer, fetchCoursesPerUser } from '../../services/index';
import { EditCoursesTable } from '../EditCoursesTable';
import { useCurrentUser } from '../../hooks/userCurrentUser';

const Container = styled.div` `;

const MenuContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const DataContainer = styled.div`
  margin: 1em;
`;

export const CourseEditing = ({ history }) => {
  const [coursesName, setCoursesName] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [playerHandicap, setplayerHandicap] = useState();
  const [user, isFetchingUser] = useCurrentUser();
  const currentUserId = user && user.id;

  useEffect(() => {
    if (!currentUserId && !isFetchingUser) {
      history.push('/landing');
    }
  }, [isFetchingUser, history, currentUserId, user]);

  useEffect(() => {
    const getCourses = async () => {
      const courses = await fetchCoursesPerUser(currentUserId); 
      courses && courses.map((course) => {
        setCoursesName(coursesName => [...coursesName, course]);
        return undefined;
      });
      const lastSelectedCourse = localStorage.getItem('selectedCourse');
      setSelectedCourse(lastSelectedCourse);
    };
    currentUserId && getCourses();
  }, [user, currentUserId])

  useEffect(() => {
    const getPlayerHandicap = async () => {
      const data = await fetchPlayer(currentUserId, selectedCourse);
      setplayerHandicap(data);
    }
    currentUserId && selectedCourse && getPlayerHandicap();
  },[currentUserId, selectedCourse])

  const handleCourseChange = (courseName) => {
    setSelectedCourse(courseName);
    localStorage.setItem('selectedCourse', courseName);
  };

  return(
    <Container>
      <MenuContainer>
        { coursesName && <Courses handleCourseChange={ handleCourseChange } value={ selectedCourse } courses={ coursesName } /> }
      </MenuContainer>
      <DataContainer>
        {
          playerHandicap && 
          <EditCoursesTable playerHandicap={ playerHandicap } selectedCourse={ selectedCourse } />
        }
      </DataContainer>
    </Container>
  )
};
