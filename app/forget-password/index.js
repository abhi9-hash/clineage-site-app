import { View } from 'react-native'
import { Text, TextInput, Button, HelperText, Card, Avatar } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Auth } from 'aws-amplify';
import { useRouter, useSearchParams } from 'expo-router';
import { useState } from 'react';
import axios from 'axios';
import { Amplify } from 'aws-amplify';

const ForgetPassword = () => {
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Name is required')
    });

    const cognitomapping = {
        "clineage": {
            "userpool": "us-east-2_zHZJLDIUM",
            "clientid": "6tigkldrdbqpkdq1p6uu3od969"
        }
    }

    axios.get('https://kwrocrfgja.execute-api.us-east-2.amazonaws.com/dev/api/v1.0/metadata')
        .then(response => {
            const data = response.data.data;
            const client_id = cognitomapping.params.company.clientid;
            const userpool = cognitomapping.params.company.userpool;

            Amplify.configure({
                Auth: {
                    region: 'us-east-2',
                    userPoolId: userpool,
                    userPoolWebClientId: client_id,
                    mandatorySignIn: false,
                    authenticationFlowType: 'USER_PASSWORD_AUTH',
                },
                Analytics: {
                    disabled: true
                }
            });
        })
        .catch(error => {
            console.error('Error retrieving configuration:', error);
        });

    const handleSubmit = async (values) => {
        console.log(values.username);
        setLoading(true);
        try {
            await Auth.forgotPassword(values.username);
            router.push(`/set-new-password/?username=${values.username}`);
        } catch (error) {
            console.log("Error: ", error);
        }
        setLoading(false);
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Card style={{ width: 400, justifyContent: 'center', backgroundColor: "#fff", padding: 30 }}>
                <View style={{ alignItems: 'center', marginBottom: 20 }}>
                    <Avatar.Image size={48} source={require('../../assets/clineage.png')} style={{ marginBottom: 10 }} />
                    <Text variant="headlineMedium">Hello Again!</Text   >
                </View>
                <Formik
                    initialValues={{ username: '', code: '', newPassword: '' }}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                    style={{ flex: 1, }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View style={{ flex: 1, gap: 10 }}>

                            <TextInput
                                label="username"
                                value={values.username}
                                onBlur={handleBlur('username')}
                                onChangeText={handleChange('username')}
                                error={touched.username && errors.username}
                                style={{ backgroundColor: '#fff', borderRadius: 5 }}
                                mode='outlined'
                            />
                            {touched.username && <HelperText type='error'>{errors.username}</HelperText>}

                            <Button mode="contained" onPress={handleSubmit} disabled={loading} style={{ borderRadius: 5 }}>
                                Send
                            </Button>
                        </View>
                    )}
                </Formik>
            </Card>
        </View>
    )
}

export default ForgetPassword;