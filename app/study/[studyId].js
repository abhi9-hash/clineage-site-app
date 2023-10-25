import { useEffect, useState } from "react";
import {
  DataTable,
  Text,
  Button,
  Searchbar,
  Modal,
  Portal,
  PaperProvider,
  TextInput,
  RadioButton,
  HelperText,
  Card,
} from "react-native-paper";
import { StyleSheet, ScrollView, View } from "react-native";
import { Stack, useRouter, useSearchParams } from "expo-router";
import useFetchHasura from "../../hooks/useFetchHasura";
import useFetchInsert from "../../hooks/useFetchInsert";
import withCustomAuthenticator from "../../hoc/withCustomAuthenticator";
import { Formik } from "formik";
import * as Yup from "yup";

// const studyData = {
//   studyName: "Ally Registry Track 1- 6 weeks",
//   studyDescription:
//     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at ultrices urna. Integer tincidunt ligula vel semper consectetur.",
//   studyId: "Ally8-v0",
//   sponser: "LENSER, Inc",
//   patientData: [
//     {
//       patientID: "james wat",
//       patientInitial: "CFG",
//       lastVisited: "POST-Op D1",
//       physicianName: "waltan",
//     },
//     {
//       patientID: "james wat",
//       patientInitial: "CFG",
//       lastVisited: "POST-Op D1",
//       physicianName: "waltan",
//     },
//     {
//       patientID: "james wat",
//       patientInitial: "CFG",
//       lastVisited: "POST-Op D1",
//       physicianName: "waltan",
//     },
//     {
//       patientID: "james wat",
//       patientInitial: "CFG",
//       lastVisited: "POST-Op D1",
//       physicianName: "waltan",
//     },
//     {
//       patientID: "james wat",
//       patientInitial: "CFG",
//       lastVisited: "POST-Op D1",
//       physicianName: "waltan",
//     },
//     {
//       patientID: "james wat",
//       patientInitial: "CFG",
//       lastVisited: "POST-Op D1",
//       physicianName: "waltan",
//     },
//     {
//       patientID: "james wat",
//       patientInitial: "CFG",
//       lastVisited: "POST-Op D1",
//       physicianName: "waltan",
//     },
//     {
//       patientID: "james wat",
//       patientInitial: "CFG",
//       lastVisited: "POST-Op D1",
//       physicianName: "waltan",
//     },
//     {
//       patientID: "james wat",
//       patientInitial: "CFG",
//       lastVisited: "POST-Op D1",
//       physicianName: "waltan",
//     },
//     {
//       patientID: "james wat",
//       patientInitial: "CFG",
//       lastVisited: "POST-Op D1",
//       physicianName: "waltan",
//     },
//     {
//       patientID: "james wat",
//       patientInitial: "CFG",
//       lastVisited: "POST-Op D1",
//       physicianName: "waltan",
//     },
//     {
//       patientID: "james wat",
//       patientInitial: "CFG",
//       lastVisited: "POST-Op D1",
//       physicianName: "waltan",
//     },
//     {
//       patientID: "james wat",
//       patientInitial: "CFG",
//       lastVisited: "POST-Op D1",
//       physicianName: "waltan",
//     },
//     {
//       patientID: "james wat",
//       patientInitial: "CFG",
//       lastVisited: "POST-Op D1",
//       physicianName: "waltan",
//     },
//     {
//       patientID: "james wat",
//       patientInitial: "CFG",
//       lastVisited: "POST-Op D1",
//       physicianName: "waltan",
//     },
//     {
//       patientID: "james wat",
//       patientInitial: "CFG",
//       lastVisited: "POST-Op D1",
//       physicianName: "waltan",
//     },
//     {
//       patientID: "james wat",
//       patientInitial: "CFG",
//       lastVisited: "POST-Op D1",
//       physicianName: "waltan",
//     },
//   ],
// };

const StudyContainer = () => {
  const router = useRouter();
  const params = useSearchParams();

  console.log({ params });
  //   if (params.studyId) {
  const {
    data: patientData,
    isLoading: patientLoading,
    error: patientError,
    refetch: patientCall,
  } = useFetchInsert(`/study-manager/${params.studyId}/patients`, {}, "POST");

  const {
    data: studyData,
    isLoading: studyLoading,
    error: studyError,
    refetch: studyCall,
  } = useFetchInsert(`/study-manager/${params.studyId}/`, {}, "POST");

  if (params.studyId) {
    patientCall();
    studyCall();
  }
  //   }

  console.log({ patientData, studyData });

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Study",
        }}
      ></Stack.Screen>
      {patientLoading || studyLoading ? (
        <>Loading...</>
      ) : studyError || patientError ? (
        <>Something went wrong</>
      ) : (
        //  <></>
        <Study
          studyName={studyData?.study?.studyblueprint?.study?.study_name}
          studyDescription={
            studyData?.study?.studyblueprint?.study?.description
          }
          studyID={studyData?.study?.studyblueprint?.study?.id}
          sponser={studyData?.study?.studyblueprint?.study?.sponsor}
          patientData={patientData?.content}
          schema={patientData?.schema}
          router={router}
          studyData={studyData}
        />
      )}
    </>
  );
};

const Study = ({
  studyName,
  studyDescription,
  studyID,
  sponser,
  patientData,
  schema,
  router,
  studyData,
}) => {
  const [visible, setVisible] = useState(false);
  const [studyEye, setStudyEye] = useState("OD");
  const [patientID, setPatientID] = useState("");
  const [newPatient, setNewPatient] = useState({});
  const [values, setvalues] = useState({});
  const handleChange = (name, value) => {
    setNewPatient({ ...newPatient, [name]: value });
  };

  const params = useSearchParams();

  const [validationObject, setValidationObj] = useState({});

  let validationSchema = Yup.object().shape(validationObject);

  useEffect(() => {
    if (schema) {
      const validation = {};
      const itemsData = {};
      const validateSchema = {};

      // Creating Validation Schema for Formik
      schema?.forEach((item, index) => {
        if (item.type == "string") {
          itemsData[item.id] = "";
          validateSchema[item.id] = Yup.string().required(
            "This is a required field"
          );
        } else if (item.type == "numeric") {
          itemsData[item.id] = null;
          validateSchema[item.id] = Yup.number().required(
            "This is a required field"
          );
        } else if (item.type == "timestamp" || item.type == "date") {
          itemsData[item.id] = "";
          validateSchema[item.id] = Yup.string().required(
            "This is a required field"
          );
        } else if (item.type == "enum") {
          itemsData[item.id] = "";
          validateSchema[item.id] = Yup.string().required(
            "This is a required field"
          );
        } else if (item.type == "int") {
          itemsData[item.id] = null;
          validateSchema[item.id] = Yup.number().required(
            "This is a required field"
          );
        } else {
          itemsData[item.id] = [];
          validateSchema[item.id] = Yup.array()
            .required("This is a required field, select atleast one item")
            .min(1, "Select at least one item");
        }
      });

      console.log({ itemsData });
      setValidationObj(validateSchema);

      let seasonsList = [];

      setNewPatient(itemsData);
      setvalues(itemsData);
      // console.log({ values });
      validationSchema = Yup.object().shape(validation);
    }
  }, [schema]);

  function preProcessData(values) {
    console.log({ schema }, { values });
    schema?.forEach((item, index) => {
      if (values[item.id] && item.type === "int") {
        values[item.id] = parseInt(values[item.id]);
      } else if (values[item.id] && item.type === "numeric") {
        values[item.id] = parseFloat(values[item.id]);
      }
    });

    return values;
  }

  const [patientIDError, setPatientIDError] = useState(false);
  const [patientInitialsError, setPatientInitialsError] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const theme = {};

  const isFormErrorProff = () => {
    // if (patientID === "Ashok") {
    //   setPatientIDError(true);
    //   return false;
    // }
    // setPatientIDError(false);
    // if (patientInitials === "Ashok") {
    //   setPatientInitialsError(true);
    //   return false;
    // }
    // setPatientInitialsError(false);

    return true;
  };

  const { response, isLoading, error, refetch } = useFetchInsert(
    `/study-manager/${params.studyId}/patients/create/`,
    {},
    "POST"
  );

  const func = async (values) => {
    const body = {
      patient_data: preProcessData(values),
    };

    console.log("before");
    await refetch(body);
    console.log("after");

    setNewPatient({});
    setvalues({});
    // if (currentIndex == totalLength - 1) {
    // navigate.goBack();
    hideModal();

    router.push(`/study/${params.studyId}`);

    // } else {
    //   nextSreen();
    // }
  };

  const handleSubmit = (values) => {
    // Handle form submission here
    func(values);
  };
  return (
    <PaperProvider theme={theme}>
      <View style={styles.studyContainer}>
        <View style={styles.topContainer}>
          <View style={styles.nameDescription}>
            <Text style={styles.studyName}>{studyName}</Text>
            <Text style={styles.studyDescription}>{studyDescription}</Text>
          </View>
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              <Text style={styles.cardText}>Study ID</Text>
              <Text style={styles.cardText}>{studyID}</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardText}>Sponsor</Text>
              <Text style={styles.cardText}>{sponser}</Text>
            </View>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.tableTopContainer}>
            {/* <Searchbar
                        mode='view'
                        placeholder="Search"
                        onChangeText={(query) => { setSearchInput(query) }}
                        value={searchInput}
                        style={styles.searchBar}
                    /> */}
            <Button
              mode="contained"
              onPress={() => showModal()}
              style={styles.btnAddNewPatient}
            >
              + Add New Patient
            </Button>
          </View>
          <View style={styles.tableContainer}>
            <View style={styles.tableName}>
              <Text style={styles.tableNameText}>Patients Table</Text>
            </View>
            <PatientTable
              patientData={patientData}
              router={router}
              studyData={studyData}
            />
          </View>
        </View>
        {/* {visible&&<Form schema={schema} params={params} router={router}/>} */}

        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={styles.modal}
          >
            <Formik
              initialValues={values}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
              key={values}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                values,
                errors,
                touched,
                validateForm,
                setTouched,
              }) => (
                <View style={styles.modalInnerWrapper}>
                  <View style={styles.modalHeadingContainer}>
                    <Text variant="headlineSmall">Add New Patient</Text>
                  </View>
                  {/* <div styles={{marginTop:'100rem'}}>{" "}</div> */}
                  <View style={styles.modalTextInputContainer}>
                    {/* {patientData?.schema?.length} */}
                    {schema?.map((field) => (
                      <>
                        {field.type == "timestamp" && (
                          <View>
                            <Card style={styles.Card}>
                              <TextInput
                                label={field.name}
                                key={field.id}
                                name={field.id}
                                value={values[field.id]}
                                onChangeText={handleChange(field.id)}
                                onBlur={handleBlur(field.id)}
                                error={touched[field.id] && errors[field.id]}
                              />{" "}
                            </Card>
                            {touched[field.id] && errors[field.id] && (
                              <HelperText type="error">
                                {errors[field.id]}
                              </HelperText>
                            )}
                          </View>
                        )}

                        {field.type == "string" && (
                          <View>
                            <Card style={styles.Card}>
                              <TextInput
                                label={field.name}
                                key={field.id}
                                name={field.id}
                                value={values[field.id]}
                                onChangeText={handleChange(field.id)}
                                onBlur={handleBlur(field.id)}
                                error={touched[field.id] && errors[field.id]}
                              />{" "}
                            </Card>
                            {touched[field.id] && errors[field.id] && (
                              <HelperText type="error">
                                {errors[field.id]}
                              </HelperText>
                            )}
                          </View>
                        )}
                        {field.type == "date" && (
                          <View>
                            <Card style={styles.Card}>
                              <TextInput
                                label={field.name}
                                key={field.id}
                                name={field.id}
                                value={values[field.id]}
                                onChangeText={handleChange(field.id)}
                                onBlur={handleBlur(field.id)}
                                error={touched[field.id] && errors[field.id]}
                              />{" "}
                            </Card>
                            {touched[field.id] && errors[field.id] && (
                              <HelperText type="error">
                                {errors[field.id]}
                              </HelperText>
                            )}
                          </View>
                        )}

                        {field.type == "int" && (
                          <View>
                            <Card style={styles.Card}>
                              <TextInput
                                label={field.name}
                                key={field.id}
                                name={field.id}
                                value={values[field.id]}
                                onChangeText={handleChange(field.id)}
                                onBlur={handleBlur(field.id)}
                                error={touched[field.id] && errors[field.id]}
                              />{" "}
                            </Card>
                            {touched[field.id] && errors[field.id] && (
                              <HelperText type="error">
                                {errors[field.id]}
                              </HelperText>
                            )}
                          </View>
                        )}
                        {field.type == "enum" && (
                          <View style={{}}>
                            <Card style={styles.Card}>
                              <Text style={styles.title}>{field.name}</Text>
                              <RadioButton.Group
                                onValueChange={(value) => {
                                  handleChange(field.id)(value);
                                }}
                                onBlur={handleBlur(field.id)}
                                error={touched[field.id] && errors[field.id]}
                                value={values[field.id]}
                                key={field.id}
                                name={field.id}
                              >
                                {field.options.map((i) => (
                                  <RadioButton.Item label={i} value={i} />
                                ))}
                              </RadioButton.Group>
                            </Card>
                            {touched[field.id] && errors[field.id] && (
                              <HelperText type="error">
                                {errors[field.id]}
                              </HelperText>
                            )}
                          </View>
                        )}

                        {field.type == "bool" && (
                          <View style={{}}>
                            <Card style={styles.Card}>
                              <Text style={styles.title}>{field.name}</Text>
                              <RadioButton.Group
                                onChangeText={handleChange(field.id)}
                                onBlur={handleBlur(field.id)}
                                error={touched[field.id] && errors[field.id]}
                                value={values[field.id]}
                                key={field.id}
                                name={field.id}
                              >
                                <RadioButton.Item label={"True"} value={true} />
                                <RadioButton.Item
                                  label={"False"}
                                  value={false}
                                />
                              </RadioButton.Group>
                            </Card>
                            {touched[field.id] && errors[field.id] && (
                              <HelperText type="error">
                                {errors[field.id]}
                              </HelperText>
                            )}
                          </View>
                        )}
                      </>
                    ))}
                  </View>
                  <Button
                    mode="contained"
                    onPress={() => {
                      handleSubmit();
                      // if (isFormErrorProff()) {
                      //   handleSubmit();
                      //   // hideModal();
                      // }
                    }}
                    style={styles.btnAddNewPatient}
                  >
                    Submit
                  </Button>
                </View>
              )}
            </Formik>
          </Modal>
        </Portal>
      </View>
    </PaperProvider>
  );
};

const PatientTable = ({ patientData, router, studyData }) => {
  const [items, setItems] = useState(patientData);
  const params = useSearchParams();

  return (
    <ScrollView>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Patient ID</DataTable.Title>
          <DataTable.Title>Patient Initials</DataTable.Title>
          <DataTable.Title>Last Visit</DataTable.Title>
          <DataTable.Title>physicianName</DataTable.Title>
        </DataTable.Header>
        {items?.map((item, index) => (
          <DataTable.Row
            key={index}
            style={{ backgroundColor: "#ffffff" }}
            onPress={() => {
              if (studyData?.study?.studyblueprint?.escreening) {
                if (!item.screened_at)
                  router.push(
                    `/escreening/${params.studyId}/${item.site_id}/${item.id}/${item.branch}/0`
                  );
                else
                  router.push(
                    `/patient/${params.studyId}/${item.site_id}/${item.branch}/${item.id}`
                  );
              } else {
                router.push(
                  `/patient/${params.studyId}/${item.site_id}/${item.branch}/${item.id}`
                );
              }
            }}
          >
            <DataTable.Cell>{item.id}</DataTable.Cell>
            <DataTable.Cell>{item.patient_initials}</DataTable.Cell>
            <DataTable.Cell>{item.last_visit}</DataTable.Cell>
            <DataTable.Cell>{item.physician_name}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  studyContainer: {
    flex: 1,
    backgroundColor: "#000",
    color: "#fff",
  },
  Card: {
    margin: 10,
  },
  topContainer: {
    flex: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#052743",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 50,
    paddingRight: 50,
  },
  nameDescription: {
    flex: 1,
    width: "60%",
  },
  studyName: {
    color: "#fff",
    fontSize: 25,
    paddingBottom: 10,
  },
  studyDescription: {
    color: "#fff",
  },
  cardContainer: {
    flex: 1,
    // alignItems: "flex-end",
    flexDirection: "row-reverse",
    gap: 5,
    width: "40%",
  },
  card: {
    padding: 10,
    backgroundColor: "#052743",
    borderRadius: 5,
  },
  cardText: {
    color: "#fff",
  },
  bottomContainer: {
    flex: 80,
    backgroundColor: "#f5f9fc",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 50,
    paddingRight: 50,
  },
  tableTopContainer: {
    flex: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 10,
  },
  tableContainer: {
    flex: 90,
  },
  searchBar: {},
  btnAddNewPatient: {
    borderRadius: 5,
    backgroundColor: "#12CCB6",
    color: "#ffffff",
  },
  tableName: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: "#ffffff",
    padding: 15,
  },
  tableNameText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  modal: {
    backgroundColor: "#fff",
    // backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    overflow: "scroll",
  },
  modalInnerWrapper: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop:'10vh',
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    width: "100vw",
  },
  modalHeadingContainer: {
    padding: 10,
    marginBottom: "35rem",
    width: "100vw",
  },
  modalTextInputContainer: {
    padding: 10,
    width: "80vw",
    // marginTop: "-40vh",
  },
  modalTextInput: {
    marginBottom: 10,
    width: "80vw",
  },
  modalRadioButtonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  formContainer: {
    // flex: 1,
    padding: 40,
  },
  title: { margin: 5 },
});

export default withCustomAuthenticator(StudyContainer);
