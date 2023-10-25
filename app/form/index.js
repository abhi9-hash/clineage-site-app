import React, { useCallback, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, RadioButton, HelperText, Text, Switch, Checkbox } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { Formik } from 'formik';
import * as Yup from 'yup';

const Form = () => {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' }
    ]);

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required')
            .min(2, 'Name must be at least 2 characters')
            .max(50, 'Name cannot exceed 10 characters'),
        age: Yup.number()
            .required('Age is required')
            .min(18, 'Age must be at least 18')
            .max(120, 'Age cannot exceed 100'),
        gender: Yup.string().required('Gender is required'),
        countries: Yup.array().min(1, 'Select at least one country'),
        fruit: Yup.string().required('Must select one fruit type'),
    });

    const handleSubmit = (values) => {
        // Handle form submission here
        console.log(values);
    };

    const handleCountryToggle = useCallback(
        (value, setFieldValue, countries) => () => {
            if (countries.includes(value)) {
                const nextCountries = countries.filter((item) => item !== value);
                setFieldValue('countries', nextCountries);
            } else {
                const nextCountries = [...countries, value];
                setFieldValue('countries', nextCountries);
            }
        },
        []
    );

    const countryList = ['India', 'USA', 'Canada', 'UK']

    return (
        <View style={styles.formContainer}>
            <Formik
                initialValues={{ name: '', age: '', gender: 'male', isSwitchOn: false, countries: [], fruit: '' }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
                    <View style={{ flex: 1, gap: 5 }}>
                        <TextInput
                            label="name"
                            value={values.name}
                            onBlur={handleBlur('name')}
                            onChangeText={handleChange('name')}
                            error={touched.name && errors.name}
                        />
                        {touched.name && <HelperText type='error'>{errors.name}</HelperText>}

                        <TextInput
                            label="age"
                            value={values.age}
                            onBlur={handleBlur('age')}
                            onChangeText={handleChange('age')}
                            error={touched.age && errors.age}
                        />
                        {touched.age && <HelperText type='error'>{errors.age}</HelperText>}

                        <View style={{}}>
                            <RadioButton.Group
                                onValueChange={(value) => handleChange('gender')(value)}
                                value={values.gender}
                                onBlur={handleBlur('gender')}
                            >
                                <RadioButton.Item label="Male" value="male" />
                                <RadioButton.Item label="Female" value="female" />
                            </RadioButton.Group>
                        </View>

                        <View>
                            <Text>Countries:</Text>
                            <View style={{ flex: 1, }}>
                                {countryList.map((country) => (
                                    // <View key={country}>
                                    <Checkbox.Item
                                        key={country}
                                        label={country}
                                        status={values.countries.includes(country) ? 'checked' : 'unchecked'}
                                        onPress={handleCountryToggle(country, setFieldValue, values.countries)}
                                    />
                                    // </View>
                                ))}
                            </View>
                            {touched.countries && errors.countries && (
                                <HelperText type='error'>{errors.countries}</HelperText>
                            )}
                        </View>

                        <View>
                            <Text>Favourite fruit:</Text>
                            <DropDownPicker
                                open={open}
                                value={value}
                                items={items}
                                setOpen={setOpen}
                                setValue={setValue}
                                setItems={setItems}
                                onChangeValue={(value) => {
                                    console.log({ value })
                                    handleChange('fruit')(value);
                                }}
                            />
                            {touched.fruit && errors.fruit && (
                                <HelperText type='error'>{errors.fruit}</HelperText>
                            )}
                        </View>
                        <>
                            <Text>Subscribe:</Text>
                            <Switch
                                value={values.isSwitchOn}
                                onValueChange={() => setFieldValue('isSwitchOn', !values.isSwitchOn)}
                            />
                        </>

                        <Button mode="contained" onPress={handleSubmit}>
                            Submit
                        </Button>
                    </View>
                )}
            </Formik>
        </View>
    )
}

export default Form;

const styles = StyleSheet.create({
    formContainer: {
        // flex: 1,
        padding: 40
    }
})