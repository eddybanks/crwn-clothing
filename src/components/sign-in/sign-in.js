import React, { Component } from 'react'

import FormInput from '../../components/form-input/form-input'
import './sign-in.styles.scss'
import CustomButton from '../custom-button/custom-button'
import { auth, signInWithGoogle } from '../../firebase/firebase.utils'
import { googleSignInStart } from '../../redux/user/user.actions'
import { connect } from 'react-redux'

class SignIn extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { email, password } = this.state

    try {
      await auth.signInWithEmailAndPassword(email, password)
      this.setState({ email: '', password: ''})
    } catch (error) {
      console.error(error)
    }
    
    this.setState({ email: '', password: '' })
  }

  handleChange = event => {
    const { value, name } = event.target

    this.setState({ [name]: value })
  }

  render() {

    const { googleSignInStart } = this.props

    return (
      <div className='sign-in'>
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput 
            name='email' 
            type='email' 
            handleChange={this.handleChange}
            value={this.state.email} 
            label='email'
            required />
          <FormInput 
            name='password' 
            type='password' 
            value={this.state.password} 
            handleChange={this.handleChange}
            label='password'
            required />

          <div className='button'>
            <CustomButton type='submit'>Sign In</CustomButton>
            <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn>Sign In with Google</CustomButton>
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart())
})

export default connect(null, mapDispatchToProps)(SignIn)