import { useState } from 'react';
import styled from 'styled-components';
import * as Constants from '../constants';
import { CenterAlignedFlex, LeftAlignedFlex } from './Layout';
import { LogIn, SignUp } from './Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../compiler/context/Authentication';

/**
 * Wrapper to keep two different text components in one line.
 */
const TextCombiner = styled.text`
    padding-bottom: 0.25em;
`
const StyledLabel = styled.label`
    color: ${(props) => props.color? props.color : Constants.YELLOW100};
    font-family: Metropolis-SemiBold;
    padding-top: 0.25em;
    padding-bottom: 0.25em;
    font-size: 1em;
`

const StyledInput= styled.input`
    width: 20vw;
    padding: 0.6em 1em 0.6em 1em;
    margin-bottom: 0.5em;
    font-size: 1em;
    font-family: Metropolis-RegularItalic;
    border: none 0px transparent;
    border-radius: 10px;

    ::placeholder {
        color: ${Constants.BLACK35};
    }
`

const LoginForm = () => {
    const auth = useAuth();
    const [user, setUser] = useState({
        username: "",
        password: ""
    });

    const navigate = useNavigate();

    /**
     * Handles the change of text in the input.
     * @param e The event that is triggered from entering the text.
     * Credit: https://stackoverflow.com/questions/54150783/react-hooks-usestate-with-object
     */
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = () => {
        axios.post(Constants.API_ENDPOINT + "/login", user)
            .then((response) => {
                console.log(response);
                alert("You have successfully logged in!");
                auth?.login(response.data.token, response.data.user);
                navigate('/dashboard')
            }).catch((error) => {
                console.log(error);
            })
    }

    return (
        <div>
            <form>
                <LeftAlignedFlex direction="column">
                    <StyledLabel>Username</StyledLabel>
                    <StyledInput 
                        required 
                        placeholder="Enter your username here." 
                        value={user.username}
                        onChange={handleChange}
                        name="username"
                    /> 
                    <StyledLabel>Password</StyledLabel>
                    <StyledInput
                        required 
                        type="password"
                        placeholder="Enter your password here."
                        value={user.password}
                        onChange={handleChange}
                        name="password"
                    />
                </LeftAlignedFlex>
            </form>  
            <br/>
            <CenterAlignedFlex direction="column">
                <LogIn marginRight="0em" onClick={handleSubmit}>Log In</LogIn>
            </CenterAlignedFlex>
        </div>
        
    )
}

const SignUpForm = () => {
    const auth = useAuth();
    const [user, setUser] = useState({
        user: {
            username: "",
            password: ""
        }
    });

    const navigate = useNavigate();

    const handleUsernameChange = (e: any) => {
        setUser(prevState => ({
            ...prevState, 
            user: {
                username: e.target.value,
                password: prevState.user.password
            }
        }))
    }

    const handlePasswordChange = (e: any) => {
        setUser(prevState => ({
            ...prevState, 
            user: {
                username: prevState.user.username,
                password: e.target.value,
            }
        }))
    }
    
    const handleSubmit = () => {
        axios.post(Constants.API_ENDPOINT + "/signup", user)
            .then((response) => {
                alert("You have successfully signed up!");
                auth?.login(response.data.token, response.data.user);
                navigate('/dashboard')
            }).catch((error) => {
                console.log(error.response);
            })
    }

    return (
        <div>
            <form>
                <LeftAlignedFlex direction="column">
                    <TextCombiner>
                        <StyledLabel color={Constants.WHITE100}>What will your </StyledLabel>
                        <StyledLabel>username </StyledLabel>
                        <StyledLabel color={Constants.WHITE100}>be?</StyledLabel>
                    </TextCombiner>
                    <StyledInput 
                        required 
                        placeholder="Enter your username here."
                        value={user.user.username}
                        onChange={handleUsernameChange}
                        name="username"
                    />
                    <TextCombiner>
                        <StyledLabel color={Constants.WHITE100}>Create a </StyledLabel>
                        <StyledLabel>password.</StyledLabel>
                    </TextCombiner>
                    <StyledInput 
                        required 
                        placeholder="Enter your password here."
                        type="password"
                        value={user.user.password}
                        onChange={handlePasswordChange}
                        name="password"
                    />
                </LeftAlignedFlex>
            </form>
            <br/>
            <CenterAlignedFlex direction="column">
                <SignUp onClick={handleSubmit}>Sign Up</SignUp>
            </CenterAlignedFlex>  
        </div>
    )
}

export { LoginForm, SignUpForm };