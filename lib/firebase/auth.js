import { auth, googleProvider } from './firebase_app';

// --  profile management start --

export const getUserProfile = () => {
    const user = auth.currentUser;
    if (user != null) {
        const { displayName, email, photoURL, emailVerified, uid } = user;
        // uid:  The user's ID, unique to the Firebase project. Do NOT use
        // this value to authenticate with your backend server, if
        // you have one. Use User.getToken() instead.
    }
    return user;
};

export const sendEmailVerification = async () => {
    let successful = true;
    const user = getUserProfile();
    await user?.sendEmailVerification().catch((error) => {
        // An error happened.
        successful = false;
    });
    return successful;
};

export const updatePassword = async (newPassword) => {
    let successful = true;
    const user = getUserProfile();
    await user?.updatePassword(newPassword).catch(function (error) {
        // An error happened.
        successful = false;
    });
    return successful;
};

export const sendPasswordResetEmail = (emailAddress) => {
    let successful = true;
    auth.sendPasswordResetEmail(emailAddress).catch(function (error) {
        // An error happened.
        successful = false;
    });
    return successful;
};

export const deleteUser = async () => {
    const user = getUserProfile();
    let successful = true;
    await user?.delete().catch(function (error) {
        // An error happened.
        successful = false;
    });

    return successful;
};

// --  profile management end --

export const signOut = async () => {
    await auth.signOut();
    // auth.currentUser === null, and emmit to listener: auth.onAuthStateChanged(...)
};

/*   ===========     sign-in providers  start    ========    */

// -- provider:  email --
export const signInWithEmailPassword = async (email, password) => {
    const user = await auth.signInWithEmailAndPassword(email, password);
    return user;
};

export const signUpWithEmailPassword = async (email, password) => {
    const user = await auth
        .createUserWithEmailAndPassword(email, password)
        .catch((error) => {
            const { code, message } = error;
            console.error(' -- signUpWithEmailPassword:   ', { code, message });
        });
    return user;
};

// --  provider : google --
export const signInWithGoogle = async () => {
    const result = await auth
        .signInWithPopup(googleProvider)
        .catch(function (error) {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            const credential = error.credential;
            // ...
            console.error(' -- signInWithGoogle --  ', {
                errorCode,
                errorMessage,
                email,
                credential,
            });
        });
    // This gives you a Google Access Token. You can use it to access the Google API.
    const accessToken = result?.credential.accessToken;
    // The signed-in user info.
    const user = result?.user;

    return { accessToken, user };
};

// --- provider : phone ---
export const signInWithPhone = async (phoneNumber, recaptchaVerifier) => {
    const confirmationResult = await auth.signInWithPhoneNumber(
        phoneNumber,
        recaptchaVerifier
    );
    return confirmationResult;
};

export const requestVerifyCode = async (confirmationResult, code) => {
    const result = await confirmationResult.confirm(code);
    const { user } = result;
    return user;
};
/*   ===========     sign-in providers end  ========    */
