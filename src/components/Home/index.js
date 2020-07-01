import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

import { makeStyles } from '@material-ui/core/styles';
import { Button } from '../Elements/button';
import { ListOfHoles } from '../ListOfHoles';
import { createGameResult, fetchPlayer, fetchCoursesPerUser } from '../../services';
import { Notification } from '../Notification';
import { Courses } from '../Courses';
import { useCurrentUser } from '../../hooks/userCurrentUser';
import { convertStrokesWHandicapToPoints } from '../Helpers/convertStrokesWHandicapToPoints';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));
const Container = styled.div`
  margin-left: 1em;
`;
const Form = styled.form``;
const HolesFormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Home = ({ history }) => {
  const classes = useStyles();
  const [coursesName, setCoursesName] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [result, setResult] = useState([]);
  const [liveScore, setLiveScore] = useState(0);
  const [currentHole, setCurrentHole] = useState('');
  const [errorCode, setErrorCode] = useState();
  const [openAlert, setOpenAlert] = useState(false);
  const [playerHandicap, setplayerHandicap] = useState();
  const [user, isFetchingUser] = useCurrentUser();
  const currentUserId = user && user.id;

  useEffect(() => {
    !currentUserId && !isFetchingUser && history.push('/login');
  }, [isFetchingUser, history, currentUserId, user]);

  useEffect(() => {
    const getCourses = async () => {
      const courses = await fetchCoursesPerUser(currentUserId); 
      courses && courses.map((course) => {
        setCoursesName(coursesName => [...coursesName, course]);
        return undefined;
      })
    };
    currentUserId && getCourses();
  }, [user, currentUserId])

  useEffect(() => {
    const getPlayerHandicap = async () => {
      setResult([]);
      const data = await fetchPlayer(currentUserId, selectedCourse);
      setplayerHandicap(data);
      setLiveScore(0);
    }
    currentUserId && selectedCourse && getPlayerHandicap();
  },[currentUserId, selectedCourse, user])

  const liveScoreCreator =  useCallback(() => {
    const newArray = result.slice();
    let totalPointsLiveScore = 0;
    newArray.map((score) => {
      const strokesWithHandicap = score.result - playerHandicap[0].result[score.holeNumber - 1].result;
      const pointsPerHole = convertStrokesWHandicapToPoints(strokesWithHandicap, playerHandicap[0].holeHandicap[score.holeNumber - 1].result);
      totalPointsLiveScore = totalPointsLiveScore + pointsPerHole;
      setLiveScore(totalPointsLiveScore);
      return undefined;
    })
  },[result, playerHandicap])

  useEffect(() => {
    result.length && liveScoreCreator()
  },[result, liveScoreCreator])

  const handleCourseChange = (courseName) => {
    setSelectedCourse(courseName);
    setResult([]);
  };

  const clearInputs = () => {
    setResult([]);
    setLiveScore(0);
    setSelectedCourse('');
  };

  const  send = async (event) => {
    event.preventDefault();
    if (playerHandicap && result) {
      try {
        const gameResult = await createGameResult({
          playerHandicap,
          result,
          selectedCourse
        })
        gameResult === 'success'
        ? setOpenAlert(true)
        : console.log('error')
      }
      catch (error){
        errorCode.message = error.message ? error.message: errorCode.message;
        setOpenAlert(true)
        setErrorCode(errorCode);
      }
    } else {
      dataIncomplete();
    }
  };

  const dataIncomplete = () => { 
    if(!result[0]){
      const errorCode = { 
        message:  "Falta introduir algun resultat",
        severity: "error" 
       }
      setErrorCode(errorCode);
      setErrorCode(errorCode); 
    } 
    setOpenAlert(true)
  };

  const handleHoleResult = (holeResult) => { 
    setCurrentHole(holeResult.holeNumber)
    const newArray = result.slice();
    const holesAlreadyIntroduced = newArray.map(a => a.holeNumber);
      if(newArray.length){
      const index = holesAlreadyIntroduced.indexOf(holeResult.holeNumber);
      index === -1
        ? newArray.push(holeResult)
        : newArray.splice(index,1,holeResult)
      }else{
        newArray.push(holeResult);
      }
    const zeroFilter = newArray.filter(a => a.result !== 0);
    setResult(zeroFilter);
  };

  const handleCloseAlert = (event) => {
    setErrorCode();
    clearInputs();
    setSelectedCourse('');
    setOpenAlert(false);
  };

  return (
    <Container>
      <Form className={classes.root} noValidate autoComplete="off"> 
        <Courses handleCourseChange={ handleCourseChange } value={ selectedCourse } courses={ coursesName } />
        <HolesFormContainer>
          <ListOfHoles 
            handleHoleResult={ handleHoleResult } 
            selectedCourse={ selectedCourse } 
            liveScore={ liveScore }
            currentHole={ currentHole }
          />
        </HolesFormContainer>
      </Form>
        <Button type="submit" primary onClick={ send }>Send</Button>
        <Notification
          onClose={ handleCloseAlert }
          message={ errorCode ? errorCode.message : "Perfe!" }
          open={ openAlert }
          severity={errorCode ? errorCode.severity : "success" }
        />
    </Container>
  );
}

