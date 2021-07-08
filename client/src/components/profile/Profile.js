import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/profile';
import Spinner from '../layouts/Spinner';
import { Link } from 'react-router-dom';
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
    
  }, [match.params.id, getProfileById]);

  return (
    <div>
      {loading || profile === null ? (
        <Spinner />
      ) : (
        <section className='container'>
          <Link to='/profiles' className='btn btn-light'>
            Back to Profiles
          </Link>
       
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to='/edit-profile' className='btn btn-dark'>
                Edit Profile
              </Link>
            )}
            <div className='profile-grid my-1'>
                <ProfileTop profile={profile}/>
                <ProfileAbout profile={profile}/>

            </div>
        </section>
      )}
    </div>
  );
};

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileById: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
