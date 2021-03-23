import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import { Notification } from '../../components/Notification';
import { Button } from '../../components/Elements/button';
import { checkCode, fetchCoursesPerUser, saveCoursePerRankingCode } from '../../services';
import { Courses } from '../Courses';
import { useCurrentUser } from '../../hooks/userCurrentUser';

const Container = styled.div`
`; 
const CourseForRanking = styled.div`
`; 

const Title = styled.div`
`;

export const NoRankingCode = ({ userProfile, history, newCheckedRanking }) => {
  const [code, setCode] = useState('');
  const [errorCode, setErrorCode] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  const [rankedCourse, setRankedCourse] = useState('');
  const [coursesName, setCoursesName] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [user, isFetchingUser] = useCurrentUser();
  const currentUserId = user && user.id;

  useEffect(() => {
    if (!currentUserId && !isFetchingUser) {
      history.push('/landing');
    };
  }, [isFetchingUser, history, currentUserId, user]);

  useEffect(() => {
    const getCourses = async () => {
      const courses = await fetchCoursesPerUser(currentUserId); 
      courses && courses.map((course) => {
        setCoursesName(coursesName => [...coursesName, course]);
        return undefined;
      });
    };
    currentUserId && getCourses();
  }, [user, currentUserId]);

  useEffect(() => {
    if(rankedCourse){
      newCheckedRanking();
    };
  }, [rankedCourse, newCheckedRanking]);

  const onChangeCode = (event) => {
    setCode(event.currentTarget.value);
  };

  const handleCourseChange = (courseName) => {
    setSelectedCourse(courseName);
  };

  const sendCode = async (event) => {
    event.preventDefault();
    const codeToString = code.toString().toUpperCase();
    if(codeToString && selectedCourse){
      try {
        const validCode = await checkCode(codeToString, userProfile);
        if(validCode.length){
          const newRankedCourse = await saveCoursePerRankingCode(selectedCourse, validCode, userProfile);
          setRankedCourse(newRankedCourse);
        }else{
          const errorCode = { 
            message:  "Código incorrecto",
            severity: "error" 
           }
          setErrorCode(errorCode);
          setOpenAlert(true);
          setCode('');
        }
      }
      catch (error){
        error.message = error.message ? error.message: error;
        setOpenAlert(true)
        setErrorCode(errorCode);
      };
    }else{
      const errorCode = { 
        message:  "Falta un código o campo seleccionado.",
        severity: "error" 
       }
      setErrorCode(errorCode);
      setOpenAlert(true);
      setCode('');
    }
  };

  const handleCloseAlert = () => {
    setErrorCode();
    setOpenAlert(false);
  };

  return(
    <Container>
      <Title>
        ¿Añade un nuevo código?
      </Title>
      <TextField 
        id="outlined-basic" 
        label="Código" 
        variant="outlined" 
        onChange={ onChangeCode }
        value={ code }
      />
      <CourseForRanking>
        Seleccion el campo donde jugaras este ranking:
      </CourseForRanking>
      { coursesName && <Courses handleCourseChange={ handleCourseChange } value={ selectedCourse } courses={ coursesName } /> }
      <Button type="submit" primary onClick={ sendCode }>Enviar</Button>
      <Notification
          onClose={ handleCloseAlert }
          message={ errorCode ? errorCode.message : 'Guardado' }
          open={ openAlert }
          severity={ errorCode ? errorCode.severity : "success" }
      />
      <Notification
        onClose={ handleCloseAlert }
        message={ errorCode ? errorCode.message : 'Guardado' }
        open={ openAlert }
        severity={ errorCode ? errorCode.severity : "success" }
      />
    </Container>
  )
};
