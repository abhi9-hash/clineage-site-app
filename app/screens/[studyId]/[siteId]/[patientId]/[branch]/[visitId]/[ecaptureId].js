import { SafeAreaView, ScrollView, View, StyleSheet } from "react-native";
import {
  Text,
  List,
  Button,
  Card,
  HelperText,
  ActivityIndicator,
} from "react-native-paper";
import { useSearchParams, useRouter, Stack, useNavigation } from "expo-router";
import { FlatList } from "react-native";
import useFetchInsert from "../../../../../../../hooks/useFetchInsert";
import useFetchHasura from "../../../../../../../hooks/useFetchHasura";

import { Field, Formik } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { TextInput, RadioButton, Checkbox } from "react-native-paper";
import * as Yup from "yup";
import withCustomAuthenticator from "../../../../../../../hoc/withCustomAuthenticator";
import { FlexContainer } from "../../../../../../ecaptest";

const Ecapture = () => {
  const params = useSearchParams();

  const [expanded, setExpanded] = useState(true);
  const [ecaptureData, setEcaptureData] = useState([]);
  const [savedData, setSavedData] = useState({});
  const [currentScreen, setCurrentScreen] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(parseInt(params.ecaptureId));
  const [currentEcapId, setCurrentEcapId] = useState(
    parseInt(params.ecaptureId)
  );

  const router = useRouter();

  const handlePress = () => setExpanded(!expanded);

  const body = {
    studyconfig_id: parseInt(params.studyId),
    patient_id: params.patientId,
    branch: params.branch,
    site_id: params.siteId,
    branch: params.branch,
    visit_id: parseInt(params.visitId),
    unscheduled_visit: false,
    premature_cancellation: false,
  };

  const {
    data: screenData,
    isLoading,
    error,
    refetch,
  } = useFetchInsert(`/ecapture-manager/config-setup/`, body, "POST");

  console.log({ isLoading });

  useEffect(() => {
    if (params.visitId) {
      refetch(body);

      if (screenData) {
        console.log("******* Screen Data **********");
        console.log({ screenData });
        setEcaptureData(screenData?.data?.ecapture_setup_config);
        setSavedData(screenData?.data?.saved_ecapture_data_map);
        setCurrentScreen(
          screenData?.data?.ecapture_setup_config[0].children[params.ecaptureId]
        );
        setCurrentIndex(parseInt(params.ecaptureId));
        if (screenData?.data?.filtered) {
          setCurrentEcapId(
            screenData?.data?.ecapture_setup_config[0].children[
              params.ecaptureId
            ]?.ecapture_id
          );
        }
        // }

        // else{
        //   // const temp = screenData?.data?.ecapture_setup_config[0].children.filter((i)=>i.id==params.ecaptureId)[0]
        // const temp = screenData?.data?.ecapture_setup_config[0].children[params.ecaptureId]

        //   console.log({temp})
        //           setCurrentScreen(temp)
        //           setCurrentIndex(temp.id)

        //         }
      }
    }
  }, [params, screenData]);

  const nextSreen = () => {
    let ind = currentIndex;
    // if(!screenData?.data?.filtered){
    setCurrentScreen(ecaptureData[0].children[ind + 1]);
    setCurrentIndex(ind + 1);
    if (screenData?.data?.filtered) {
      setCurrentEcapId(ecaptureData[0].children[ind + 1]?.ecapture_id);
    }
    // }
    // else{

    //    ind = currentScreen.id
    //    setCurrentScreen(ecaptureData[0].children[ind + 1]);
    //    setCurrentIndex(ecaptureData[0].children[ind + 1].id);
    //         }

    // currentIndex;
    console.log({ ind });
  };

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
        ecaptureData.length != 0 && (
          <ScrollView>
            <Screens
              studyId={parseInt(params.studyId)}
              siteId={params.siteId}
              patientId={params.patientId}
              visitId={parseInt(params.visitId)}
              screenId={parseInt(params.ecaptureId)}
              screen={currentScreen}
              nextSreen={nextSreen}
              currentIndex={currentIndex}
              totalLength={ecaptureData[0].children.length}
              branch={params.branch}
              savedData={savedData}
              screenData={screenData}
              currentEcapId={currentEcapId}
            />
          </ScrollView>
        )
      )}
    </SafeAreaView>
  );
};

const Screens = ({
  studyId,
  siteId,
  patientId,
  visitId,
  screenId,
  screen,
  nextSreen,
  currentIndex,
  totalLength,
  branch,
  savedData,
  screenData,
  currentEcapId,
}) => {
  // console.log("############## Screens ##########");
  // console.log({screen});
  // console.log({currentIndex});
  // console.log({totalLength});
  // console.log("############## Screens ##########");

  const navigate = useNavigation();
  const [items, setItems] = useState({});

  const { response, isLoading, error, refetch } = useFetchInsert(
    `/ecapture-manager/config-ingestion`,
    {},
    "POST"
  );

  const setInputValues = (key, value) => {
    // console.log({key}, {value});
    setItems((prev) => {
      let obj = prev;
      obj[key] = value;

      return obj;
    });
    console.log({ items });
  };

  const handleSubmit = () => {
    // if (screenData?.data?.filtered) {
    //   Object.keys(items).forEach((i) => {
    //     if (i.split("-#-")[0] != `ecapture_${parseInt(currentEcapId)}`) {
    //       delete items[i];
    //     }
    //   });
    // }
    const body = {
      studyconfig_id: studyId,
      site_id: siteId,
      patient_id: patientId,
      visit_id: visitId,
      branch: branch,
      // "screen_id": screenId,
      screen_id: currentIndex,
      screen_data: {
        items: items,
      },
      final: true,
      base64: false,
    };
    setItems({});

    console.log({ body });
    refetch(body, true);
    console.log("handle submit function is being called");
  };

  const handleSaveAndExit = () => {
    const body = {
      studyconfig_id: studyId,
      site_id: siteId,
      patient_id: patientId,
      branch: branch,
      visit_id: visitId,
      screen_id: screenId,
      screen_data: {
        items: items,
      },
      final: false,
      base64: false,
    };

    console.log({ body });
    refetch(body,true);

    navigate.goBack();
  };

  return (
    <View style={{ flex: 1, padding: 20, flexDirection: "column" }}>
      {screen?.display !== true ? (
        <Text>Data is already entered.</Text>
      ) : (
        <FlexContainer
          key={currentIndex}
          setInputValues={setInputValues}
          item={screen}
          savedData={savedData}
        />
      )}
      {/* <Text> { screen.children[0].content }</Text> */}

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 5,
        }}
      >
        <Button
          mode="contained"
          onPress={() => {
            handleSaveAndExit();
          }}
        >
          Save and exit
        </Button>

        <Button
          mode="contained"
          onPress={() => {
            console.log("From Sumit and continue");
            handleSubmit();

            // if(!screenData?.data?.filtered){
            if (currentIndex == totalLength - 1) {
              navigate.goBack();
            } else {
              nextSreen();
            }
            // }
            // else{
            //   if (currentIndex == screenData?.data?.ecapture_setup_config[0].children[totalLength - 1].id) {
            //     navigate.goBack();
            //   } else {
            //     nextSreen();
            //   }
            // }
          }}
        >
          {currentIndex === totalLength - 1 ? "Finish" : "Submit and Continue"}
        </Button>
      </View>
    </View>
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
