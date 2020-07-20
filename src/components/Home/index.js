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
  const [emptyResult, setEmptyResult] = useState([]);
  const [liveScore, setLiveScore] = useState(0);
  const [currentHole, setCurrentHole] = useState('');
  const [errorCode, setErrorCode] = useState();
  const [openAlert, setOpenAlert] = useState(false);
  const [playerHandicap, setplayerHandicap] = useState();
  const [user, isFetchingUser] = useCurrentUser();
  const currentUserId = user && user.id;

  useEffect(() => {
    !currentUserId && !isFetchingUser && history.push('/landing');
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
  }, [user, currentUserId]);

  useEffect(() => {
    const getPlayerHandicap = async () => {
      const data = await fetchPlayer(currentUserId, selectedCourse);
      setplayerHandicap(data);
      setLiveScore(0);
    }
    currentUserId && selectedCourse && getPlayerHandicap();
  },[currentUserId, selectedCourse, user]);

  useEffect(() => {
    const emptyResult = [];
    const numberOfHoles = 19;
    for (var holeNumber = 1; holeNumber < numberOfHoles; holeNumber++){
      const result = {
        holeNumber : holeNumber,
        result : 0
      };
      emptyResult.push(result);
    };
    setEmptyResult(emptyResult);
    setResult(emptyResult);
  },[]);

  const liveScoreCreator =  useCallback(() => {
    const newArray = result.slice();
    let totalPointsLiveScore = 0;
    newArray.map((score) => {
      if(score.result > 0){
        const strokesWithHandicap = score.result - playerHandicap[0].result[score.holeNumber - 1].result;
        const pointsPerHole = convertStrokesWHandicapToPoints(strokesWithHandicap, playerHandicap[0].holeHandicap[score.holeNumber - 1].result);
        totalPointsLiveScore = totalPointsLiveScore + pointsPerHole;
        setLiveScore(totalPointsLiveScore);
        return undefined;
      }
      return undefined;
    })
  },[result, playerHandicap])

  useEffect(() => {
    result.length && liveScoreCreator()
  },[result, liveScoreCreator])

  const handleCourseChange = (courseName) => {
    setSelectedCourse(courseName);
    setResult(emptyResult);
  };

  const clearInputs = () => {
    setResult(emptyResult);
    setLiveScore(0);
    setSelectedCourse('');
  };

  const send = async (event) => {
    event.preventDefault();
    if(playerHandicap && result) {
      try {
        const gameResult = await createGameResult({
          user,
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
    } 
    setOpenAlert(true)
  };

  const handleHoleResult = (holeResult) => { 
    setCurrentHole(holeResult.holeNumber)
    const newArray = result.slice();
    newArray.length && newArray.splice(holeResult.holeNumber - 1,1,holeResult)
    setResult(newArray);
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
        <Button type="submit" primary onClick={ send }>Enviar</Button>
        <Notification
          onClose={ handleCloseAlert }
          message={ errorCode ? errorCode.message : "Perfe!" }
          open={ openAlert }
          severity={ errorCode ? errorCode.severity : "success" }
        />
    </Container>
  );
}

