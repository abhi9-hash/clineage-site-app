import React, { useEffect } from 'react';
import { View, Text, Button, SafeAreaView } from "react-native";
import { Link, Stack, useSearchParams } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";
import StudyCard from "../../components/study/StudyCard";
import useFetchHasura from "../../hooks/useFetchHasura"

// const studyList = [{
//     name: "ALLY Registry Track 1 - 6 Weeks",
//     description: "dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddLorem ipsum dolor sit amet, consectetur adipiscing elit. In nibh lacus, eleifend at libero sed, pulvinar dictum nisi. Etiam ut diam ac neque sagittis consectetur sed vitae urna. Nam eget ultrices risus, ut malesuada dui.",
//     studyID: "ALLY8-v0",
//     phase: "Registry",
//     sponser: "LENSER, Inc"
// },
// {
//     name: "ALLY Registry Track 1 - 6 Weeks",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nibh lacus, eleifend at libero sed, pulvinar dictum nisi. Etiam ut diam ac neque sagittis consectetur sed vitae urna. Nam eget ultrices risus, ut malesuada dui.",
//     studyID: "ALLY8-v0",
//     phase: "Registry",
//     sponser: "LENSER, Inc"
// },
// {
//     name: "ALLY Registry Track 1 - 6 Weeks",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nibh lacus, eleifend at libero sed, pulvinar dictum nisi. Etiam ut diam ac neque sagittis consectetur sed vitae urna. Nam eget ultrices risus, ut malesuada dui.,Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nibh lacus, eleifend at libero sed, pulvinar dictum nisi. Etiam ut diam ac neque sagittis consectetur sed vitae urna. Nam eget ultrices risus, ut malesuada dui., Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nibh lacus, eleifend at libero sed, pulvinar dictum nisi. Etiam ut diam ac neque sagittis consectetur sed vitae urna. Nam eget ultrices risus, ut malesuada dui., Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nibh lacus, eleifend at libero sed, pulvinar dictum nisi. Etiam ut diam ac neque sagittis consectetur sed vitae urna. Nam eget ultrices risus, ut malesuada dui.",
//     studyID: "ALLY8-v0",
//     phase: "Registry",
//     sponser: "LENSER, Inc"
// },
// {
//     name: "ALLY Registry Track 1 - 6 Weeks",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nibh lacus, eleifend at libero sed, pulvinar dictum nisi. Etiam ut diam ac neque sagittis consectetur sed vitae urna. Nam eget ultrices risus, ut malesuada dui.",
//     studyID: "ALLY8-v0",
//     phase: "Registry",
//     sponser: "LENSER, Inc"
// },
// {
//     name: "ALLY Registry Track 1 - 6 Weeks",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nibh lacus, eleifend at libero sed, pulvinar dictum nisi. Etiam ut diam ac neque sagittis consectetur sed vitae urna. Nam eget ultrices risus, ut malesuada dui.",
//     studyID: "ALLY8-v0",
//     phase: "Registry",
//     sponser: "LENSER, Inc"
// },
// {
//     name: "ALLY Registry Track 1 - 6 Weeks",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nibh lacus, eleifend at libero sed, pulvinar dictum nisi. Etiam ut diam ac neque sagittis consectetur sed vitae urna. Nam eget ultrices risus, ut malesuada dui.",
//     studyID: "ALLY8-v0",
//     phase: "Registry",
//     sponser: "LENSER, Inc"
// },
// {
//     name: "ALLY Registry Track 1 - 6 Weeks",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nibh lacus, eleifend at libero sed, pulvinar dictum nisi. Etiam ut diam ac neque sagittis consectetur sed vitae urna. Nam eget ultrices risus, ut malesuada dui.",
//     studyID: "ALLY8-v0",
//     phase: "Registry",
//     sponser: "LENSER, Inc"
// },
// {
//     name: "ALLY Registry Track 1 - 6 Weeks",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nibh lacus, eleifend at libero sed, pulvinar dictum nisi. Etiam ut diam ac neque sagittis consectetur sed vitae urna. Nam eget ultrices risus, ut malesuada dui.",
//     studyID: "ALLY8-v0",
//     phase: "Registry",
//     sponser: "LENSER, Inc"
// },
// {
//     name: "ALLY Registry Track 1 - 6 Weeks",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nibh lacus, eleifend at libero sed, pulvinar dictum nisi. Etiam ut diam ac neque sagittis consectetur sed vitae urna. Nam eget ultrices risus, ut malesuada dui.",
//     studyID: "ALLY8-v0",
//     phase: "Registry",
//     sponser: "LENSER, Inc"
// },
// {
//     name: "ALLY Registry Track 1 - 6 Weeks",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nibh lacus, eleifend at libero sed, pulvinar dictum nisi. Etiam ut diam ac neque sagittis consectetur sed vitae urna. Nam eget ultrices risus, ut malesuada dui.",
//     studyID: "ALLY8-v0",
//     phase: "Registry",
//     sponser: "LENSER, Inc"
// },
// {
//     name: "ALLY Registry Track 1 - 6 Weeks",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nibh lacus, eleifend at libero sed, pulvinar dictum nisi. Etiam ut diam ac neque sagittis consectetur sed vitae urna. Nam eget ultrices risus, ut malesuada dui.",
//     studyID: "ALLY8-v0",
//     phase: "Registry",
//     sponser: "LENSER, Inc"
// },
// {
//     name: "ALLY Registry Track 1 - 6 Weeks",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nibh lacus, eleifend at libero sed, pulvinar dictum nisi. Etiam ut diam ac neque sagittis consectetur sed vitae urna. Nam eget ultrices risus, ut malesuada dui.",
//     studyID: "ALLY8-v0",
//     phase: "Registry",
//     sponser: "LENSER, Inc"
// },
// {
//     name: "ALLY Registry Track 1 - 6 Weeks",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nibh lacus, eleifend at libero sed, pulvinar dictum nisi. Etiam ut diam ac neque sagittis consectetur sed vitae urna. Nam eget ultrices risus, ut malesuada dui.",
//     studyID: "ALLY8-v0",
//     phase: "Registry",
//     sponser: "LENSER, Inc"
// },
// {
//     name: "ALLY Registry Track 1 - 6 Weeks",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nibh lacus, eleifend at libero sed, pulvinar dictum nisi. Etiam ut diam ac neque sagittis consectetur sed vitae urna. Nam eget ultrices risus, ut malesuada dui.",
//     studyID: "ALLY8-v0",
//     phase: "Registry",
//     sponser: "LENSER, Inc"
// },
// {
//     name: "ALLY Registry Track 1 - 6 Weeks",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nibh lacus, eleifend at libero sed, pulvinar dictum nisi. Etiam ut diam ac neque sagittis consectetur sed vitae urna. Nam eget ultrices risus, ut malesuada dui.",
//     studyID: "ALLY8-v0",
//     phase: "Registry",
//     sponser: "LENSER, Inc"
// },
// {
//     name: "ALLY Registry Track 1 - 6 Weeks",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nibh lacus, eleifend at libero sed, pulvinar dictum nisi. Etiam ut diam ac neque sagittis consectetur sed vitae urna. Nam eget ultrices risus, ut malesuada dui.",
//     studyID: "ALLY8-v0",
//     phase: "Registry",
//     sponser: "LENSER, Inc"
// }]

function Ecapture() {
    const params = useSearchParams()
    const {data:{content:studyList},isLoading,error,refetch} =useFetchHasura("/study-manager/studies/active",{site_id:params.siteId},"POST")

    return (
        isLoading?<SafeAreaView style={styles.container}>Loading...</SafeAreaView>:
        error? <SafeAreaView style={styles.container}>Something went wrong</SafeAreaView> :

        <SafeAreaView style={styles.container}>
            <Stack.Screen
                options={{
                    headerTitle: "Study Table"
                }}
            >
            </Stack.Screen>
            <ScrollView>
                <View style={{flex: 1, flexDirection: "row", flexWrap: "wrap", gap: 15, padding: 15}}>
                 {studyList?.map((item, index) => (
                        <StudyCard name={item.name} description={item.description} studyID={item.study_id} phase={item.trial_phase} sponser={item.sponsor} />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ebedf8"
    }
})

export default Ecapture;
