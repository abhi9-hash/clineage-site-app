import React from "react";
import { useRouter } from "expo-router";
import { View, TouchableOpacity, ActivityIndicator, Button } from "react-native";
import { Text, Card } from "react-native-paper";

import styles from "./SiteCard.style";
// import { COLORS } from "../../../constants";
// import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
// import useFetch from "../../../hook/useFetch";

import { Auth } from 'aws-amplify';
import { COLORS } from "../../constants";
import useFetch from "../../hooks/useFetch";
import { StyleSheet } from "react-native";


const SignOutButton = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      router.push(`/home`)
      await Auth.signOut();
    } catch (error) {
      console.log('Error signing out:', error);
    }
  };

  return (
    <Button title="Sign Out" onPress={handleSignOut} />
  );
};

const SiteList = ({ name, siteID, address,country }) => {
  const router = useRouter();
  //   const { data, isLoading, error } = useFetch("search", {
  //     query: "React Native developer",
  //     num_pages: "1",
  //   });

  // const { data, isLoading, error, refetch } = useFetch("job-details", {
  //   job_id: params.id,
  // });

  const { data, isLoading, error, refetch } = useFetch("job-details", {
  });

  return (
    // <View style={styles.container}>
    //   <View style={styles.header}>
    //     {/* <Text style={styles.headerTitle}>Nearby jobs</Text> */}
    //     {/* <TouchableOpacity onPress={() => handleOpenWithLinking()}> */}
    //     <TouchableOpacity onPress={() => router.push(`/site/${1}`) }>
    //       <Text style={styles.headerBtn}>Site 1</Text>
    //     </TouchableOpacity>
    //     <TouchableOpacity onPress={() => router.push(`/site/${2}`) }>
    //       <Text style={styles.headerBtn}>Site 2</Text>
    //     </TouchableOpacity>
    //     <TouchableOpacity onPress={() => router.push(`/site/${3}`) }>
    //       <Text style={styles.headerBtn}>Site 3</Text>
    //     </TouchableOpacity>

    //     {isLoading ? (
    //         <ActivityIndicator size='large' color={COLORS.primary} />
    //       ) :  

    //       error? (<Text> Something went Wrong </Text>): (<Text> {JSON.stringify(data)} </Text>)
    //     }

    //     <SignOutButton/>
    //   </View>

    //   {/* <View style={styles.cardsContainer}>
    //     {isLoading ? (
    //       <ActivityIndicator size='large' color={COLORS.primary} />
    //     ) : error ? (
    //       <Text>Something went wrong</Text>
    //     ) : (
    //       data?.map((job) => (
    //         <NearbyJobCard
    //           job={job}
    //           key={`nearby-job-${job.job_id}`}
    //           handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
    //         />
    //       ))
    //     )}
    //   </View> */}
    // </View>
    <Card style={styles.card} onPress={() => router.push(`/studies/${siteID}/`)}>
      <Card.Title
        title={name}
        style={{paddingLeft:0, paddingTop:0,marginTop:-9, }}
        // subtitle={`Site ID: ${siteID}`}
        titleVariant="headlineSmall"
        titleStyle={styles.cardTitle}
        // subtitleStyle={styles.cardSubtitle}
      />
      <Card.Content>
      <Text variant="bodyMedium" style={styles.contentText}>{`Site ID: ${siteID}`}</Text>
      <Text variant="bodyMedium" style={styles.contentText}>{`Country: ${country}`}</Text>
      <Text variant="bodyMedium" style={styles.contentText}>{`Address: ${address}`}</Text>
      </Card.Content>
    </Card>
  );
};

export default SiteList;