import { Stack } from "expo-router";
import { PaperProvider, DefaultTheme } from 'react-native-paper'

export default function Layout() {
  const fonts = {}
   for(let i in DefaultTheme.fonts){
    DefaultTheme.fonts[i]["fontFamily"] = 
    "Karla, \"Helvetica Neue\", Helvetica, Arial, sans-serif"
   }
  const customTheme = {
    ...DefaultTheme,
   colors: {
      ...DefaultTheme.colors,
      primary: '#227199',
      accent: 'green',
      text: 'black',
      whiteText: '#fff',
      // Customize other colors as needed
    },
    // Add other customizations like typography, spacing, etc.
  };


  console.log({DefaultTheme})

  return (
    <PaperProvider theme={customTheme}>
      <Stack />
    </PaperProvider>
  );
}