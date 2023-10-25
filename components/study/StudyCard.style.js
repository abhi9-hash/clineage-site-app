import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.xLarge,
  },
  header: {
    // flexDirection: "colomn",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: SIZES.small,
  },
  headerTitle: {
    fontSize: SIZES.large,
    // fontFamily: FONT.medium,
    color: COLORS.primary,
  },
  headerBtn: {
    fontSize: SIZES.medium,
    // fontFamily: FONT.medium,
    color: COLORS.gray,
  },
  cardsContainer: {
    marginTop: SIZES.medium,
    gap: SIZES.small,
  },
  card: {
    cursor:'pointer',
    display:'flex',
    minWidth: 300,
    justifyContent:"space-between",
    flexDirection:'column',
    maxWidth: 400,
    height:200,
    backgroundColor: "#ffffff",
    padding:0
  },
  cardTitle: {
    backgroundColor:"#227199",
    fontWeight: "bold",
    fontSize:"large",
    padding:4,
    paddingLeft:15,
    color:"white",
    marginTop:-10,
    borderTopLeftRadius: 10, borderTopRightRadius: 10
  },
  cardSubtitle: {
    color: "#787e84"
  },
  contentText: {
    color: "#626973",
    
  },
  contentContainer: { 
    // flex: 1, 
    display:'flex',
    flexDirection: "column",
    justifyContent:'space-between',
    // alignItems:'center', 
    // gap: 10, 
    padding:0,
    marginBottom:0,
    // paddingTop: 20, 
    flexWrap: "wrap" ,
  },
  chipContainer: { 
    // flex: 1, 
    display:'flex',
    flexDirection: "row",
    justifyContent:'space-between',
    alignItems:'center', 
    gap: 10, 
    padding:0,
    paddingTop: 20, 
    // shrink:1,
    // flexShrink:3,
    // bottom:0,
    marginBottom:"-120px",
    flexWrap: "wrap" ,
    color:"black"
  },
  chip: {
    backgroundColor: "#f0ebfc",
  },
  chipText: {
    color: "#b39ed8"
  }
});

export default styles;