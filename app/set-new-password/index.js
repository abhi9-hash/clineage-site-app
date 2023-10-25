import { View } from 'react-native'
import { Text, TextInput, Button, HelperText, Card, Avatar } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Auth } from 'aws-amplify';
import { useRouter, useSearchParams } from 'expo-router';
import { useState } from 'react';
import axios from 'axios';
import { Amplify } from 'aws-amplify';

const SetNewPassword = () => {

    const router = useRouter();
    const params = useSearchParams();
    console.log({ params });

    const [loading, setLoading] = useState(false);

    const validationSchema = Yup.object().shape({
        code: Yup.number()
            .required('code is required'),
        newPassword: Yup.string()
            .required('new password is required')
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
        console.log("username: ", params.username);
        setLoading(true);
        try {
            await Auth.forgotPasswordSubmit(params.username, values.code, values.newPassword);
            router.push(`/sign-in/`);
        } catch (error) {
            console.log("Error: ", error);
        }
        setLoading(false);
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Card style={{ width: 400, justifyContent: 'center', backgroundColor: "#fff", padding: 30 }}>
                <View style={{ alignItems: 'center', marginBottom: 20 }}>
                    <Avatar.Image size={48} source={require('../../assets/clineage.png')} style={{ marginBottom: 10 }} />
                    <Text variant="headlineMedium">Please set new passsword</Text   >
                </View>
            <Formik
                initialValues={{ code: '', newPassword: '' }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
                style={{ flex: 1, }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={{ flex: 1, gap: 10 }}>

                        <TextInput
                            label="code"
                            value={values.code}
                            onBlur={handleBlur('code')}
                            onChangeText={handleChange('code')}
                            error={touched.code && errors.code}
                            style={{ backgroundColor: "#fff", borderRadius: 5 }}
                            mode='outlined'
                        />
                        {touched.code && errors.code && <HelperText type='error'>{errors.code}</HelperText>}

                        <TextInput
                            label="new password"
                            value={values.newPassword}
                            onBlur={handleBlur('newPassword')}
                            onChangeText={handleChange('newPassword')}
                            error={touched.newPassword && errors.newPassword}
                            style={{ backgroundColor: "#fff", borderRadius: 5 }}
                            mode='outlined'
                        />
                        {touched.newPassword && errors.newPassword && <HelperText type='error'>{errors.newPassword}</HelperText>}

                        <Button mode="contained" onPress={handleSubmit} disabled={loading} style={{ borderRadius: 5 }}>
                            Submit
                        </Button>
                    </View>
                )}
            </Formik>
            </Card>
        </View>
    )
}

export default SetNewPassword;