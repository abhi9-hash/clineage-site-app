import { useState, useEffect } from "react";
import axios from "axios";
import { Amplify, Auth } from 'aws-amplify'

const userpool = "us-east-2_Zh2BDskEc";
const client_id  = "494hv4fasd37sf864j09mo9mk9"

        



const useFetch = (endpoint, body, method) => {
  //one call with token
  //one without token



  // Amplify.configure({
  //   Auth: {
  //     // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
  //     // identityPoolId: 'XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab',
  
  //     // REQUIRED - Amazon Cognito Region
  //     region: 'us-east-2',
  
  //     // OPTIONAL - Amazon Cognito Federated Identity Pool Region
  //     // Required only if it's different from Amazon Cognito Region
  //     // identityPoolRegion: 'XX-XXXX-X',
  
  //     // OPTIONAL - Amazon Cognito User Pool ID
  //     userPoolId: userpool,
  
  //     // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
  //     userPoolWebClientId: client_id,
  
  //     // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
  //     mandatorySignIn: false,
  
  //     // OPTIONAL - This is used when autoSignIn is enabled for Auth.signUp
  //     // 'code' is used for Auth.confirmSignUp, 'link' is used for email link verification
  //     // signUpVerificationMethod: 'code', // 'code' | 'link'
  
  //     // OPTIONAL - Configuration for cookie storage
  //     // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
  //     // cookieStorage: {
  //     //   // REQUIRED - Cookie domain (only required if cookieStorage is provided)
  //     //   domain: '.yourdomain.com',
  //     //   // OPTIONAL - Cookie path
  //     //   path: '/',
  //     //   // OPTIONAL - Cookie expiration in days
  //     //   expires: 365,
  //     //   // OPTIONAL - See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
  //     //   sameSite: 'strict' | 'lax',
  //     //   // OPTIONAL - Cookie secure flag
  //     //   // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
  //     //   secure: true,
  //     // },
  
  //     // OPTIONAL - customized storage object
  //     // storage: MyStorage,
  
  //     // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
  //     authenticationFlowType: 'USER_PASSWORD_AUTH',
  
  //     // OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
  //     // clientMetadata: {myCustomKey: 'myCustomValue'},
  
  //     // OPTIONAL - Hosted UI configuration
  //     // oauth: {
  //     //   domain: 'your_cognito_domain',
  //     //   scope: [
  //     //     'phone',
  //     //     'email',
  //     //     'profile',
  //     //     'openid',
  //     //     'aws.cognito.signin.user.admin',
  //     //   ],
  //     //   redirectSignIn: 'http://localhost:3000/',
  //     //   redirectSignOut: 'http://localhost:3000/',
  //     //   responseType: 'code', // or 'token', note that REFRESH token will only be generated when the responseType is code
  //     // },
  //   },
  //   Analytics: { 
  //       disabled: true
  //   }
  // });


  const getToken = async () => {
    const token = (await Auth.currentSession()).getIdToken().getJwtToken()
    return token
  }

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // const baseurl = "http://localhost:3000/v1"
  //  "https://d3n5cqup9ur89e.cloudfront.net/v1"
  const baseurl = "https://d3n5cqup9ur89e.cloudfront.net/v1"

  const fetchData = async () => {
    setIsLoading(true);
    const token = await  getToken()

    console.log({token})

    const options = {
      method: method,
      url: baseurl+endpoint,
      headers: {
        "Content-Type":"application/json",
        "Authorization": "Bearer " + token

        // "Bearer eyJraWQiOiI1enlaOUVDZE1KTFVsZjhzWGtaM2tNRnBCV1hqSXMxTVM0bU9jSFZKZXhjPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2MTBhODQ1Yy1iOTkxLTQ3MzItYmExMi0xMGY1ZjJhMzUwMGQiLCJjb2duaXRvOmdyb3VwcyI6WyJBY2NvdW50QWRtaW4iXSwiZW1haWxfdmVyaWZpZWQiOnRydWUsImh0dHBzOlwvXC9oYXN1cmEuaW9cL2p3dFwvY2xhaW1zIjoie1wieC1oYXN1cmEtYWxsb3dlZC1yb2xlc1wiOltcIkFjY291bnRBZG1pblwiLFwiRGF0YU1hbmFnZXJcIixcIlByaW5jaXBhbEludmVzdGlnYXRvclwiLFwiU3BvbnNvckFkbWluXCIsXCJTdHVkeU1hbmFnZXJcIixcIlNwZWNpYWxpc3RcIixcIlNpdGVDb29yZGluYXRvclwiLFwiTm9Sb2xlXCJdLFwieC1oYXN1cmEtZGVmYXVsdC1yb2xlXCI6XCJBY2NvdW50QWRtaW5cIixcIngtaGFzdXJhLXVzZXItaWRcIjpcIjYxMGE4NDVjLWI5OTEtNDczMi1iYTEyLTEwZjVmMmEzNTAwZFwiLFwieC1oYXN1cmEtc3R1ZHljb25maWdzXCI6XCJ7MiwxLDMsNH1cIixcIngtaGFzdXJhLXNpdGVzXCI6XCJ7dGVzdC1zaXRlfVwifSIsImNvZ25pdG86cHJlZmVycmVkX3JvbGUiOiJhcm46YXdzOmlhbTo6OTIxMDM0ODIyNzU5OnJvbGVcL3VzZXJwb29sLWluZnJhZGV2LTItZGV2LVVzZXJQb29sQ29nbml0b0dyb3VwRGVmYXVsLTFSS1E5Q1k4U1hEREEiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0yLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMl9aaDJCRHNrRWMiLCJjb2duaXRvOnVzZXJuYW1lIjoidGVzdC1kZXYiLCJvcmlnaW5fanRpIjoiMWFjYTFmZDQtMDRmMy00N2M1LTg2YzktMzlhZGE0NDZhOTg2IiwiY29nbml0bzpyb2xlcyI6WyJhcm46YXdzOmlhbTo6OTIxMDM0ODIyNzU5OnJvbGVcL3VzZXJwb29sLWluZnJhZGV2LTItZGV2LVVzZXJQb29sQ29nbml0b0dyb3VwRGVmYXVsLTFSS1E5Q1k4U1hEREEiXSwiYXVkIjoiNDk0aHY0ZmFzZDM3c2Y4NjRqMDltbzltazkiLCJldmVudF9pZCI6IjQzNDZhZGQ5LThiZTUtNGI1Mi05OWNlLTE2MTdiZGM1NGM4MSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjkzNDgzNTg5LCJuYW1lIjoidGVzdCBkZXYiLCJleHAiOjE2OTM0ODcxODgsImlhdCI6MTY5MzQ4MzU4OSwiZmFtaWx5X25hbWUiOiJ0ZXN0IGRldiIsImp0aSI6ImEwNTIzMWVkLTlkMDUtNDE2My1iMDdiLTE4ODViZDUyNDY5ZCIsImVtYWlsIjoiYW5qYW5AY2xpbmVhZ2UuY29tIn0.rbJqkh6fht2YqgG4qO4QuYE7LyCAACIu9xkBsgnRoPVJgJxnlsdbYNlfZfqEHaGKhPT1moXnD3rwWcI9q5onKXngfvC1NH6XEXy1MOqCIkfFiNWKRsqZRoeAdSUsCy7nqZSYllJ2gvZcBGWx7SzbPzXAOvSOCYuDjmOvxGTtgLnkL0ujwUaaj-b8x4kMA_2E2BNIf-oCUfb7O1Hp9v9EnWMavX9YDxLUZ8JH5PEbioBOXDUv85lV24DWx856XNYOsa0kTUOq0pBkQTh4RrnAvXdfF7qtGbT2tOZF2KQx99Wpnd7V0XfysoGXQ2oLHQgBZ4FjFZXyH5-rPstzEv-Saw"
     },
      data:body
    };
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

  useEffect(() => {
    setData(null)
    setError(null)
    setIsLoading(true)
    fetchData();
    
  },[]);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;