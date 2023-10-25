import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  TextInput,
  Button,
  RadioButton,
  HelperText,
  Text,
  Switch,
  Checkbox,
} from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import { Field, Formik } from "formik";
import * as Yup from "yup";

const Form = ({ data}) => {
  const [open, setOpen] = useState(false);
  const [components, setComponents] = useState([]);

  const [values, setValues] = useState({});
  const [items, setItems] = useState([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
  ]);

  let validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name cannot exceed 10 characters"),
    age: Yup.number()
      .required("Age is required")
      .min(18, "Age must be at least 18")
      .max(120, "Age cannot exceed 100"),
    gender: Yup.string().required("Gender is required"),
    countries: Yup.array().min(1, "Select at least one country"),
    fruit: Yup.string().required("Must select one fruit type"),
  });

  const handleSubmit = (values) => {
    // Handle form submission here
    console.log({values});


  };


  useEffect(() => {
    const countryList = ["India", "USA", "Canada", "UK"];

    const ecptureData = data
    //  {
    //   id: 0,
    //   title: "Medical And Ocular History t8-v0",
    //   savable: true,
    //   components: [
    //     {
    //       type: "CLINeCapCellView",
    //       optional: false,
    //       label:
    //         "Ocular History - Check all that apply. Has the patient ever been diagnosed with any of the following?",
    //       key: "item1",
    //       subcomponent: {
    //         type: "CLINFieldString",
    //         data_type: "string",
    //         constraints: {
    //           default: null,
    //         },
    //       },
    //       formikRef: "item1",
    //     },
    //     {
    //       type: "CLINeCapCellView",
    //       optional: true,
    //       label: "If other, specify",
    //       key: "item2",
    //       subcomponent: {
    //         type: "CLINCheckEnum",
    //         data_type: "multiselect",
    //         constraints: {
    //           options: [
    //             "Diabetes",
    //             "High blood pressure",
    //             "High cholesterol",
    //             "Thyroid disease",
    //             "Multiple Sclerosis (MS)",
    //             "Arthritis",
    //             "Cancer, specify:",
    //             "Other, specify:",
    //             "None",
    //           ],
    //           default: null,
    //         },
    //       },
    //       formikRef: "item2",
    //     },
    //     {
    //       type: "CLINeCapCellView",
    //       optional: false,
    //       label:
    //         "Medical History -Check all that apply. Has the patient ever been diagnosed with any of the following?",
    //       key: "item3",
    //       subcomponent: {
    //         type: "CLINFieldString",
    //         data_type: "string",
    //         constraints: {
    //           default: null,
    //         },
    //       },
    //       formikRef: "item3",
    //     },
    //     {
    //       type: "CLINeCapCellView",
    //       optional: true,
    //       label: "If cancer, specify",
    //       key: "item4",
    //       subcomponent: {
    //         type: "CLINFieldString",
    //         data_type: "string",
    //         constraints: {
    //           default: null,
    //         },
    //       },
    //       formikRef: "item4",
    //     },
    //     {
    //       type: "CLINeCapCellView",
    //       optional: true,
    //       label: "If other, specify",
    //       key: "item5",
    //       subcomponent: {
    //         type: "CLINFieldString",
    //         data_type: "string",
    //         constraints: {
    //           default: null,
    //         },
    //       },
    //       formikRef: "item5",
    //     },
    //   ],
    //   screen_id: true,
    // };

    const validation = {}

    const itemsData = {};
    ecptureData.components.forEach((item, index) => {
      if (item.subcomponent.data_type == "string"){
        itemsData[`item${index + 1}`] = "";
    }
      else if (item.subcomponent.data_type == "number"){

        itemsData[`item${index + 1}`] = null;
      }else if (item.subcomponent.data_type == "enum"){

        itemsData[`item${index + 1}`] = "";
      }else {
        itemsData[`item${index + 1}`] = [];
   } });

    const components = ecptureData.components;
    setComponents(components);

    let seasonsList = [];

    setValues(itemsData);
    validationSchema = Yup.object().shape(validation);
  }, []);

  // seasons.forEach((item, index) => {
  //     item.subcomponent.data_type=='string'&&
  //     seasonsList.push(<View>
  //     <TextInput
  //         label="age"
  //         value={values.age}
  //         onBlur={handleBlur('age')}
  //         onChangeText={handleChange('age')}
  //         error={touched.age && errors.age}
  //     />
  //     {touched.age && <HelperText type='error'>{errors.age}</HelperText>}
  //     </View>)

  //     item.subcomponent.data_type=='number'&&
  //     seasonsList.push(<View>
  //     <TextInput
  //         label={item.label}
  //         key={`item${index+1}`}
  //         name={`item${index+1}`}
  //         value= {values[`item${index+1}`]}
  //         onBlur={handleBlur([`item${index+1}`])}
  //         onChangeText={handleChange(`item${index+1}`)}
  //         error={touched[`item${index+1}`] && errors[`item${index+1}`]}
  //     />
  //     {touched[`item${index+1}`] && <HelperText type='error'>{errors[`item${index+1}`]}</HelperText>}
  //     </View>)

  //     item.subcomponent.data_type=='enum'&&
  //     seasonsList.push(<View style={{}}>
  //         <Text>{item.label}</Text>
  //        <RadioButton.Group
  //             onValueChange={(value) => handleChange([`item${index+1}`])(value)}
  //             value={values[`item${index+1}`]}
  //             onBlur={handleBlur([`item${index+1}`])}
  //             name={`item${index+1}`}
  //             key={`item${index+1}`}
  //         >
  //             {item.subcomponent.constraints.options.map((i)=><RadioButton.Item label={i} value={i} />)}
  //         </RadioButton.Group>
  //         </View>)

  //     item.subcomponent.data_type=='multiselect'&&
  //     seasonsList.push(<View>
  //         <Text>{item.label}</Text>
  //             {item.subcomponent.constraints.options.map((option) => (
  //                 <View key={option} >
  //                 <Checkbox.Item
  //                     key={`item${index+1}`}
  //                     name={`item${index+1}`}
  //                     label={option}
  //                     status={values[`item${index+1}`].includes(option) ? 'checked' : 'unchecked'}
  //                     onPress={handleCountryToggle(option, setFieldValue, values[`item${index+1}`])}
  //                 />
  //                 </View>
  //             ))}
  //     {touched[`item${index+1}`] && <HelperText type='error'>{errors[`item${index+1}`]}</HelperText>}
  //     </View>)
  // }
  // );

  const MyInput = ({ field, form, ...props }) => {
    return <input {...field} {...props} />;
  };

//   const handleChange = (e) => {
//     setValues({ ...itemsData, [e.target.name]: e.target.value });

//   };


  const handleToggle = useCallback(
    (value, setFieldValue, list, index) => () => {
        if (list?.includes(value)) {
            const nextlist = list?.filter((item) => item !== value);
            setFieldValue([index], nextlist);
        } else {
            const nextlist = !list?[value]:[...countries, value];
            setFieldValue([index], nextlist);
        }
    },
    []
);

  return (
    <View style={styles.formContainer}>
      <Formik
        initialValues={values}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {/* {components.length} */}
        {/* {components?.map(i=>JSON.stringify(i))} */}
        {({ handleChange, handleBlur, handleSubmit,setFieldValue, values, errors, touched }) => (
        <View style={{ flex: 1, gap: 5 }}>
          {/* <Field name="lastName" key="lastname" placeholder="Doe" component={MyInput} /> */}

          {components?.map((item, index) => (
            //    ( <div>{JSON.stringify(item)}</div>)
            // <Field name="lastName" key="lastname" placeholder="Doe" component={MyInput} />

            <div>
              {" "}
              {item.subcomponent.data_type == "string"&&
              <View>
                <TextInput
                  label={item.label}
                  key={`item${index + 1}`}
                  name={`item${index + 1}`}
                  value={values[`item${index + 1}`]}
                //   onBlur={handleBlur([`item${index+1}`])}
                  onChangeText={handleChange}
                //   error={touched[`item${index+1}`] && errors[`item${index+1}`]}
                />
                {/* {touched[`item${index+1}`] && <HelperText type='error'>{errors[`item${index+1}`]}</HelperText>} */}
              </View>}
              {item.subcomponent.data_type == "number" &&
              <View>
                <TextInput
                  label={item.label}
                  key={`item${index + 1}`}
                  name={`item${index + 1}`}
                  value={values[`item${index + 1}`]}
                //   onBlur={handleBlur([`item${index+1}`])}
                  onChangeText={handleChange}
                //   error={touched[`item${index+1}`] && errors[`item${index+1}`]}
                />
                {/* {touched[`item${index+1}`] && <HelperText type='error'>{errors[`item${index+1}`]}</HelperText>} */}
              </View>}
              {item.subcomponent.data_type == "enum" &&(
              <View style={{}}>
                <Text>{item.label}</Text>
                <RadioButton.Group
                  onValueChange={handleChange}
                  value={values[`item${index + 1}`]}
                //   onBlur={handleBlur([`item${index+1}`])}
                  name={`item${index + 1}`}
                  key={`item${index + 1}`}
                >
                  {item.subcomponent.constraints.options.map((i) => (
                    <RadioButton.Item label={i} value={i} />
                  ))}
                </RadioButton.Group>
              </View>
              ) }
              {item.subcomponent.data_type=='multiselect'&&
              <View>
                <Text>{item.label}</Text>
                {item.subcomponent.constraints.options.map((option) => (
                  <View key={option}>
                    <Checkbox.Item
                      key={option}
                      name={option}
                      label={option}
                      status=
                      {
                        values[`item${index + 1}`]?.includes(option)
                          ? "checked"
                          : "unchecked"
                      }
                      onPress={handleToggle(
                        option,
                        setFieldValue,
                        values[`item${index + 1}`],
                        `item${index + 1}`
                      )}
                    />
                  </View>
                ))}
                {/* {touched[`item${index+1}`] && <HelperText type='error'>{errors[`item${index+1}`]}</HelperText>} */}
              </View>}
            </div>
          ))}

          {/* // <>
                        //     <Text>Subscribe:</Text>
                        //     <Switch
                        //         value={values.isSwitchOn}
                        //         onValueChange={() => setFieldValue('isSwitchOn', !values.isSwitchOn)}
                        //     />
                        // </> */}

          <Button mode="contained" onPress={handleSubmit}>
            Submit
          </Button>
        </View>
        )} 
      </Formik>
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({
  formContainer: {
    // flex: 1,
    padding: 40,
  },
});
