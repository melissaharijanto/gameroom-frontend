import { useState } from 'react';
import styled from 'styled-components';
import * as Constants from '../constants';
import { CenterAlignedFlex, LeftAlignedFlex } from './Layout';
import { LogIn, SignUp } from './Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../compiler/context/Authentication';
import LoadingModal from './LoadingModal';

/**
 * Wrapper to keep two different text components in one line.
 */
const TextCombiner = styled.span`
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
    
    :focus {
        outline: none;
    }
`

/**
 * Displays a login component for the login page.
 * 
 * @returns A styled login form.
 */
const LoginForm = () => {
    /**
     * Use authentication context; this is declared so that the logged in user
     * can be recorded as a permanent state throughout the application.
     */
    const auth = useAuth();
    const [user, setUser] = useState({
        username: "",
        password: ""
    });
    const [loading, setLoading] = useState<Boolean>(false);

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

    /**
     * Handles submission of the login form.
     * Displays the LoadingModal as the data is sent to the backend.
     * Navigates to dashboard if successful.
     */
    const handleSubmit = () => {
        setLoading(true);
        axios.post(Constants.API_ENDPOINT + "/login", user)
            .then((response) => {
                auth?.login(response.data.token, response.data.user);
                setLoading(false);
                navigate('/dashboard')
            }).catch((error) => {
                console.log(error);
            })
    }

    return (
        <div>
            <form>
                <LeftAlignedFlex direction="column">
                    { loading? <LoadingModal/> : null }
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

/**
 * Displays a sign up component for the sign up page.
 * 
 * @returns A styled sign up form.
 */
const SignUpForm = () => {
    const auth = useAuth();
    const [user, setUser] = useState({
        user: {
            username: "",
            password: ""
        }
    });
    const [loading, setLoading] = useState<Boolean>(false);

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
    
    /**
     * Handles submission of the sign up form.
     * Displays LoadingModal while the data is being sent to the backend.
     * Navigates to the dashboard if successful.
     */
    const handleSubmit = () => {
        setLoading(true);
        axios.post(Constants.API_ENDPOINT + "/signup", user)
            .then((response) => {
                auth?.login(response.data.token, response.data.user);
                setLoading(false);
                navigate('/dashboard')
            }).catch((error) => {
                console.log(error.response);
            })
    }

    return (
        <div>
            <form>
                <LeftAlignedFlex direction="column">
                    { loading? <LoadingModal/> : null }
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