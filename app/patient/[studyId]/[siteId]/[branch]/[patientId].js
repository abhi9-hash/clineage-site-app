import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View, StyleSheet } from "react-native";
import { Text, List, Button, Card } from "react-native-paper";
import { useSearchParams, useRouter, Stack } from "expo-router";
import { FlatList } from "react-native";
import useFetchInsert from "../../../../../hooks/useFetchInsert";
import useFetchHasura from "../../../../../hooks/useFetchHasura";
import withCustomAuthenticator from "../../../../../hoc/withCustomAuthenticator";

// const patientData = {
//     patientInfo:
// }

const Patient = () => {
  const [expanded, setExpanded] = useState(true);

  const handlePress = () => setExpanded(!expanded);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#ebedf8",
      }}
    >
      <Stack.Screen
        options={{
          headerTitle: "Patient Details",
        }}
      ></Stack.Screen>
      <ScrollView>
        <View style={{ flex: 1, padding: 20 }}>
          {/* <PatientInfo /> */}
          <VisitInfo />
        </View>
      </ScrollView>
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

  //   const VisitInfo = {
  //     visits_details: [
  //       {
  //         name: "Pre-Operative",
  //         id: 0,
  //         ecaptures_preview: [
  //           {
  //             title: "Medical And Ocular History",
  //             status: "Incomplete",
  //             ecapture_id: 0,
  //           },
  //           {
  //             title: "IOLMaster 700 Biometry/Keratometry Topography",
  //             status: "Completed",
  //             ecapture_id: 3,
  //           },
  //           {
  //             title: "Manifest Refraction",
  //             status: "Incomplete",
  //             ecapture_id: 5,
  //           },
  //           {
  //             title: "Visual Acuity Pre-Op",
  //             status: "Incomplete",
  //             ecapture_id: 6,
  //           },
  //           {
  //             title: "Intraocular Pressure",
  //             status: "Incomplete",
  //             ecapture_id: 7,
  //           },
  //           {
  //             title: "Slit Lamp Exam Pre-Op",
  //             status: "Incomplete",
  //             ecapture_id: 8,
  //           },
  //           {
  //             title: "Dilated Fundus",
  //             status: "Incomplete",
  //             ecapture_id: 9,
  //           },
  //           {
  //             title: "Macular OCT",
  //             status: "Incomplete",
  //             ecapture_id: 10,
  //           },
  //           {
  //             title: "AI Nomogram Calculations",
  //             status: "Incomplete",
  //             ecapture_id: 11,
  //           },
  //           {
  //             title: "Exam Comments",
  //             status: "Incomplete",
  //             ecapture_id: 12,
  //           },
  //           {
  //             title: "Predicted Refraction",
  //             status: "Incomplete",
  //             ecapture_id: 17,
  //           },
  //         ],
  //         status: "IN PROGRESS",
  //         started_at: "2023-08-12T19:25:12.056+00:00",
  //         ended_at: null,
  //       },
  //       {
  //         name: "Operative",
  //         id: 1,
  //         ecaptures_preview: [
  //           {
  //             title: "Exam Comments",
  //             status: "Incomplete",
  //             ecapture_id: 12,
  //           },
  //           {
  //             title: "IOL Parameters",
  //             status: "Incomplete",
  //             ecapture_id: 13,
  //           },
  //           {
  //             title: "Adverse Events",
  //             status: "Incomplete",
  //             ecapture_id: 16,
  //           },
  //           {
  //             title: "ALLY Parameters",
  //             status: "Incomplete",
  //             ecapture_id: 18,
  //           },
  //           {
  //             title: "Operative Notes",
  //             status: "Incomplete",
  //             ecapture_id: 19,
  //           },
  //           {
  //             title: "Post-Operative Medications",
  //             status: "Incomplete",
  //             ecapture_id: 20,
  //           },
  //         ],
  //         status: "NOT STARTED",
  //         started_at: null,
  //         ended_at: null,
  //       },
  //       {
  //         name: "Post-Op D1",
  //         id: 2,
  //         ecaptures_preview: [
  //           {
  //             title: "Intraocular Pressure",
  //             status: "Incomplete",
  //             ecapture_id: 7,
  //           },
  //           {
  //             title: "Exam Comments",
  //             status: "Incomplete",
  //             ecapture_id: 12,
  //           },
  //           {
  //             title: "Visual Acuity Post-Op",
  //             status: "Incomplete",
  //             ecapture_id: 14,
  //           },
  //           {
  //             title: "Slit Lamp Exam Post-Op",
  //             status: "Incomplete",
  //             ecapture_id: 15,
  //           },
  //           {
  //             title: "Adverse Events",
  //             status: "Incomplete",
  //             ecapture_id: 16,
  //           },
  //           {
  //             title: "Post-Operative Medications",
  //             status: "Incomplete",
  //             ecapture_id: 20,
  //           },
  //         ],
  //         status: "NOT STARTED",
  //         started_at: null,
  //         ended_at: null,
  //       },
  //       {
  //         name: "Post-Op W2",
  //         id: 3,
  //         ecaptures_preview: [
  //           {
  //             title: "Manifest Refraction",
  //             status: "Incomplete",
  //             ecapture_id: 5,
  //           },
  //           {
  //             title: "Intraocular Pressure",
  //             status: "Incomplete",
  //             ecapture_id: 7,
  //           },
  //           {
  //             title: "Exam Comments",
  //             status: "Incomplete",
  //             ecapture_id: 12,
  //           },
  //           {
  //             title: "Visual Acuity Post-Op",
  //             status: "Incomplete",
  //             ecapture_id: 14,
  //           },
  //           {
  //             title: "Slit Lamp Exam Post-Op",
  //             status: "Incomplete",
  //             ecapture_id: 15,
  //           },
  //           {
  //             title: "Adverse Events",
  //             status: "Incomplete",
  //             ecapture_id: 16,
  //           },
  //           {
  //             title: "Post-Operative Medications",
  //             status: "Incomplete",
  //             ecapture_id: 20,
  //           },
  //         ],
  //         status: "NOT STARTED",
  //         started_at: null,
  //         ended_at: null,
  //       },
  //       {
  //         name: "Post-Op W6",
  //         id: 4,
  //         ecaptures_preview: [
  //           {
  //             title: "IOLMaster 700 Biometry/Keratometry Topography",
  //             status: "Incomplete",
  //             ecapture_id: 3,
  //           },
  //           {
  //             title: "Manifest Refraction",
  //             status: "Incomplete",
  //             ecapture_id: 5,
  //           },
  //           {
  //             title: "Intraocular Pressure",
  //             status: "Incomplete",
  //             ecapture_id: 7,
  //           },
  //           {
  //             title: "Exam Comments",
  //             status: "Incomplete",
  //             ecapture_id: 12,
  //           },
  //           {
  //             title: "Visual Acuity Post-Op",
  //             status: "Incomplete",
  //             ecapture_id: 14,
  //           },
  //           {
  //             title: "Slit Lamp Exam Post-Op",
  //             status: "Incomplete",
  //             ecapture_id: 15,
  //           },
  //           {
  //             title: "Adverse Events",
  //             status: "Incomplete",
  //             ecapture_id: 16,
  //           },
  //           {
  //             title: "Post-Operative Medications",
  //             status: "Incomplete",
  //             ecapture_id: 20,
  //           },
  //         ],
  //         status: "NOT STARTED",
  //         started_at: null,
  //         ended_at: null,
  //       },
  //     ],
  //   };

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
    if (params.siteId && params.patientId) {
      refetch();
    }
    console.log("visit info", visitData?.visits_details);
  }, [params.siteId, params.patientId]);

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
          {/* {visitData?.visits_details?.map((items) =>
          items?.ecapture_info?.visits_info?.map((item) =>
            <ListSection
              id={item.id}
              name={item.name}
              ecaptures_preview={item.ecaptures_preview}
              status={item.status}
            />
          )
          )} */}

          {visitData?.visits_details?.map((items) =>
            items?.ecapture_info?.visits_info?.map((item) =>
              item.screens_preview ? (
                <ListSection
                  id={item.id}
                  name={item.name}
                  screens_preview={item.screens_preview}
                  status={item.status}
                />
              ) : (
                <ListSection
                  id={item.id}
                  name={item.name}
                  ecaptures_preview={item.ecaptures_preview}
                  status={item.status}
                />
              )
            )
          )}

          {/* <ListSection />
                <ListSection />
                <ListSection /> */}
        </ScrollView>
      )}
    </View>
  );
};

const ListSection = ({
  id,
  name,
  screens_preview,
  status,
  ecaptures_preview,
}) => {
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
            {
            ecaptures_preview
              ? ecaptures_preview?.map((item,index) => (
                  <ListItem
                    title={item.title}
                    status={item.status}
                    // ecapture_id={item.ecapture_id}
                    screen_id={item.screen_id}
                    visit_id={id}
                    screened_at={item.screened_at}
                  />
                ))
              :
               screens_preview?.map((item) => (
                  <ListItem
                    title={item.title}
                    status={item.status}
                    screen_id={item.screen_id}
                    visit_id={id}
                    screened_at={item.screened_at}
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

const ListItem = ({
  title,
  status,
  screen_id,
  visit_id,
  screened_at,
  ecapture_id,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const body = {
    studyconfig_id: parseInt(params.studyId),
    patient_id: params.patientId,
    site_id: params.siteId,
    visit_id: visit_id,
    branch: params.branch,
    unscheduled_visit: false,
    premature_cancellation: false,
  };

  // Fetch the config setup
  const { response, isLoading, error, refetch } = useFetchInsert(
    `/ecapture-manager/config-setup/`,
    body,
    "POST"
  );

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
            // onPress={() => router.push(`ecapture/${params.studyId}/${params.siteId}/${params.patientId}/${visit_id}/${ecapture_id}`)}
            onPress={() => {
              // ecapture_id == null || ecapture_id == undefined
              //   ? 
                router.push(
                    `screens/${params.studyId}/${params.siteId}/${params.patientId}/${params.branch}/${visit_id}/${screen_id}`
                  )
                // :   router.push(
                //   `screens/${params.studyId}/${params.siteId}/${params.patientId}/${params.branch}/${visit_id}/${ecapture_id}`
                // )

              // refetch(body);
              // console.log(response);
            }}
          >
            {status == "Completed"
              ? "Complete"
              : status == "Inprogress" || status == "Inprogress"
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
  card: {
    width: 200,
    height: 200,
    margin: 10,
  },
});

export default withCustomAuthenticator(Patient);
