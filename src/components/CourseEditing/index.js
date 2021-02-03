import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Courses } from '../Courses';
import { fetchPlayer, fetchCoursesPerUser, deleteCourse } from '../../services/index';
import { EditCoursesTable } from '../EditCoursesTable';
import { useCurrentUser } from '../../hooks/userCurrentUser';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { Notification } from '../Notification';

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
  const [userCoursesWithId, setUserCoursesWithId] = useState('');
  const [playerHandicap, setplayerHandicap] = useState();
  const [openAlert, setOpenAlert] = useState(false);
  const [errorCode, setErrorCode] = useState();
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
      setUserCoursesWithId(courses);
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

  const deleteClick = async () => {
    const courseObjectWithId = userCoursesWithId.find(couseName => couseName.value === selectedCourse);
    try {
      await deleteCourse(courseObjectWithId.id);
      setUserCoursesWithId('');
      setSelectedCourse('');
      setCoursesName([]);
      setOpenAlert(true);
    }
    catch (error){
      errorCode.message = error.message ? error.message : errorCode.message;
      setOpenAlert(true)
      setErrorCode(errorCode);
    }
  };

  const deleteConfirmation = () => {
    const confirmation = window.confirm('¿Estás seguro que quieres borrar este campo?');
    if(confirmation === true){
      deleteClick();
    };
  };

  const handleCloseAlert = () => {
    setErrorCode();
    setOpenAlert(false);
  };

  return(
    <Container>
      <MenuContainer>
        { coursesName && <Courses handleCourseChange={ handleCourseChange } value={ selectedCourse } courses={ coursesName } /> }
        <IconButton
        aria-label="more"
        aria-controls="fade-menu"
        aria-haspopup="true"
        onClick={ deleteConfirmation }
        color='secondary'
        >
        <DeleteIcon/>
      </IconButton>
      </MenuContainer>
      <DataContainer>
        {
          playerHandicap && 
          <EditCoursesTable playerHandicap={ playerHandicap } selectedCourse={ selectedCourse } />
        }
      </DataContainer>
      <Notification
      onClose={ handleCloseAlert }
      message={ errorCode ? errorCode.message : "Campo borrado" }
      open={ openAlert }
      severity={ errorCode ? errorCode.severity : "success" }
      />
    </Container>
  )
};
