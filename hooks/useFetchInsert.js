import { useState, useEffect } from "react";
import axios from "axios";
import { Amplify, Auth } from "aws-amplify";

const useFetch = (endpoint, Body, method) => {
  const [called, setCalled] = useState(false);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  Amplify.configure({
    Auth: {
      region: 'us-east-2',
  
      // OPTIONAL - Amazon Cognito Federated Identity Pool Region
      // Required only if it's different from Amazon Cognito Region
      // identityPoolRegion: 'XX-XXXX-X',
  
      // OPTIONAL - Amazon Cognito User Pool ID
      userPoolId: sessionStorage.getItem('userpool'),
  
      // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
      userPoolWebClientId: sessionStorage.getItem('client_id'),
  
      // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
      mandatorySignIn: false,
  
      // OPTIONAL - This is used when autoSignIn is enabled for Auth.signUp
      // 'code' is used for Auth.confirmSignUp, 'link' is used for email link verification
      // signUpVerificationMethod: 'code', // 'code' | 'link'
  
      // OPTIONAL - Configuration for cookie storage
      // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
      // cookieStorage: {
      //   // REQUIRED - Cookie domain (only required if cookieStorage is provided)
      //   domain: '.yourdomain.com',
      //   // OPTIONAL - Cookie path
      //   path: '/',
      //   // OPTIONAL - Cookie expiration in days
      //   expires: 365,
      //   // OPTIONAL - See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
      //   sameSite: 'strict' | 'lax',
      //   // OPTIONAL - Cookie secure flag
      //   // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
      //   secure: true,
      // },
  
      // OPTIONAL - customized storage object
      // storage: MyStorage,
  
      // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
      authenticationFlowType: 'USER_PASSWORD_AUTH',
  
      // OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
      // clientMetadata: {myCustomKey: 'myCustomValue'},
  
      // OPTIONAL - Hosted UI configuration
      // oauth: {
      //   domain: 'your_cognito_domain',
      //   scope: [
      //     'phone',
      //     'email',
      //     'profile',
      //     'openid',
      //     'aws.cognito.signin.user.admin',
      //   ],
      //   redirectSignIn: 'http://localhost:3000/',
      //   redirectSignOut: 'http://localhost:3000/',
      //   responseType: 'code', // or 'token', note that REFRESH token will only be generated when the responseType is code
      // },
    },
    Analytics: { 
        disabled: true
    }
  });


  const getToken = async () => {
    const token = (await Auth.currentSession()).getIdToken().getJwtToken()
    return token
  }
  

  // const baseurl = "http://localhost:3000/v1"
  const baseurl = "https://d3n5cqup9ur89e.cloudfront.net/v1"

  const fetchData = async (body) => {

    const token = await  getToken()

    const options = {
      method: method,
      url: baseurl+endpoint,
      headers: {
        "Content-Type":"application/json",
        "Authorization":"Bearer " + token
      },
      data:Body
      
    }


    setIsLoading(true);
    if(body){
      options["data"] = body
    }

    try {
      const response = await axios.request(options);

      setData(response.data);
      console.log("data",response.data)
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = async (body,flag=false) => {
    if(!called || flag){
    setIsLoading(true);
    setCalled(true)
    fetchData(body);
    }
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;