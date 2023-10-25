
import { View, Text, Button } from "react-native";
import { Link, Stack, useSearchParams } from "expo-router";
// import SiteList from "../../components/sites/SiteList";

export default function Site() {
    const params = useSearchParams();
  
    return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* <Button title="Go to Sites"  handlePress={() => router.push(`/sites`) } /> */}
        <Text>
            Site ID: {params.id}
        </Text>


        {/* <SiteList/> */}
        
      {/* Use the `Screen` component to configure the layout. */}
      {/* <Stack.Screen options={{ title: "Overview" }} /> */}
      {/* Use the `Link` component to enable optimized client-side routing. */}
      {/* <Link href="/details">Go to Details</Link> */}
    </View>
  );
}