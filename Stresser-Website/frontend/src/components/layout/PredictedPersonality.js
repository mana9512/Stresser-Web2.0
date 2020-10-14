import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { savescore } from "../../actions/das";
import PropTypes from "prop-types";


const PredictedPersonality = ({personalitypred}) => {
    return (
        <Fragment>
            <div><h1>{personalitypred}</h1></div>
        </Fragment>
    )
}

PredictedPersonality.propTypes = {
    personalitypred: PropTypes.string
}

const mapStateToProps = (state) => ({
    personalitypred:state.personality.personalitypred
  });
export default connect(mapStateToProps, {})(PredictedPersonality) 


 
  
