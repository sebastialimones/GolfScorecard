 import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import { Courses } from '../Courses';
import { fetchResults, fetchPlayer, fetchCoursesPerUser } from '../../services/index';
import { ListOfResults } from '../ListOfResults';
import { ResultsTable } from '../ResultsTable';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { useCurrentUser } from '../../hooks/userCurrentUser';

const Container = styled.div` `;

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    '& .MuiSelect-outlined': {
      minWidth: '170px',
    },
  },
  input: {
    '& .MuiOutlinedInput': {
      marginBottom: '10px',
    }
  },
}));
const MenuContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const DataContainer = styled.div`
  margin: 1em;
`;

const SwitchContainer = styled.div``;

const IOSSwitch = withStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(16px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: '#52d869',
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: '#52d869',
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 24,
    height: 22.3,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${ theme.palette.grey[400] }`,
    backgroundColor: theme.palette.secondary.light,
    opacity: 1,
    height: '95%',
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

export const Dashboard = ({ history }) => {
  const classes = useStyles();
  const [coursesName, setCoursesName] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [gamesResults, setGamesResults] = useState();
  const [playerHandicap, setplayerHandicap] = useState();
  const [modal, setModal] = useState(true);
  const [year, setYear] = useState ('');
  const [switchState, setSwitchState] = useState({
    checkedA: true,
  });
  const [user, isFetchingUser] = useCurrentUser();
  const currentUserId = user && user.id;
  const years = [ 
    {
      value: undefined,
      label: `All`,
    },
    {
      value: 2020,
      label: 2020,
    },
    {
      value: 2021,
      label: 2021,
    }
  ];

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
      })
      const lastSelectedCourse = localStorage.getItem('selectedCourse');
      setSelectedCourse(lastSelectedCourse);
    };
    currentUserId && getCourses();
  }, [user, currentUserId])

  useEffect(() => {
    const getPlayerHandicap = async () => {
      const data = await fetchPlayer(currentUserId, selectedCourse);
      setplayerHandicap(data);
    };
    currentUserId && selectedCourse && getPlayerHandicap();
  },[currentUserId, selectedCourse, user])

  useEffect(() => {
    const getResult = async () => {
      const data = await fetchResults(playerHandicap, selectedCourse, year);
      if(data){
        setGamesResults(data);
      };
    };
    playerHandicap && selectedCourse && getResult()  
  },[playerHandicap, selectedCourse, switchState, modal, year]);

  const handleSwitchChange = (event) => {
    setSwitchState({ ...switchState, [event.target.name]: event.target.checked });
    };

  const handleCourseChange = (courseName) => {
    setGamesResults([]);
    setSelectedCourse(courseName);
    localStorage.setItem('selectedCourse', courseName);
  };

  const handleYearChange = (event) => {
    setGamesResults([]);
    setYear(event.currentTarget.value)
  };

  const refreshResults = () => {
    setModal(!modal);
  };

  return(
    <Container>
      <MenuContainer>
        { coursesName && <Courses handleCourseChange={ handleCourseChange } value={ selectedCourse } courses={ coursesName } /> }
        <SwitchContainer>
          <FormControlLabel
            control={<IOSSwitch checked={ switchState.checkedA } onChange={ handleSwitchChange } name="checkedA" />}
            label=""
          />
        </SwitchContainer>
        <TextField
        className={ classes.root }
        id="Año"
        select
        label={ `Año`}
        onChange={ handleYearChange }
        SelectProps={{
          native: true,
        }}
        variant="outlined"
        value={ year }
        >
        { 
          years.map((option) => (
          <option key={ option.value } value={ option.value }>
            { option.value }
          </option>
        )) 
        }

        </TextField>
      </MenuContainer>
      <DataContainer>
        {
          playerHandicap && gamesResults && switchState.checkedA &&
          <ListOfResults year={ year } results={ gamesResults } playerHandicap={ playerHandicap } refreshResults={ refreshResults } />
        }
        {
          playerHandicap && gamesResults && !switchState.checkedA &&
          <ResultsTable results={ gamesResults } playerHandicap={ playerHandicap }/>
        }
      </DataContainer>
    </Container>
  )
};

