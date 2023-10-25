import { SafeAreaView, ScrollView, View, StyleSheet } from "react-native";
import { Text, List, Button, Card } from "react-native-paper";
import { useSearchParams, useRouter, Stack, useNavigation } from "expo-router";
import { FlatList } from "react-native";
import useFetchInsert from "../../../../../../hooks/useFetchInsert";
import useFetchHasura from "../../../../../../hooks/useFetchHasura";

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
import withCustomAuthenticator from "../../../../../../hoc/withCustomAuthenticator";

const Form = ({
  data,
  escreeningId,
  params,
  setCurrentEscreeningId,
  nextSreen,
  currentIndex,
  totalLength,
  router,
}) => {
  const navigate = useNavigation();
  const [open, setOpen] = useState(false);
  const [components, setComponents] = useState([]);

  const [values, setValues] = useState({});
  const [items, setItems] = useState([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
  ]);

  const { response, isLoading, error, refetch } = useFetchInsert(
    `/escreening-manager/ingestion/`,
    {},
    "POST"
  );

  const func = async () => {
    try {
      const body = {
        escreening_data: {
          items: values,
        },
        studyconfig_id: parseInt(params.studyId),
        patient_id: params.patientId,
        branch: params.branch,
        site_id: params.siteId,
        escreening_id: parseInt(escreeningId),
        unscheduled_visit: false,
        premature_cancellation: false,
      };

      console.log("before refetch");
      await refetch(body, true);
      console.log("after refetch");
    } catch (err) {
      console.log("error");
    }

    if (currentIndex == totalLength - 1) {
      router.push(
        `patient/${params.studyId}/${params.siteId}/${params.branch}/${params.patientId}/`
      );
    } else {
      nextSreen();
    }
  };

  const handleSubmit = () => {
    // Handle form submission here
    func();
    console.log({ values });
  };

  useEffect(() => {
    const countryList = ["India", "USA", "Canada", "UK"];

    // const ecptureData = data;

    const validation = {};

    const itemsData = {};
    data?.components?.forEach((item, index) => {
      itemsData[`item${index + 1}`] = false;
    });

    const components = data?.components;
    console.log({ components });
    setComponents(components);

    // let seasonsList = [];

    setValues(itemsData);
    // validationSchema = Yup.object().shape(validation);
  }, [data]);

  const handleChange = (name, value) => {
    // console.log(e.target, e.target);
    setValues({ ...values, [name]: value });
  };

  return (
    <View style={styles.formContainer}>
      {/* <Formik
        initialValues={values}
        onSubmit={handleSubmit}
        // validationSchema={validationSchema}
      > */}
      {/* {components.length} */}
      {/* {components?.map(i=>JSON.stringify(i))} */}
      {/* {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          values,
          errors,
          touched,
        }) => ( */}

      <View style={{ flex: 1, gap: 5 }}>
        {/* <Field name="lastName" key="lastname" placeholder="Doe" component={MyInput} /> */}

        {components?.map((item, index) => (
          //    ( <div>{JSON.stringify(item)}</div>)
          // <Field name="lastName" key="lastname" placeholder="Doe" component={MyInput} />

          <div>
            <View style={{}}>
              <Card style={styles.card}>
                <Text style={styles.title}>{item.label}</Text>
                <RadioButton.Group
                  onValueChange={(value) => {
                    handleChange(`item${index + 1}`, value);
                  }}
                  value={values[`item${index + 1}`]}
                  //   onBlur={handleBlur([`item${index+1}`])}
                  name={`item${index + 1}`}
                  key={`item${index + 1}`}
                >
                  <RadioButton.Item label={"True"} value={true} />
                  <RadioButton.Item label={"False"} value={false} />
                </RadioButton.Group>
              </Card>
            </View>
          </div>
        ))}
        {/* <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "5px",
                margin: "5 auto",
              }}
            >
              <Button mode="contained" onPress={handleSave}>
                Save and exit
              </Button>

              <Button mode="contained" onPress={handleSubmit}>
                {currentIndex == totalLength - 1
                  ? "Finish"
                  : "Submit and Continue"}
              </Button>
            </div> */}
      </View>

      {/* )}
       </Formik> */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "5px",
          margin: "5 auto",
        }}
      >
        {/* <Button mode="contained" onPress={handleSave}>
          Save and exit
        </Button> */}

        <Button mode="contained" onPress={handleSubmit}>
          {currentIndex == totalLength - 1 ? "Finish" : "Submit and Continue"}
        </Button>
      </div>
    </View>
  );
};

const Escreening = () => {
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

  const { data, isLoading, error, refetch } = useFetchInsert(
    `/escreening-manager/setup/`,
    {
      studyconfig_id: parseInt(params.studyId),
      patient_id: params.patientId,
      branch: params.branch
    },
    "POST"
    // params.patientId
  );

  console.log({ data });

  const getData = async (endpoint, body, method) => {
    const options = {
      method: method,
      url: baseurl + endpoint,
      headers: {
        "Content-Type": "application/json",
        Authorization: TOKEN,
      },
      data: body,
    };
    try {
      const response = await axios.request(options);

      const ecapData = response.data;

      setEcaptureData(ecapData?.data?.content);
      // console.log("ecaptureData", ecaptureData);
      const temp = ecapData?.data?.content?.filter(
        (i) => i.id == parseInt(params.ecaptureId)
      )[0];
      setCurrentEcaptureData(temp);
      setCurrentIndex(ecapData?.data?.content?.indexOf(temp));
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.patientId) {
      refetch({
        studyconfig_id: parseInt(params.studyId),
        patient_id: params.patientId,
        branch: params.branch,
      });
      // if (ecapData) {
      console.log("data.data", data?.data?.content);
      setEcaptureData(data?.data?.content);
      // console.log("ecaptureData", ecaptureData);
      const temp = data?.data?.content[0];
      setCurrentEcaptureId(temp?.id);

      setCurrentEcaptureData(temp);
      setCurrentIndex(data?.data?.content?.indexOf(temp));
      // }
    }
  }, [params, data]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#ebedf8",
      }}
    >
      <Stack.Screen
        options={{
          headerTitle: "Escreening Screen",
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
              escreeningId={currentEcaptureId}
              params={params}
              setCurrentEcaptureId={setCurrentEcaptureId}
              nextSreen={nextSreen}
              currentIndex={currentIndex}
              totalLength={ecaptureData?.length}
              router={router}
            />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  card: {
    width: 200,
    height: 200,
    margin: 10,
  },
  formContainer: {
    // flex: 1,
    padding: 40,
  },
  title: { fontWeight: "bold", margin: 10 },
  card: {
    margin: 10,
  },
});

export default withCustomAuthenticator(Escreening);
