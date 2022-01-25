import React, { useState } from "react";
// Components
import Error from "../../components/Error/Error";
// CSS
import "./Login.css";
// Firebase
import { db, auth, googleProvider } from "../../firebase/firebase";
import firebase from "firebase/app";
// Images
import MoneyMan from "../../assets/img/moneyMan.png";

function Login() {

    /**-- STATES --*/

    // User state
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    // Error state
    const [error, updateError] = useState(false);
    const [errorMessage, updateErrorMessage] = useState({ message: '' });

    // Taking user values
    const { email, password } = user;
    const onChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value.replace(/ /g, ""),
        });
    };

    // Check session method
    const checkSessionMethod = (email) => {

        let signInMethodsForEmail = auth.fetchSignInMethodsForEmail(email).then((res) => {
            return res[0];
        });

        return signInMethodsForEmail;

    };

    const dispatchModal = (e) => {
        e.preventDefault();

        document.getElementById("modal").style.display = 'flex';
    }

    // Submit form
    const onSubmit = async (e) => {
        e.preventDefault();

        const email = user.email;
        const password = user.password;

        // Email field validation
        if (email === "") {
            updateErrorMessage({ ...errorMessage, message: 'Email is required' });
            // Show error
            updateError(true);
            return;
        }

        // Password field validation
        if (password === "") {
            updateErrorMessage({ ...errorMessage, message: 'Password is required' });
            // Show error
            updateError(true);
            return;
        }

        // Method type
        const methodType = await checkSessionMethod(email);

        updateErrorMessage({ ...errorMessage, message: 'Email address already in use.' });

        // Checking method type
        if (methodType === 'google.com') {
            // Error message
            updateErrorMessage({ ...errorMessage, message: 'Please, sign in with your Google account' });
            // Show error
            updateError(true);
            return;
        }

        // Dispatch Sign in function
        await auth.signInWithEmailAndPassword(email, password).then((userCredential) => {
            console.log('Success')
            // console.log(userCredential.user.uid);
            // Firebase
            db.collection('signInLogs').add({
                email,
                signInTime: firebase.firestore.FieldValue.serverTimestamp(),
            });
        }).catch(error => {
            console.error(error);
            switch (error.code) {
                case 'auth/email-already-in-use':
                    updateErrorMessage({ ...errorMessage, message: 'Email address already in use.' });
                    break;
                case 'auth/invalid-email':
                    updateErrorMessage({ ...errorMessage, message: 'Email address is invalid.' });
                    break;
                case 'auth/operation-not-allowed':
                    updateErrorMessage({ ...errorMessage, message: 'Error during sign up.' });
                    break;
                case 'auth/weak-password':
                    updateErrorMessage({ ...errorMessage, message: 'Password is not strong enough. Add additional characters including special characters and numbers.' });
                    break;
                case 'auth/wrong-password':
                    updateErrorMessage({ ...errorMessage, message: 'Password is wrong' });
                    break;
                case 'auth/user-not-found':
                    updateErrorMessage({ ...errorMessage, message: 'User not found, try with your google account instead' });
                    break;
                default:
                    updateErrorMessage({ ...errorMessage, message: error.message });
                    break;
            }
            updateError(true);
        });
    };

    const signInWithGoogle = async (e) => {
        e.preventDefault();

        // auth.signInWithRedirect(googleProvider);
        await auth.signInWithPopup(googleProvider)
            .then((result) => {
                // Email
                const email = result.user.email;

                // Firebase
                db.collection('signInLogs').add({
                    email,
                    signInTime: firebase.firestore.FieldValue.serverTimestamp(),
                });
            })
            .catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;

                if (errorCode) { console.error(errorCode); }

                if (errorMessage) { console.error(errorMessage); }

                if (email) { console.error(email); }

                if (credential) { console.error(credential); }

                return;
            });
    };

    return (
        <>
            <div className="some-page-wrapper">
                <div className="row">
                    <div className="column">
                        <div className="title-column">
                            <div className="login-title">
                                <h1>Utility Switchboard</h1>
                                <h1>
                                    <span>Savings Portal</span>.
                                </h1>
                            </div>

                            <div className="login-btn-container">
                                <button className="btn-login" onClick={(e) => dispatchModal(e)}>Sign In</button>
                            </div>

                            <div className="modal animate__animated animate__pulse" id="modal">
                                <form onSubmit={(e) => onSubmit(e)} className="modal-content">

                                    <div className="modal-logo">
                                        <img src={"https://utilityswitchboard.com/wp-content/uploads/2021/07/usb-favicon.png"} alt="" />
                                    </div>

                                    <div className="form-field">
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder="Introduce email"
                                            value={email || ''}
                                            onChange={onChange}
                                            placeholder="Email"
                                            required
                                        />
                                    </div>

                                    <div className="form-field">
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            placeholder="Introduce password"
                                            value={password || ''}
                                            onChange={onChange}
                                            placeholder="Password"
                                            autoComplete="on"
                                            required
                                        />
                                    </div>

                                    {error ? (
                                        <div className="error-modal"><Error message={errorMessage.message} /></div>
                                    ) : null}

                                    <div className="login-btn-container">
                                        <button className="btn-login">Sign In</button>
                                    </div>

                                    <p>Or sign in using</p>

                                    <button className="google-btn" onClick={(e) => signInWithGoogle(e)}>
                                        <div>
                                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" loading="lazy" />
                                        </div>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="column">
                        <div className="image-column">
                            <div className="image-container">
                                <img src={MoneyMan} alt="Saving Money" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
