import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGraduationCap,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import { faBlackTie } from '@fortawesome/free-brands-svg-icons';
export const DashboardActions = () => {
  return (
    <div className='dash-buttons'>
      <Link to='/edit-profile' className='btn btn-light'>
        <FontAwesomeIcon className=' text-primary' icon={faUserCircle} />
        Edit Profile
      </Link>
      <Link to='/add-experienc' className='btn btn-light'>
        <FontAwesomeIcon className=' text-primary' icon={faBlackTie} />
        Add Experience
      </Link>
      <Link to='/add-educationl' className='btn btn-light'>
        <FontAwesomeIcon className=' text-primary' icon={faGraduationCap} />
        Add Education
      </Link>
    </div>
  );
};
