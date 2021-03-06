import React, { Fragment } from "react";
import { logout } from "../../actions/auth";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const Navbar = ({ auth: { isAuthenticated, user }, logout }) => {
  const chatopen=()=>{
    console.log('chat');
    console.log(window.location.href);
    window.location.href="http://127.0.0.1:3000/"
    
  }
  return (
    <Fragment>
      <div className="headerBar">
        <div className="row">
        <Link to="/"className="logo col-lg-2 col-md-4 col-sm-12">Stresser</Link>
          <div className="col-8" style={{ textAlign: "center" }}>
            <div className="menu">
              <Link to="/bookappointment" className="navMenuItem float">Appointment Booking</Link>
              <Link to="/question" className="navMenuItem float">DASS Test</Link>
              <Link to="/checkpersonalitytype" className="navMenuItem float">Personality Test</Link>
              <button  onClick={chatopen}  >Chat</button>

              <div className="navMenuItem float">About</div>
            </div>
          </div>
		  
          <div className="col-2" style={{ textAlign: "right" }}>
            
			  {isAuthenticated?<Link to="/" className="navMenuItem float" onClick={logout}>Logout</Link>:<Link to="/login" className="navMenuItem">
              Login
  </Link>} 
       
           
            {isAuthenticated?"":<Link to="/register" className="navMenuItem">
              Register
            </Link>}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,

};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);

// export default Navbar;
