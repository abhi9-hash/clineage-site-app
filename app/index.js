import { Redirect } from "expo-router";

import { Amplify, Auth } from 'aws-amplify';

import { withAuthenticator } from  'aws-amplify-react-native'
import store from "../redux/store";
import { Provider } from "react-redux";


  

// const fetchData = async () => {
//     try {
//       const response = await axios.get('https://kwrocrfgja.execute-api.us-east-2.amazonaws.com/dev/api/v1.0/metadata');
//       return response.data;
//     } catch (error) {
//       // Handle any errors
//       console.error(error);
//       throw error;
//     }
//   };



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
//     userPoolId: 'us-east-2_zHZJLDIUM',

//     // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
//     userPoolWebClientId: '6tigkldrdbqpkdq1p6uu3od969',

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
// });

// You can get the current config object
// const currentConfig = Auth.configure();


// import axios from 'axios';

// // Make the API call to retrieve configuration values using Axios
// axios.get('https://kwrocrfgja.execute-api.us-east-2.amazonaws.com/dev/api/v1.0/metadata')
//   .then(response => {
//     // console.log({response})
//     const data = response.data.data;
//     // console.log({data})

//     const client_id = data.auth.cognito_client_id;
//     const userpool = data.auth.cognito_user_pool;
//     console.log({client_id, userpool});
//     // const awsmobile = {
//     //     aws_project_region: "us-east-2",
//     //     // aws_appsync_graphqlEndpoint:
//     //     //   'https://pfijgfap5rc6vivrxwthkdutbm.appsync-api.us-east-2.amazonaws.com/graphql',
//     //     aws_appsync_region: "us-east-2",
//     //     aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS",
//     //     aws_appsync_apiKey: "da2-xbyjzeimwfbnnkufokhywe5k2i",
//     //     // aws_cognito_identity_pool_id:
//     //     //   'us-east-2:026e2b76-0011-496d-9730-cbbad52227ca',
//     //     aws_cognito_region: "us-east-2",
//     //     aws_user_pools_id: userpool,
//     //     aws_user_pools_web_client_id: client_id,
      
//     //     oauth: {},
//     //   };
//     //   Amplify.configure({ ...awsmobile })
//     //   Auth.configure({ ...awsmobile})

      
//     Amplify.configure({
//         Auth: {
//           // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
//           // identityPoolId: 'XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab',
      
//           // REQUIRED - Amazon Cognito Region
//           region: 'us-east-2',
      
//           // OPTIONAL - Amazon Cognito Federated Identity Pool Region
//           // Required only if it's different from Amazon Cognito Region
//           // identityPoolRegion: 'XX-XXXX-X',
      
//           // OPTIONAL - Amazon Cognito User Pool ID
//           userPoolId: userpool,
      
//           // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
//           userPoolWebClientId: client_id,
      
//           // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
//           mandatorySignIn: false,
      
//           // OPTIONAL - This is used when autoSignIn is enabled for Auth.signUp
//           // 'code' is used for Auth.confirmSignUp, 'link' is used for email link verification
//           // signUpVerificationMethod: 'code', // 'code' | 'link'
      
//           // OPTIONAL - Configuration for cookie storage
//           // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
//           // cookieStorage: {
//           //   // REQUIRED - Cookie domain (only required if cookieStorage is provided)
//           //   domain: '.yourdomain.com',
//           //   // OPTIONAL - Cookie path
//           //   path: '/',
//           //   // OPTIONAL - Cookie expiration in days
//           //   expires: 365,
//           //   // OPTIONAL - See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
//           //   sameSite: 'strict' | 'lax',
//           //   // OPTIONAL - Cookie secure flag
//           //   // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
//           //   secure: true,
//           // },
      
//           // OPTIONAL - customized storage object
//           // storage: MyStorage,
      
//           // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
//           authenticationFlowType: 'USER_PASSWORD_AUTH',
      
//           // OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
//           // clientMetadata: {myCustomKey: 'myCustomValue'},
      
//           // OPTIONAL - Hosted UI configuration
//           // oauth: {
//           //   domain: 'your_cognito_domain',
//           //   scope: [
//           //     'phone',
//           //     'email',
//           //     'profile',
//           //     'openid',
//           //     'aws.cognito.signin.user.admin',
//           //   ],
//           //   redirectSignIn: 'http://localhost:3000/',
//           //   redirectSignOut: 'http://localhost:3000/',
//           //   responseType: 'code', // or 'token', note that REFRESH token will only be generated when the responseType is code
//           // },
//         },
//         Analytics: { 
//             disabled: true
//         }
//       });

//     // Configure Amplify with the retrieved values
//     // Amplify.configure({
//     //   // Use the retrieved values to set up the necessary configurations
//     //   API: {
//     //     endpoints: [
//     //       {
//     //         name: 'myAPI',
//     //         endpoint: data.apiEndpoint, // Use the retrieved API endpoint
//     //         region: data.apiRegion, // Use the retrieved API region
//     //         // ... other API configuration options
//     //       },
//     //     ],
//     //   },
//     //   // Other Amplify configurations
//     // });
//   })
//   .catch(error => {
//     console.error('Error retrieving configuration:', error);
//   });

// Amplify.configure({
//     Auth: {
//       // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
//       // identityPoolId: 'XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab',
  
//       // REQUIRED - Amazon Cognito Region
//       region: 'us-east-2',
  
//       // OPTIONAL - Amazon Cognito Federated Identity Pool Region
//       // Required only if it's different from Amazon Cognito Region
//       // identityPoolRegion: 'XX-XXXX-X',
  
//       // OPTIONAL - Amazon Cognito User Pool ID
//       userPoolId: "us-east-2_54S8zAgam",
  
//       // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
//       userPoolWebClientId: "13fbic1ko47n2cqe631ortslhd",
  
//       // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
//       mandatorySignIn: false,
  
//       // OPTIONAL - This is used when autoSignIn is enabled for Auth.signUp
//       // 'code' is used for Auth.confirmSignUp, 'link' is used for email link verification
//       // signUpVerificationMethod: 'code', // 'code' | 'link'
  
//       // OPTIONAL - Configuration for cookie storage
//       // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
//       // cookieStorage: {
//       //   // REQUIRED - Cookie domain (only required if cookieStorage is provided)
//       //   domain: '.yourdomain.com',
//       //   // OPTIONAL - Cookie path
//       //   path: '/',
//       //   // OPTIONAL - Cookie expiration in days
//       //   expires: 365,
//       //   // OPTIONAL - See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
//       //   sameSite: 'strict' | 'lax',
//       //   // OPTIONAL - Cookie secure flag
//       //   // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
//       //   secure: true,
//       // },
  
//       // OPTIONAL - customized storage object
//       // storage: MyStorage,
  
//       // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
//       authenticationFlowType: 'USER_PASSWORD_AUTH',
  
//       // OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
//       // clientMetadata: {myCustomKey: 'myCustomValue'},
  
//       // OPTIONAL - Hosted UI configuration
//       // oauth: {
//       //   domain: 'your_cognito_domain',
//       //   scope: [
//       //     'phone',
//       //     'email',
//       //     'profile',
//       //     'openid',
//       //     'aws.cognito.signin.user.admin',
//       //   ],
//       //   redirectSignIn: 'http://localhost:3000/',
//       //   redirectSignOut: 'http://localhost:3000/',
//       //   responseType: 'code', // or 'token', note that REFRESH token will only be generated when the responseType is code
//       // },
//     },
//   });

//   const xhttp = new XMLHttpRequest();
//   xhttp.onreadystatechange = function() {
//       if (this.readyState == 4 && this.status == 200) {
//          // Typical action to be performed when the document is ready:
//         //  document.getElementById("demo").innerHTML = xhttp.responseText;
//         console.log(xhttp.responseText)
//       }
//   };
//   xhttp.open("GET", "ttps://kwrocrfgja.execute-api.us-east-2.amazonaws.com/dev/api/v1.0/metadata", true);
//   xhttp.send();


function Index() {

    return (
        // <Provider store={store}>
            <Redirect href="/home" />
        // </Provider>
    );
}

// export default withAuthenticator(Index);
export default Index;