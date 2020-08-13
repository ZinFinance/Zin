import React, { useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

function SignUpSuccess() {
  const justRegistered = useSelector((state) => state.userReducer.justRegistered);
  const history = useHistory()

  useEffect(() => {
    if (!justRegistered) {
      history.push('/sign-in')
    }
  }, [])

  return (
    <div className="page-ath-text">
      <h2 className="page-ath-heading">Thank you! <small>Your singup process is alomost done.</small> <span className="text-success">Please check your mail and verify.</span></h2>
    </div>
  )
}

export default SignUpSuccess