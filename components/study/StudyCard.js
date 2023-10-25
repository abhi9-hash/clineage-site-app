import React from "react";
import { useRouter } from "expo-router";
import { View, Text } from "react-native";
import { Card, Chip, useTheme } from "react-native-paper";

import styles from "./StudyCard.style";

const StudyCard = ({ name, description, studyID, phase, sponser, id }) => {
  const router = useRouter();
  const theme = useTheme();

  return (
    <Card
      style={styles.card}
      onPress={() => {
        router.push(`/study/${id}`);
      }}
    >
      <Card.Title
        style={{ padding: 0 }}
        title={name}
        titleVariant="titleLarge"
        titleStyle={styles.cardTitle}
      />
      <Card.Content style={styles.contentContainer}>
        <Text variant="bodyMedium" style={styles.contentText} numberOfLines={3}>
          {description}
        </Text>
        <View style={styles.chipContainer} >
          <Text
            variant="bodyMedium"
            style={{ fontWeight: "bold" }}
            // numberOfLines={3}
          >
            StudyID: {studyID}
          </Text>
          <Text
            variant="bodyMedium"
            style={{ fontWeight: "bold" }}
            // numberOfLines={3}
          >
            Phase: {phase}
          </Text>
          <Text
            variant="bodyMedium"
            style={{ fontWeight: "bold" }}
            // numberOfLines={3}
          >
            Sponser: {sponser}
          </Text>

          {/* <Chip
                    style={{ backgroundColor: "white", width:'fit-content', padding:0 }}
                        // style={{ backgroundColor: theme.colors.primary }}
                        // textStyle={{ color: theme.colors.whiteText }}
                    >
                        StudyID: {studyID}
                    </Chip>
                    <Chip
                    style={{ backgroundColor: "white", width:'fit-content',  padding:0 }}
                        // style={{ backgroundColor: theme.colors.primary }}
                        // textStyle={{ color: theme.colors.whiteText }}
                    >
                        Phase: {phase}
                    </Chip>
                    <Chip
                        style={{ backgroundColor: "white", width:'fit-content',  padding:0 }}
                        // textStyle={{ color: theme.colors.whiteText }}
                    >
                        Sponser: {sponser}
                    </Chip> */}
        </View>
       
      </Card.Content>
    </Card>
  );
};

export default StudyCard;
