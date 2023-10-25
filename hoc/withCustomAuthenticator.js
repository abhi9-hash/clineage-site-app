import React, { useEffect } from 'react';
import { Amplify, Auth } from 'aws-amplify';
import { useState } from "react";
// import CircularProgress from '@mui/material/CircularProgress';
// import Box from '@mui/material/Box';
import { useSearchParams,useRouter } from 'expo-router'
import { Card } from 'react-native-paper';

const withCustomAuthenticator = (WrappedComponent) => {
    
    

  const WithCustomAuth = (props) => {

    const [authState, setAuthState] = useState("loading");
    const router = useRouter()

    useEffect(() => {
      const checkAuth = async () => {
        try {
          Amplify.configure({
            Auth: {
              region: "us-east-2",
              userPoolId: sessionStorage.getItem('userpool'),
              userPoolWebClientId: sessionStorage.getItem('client_id'),
              mandatorySignIn: false,
              authenticationFlowType: "USER_PASSWORD_AUTH",
            },
            Analytics: {
              disabled: true,
            },
          });
          // Check if the user is authenticated
          const res = await Auth.currentAuthenticatedUser();
          console.log({res})
          setAuthState("success")
        } catch (err) {
          // If not authenticated, redirect to the custom login page
          // window.location.href = '/custom-login'; // Replace '/custom-login' with the actual path of your custom login page
          // console.log(router.pathname)
          sessionStorage.setItem('redirectPath', router.pathname);
          
          router.push('/sign-in')
        }
      };

      // console.log(window.location.pathname)
      checkAuth();
    }, []);

    if(authState=="success") return <WrappedComponent {...props} />;
    else return  <Card sx={{ display: 'flex' }}>
      <div>Loding...</div>
    {/* <CircularProgress /> */}

  </Card>

    
  };

  return WithCustomAuth;
};

export default withCustomAuthenticator;
