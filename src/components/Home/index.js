import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '../Elements/button';
import { ListOfHoles } from '../ListOfHoles';
import { createGameResult, fetchPlayer, fetchCoursesPerUser, fetchUserProfile } from '../../services';
import { Notification } from '../Notification';
import { Courses } from '../Courses';
import { useCurrentUser } from '../../hooks/userCurrentUser';
import { convertStrokesWHandicapToPoints } from '../Helpers/convertStrokesWHandicapToPoints';
import { createdGameMessages } from './helpers';
import { ConfettiComponent } from '../Confetti';

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
  const [userProfile, setUserProfile] = useState('');
  const [holesPlayed, setHolesPlayed] = useState(0);
  const currentUserId = user && user.id;
  const [confetti, setConfetti] = useState('');
  const [holeInOne, setHoleInOne] = useState('');

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
      const lastSelectedCourse = localStorage.getItem('selectedCourse');
      setSelectedCourse(lastSelectedCourse);
    };
    currentUserId && getCourses();
  }, [user, currentUserId]);

  useEffect(() => {
    const getPlayerHandicap = async () => {
      const data = await fetchPlayer(currentUserId, selectedCourse);
      setplayerHandicap(data);
      setLiveScore(0);
    };
    currentUserId && selectedCourse && getPlayerHandicap();
  },[currentUserId, selectedCourse, user]);

  useEffect(() => {
    const getUserRankingCodes = async () => {
      const userRankings = await fetchUserProfile(currentUserId);
      setUserProfile(userRankings);
    };
    currentUserId && getUserRankingCodes();
  },[currentUserId, user]);

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
    let numberOfHoles = 0;
    newArray.map((score) => {
      if(score.result > 0 || score.result === 'mosca'){
        const strokesWithHandicap = score.result - playerHandicap[0].result[score.holeNumber - 1].result;
        const pointsPerHole = convertStrokesWHandicapToPoints(strokesWithHandicap, playerHandicap[0].holeHandicap[score.holeNumber - 1].result);
        totalPointsLiveScore = totalPointsLiveScore + pointsPerHole;
        setLiveScore(totalPointsLiveScore);
        numberOfHoles = numberOfHoles + 1;
        setHolesPlayed(numberOfHoles);
        return undefined;
      }
      return undefined;
    });
  },[result, playerHandicap])

  useEffect(() => {
    result.length && liveScoreCreator()
  },[result, liveScoreCreator])

  const handleCourseChange = (courseName) => {
    setSelectedCourse(courseName);
    localStorage.setItem('selectedCourse', courseName);
    setResult(emptyResult);
  };

  const clearInputs = () => {
    setResult(emptyResult);
    setLiveScore(0);
    setSelectedCourse('');
    setHoleInOne('');
    setConfetti('');
  };

  const checkForBlankResults = (result) => {
    const blankResults = result.filter((score)=> 
      score.result !== 0
    );
    return blankResults
  };

  const numberOfHolesPlayed = (result) => {
    if(result){
      let numberOfHoles = 0;
      result.map((hole) => {
        if(hole.result !== 0){
          numberOfHoles = numberOfHoles + 1;
        };
        return numberOfHoles;
      });
      return numberOfHoles;
    };
  };

  const checkMultiplier = () => {
    return 1;
  };

  const rankingGameVerifier = () => {
    let rankingIdVerified = [];
    userProfile.rankingsIds.length && playerHandicap[0].rankingsIds &&
    userProfile.rankingsIds.map((rankingId) => {
      playerHandicap[0].rankingsIds.map((courseRanking) => {
        if(courseRanking.status === 'active' && courseRanking.id === rankingId.id){
          rankingIdVerified.push(rankingId);
          return rankingIdVerified
        };
        return rankingIdVerified;
      })
      return rankingIdVerified;
    });
    return rankingIdVerified;
  };

  const send = async (event) => {
    event.preventDefault();
    const rankingGameIds = rankingGameVerifier();
    const checkBlankResults = checkForBlankResults(result);
    const numberOfHoles = numberOfHolesPlayed(result);
    const multiplier = checkMultiplier();
    try {
      if(playerHandicap && userProfile && result && selectedCourse && checkBlankResults.length && liveScore && numberOfHoles && multiplier ){
        const gameResult = await createGameResult({
          user,
          userProfile,
          playerHandicap,
          result,
          selectedCourse,
          liveScore,
          numberOfHoles,
          multiplier,
          rankingGameIds,
        });
        holeInOneTracker();
        confettiTracker();
        setOpenAlert(true);
        return gameResult;
      } else {
        dataIncomplete();
      };
    } catch (error){
        error.message = error.message ? error.message : errorCode.message;
        setOpenAlert(true);
        setErrorCode(errorCode);
    }
  };

  const dataIncomplete = () => { 
    const errorCode = { 
      message:  "Falta introduir algun resultat",
      severity: "error" 
      }
    setErrorCode(errorCode);
    setOpenAlert(true)
  };

  const handleHoleResult = (holeResult) => { 
    setCurrentHole(holeResult.holeNumber)
    const newArray = result.slice();
    newArray.length && newArray.splice(holeResult.holeNumber - 1,1,holeResult)
    setResult(newArray);
  };

  const handleCloseAlert = () => {
    setErrorCode();
    clearInputs();
    setOpenAlert(false);
  };

  const holeInOneTracker = () => {
    playerHandicap[0].holeHandicap.map((hole) => {
      if(hole.result === 3 && result[hole.holeNumber - 1].result === 1){
        setHoleInOne(true);
        setConfetti(true);
      };
      return undefined;
    });
  };

  const confettiTracker = () => {
    if(liveScore / holesPlayed >= 2){
      setConfetti(true)
    };
  };

  const successMessage = () => {
    if(openAlert && !errorCode){
      window.scrollTo({top: 0, behavior: 'smooth'});
      const successNumber = liveScore / holesPlayed;
      const messageRating = (successNumber.toFixed(2) * 15) / 1.55555;
      if(holeInOne){
        return createdGameMessages[222].message
      };
      if(messageRating > 25){
        const successMessage = createdGameMessages[25].message;
        return successMessage;
      };
      const successMessage = createdGameMessages[Math.floor(messageRating)].message;
      return successMessage;
    };
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
          message={ errorCode ? errorCode.message : successMessage() }
          open={ openAlert }
          severity={ errorCode ? errorCode.severity : "success" }
        />
        { confetti && <ConfettiComponent />}
    </Container>
  );
};
