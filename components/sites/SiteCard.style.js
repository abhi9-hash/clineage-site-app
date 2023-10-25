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
    backgroundColor:"#227199"
    
  },
  cardsContainer: {
    marginTop: SIZES.medium,
    gap: SIZES.small,
  },
  card: {
    cursor:'pointer',
    flex: 1,
    minWidth: 300,
    maxWidth: 400,
    // height:200,
    flexShrink:1,
    backgroundColor: "#ffffff",
    paddingTop:0

  },
  cardTitle: {
    // fontWeight: "bold",
    backgroundColor:"#227199",
    padding:4,
    paddingLeft:15,
    color:"white",
    // borderRadius:"5px",
    borderTopLeftRadius: 10, borderTopRightRadius: 10

  },
  cardSubtitle: {
    color: "#787e84"
  },
  contentText: {
    color: "#787e84",
    paddingLeft:0
  }
});

export default styles;