import { SafeAreaView, ScrollView, View, StyleSheet } from "react-native";
import { Text, List, Button, Card, HelperText, ActivityIndicator } from "react-native-paper";
import { useSearchParams, useRouter, Stack, useNavigation } from "expo-router";
import { FlatList } from "react-native";
import useFetchInsert from "../../../../../../../hooks/useFetchInsert";
import useFetchHasura from "../../../../../../../hooks/useFetchHasura";

import { Field, Formik } from "formik";
// const patientData = {
//     patientInfo:
// }
const baseurl = "https://d3n5cqup9ur89e.cloudfront.net/v1";
const TOKEN =
  "Bearer eyJraWQiOiI1enlaOUVDZE1KTFVsZjhzWGtaM2tNRnBCV1hqSXMxTVM0bU9jSFZKZXhjPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2MTBhODQ1Yy1iOTkxLTQ3MzItYmExMi0xMGY1ZjJhMzUwMGQiLCJjb2duaXRvOmdyb3VwcyI6WyJBY2NvdW50QWRtaW4iXSwiZW1haWxfdmVyaWZpZWQiOnRydWUsImh0dHBzOlwvXC9oYXN1cmEuaW9cL2p3dFwvY2xhaW1zIjoie1wieC1oYXN1cmEtYWxsb3dlZC1yb2xlc1wiOltcIkFjY291bnRBZG1pblwiLFwiRGF0YU1hbmFnZXJcIixcIlByaW5jaXBhbEludmVzdGlnYXRvclwiLFwiU3BvbnNvckFkbWluXCIsXCJTdHVkeU1hbmFnZXJcIixcIlNwZWNpYWxpc3RcIixcIlNpdGVDb29yZGluYXRvclwiLFwiTm9Sb2xlXCJdLFwieC1oYXN1cmEtZGVmYXVsdC1yb2xlXCI6XCJBY2NvdW50QWRtaW5cIixcIngtaGFzdXJhLXVzZXItaWRcIjpcIjYxMGE4NDVjLWI5OTEtNDczMi1iYTEyLTEwZjVmMmEzNTAwZFwiLFwieC1oYXN1cmEtc3R1ZHljb25maWdzXCI6XCJ7MiwxLDMsNH1cIixcIngtaGFzdXJhLXNpdGVzXCI6XCJ7dGVzdC1zaXRlfVwifSIsImNvZ25pdG86cHJlZmVycmVkX3JvbGUiOiJhcm46YXdzOmlhbTo6OTIxMDM0ODIyNzU5OnJvbGVcL3VzZXJwb29sLWluZnJhZGV2LTItZGV2LVVzZXJQb29sQ29nbml0b0dyb3VwRGVmYXVsLTFSS1E5Q1k4U1hEREEiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0yLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMl9aaDJCRHNrRWMiLCJjb2duaXRvOnVzZXJuYW1lIjoidGVzdC1kZXYiLCJvcmlnaW5fanRpIjoiMWZhZjQ2ZDUtMDBlYy00Nzk0LTk5MTEtMzc3OTRhMmM2MTU5IiwiY29nbml0bzpyb2xlcyI6WyJhcm46YXdzOmlhbTo6OTIxMDM0ODIyNzU5OnJvbGVcL3VzZXJwb29sLWluZnJhZGV2LTItZGV2LVVzZXJQb29sQ29nbml0b0dyb3VwRGVmYXVsLTFSS1E5Q1k4U1hEREEiXSwiYXVkIjoiNDk0aHY0ZmFzZDM3c2Y4NjRqMDltbzltazkiLCJldmVudF9pZCI6IjE0NTIxOTg5LTU2Y2MtNDVjMy1hODk1LTAwYzQyODdjYjBkMyIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjkzMzk5OTEzLCJuYW1lIjoidGVzdCBkZXYiLCJleHAiOjE2OTM0MDM1MTIsImlhdCI6MTY5MzM5OTkxMywiZmFtaWx5X25hbWUiOiJ0ZXN0IGRldiIsImp0aSI6IjVjYmVlMjI4LThhNTQtNGU0OC1iNjczLWFjNWJjODFmOGM0ZSIsImVtYWlsIjoiYW5qYW5AY2xpbmVhZ2UuY29tIn0.nPIeBcB_4QejmaynglOvjgsHgqJNn2uEvuuMHUVEVq7lXiNB3bXP8rz2e_Serr0jO3IYcNh7FKeJykacm7g2woFrHOguUp1mM91Y1Qy6sPWTGL-rVwHFCRd9jvDelV03XzkOM-6gPjQzbn0nJE_32rCHn2Jn8Jkq8X-B1ViNysEdJxorESgtUEcCWVUJcVv_bEF0vcBq_lFVfWGo-YTTsWg0OSvQR1y3PXaSI6t1Gr6Zcf60fhj478Btsz6vLLT7J6vDdHT7icVBywfZJlff5szWCIa0cANhMZXuPFs2zrllCZtxAvphLlKOeq-NrZP28CR9obZ2FmufCzsAszFXrA";

import React, { useCallback, useEffect, useState } from "react";
import { TextInput, RadioButton, Checkbox } from "react-native-paper";
import * as Yup from "yup";
import axios from "axios";
import withCustomAuthenticator from "../../../../../../../hoc/withCustomAuthenticator";

const Form = ({
  data,
  ecaptureId,
  params,
  setCurrentEcaptureId,
  nextSreen,
  currentIndex,
  totalLength,
  router,
}) => {
  const navigate = useNavigation();
  const [open, setOpen] = useState(false);
  const [components, setComponents] = useState([]);
  const [validationObject, setValidationObj] = useState({});

  const [values, setValues] = useState({});

  let validationSchema = Yup.object().shape(validationObject);

  const { response, isLoading, error, refetch } = useFetchInsert(
    `/ecapture-manager/setup/ingestion`,
    {},
    "POST"
  );

  const handleSubmit = (values) => {
    // Handle form submission here
    values = preProcessData(values);
    console.log({ values });

    const body = {
      ecapture_data: {
        items: values,
      },
      studyconfig_id: params.studyId,
      patient_id: params.patientId,
      site_id: params.siteId,
      ecapture_id: params.ecaptureId,
      branch: params.branch,
      visit_id: params.visitId,
      unscheduled_visit: false,
      premature_cancellation: false,
      final: true,
    };

    refetch(body);
    setValues({})

    if (currentIndex == totalLength - 1) {
      navigate.goBack();
    } else {
      nextSreen();
    }
  };

  // const handleFinish = (values) => {
  //   // Handle form submission here
  //   console.log({ values });
  //   // nextSreen();
  // };

  const handleSave = async (values, validateForm, setTouched) => {
    // validate the form and get errors in case the form is not filled properly
    let errors = await validateForm(values);
    console.log({ errors });

    if (Object.keys(errors).length > 0){
      let touchedFields = {};
      for (const key in errors) {
        touchedFields[key] = true;
      }
      setTouched(touchedFields);
      return;
    }

    // PreProcess the values in order to change them to int or float based on data-type
    values = preProcessData(values);
    console.log({ values });

    // Handle form submission here

    const body = {
      ecapture_data: {
        items: values,
      },
      studyconfig_id: params.studyId,
      patient_id: params.patientId,
      branch: params.branch,
      site_id: params.siteId,
      ecapture_id: params.ecaptureId,
      visit_id: params.visitId,
      unscheduled_visit: false,
      premature_cancellation: false,
      final: false,
    };

    refetch(body);

    setValues({})
    navigate.goBack();
  };

  useEffect(() => {
    const ecptureData = data;
    const validation = {};
    const itemsData = {};
    const schema = {};

    console.log("data -> ", data);

    // Creating Validation Schema for Formik
    ecptureData?.components?.forEach((item, index) => {
      if (item.subcomponent.data_type == "string") {
        itemsData[`item${index + 1}`] = item.subcomponent.constraints.default ? item.subcomponent.constraints.default : "";
        schema[`item${index + 1}`] = Yup.string().required("This is a required field")
      } else if (item.subcomponent.data_type == "numeric") {
        itemsData[`item${index + 1}`] = item.subcomponent.constraints.default ? item.subcomponent.constraints.default : null;
        schema[`item${index + 1}`] = Yup.number().required("This is a required field")
      } else if (item.subcomponent.data_type == "enum") {
        itemsData[`item${index + 1}`] = item.subcomponent.constraints.default ? item.subcomponent.constraints.default : "";
        schema[`item${index + 1}`] = Yup.string().required("This is a required field")
      } else if (item.subcomponent.data_type == "int") {
        itemsData[`item${index + 1}`] = item.subcomponent.constraints.default ? item.subcomponent.constraints.default : null;
        schema[`item${index + 1}`] = Yup.number().required("This is a required field")
      } else {
        itemsData[`item${index + 1}`] = item.subcomponent.constraints.default ? item.subcomponent.constraints.default : [];
        schema[`item${index + 1}`] = Yup.array().required("This is a required field, select atleast one item").min(1, 'Select at least one item')
      }
    });

    const components = ecptureData?.components;
    console.log({ components });
    console.log({ itemsData })
    console.log({ schema })
    setComponents(components);
    setValidationObj(schema);

    let seasonsList = [];

    setValues(itemsData);
    console.log({ values });
    validationSchema = Yup.object().shape(validation);
  }, [data]);

  const MyInput = ({ field, form, ...props }) => {
    return <input {...field} {...props} />;
  };

  //   const handleChange = (e) => {
  //     setValues({ ...itemsData, [e.target.name]: e.target.value });
  //   };

  const handleToggle = (value, setFieldValue, list, index) => {
    if (list?.includes(value)) {
      const nextlist = list?.filter((item) => item !== value);
      // setValues({ ...values, [index]: nextlist });
      // handleChange(index, nextlist);
      setFieldValue(index, nextlist)
    } else {
      const nextlist = !list ? [value] : [...list, value];
      // setFieldValue([index], nextlist);
      // handleChange(index, nextlist);
      setFieldValue(index, nextlist)
      // setValues({ ...values, [index]: nextlist });
    }
  };

  console.log({ components });

  function preProcessData(values) {
    components.forEach((item, index) => {
      if (values[item.key] && item.subcomponent.data_type === "int") {
        values[item.key] = parseInt(values[item.key])
      } else if (values[item.key] && item.subcomponent.data_type === "numeric") {
        values[item.key] = parseFloat(values[item.key])
      }
    });

    return values;
  }

  return (
    <View style={styles.formContainer}>
      {data === undefined ?
        <View style={{ flex: 1, alignItems: 'center', gap: 10 }}>
          <Text>Nothing to capture here</Text>
          <Button mode="contained" onPress={() => navigate.goBack()}>Go Back</Button>
        </View>
        :
        Object.keys(values).length > 0 && Object.keys(validationObject).length > 0 ?
          <Formik
            initialValues={values}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            key={values}
          >
            {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched, validateForm, setTouched }) => (
              <View style={{ flex: 1, gap: 5 }}>
                {components?.map((item, index) => (

                  <div>
                    {" "}
                    {item.subcomponent.data_type == "string" && (
                      <View>
                        <Card style={styles.card}>
                          <TextInput
                            label={item.label}
                            key={`item${index + 1}`}
                            name={`item${index + 1}`}
                            value={values[`item${index + 1}`]}
                            onBlur={handleBlur(`item${index + 1}`)}
                            // onChangeText={(value) => {
                            //   handleChange(`item${index + 1}`, value, setFieldValue);
                            // }}
                            onChangeText={handleChange(`item${index + 1}`)}
                            error={touched[`item${index + 1}`] && errors[`item${index + 1}`]}
                          />
                        </Card>
                        {touched[`item${index + 1}`] && errors[`item${index + 1}`] && <HelperText type='error'>{errors[`item${index + 1}`]}</HelperText>}
                      </View>
                    )}
                    {item.subcomponent.data_type == "numeric" && (
                      <View>
                        <Card style={styles.card}>
                          <TextInput
                            label={item.label}
                            key={`item${index + 1}`}
                            name={`item${index + 1}`}
                            value={values[`item${index + 1}`]}
                            onBlur={handleBlur(`item${index + 1}`)}
                            // onChangeText={(value) => {
                            //   handleChange(`item${index + 1}`, parseFloat(value));
                            // }}
                            onChangeText={handleChange(`item${index + 1}`)}
                            error={touched[`item${index + 1}`] && errors[`item${index + 1}`]}
                          />
                        </Card>
                        {touched[`item${index + 1}`] && errors[`item${index + 1}`] && <HelperText type='error'>{errors[`item${index + 1}`]}</HelperText>}
                      </View>
                    )}
                    {item.subcomponent.data_type == "int" && (
                      <View>
                        <Card style={styles.card}>
                          <TextInput
                            label={item.label}
                            key={`item${index + 1}`}
                            name={`item${index + 1}`}
                            value={values[`item${index + 1}`]}
                            onBlur={handleBlur(`item${index + 1}`)}
                            // onChangeText={(value) => {
                            //   handleChange(`item${index + 1}`, parseInt(value));
                            //   // setFieldValue(`item${index + 1}`, parseInt(value));
                            // }}
                            onChangeText={handleChange(`item${index + 1}`)}
                            error={touched[`item${index + 1}`] && errors[`item${index + 1}`]}
                          />
                        </Card>
                        {touched[`item${index + 1}`] && errors[`item${index + 1}`] && <HelperText type='error'>{errors[`item${index + 1}`]}</HelperText>}
                      </View>
                    )}
                    {item.subcomponent.data_type == "enum" && (
                      <View style={{}}>
                        <Card style={styles.card}>
                          <Text style={styles.title}>{item.label}</Text>
                          <RadioButton.Group
                            onValueChange={(value) => {
                              handleChange(`item${index + 1}`)(value);
                            }}
                            value={values[`item${index + 1}`]}
                            onBlur={handleBlur(`item${index + 1}`)}
                            name={`item${index + 1}`}
                            key={`item${index + 1}`}
                            error={touched[`item${index + 1}`] && errors[`item${index + 1}`]}
                          >
                            {item.subcomponent.constraints.options.map((i) => (
                              <RadioButton.Item label={i} value={i} />
                            ))}
                          </RadioButton.Group>
                        </Card>
                        {touched[`item${index + 1}`] && errors[`item${index + 1}`] && <HelperText type='error'>{errors[`item${index + 1}`]}</HelperText>}
                      </View>
                    )}
                    {item.subcomponent.data_type == "multiselect" && (
                      <View>
                        <Card style={styles.card}>
                          <Text style={styles.title}>{item.label}</Text>

                          {item.subcomponent.constraints.options.map((option) => (
                            <View key={option}>
                              <Checkbox.Item
                                key={option}
                                name={option}
                                label={option}
                                onBlur={handleBlur(`item${index + 1}`)}
                                status={
                                  values[`item${index + 1}`]?.includes(option)
                                    ? "checked"
                                    : "unchecked"
                                }
                                onPress={() => {
                                  handleToggle(
                                    option,
                                    setFieldValue,
                                    values[`item${index + 1}`],
                                    `item${index + 1}`
                                  );
                                }}
                                error={touched[`item${index + 1}`] && errors[`item${index + 1}`]}
                              />
                            </View>
                          ))}
                        </Card>
                        {touched[`item${index + 1}`] && errors[`item${index + 1}`] && <HelperText type='error'>{errors[`item${index + 1}`]}</HelperText>}
                      </View>
                    )}
                  </div>
                ))}

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "5px",
                    margin: "5 auto",
                  }}
                >
                  <Button mode="contained" onPress={() => handleSave(values, validateForm, setTouched)}>
                    Save and exit
                  </Button>

                  <Button mode="contained" onPress={() => handleSubmit(values, "submit")}>
                    {currentIndex == totalLength - 1 ? "Finish" : "Submit and Continue"}
                  </Button>
                </div>
              </View>
            )}
          </Formik> :
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator animating={true} size='large' />
          </View>
      }
    </View>
  );
};

const Ecapture = () => {
  const [expanded, setExpanded] = useState(true);
  // const [isLoading, setLoading] = useState(true);
  // const [error, setError] = useState(false);
  const [ecaptureData, setEcaptureData] = useState([]);
  const [currentEcaptureId, setCurrentEcaptureId] = useState(0);
  const [currentEcapture, setCurrentEcaptureData] = useState({});

  const [currentIndex, setCurrentIndex] = useState(0);

  const router = useRouter();
  const params = useSearchParams();

  const handlePress = () => setExpanded(!expanded);

  const nextSreen = () => {
    const ind = ecaptureData.indexOf(currentEcapture);
    console.log({ ind });
    setCurrentEcaptureData(ecaptureData[ind + 1]);
    setCurrentIndex(ind + 1);
    setCurrentEcaptureId(ecaptureData[ind + 1].id);
  };

  // const {
  //   data,
  //   isLoading,
  //   error,
  //   refetch,

  // } = useFetchHasura(
  //   `/ecapture-manager/setup/`,
  //   {
  //     site_id: params.siteId,
  //     studyconfig_id: parseInt(params.studyId),
  //     patient_id: params.patientId,
  //     visit_id: parseInt(params.visitId),
  //     unscheduled_visit: false,
  //     premature_cancellation: false,
  //   },
  //   "POST",
  //   params.visitId
  // );

  const {
    data: ecapData,
    isLoading,
    error,
    refetch,
  } = useFetchInsert(
    `/ecapture-manager/config-setup/`,
    {
      site_id: params.siteId,
      studyconfig_id: parseInt(params.studyId),
      patient_id: params.patientId,
      branch: params.branch,
      visit_id: parseInt(params.visitId),
      unscheduled_visit: false,
      premature_cancellation: false,
    },
    "POST"
    // params.patientId
  );

  // const getData = async (endpoint, body, method) => {

  //   const options = {
  //     method: method,
  //     url: baseurl + endpoint,
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: TOKEN,
  //     },
  //     data: body,
  //   };
  //   try {
  //     const response = await axios.request(options);

  //     const ecapData = response.data;

  //     setEcaptureData(ecapData?.data?.ecapture_setup_config?.ecapturescreens);
  //     // console.log("ecaptureData", ecaptureData);
  //     const temp =
  //       ecapData?.data?.ecapture_setup_config?.ecapturescreens?.filter(
  //         (i) => i.id == parseInt(params.ecaptureId)
  //       )[0];
  //     setCurrentEcaptureData(temp);
  //     setCurrentIndex(
  //       ecapData?.data?.ecapture_setup_config?.ecapturescreens?.indexOf(temp)
  //     );
  //   } catch (err) {
  //     setError(true);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    if (params.visitId) {
      refetch({
        site_id: params.siteId,
        studyconfig_id: parseInt(params.studyId),
        patient_id: params.patientId,
        branch: params.branch,
        visit_id: parseInt(params.visitId),
        unscheduled_visit: false,
        premature_cancellation: false,
      });
      if (ecapData) {
        setEcaptureData(ecapData?.data?.ecapture_setup_config?.ecapturescreens);
        console.log("ecaptureData", ecapData);
        const temp =
          ecapData?.data?.ecapture_setup_config?.ecapturescreens?.filter(
            (i) => i.id == parseInt(params.ecaptureId)
          )[0];
        setCurrentEcaptureData(temp);
        setCurrentIndex(
          ecapData?.data?.ecapture_setup_config?.ecapturescreens?.indexOf(temp)
        );
      }

      setCurrentEcaptureId(params.ecaptureId);
    }
  }, [params, ecapData]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#ebedf8",
      }}
    >
      <Stack.Screen
        options={{
          headerTitle: "Ecapture Screen",
        }}
      ></Stack.Screen>

      {isLoading ? (
        <>Loading...</>
      ) : error ? (
        <>Something went wrong...</>
      ) : (
        <ScrollView>
          <View style={{ flex: 1, padding: 20 }}>
            <Form
              data={currentEcapture}
              ecaptureId={currentEcaptureId}
              params={params}
              setCurrentEcaptureId={setCurrentEcaptureId}
              nextSreen={nextSreen}
              currentIndex={currentIndex}
              totalLength={ecaptureData.length}
              router={router}
            />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const PatientInfo = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      title: "Card 1",
      content: "This is the content of card 1",
    },
    {
      id: 2,
      title: "Card 2",
      content: "This is the content of card 2",
    },
    {
      id: 3,
      title: "Card 3",
      content: "This is the content of card 3",
    },
    {
      id: 2,
      title: "Card 2",
      content: "This is the content of card 2",
    },
    {
      id: 3,
      title: "Card 3",
      content: "This is the content of card 3",
    },
    {
      id: 2,
      title: "Card 2",
      content: "This is the content of card 2",
    },
    {
      id: 3,
      title: "Card 3",
      content: "This is the content of card 3",
    },
  ]);

  return (
    <View>
      <View style={{ width: "100%", alignItems: "center", padding: 10 }}>
        <Text style={{ fontWeight: "bold" }} variant="titleMedium">
          Patient Info
        </Text>
      </View>
      <View style={{ flex: 1, backgroundColor: "#fff", borderRadius: 5 }}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <FlatList
            horizontal={true}
            data={cards}
            keyExtractor={(item) => item.id.toString()}
            style={{ padding: 10 }}
            renderItem={({ item }) => <PatientInfoItem />}
          />
        </ScrollView>
      </View>
    </View>
  );
};

const PatientInfoItem = () => {
  return (
    <Card style={{ marginRight: 10 }}>
      <Card.Title
        title="Patient ID"
        subtitle="Charles Heston"
        titleVariant="titleMedium"
        subtitleVariant="labelLarge"
      />
    </Card>
  );
};

const VisitInfo = () => {
  const params = useSearchParams();

  const {
    data: visitData,
    isLoading,
    error,
    refetch,
  } = useFetchInsert(
    `/study-manager/${params.studyId}/patients/${params.patientId}/visit-info`,
    { site_id: params.siteId },
    "POST"
  );

  useEffect(() => {
    if (params.siteId) {
      refetch();
    }
    console.log("visit info", visitData?.visits_details);
  }, [params.siteId]);

  return (
    <View>
      <View
        style={{
          width: "100%",
          alignItems: "center",
          padding: 10,
          paddingTop: 20,
        }}
      >
        <Text style={{ fontWeight: "bold" }} variant="titleMedium">
          Visit Info
        </Text>
      </View>

      {isLoading ? (
        <>Loading...</>
      ) : error ? (
        <>Something wrong</>
      ) : (
        <ScrollView>
          {visitData?.visits_details?.map((item) => (
            <ListSection
              id={item.id}
              name={item.name}
              ecaptures_preview={item.ecaptures_preview}
              status={item.status}
            />
          ))}

          {/* <ListSection />
                <ListSection />
                <ListSection /> */}
        </ScrollView>
      )}
    </View>
  );
};

const ListSection = ({ id, name, ecaptures_preview, status }) => {
  const [expanded, setExpanded] = useState(true);

  const handlePress = () => setExpanded(!expanded);

  return (
    <View>
      <List.Section style={{ borderRadius: 100 }}>
        <List.Accordion
          title={name}
          description={status}
          titleStyle={{ fontWeight: "bold" }}
          // left={props => <List.Icon {...props} icon="folder" />}
          id={id}
          expanded={expanded}
          onPress={handlePress}
          style={{ backgroundColor: "#fff" }}
        >
          <View
            style={{ flex: 1, backgroundColor: "#fff", gap: 10, padding: 10 }}
          >
            {/* {ecaptures_preview?.length} */}
            {ecaptures_preview?.map((item) => (
              <ListItem
                title={item.title}
                status={item.status}
                ecapture_id={item.ecapture_id}
                visit_id={id}
              />
            ))}
            {/* <ListItem />
                        <ListItem /> */}
          </View>
        </List.Accordion>
      </List.Section>
    </View>
  );
};

const ListItem = ({ title, status, ecapture_id, visit_id }) => {
  const router = useRouter();
  return (
    <Card style={{ backgroundColor: "#fff" }}>
      <List.Item
        title={title}
        description={`status: ${status}`}
        right={(props) => (
          <Button
            disabled={status == "Completed" ? true : false}
            mode="contained"
            style={{ borderRadius: 5 }}
            onPress={() => router.push("ecapture")}
          >
            {status == "Completed"
              ? "Complete"
              : status == "In Progress"
                ? "Resume"
                : "Start"}
          </Button>
        )}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {},

  formContainer: {
    // flex: 1,
    padding: 40,
  },
  title: { fontWeight: "bold", margin: 10 },
  card: {
    margin: 10,
  },
});

export default withCustomAuthenticator(Ecapture);
