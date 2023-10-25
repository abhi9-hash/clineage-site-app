import React from 'react';
import { View, SafeAreaView } from "react-native";
import { Stack } from "expo-router";
import { withAuthenticator,AmplifyTheme } from "aws-amplify-react-native";
import { ScrollView, StyleSheet } from "react-native";
import SiteCard from "../../components/sites/SiteCard";
import useFetchHasura from '../../hooks/useFetchHasura';
import withCustomAuthenticator from '../../hoc/withCustomAuthenticator';

// const siteList = [{
//     name: 'Eye institute of West Florida',
//     siteId: 'AL22001',
//     address: '1225 W Bay D, City: Largo State: FL, Zip: 33770, Country: United States'
// },
// {
//     name: 'Eye institute of West Florida',
//     siteId: 'AL22001',
//     address: '1225 W Bay D, City: Largo State: FL, Zip: 33770, Country: United States'
// },
// {
//     name: 'Eye institute of West Florida',
//     siteId: 'AL22001',
//     address: '1225 W Bay D, City: Largo State: FL, Zip: 33770, Country: United States'
// },
// {
//     name: 'Eye institute of West Florida',
//     siteId: 'AL22001',
//     address: '1225 W Bay D, City: Largo State: FL, Zip: 33770, Country: United States'
// },
// {
//     name: 'Eye institute of West Florida',
//     siteId: 'AL22001',
//     address: '1225 W Bay D, City: Largo State: FL, Zip: 33770, Country: United States'
// },
// {
//     name: 'Eye institute of West Florida',
//     siteId: 'AL22001',
//     address: '1225 W Bay D, City: Largo State: FL, Zip: 33770, Country: United States'
// },
// {
//     name: 'Eye institute of West Florida',
//     siteId: 'AL22001',
//     address: '1225 W Bay D, City: Largo State: FL, Zip: 33770, Country: United States'
// },
// {
//     name: 'Eye institute of West Florida',
//     siteId: 'AL22001',
//     address: '1225 W Bay D, City: Largo State: FL, Zip: 33770, Country: United States'
// },
// {
//     name: 'Eye institute of West Florida',
//     siteId: 'AL22001',
//     address: '1225 W Bay D, City: Largo State: FL, Zip: 33770, Country: United States'
// },
// {
//     name: 'Eye institute of West Florida',
//     siteId: 'AL22001',
//     address: '1225 W Bay D, City: Largo State: FL, Zip: 33770, Country: United States'
// },
// {
//     name: 'Eye institute of West Florida',
//     siteId: 'AL22001',
//     address: '1225 W Bay D, City: Largo State: FL, Zip: 33770, Country: United States'
// },
// {
//     name: 'Eye institute of West Florida',
//     siteId: 'AL22001',
//     address: '1225 W Bay D, City: Largo State: FL, Zip: 33770, Country: United States'
// }]


function Sites() {

const {data,isLoading,error,refetch} =useFetchHasura("/site-manager/my",{},"POST")
    return (
        isLoading?<SafeAreaView style={styles.container}>Loading...</SafeAreaView>:
        error? <SafeAreaView style={styles.container}>Something went wrong</SafeAreaView> :
        <SafeAreaView style={styles.container}>
            <Stack.Screen
                options={{
                    headerTitle: "Sites Table"
                }}
            >
            </Stack.Screen>
            <ScrollView>
                <View style={styles.sitesContainer}
                // {{display:'grid', gap:'50px 50px', gridAutoColumns: "auto"}
                    // {flex: 1, flexDirection: "row",justifyContent:'flex-start' , flexWrap: "wrap", gap: 15, padding: 20}
                    
                    // }
                    >
                    {data?.columns?.map((item, index) => (
                        <SiteCard name={item.site_name} siteID={item.id} address={item.address} country={item.country} /> 
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
    },
    sitesContainer: {
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(350px,1fr))",
        gridTemplateRows: "repeat(auto-fill, 1fr)",
        gridRowGap: "2em",
        gridColumnGap: "2em",
        marginTop:20,
        padding:10
        // marginLeft: -5
      }
})

const customTheme = {
    ...AmplifyTheme, 
    button: {
        ...AmplifyTheme.button,
        backgroundColor: "green"
    }
}

const signUpConfig = {
    header: "Native App authentication",
    hideAllDefaults: true,
    
}

export default withCustomAuthenticator(Sites)
    // {signUpConfig, theme: customTheme});
