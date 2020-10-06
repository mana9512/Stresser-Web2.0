import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { savescore } from "../../actions/das";
import PropTypes from "prop-types";

const tutorialSteps = [
    ["I found it hard to wind down.", "s", 0],
    ["I was aware of dryness of my mouth", "a", 0],
    ["I couldn’t seem to experience any positive feeling at all", "d", 0],
    // ["I experienced breathing difficulty (e.g. excessively rapid breathing,breathlessness in the absence of physical exertion)", "a", undefined],
    // ["I found it difficult to work up the initiative to do things", "d", undefined],
    // ["I tended to over-react to situations", "s", undefined],
    // ["I experienced trembling (e.g. in the hands)", "a", undefined],
    // ["I felt that I was using a lot of nervous energy", "s", undefined],
    // ["I was worried about situations in which I might panic and make a fool of myself", "a", undefined],
    // ["I felt that I had nothing to look forward to", "d", undefined],
    // ["I found myself getting agitated", "s", undefined],
    // ["I found it difficult to relax", "s", undefined],
    // ["I felt down-hearted and blue", "d", undefined],
    // ["I was intolerant of anything that kept me from getting on with what I was doing", "s", undefined],
    // ["I felt I was close to panic", "d", undefined],
    // ["I was unable to become enthusiastic about anything", "d", , undefined],
    // ["I felt I wasn’t worth much as a person", "d", undefined],
    // ["I felt that I was rather touchy ", "s", undefined],
    // ["I was aware of the action of my heart in the absence of physical exertion (e.g. sense of heart rate increase, heart missing a beat)", "a", undefined],
    // ["I felt scared without any good reason", "a", undefined],
    // ["I felt that life was meaningless", "d", undefined]
];

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 400,
        flexGrow: 1,
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        height: 50,
        paddingLeft: theme.spacing(4),
        backgroundColor: theme.palette.background.default,
    },
    img: {
        height: 255,
        maxWidth: 400,
        overflow: 'hidden',
        display: 'block',
        width: '100%',
    },
}));

const Question=({savescore,isAuthenticated,user})=>  {
    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = tutorialSteps.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const userScores = {
        d: 0,
        a: 0,
        s: 0,
    }

    const onChange = (index, value, e) => {
        userScores[tutorialSteps[index][1]] += value - tutorialSteps[index][2];
        tutorialSteps[index][2] = value;
    }

    const Submit = () => {
        savescore(user['id'],userScores['d'],userScores['a'],userScores['s']);
        <Redirect to="/scoredisplay" />;
        

    };

    return (
        <Fragment>
            <div className="landingBox">
                <div className="landingHeading">Free Stress Test</div><br />
                <div className="landingText">
                    Take our Stress Test and get the level of your stress<br />and find out the solutions
                </div><br />
                <div className="test-intro row" style={{ width: "80%", margin: "auto" }}>
                    <div className="col-xl-4 col-lg-4 col-md-1 col-sm-1">
                        <div className="test-intro-block" style={{ borderBottom: "15px solid rgba(227,55,56,1)" }}>
                            <img src={"/static/frontend/img/clock.png"} />
                            <h2>Depression</h2>
                            <h4>Take less than 12 minutes</h4>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-1 col-sm-1">
                        <div className="test-intro-block" style={{ borderBottom: "15px solid rgba(245,131,32,1)" }}>
                            <img src={"/static/frontend/img/clock.png/"} />
                            <h2>Anxiety</h2>
                            <h4>Take less than 12 minutes</h4>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-1 col-sm-1">
                        <div className="test-intro-block" style={{ borderBottom: "15px solid rgba(253,184,19,1)" }}>
                            <img src={"/static/frontend/img/clock.png"} />
                            <h2>Stress</h2>
                            <h4>Take less than 12 minutes</h4>
                        </div>
                    </div>
                </div>

                <svg className="unevenShape" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 319">
                    <path fill="#fff" fillOpacity="1" d="M0,256L48,229.3C96,203,192,149,288,144C384,139,480,181,576,213.3C672,245,768,267,864,256C960,245,1056,203,1152,186.7C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
            </div>

            <br/>
                <br/>
                <br/>
            <div className={classes.root}>
                <Paper square elevation={0} className={classes.header}>
                    <div className="quesBlock" style={{ width: "100%", marginLeft: "450px"}}>
                        <div className="row" style={{ width: "900px", margin: "auto", marginLeft: "250px", marginBottom: "20px"}}>
                                <div key={activeStep}>
                                    <div className="col-12"><h2>Question {activeStep + 1} . {tutorialSteps[activeStep][0]}</h2></div><br />
                                    <div className="col-7">
                                        <input type="radio" name={"option" + activeStep} id={activeStep + "_0"} checked={tutorialSteps[activeStep][2] == 0} onChange={(e) => onChange(activeStep, 0, e)} />
                                        <label htmlFor={activeStep + "_0"}>NEVER</label>
                                        <div className="check"></div>
                                    </div>
                                    <br />
                                    <br />
                                    <div className="col-7">
                                        <input type="radio" name={"option" + activeStep} id={activeStep + "_1"} checked={tutorialSteps[activeStep][2] == 1} onChange={(e) => onChange(activeStep, 1, e)} />
                                        <label htmlFor={activeStep + "_1"}>SOMETIMES</label>
                                        <div className="check"></div>
                                    </div>
                                    <br />
                                    <br />

                                    <div className="col-7">
                                        <input type="radio" name={"option" + activeStep} id={activeStep + "_2"} checked={tutorialSteps[activeStep][2] == 2} onChange={(e) => onChange(activeStep, 2, e)} />
                                        <label htmlFor={activeStep + "_2"}>OFTEN</label>
                                        <div className="check"></div>
                                    </div>
                                    <br />
                                    <br />

                                    <div className="col-7">
                                        <input type="radio" name={"option" + activeStep} id={activeStep + "_3"} checked={tutorialSteps[activeStep][2] == 3} onChange={(e) => onChange(activeStep, 3, e)} />
                                        <label htmlFor={activeStep + "_3"}>ALMOST ALWAYS</label>
                                        <div className="check"></div>
                                    </div>
                                    <br />
                                    <br />
                                </div>
                            </div>
                        </div>
                    
                </Paper>
                
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <div className="row" style={{ width: "100%", margin: "auto", marginLeft: "730px", marginBottom: "20px"}}>

                <MobileStepper
                style={{ width: "100%"}} variant="progress" steps={maxSteps} position="static" activeStep={activeStep} className={classes.root}
                 nextButton={
                <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>Next{theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </Button>
                }
                    backButton={
                        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                        Back
                        </Button>
                    }
                    />
                </div>
                <div className="next-prev" style={{width: "20%"}}>
			
                    <div className="col-6" >
                        <button className="appo-button" onClick={Submit} style={{marginLeft: "1065px",fontSize:"16px"}} disabled={activeStep !== maxSteps - 1}>Finish</button>
                    </div>
                </div>
                

            </div>
        </Fragment>

    );
}
Question.propTypes = {
    savescore: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };
  
  const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user:state.auth.user
  });
  
  export default connect(mapStateToProps, { savescore })(Question);
