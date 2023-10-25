import { Amplify, Auth } from "aws-amplify";
import React, { useState } from "react";
import {
  TextInput,
  Button,
  HelperText,
  Card,
  Text,
  Avatar,
} from "react-native-paper";
import { View, ImageBackground } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import * as Yup from "yup";

import { useTheme } from "react-native-paper";

function SignIn(props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const theme = useTheme();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("username is required"),
    password: Yup.string().required("password is required"),
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await Auth.signIn(values.username, values.password);
      console.log(response);
      router.push(`/sites/`);
    } catch (error) {
      console.log("Error: ", error);
    }
    setLoading(false);
  };

  const handleForgetPassword = (username) => {
    // console.log(username);
    router.push(`/forget-password/`);
  };

  // const cognitomapping = {
  //     "clineage": {
  //         "userpool": "us-east-2_zHZJLDIUM",
  //         "clientid": "6tigkldrdbqpkdq1p6uu3od969"
  //     }
  // }
//   console.log(sessionStorage.getItem('client_id'),sessionStorage.getItem('userpool'));

//   Amplify.configure({
//     Auth: {
//       region: "us-east-2",
//       userPoolId: sessionStorage.getItem('userpool'),
//       userPoolWebClientId: sessionStorage.getItem('client_id'),
//       mandatorySignIn: false,
//       authenticationFlowType: "USER_PASSWORD_AUTH",
//     },
//     Analytics: {
//       disabled: true,
//     },
//   });


//   axios
    // .get(
    //   "https://d3n5cqup9ur89e.cloudfront.net/v1/metadata/"
    // )
    // .then((response) => {
    //   const data = response.data.data;

    //   const client_id = data.auth.cognito_client_id;
    //   const userpool = data.auth.cognito_user_poolI;

    //   console.log({client_id,userpool})
    //   // const client_id = cognitomapping.params.company.clientid;
    //   // const userpool  = cognitomapping.params.company.userpool;

    //   Amplify.configure({
    //     Auth: {
    //       region: "us-east-2",
    //       userPoolId: userpool,
    //       userPoolWebClientId: client_id,
    //       mandatorySignIn: false,
    //       authenticationFlowType: "USER_PASSWORD_AUTH",
    //     },
    //     Analytics: {
    //       disabled: true,
    //     },
    //   });
    // })
    // .catch((error) => {
    //   console.error("Error retrieving configuration:", error);
    // });

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Card
        style={{
          width: 400,
          justifyContent: "center",
          backgroundColor: "#fff",
          padding: 30,
        }}
      >
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <Avatar.Image
            size={48}
            source={require("../../assets/clineage.png")}
            style={{ marginBottom: 10 }}
          />
          <Text variant="headlineMedium">Hello Again!</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View style={{ flex: 1, gap: 10 }}>
                <TextInput
                  label="username"
                  value={values.username}
                  onBlur={handleBlur("username")}
                  onChangeText={handleChange("username")}
                  error={touched.username && errors.username}
                  style={{ borderRadius: 5 }}
                  mode="outlined"
                />
                {touched.username && errors.username && (
                  <HelperText type="error">{errors.username}</HelperText>
                )}

                <TextInput
                  label="password"
                  value={values.password}
                  onBlur={handleBlur("password")}
                  onChangeText={handleChange("password")}
                  error={touched.password && errors.password}
                  secureTextEntry={true}
                  style={{ borderRadius: 5 }}
                  mode="outlined"
                />
                {touched.password && errors.password && (
                  <HelperText type="error">{errors.password}</HelperText>
                )}

                <View style={{ alignItems: "flex-end" }}>
                  <HelperText
                    onPress={() => handleForgetPassword(values.username)}
                  >
                    {" "}
                    Forget Password{" "}
                  </HelperText>
                </View>

                <Button
                  mode="contained"
                  style={{ borderRadius: 5 }}
                  buttonColor={theme.colors.primary}
                  onPress={handleSubmit}
                  disabled={loading}
                >
                  login
                </Button>
              </View>
            )}
          </Formik>
        </View>
      </Card>
    </View>
  );
}

export default SignIn;
