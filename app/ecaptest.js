import React, { useEffect } from "react";

import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import { Link, Stack, useRouter } from "expo-router";
import axios from "axios";
import { Amplify, Auth } from "aws-amplify";
import { useSelector } from "react-redux";
import { Checkbox, RadioButton } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
// import { TextInput, RadioButton, Checkbox } from "react-native-paper";
import {SelectList, MultipleSelectList }from 'react-native-dropdown-select-list'

const layoutSample1 = [
  {
    container: "ClinUIFlexContainer",
    containerProps: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    styles: {
      border: "10px solid blue",
      // backgroundColor: "#f00"
    },

    children: [
      {
        container: "ClinUIHeader1",
        containerProps: {
          flex: "0 0 100%",
        },
        styles: {
          // "background-color": "#f1f1f1",
          // backgroundColor: "#0ff",
          border: "10px solid red",
          // margin: "10px",
          // padding: "40px",
          // "font-size": "12px",
        },
        content: "Pre Operative Visit: Screen 1",
      },

      {
        container: "ClinUIFlexContainer",
        containerProps: {
          flexDirection: "row",
          flexWrap: "wrap",
          flex: "0 0 30%",
        },
        styles: {
          // backgroundColor: "#f00"
          border: "10px solid red",
        },

        children: [
          {
            container: "ClinUIHeader2",
            containerProps: {
              flex: "0 0 100%",
            },
            styles: {
              // "background-color": "#f1f1f1",
              // backgroundColor: "#0ff",
              // padding: "20px",
              // "font-size": "30px",
            },
            content: "Exam Comments x1",
          },
          {
            container: "ClinUIText",
            containerProps: {
              flex: "0 0 30%",
            },
            styles: {
              // "background-color": "#f1f1f1",
              // backgroundColor: "#0ff",
              // padding: "20px",
              // "font-size": "30px",
            },
            content: "Ex x2 gfhgvjgv vjhbvj jbh",
          },
          {
            container: "ClinUITextInput",
            containerProps: {
              flex: "0 0 70%",
            },
            styles: {
              // "background-color": "#f1f1f1",
              // backgroundColor: "#0ff",
              // padding: "20px",
              // "font-size": "30px",
            },
            content: "Exam Comments x3",
          },

          {
            container: "ClinUITextInput",
            containerProps: {
              flex: "0 0 100%",
            },
            styles: {
              // "background-color": "#f1f1f1",
              // backgroundColor: "#0ff",
              // padding: "20px",
              // "font-size": "30px",
            },
            content: "Exam Comments x4",
          },

          {
            container: "ClinUIButton",
            containerProps: {
              flex: "0 0 100%",
            },
            styles: {
              // "background-color": "#f1f1f1",
              // backgroundColor: "#0ff",
              // padding: "20px",
              // "font-size": "30px",
            },
            content: "Save",
          },
        ],
      },

      {
        container: "ClinUIFlexContainer",
        containerProps: {
          flexDirection: "row",
          flexWrap: "wrap",
          flex: "0 0 50%",
        },
        styles: {
          border: "10px solid green",
          // backgroundColor: "#f00"
        },

        children: [
          {
            container: "ClinUIHeader1",
            containerProps: {
              flex: "0 0 100%",
            },
            styles: {
              // "background-color": "#f1f1f1",
              // backgroundColor: "#0ff",
              // margin: "10px",
              padding: "20px",
              // "font-size": "30px",
            },
            content: "Exam Comments y",
          },
        ],
      },

      {
        container: "ClinUIText",
        containerProps: {
          flex: "0 0 20%",
        },
        styles: {
          border: "10px solid red",
          // "background-color": "#f1f1f1",
          // backgroundColor: "#0ff",
          // margin: "10px",
          padding: "20px",
          // "font-size": "30px",
        },
        content: "Exam Comments y",
      },
    ],
  },
];

const layoutSample = [
  {
    container: "ClinUIFlexContainer",
    containerProps: {
      // flexDirection: "column",
      // flexWrap: "wrap"
      height: "fit-content",
    },
    styles: {
      border: "10px solid blue",
      // backgroundColor: "#f00"
    },

    children: [
      {
        container: "ClinUIHeader1",
        containerProps: {
          flex: "0 0 100%",
        },
        styles: {
          // "background-color": "#f1f1f1",
          // backgroundColor: "#0ff",
          border: "10px solid red",
          // maxHeight:"10px"
          // margin: "10px",
          // padding: "40px",
          // "font-size": "12px",
        },
        content: "Pre Operative Visit",
      },

      {
        container: "ClinUIFlexContainer",
        containerProps: {
          flexDirection: "row",
          flexWrap: "wrap",
          // flex: "0 0 30%",
          height: "fit-content",
        },
        styles: {
          // backgroundColor: "#f00"
          border: "10px solid red",
        },

        children: [
          {
            container: "ClinUIHeader2",
            containerProps: {
              flex: "0 0 100%",
            },
            styles: {
              // "background-color": "#f1f1f1",
              // backgroundColor: "#0ff",
              // padding: "20px",
              // "font-size": "30px",
            },
            content: "Medical and Ocular History",
          },

          {
            container: "ClinUIFlexContainer",
            containerProps: {
              // flexDirection: "row",
              flexWrap: "wrap",
              // flex: "0 0 30%",
              height: "fit-content",
            },
            styles: {
              // backgroundColor: "#f00"
              border: "10px solid red",
            },

            children: [
              {
                container: "ClinUIHeader3",
                containerProps: {
                  flex: "0 0 30%",
                },
                styles: {
                  // "background-color": "#f1f1f1",
                  // backgroundColor: "#0ff",
                  // padding: "20px",
                  // "font-size": "30px",
                },
                content: "Medical History",
              },

              {
                container: "ClinUICheckbox",
                containerProps: {
                  flex: "0 0 70%",
                  flexDirection: "row",
                },
                styles: {
                  // "background-color": "#f1f1f1",
                  // backgroundColor: "#0ff",
                  // padding: "20px",
                  // "font-size": "30px",
                },
                id: "ecapture_0-#-item1",
                content: ["Medical question"],
              },

              {
                container: "ClinUITextInput",
                containerProps: {
                  flex: "0 0 70%",
                },
                styles: {
                  // "background-color": "#f1f1f1",
                  // backgroundColor: "#0ff",
                  // padding: "20px",
                  // "font-size": "30px",
                },
                id: "ecapture_0-#-item2",
                content: "Other",
              },

              {
                container: "ClinUIHeader3",
                containerProps: {
                  flex: "0 0 30%",
                },
                styles: {
                  // "background-color": "#f1f1f1",
                  // backgroundColor: "#0ff",
                  // padding: "20px",
                  // "font-size": "30px",
                },
                content: "Ocular History",
              },

              {
                container: "ClinUICheckbox",
                containerProps: {
                  flex: "0 0 70%",
                  flexDirection: "row",
                },
                styles: {
                  // "background-color": "#f1f1f1",
                  // backgroundColor: "#0ff",
                  // padding: "20px",
                  // "font-size": "30px",
                },
                id: "ecapture_0-#-item3",
                content: ["Medical question"],
              },
              {
                container: "ClinUITextInput",
                containerProps: {
                  flex: "0 0 70%",
                },
                styles: {
                  // "background-color": "#f1f1f1",
                  // backgroundColor: "#0ff",
                  // padding: "20px",
                  // "font-size": "30px",
                },
                id: "ecapture_0-#-item4",
                content: "Other",
              },
              {
                container: "ClinUITextInput",
                containerProps: {
                  flex: "0 0 70%",
                },
                styles: {
                  // "background-color": "#f1f1f1",
                  // backgroundColor: "#0ff",
                  // padding: "20px",
                  // "font-size": "30px",
                },
                id: "ecapture_0-#-item5",
                content: "Other",
              },
            ],
          },
        ],
      },

      {
        container: "ClinUIFlexContainer",
        containerProps: {
          flexDirection: "row",
          flexWrap: "wrap",
          // flex: "0 0 30%",
          height: "fit-content",
        },
        styles: {
          // backgroundColor: "#f00"
          border: "10px solid red",
        },

        children: [
          {
            container: "ClinUIHeader2",
            containerProps: {
              flex: "0 0 100%",
            },
            styles: {
              // "background-color": "#f1f1f1",
              // backgroundColor: "#0ff",
              // padding: "20px",
              // "font-size": "30px",
            },
            content: "Manifest Refraction, Visual Acuity and IOP",
          },

          {
            container: "ClinUIHeader3",
            containerProps: {
              flex: "0 0 100%",
            },
            styles: {
              // "background-color": "#f1f1f1",
              // backgroundColor: "#0ff",
              // padding: "20px",
              // "font-size": "30px",
            },
            content: "Manifest Refraction",
          },

          {
            container: "ClinUIFlexContainer",
            containerProps: {
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
              // flex: "0 0 30%",
              height: "fit-content",
            },
            styles: {
              // backgroundColor: "#f00"
              border: "10px solid red",
            },

            children: [
              {
                container: "ClinUISelectDropdown",
                containerProps: {
                  flex: "0 0 20%",
                },
                styles: {
                  // "background-color": "#f1f1f1",
                  // backgroundColor: "#0ff",
                  // padding: "20px",
                  // "font-size": "30px",
                },
                id: "ecapture_5-#-item1",
                content: ["Option1", "Option2"],
              },
              {
                container: "ClinUISelectDropdown",
                containerProps: {
                  flex: "0 0 20%",
                },
                styles: {
                  // "background-color": "#f1f1f1",
                  // backgroundColor: "#0ff",
                  // padding: "20px",
                  // "font-size": "30px",
                },
                id: "ecapture_5-#-item2",
                content: ["Option1", "Option2"],
              },
              {
                container: "ClinUITextInput",
                containerProps: {
                  flex: "0 0 20%",
                },
                styles: {
                  // "background-color": "#f1f1f1",
                  // backgroundColor: "#0ff",
                  // padding: "20px",
                  // "font-size": "30px",
                },
                id: "ecapture_5-#-item3",
                content: " Question",
              },
            ],
          },

          {
            container: "ClinUIHeader3",
            containerProps: {
              flex: "0 0 100%",
            },
            styles: {
              // "background-color": "#f1f1f1",
              // backgroundColor: "#0ff",
              // padding: "20px",
              // "font-size": "30px",
            },
            content: "Visual Acuity",
          },

          {
            container: "ClinUIFlexContainer",
            containerProps: {
              flexDirection: "row",
              flexWrap: "wrap",
              // flex: "0 0 30%",
              height: "fit-content",
            },
            styles: {
              // backgroundColor: "#f00"
              border: "10px solid red",
            },

            children: [
              {
                container: "ClinUISelectDropdown",
                containerProps: {
                  flex: "0 0 20%",
                },
                styles: {
                  // "background-color": "#f1f1f1",
                  // backgroundColor: "#0ff",
                  // padding: "20px",
                  // "font-size": "30px",
                },
                id: "ecapture_6-#-item1",
                content: ["Option1", "Option2"],
              },
            ],
          },

          {
            container: "ClinUIHeader3",
            containerProps: {
              flex: "0 0 100%",
            },
            styles: {
              // "background-color": "#f1f1f1",
              // backgroundColor: "#0ff",
              // padding: "20px",
              // "font-size": "30px",
            },
            content: "IOP",
          },

          {
            container: "ClinUIFlexContainer",
            containerProps: {
              flexDirection: "row",
              flexWrap: "wrap",
              // flex: "0 0 30%",
              height: "fit-content",
            },
            styles: {
              // backgroundColor: "#f00"
              border: "10px solid red",
            },

            children: [
              {
                container: "ClinUITextInput",
                containerProps: {
                  flex: "0 0 20%",
                },
                styles: {
                  // "background-color": "#f1f1f1",
                  // backgroundColor: "#0ff",
                  // padding: "20px",
                  // "font-size": "30px",
                },
                id: "ecapture_7-#-item1",
                content: " Question",
              },
            ],
          },

          // {
          //   container: "ClinUIButton",
          //   containerProps: {
          //     flex: "0 0 100%",
          //   },
          //   styles: {
          //     // "background-color": "#f1f1f1",
          //     // backgroundColor: "#0ff",
          //     // padding: "20px",
          //     // "font-size": "30px",
          //   },
          //   content: "Save",
          // },
        ],
      },

      {
        container: "ClinUIFlexContainer",
        containerProps: {
          flexDirection: "row",
          flexWrap: "wrap",
          // flex: "0 0 30%",
          height: "fit-content",
        },
        styles: {
          // backgroundColor: "#f00"
          border: "10px solid red",
        },

        children: [
          {
            container: "ClinUIHeader2",
            containerProps: {
              flex: "0 0 100%",
            },
            styles: {
              // "background-color": "#f1f1f1",
              // backgroundColor: "#0ff",
              // padding: "20px",
              // "font-size": "30px",
            },
            content: "Slit Lamp, Dilated Fundus, Macular OCT",
          },

          {
            container: "ClinUIHeader3",
            containerProps: {
              flex: "0 0 100%",
            },
            styles: {
              // "background-color": "#f1f1f1",
              // backgroundColor: "#0ff",
              // padding: "20px",
              // "font-size": "30px",
            },
            content: "Slit Lamp",
          },

          {
            container: "ClinUIFlexContainer",
            containerProps: {
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "flex-start",
              // flex: "0 0 30%",
              height: "fit-content",
            },
            styles: {
              // backgroundColor: "#f00"
              border: "10px solid red",
            },

            children: [
              {
                container: "ClinUIFlexContainer",
                containerProps: {
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "flex-start",
                  // flex: "0 0 30%",
                  height: "fit-content",
                },
                styles: {
                  // backgroundColor: "#f00"
                  border: "10px solid red",
                },

                children: [
                  {
                    container: "ClinUIText",
                    containerProps: {
                      flex: "0 0 30%",
                    },
                    styles: {
                      // "background-color": "#f1f1f1",
                      // backgroundColor: "#0ff",
                      // padding: "20px",
                      // "font-size": "30px",
                    },
                    content: "Dilated Pupil Diameter",
                  },
                  {
                    container: "ClinUITextInput",
                    containerProps: {
                      flex: "0 0 30%",
                    },
                    styles: {
                      // "background-color": "#f1f1f1",
                      // backgroundColor: "#0ff",
                      // padding: "20px",
                      // "font-size": "30px",
                    },
                    id: "ecapture_8-#-item1",
                    content: " Question",
                  },
                ],
              },
              {
                container: "ClinUIFlexContainer",
                containerProps: {
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "flex-start",
                  // flex: "0 0 30%",
                  height: "fit-content",
                },
                styles: {
                  // backgroundColor: "#f00"
                  border: "10px solid red",
                },

                children: [
                  {
                    container: "ClinUIFlexContainer",
                    containerProps: {
                      flexDirection: "row",
                      flexWrap: "wrap",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      // flex: "0 0 70%",
                      height: "fit-content",
                    },
                    styles: {
                      // backgroundColor: "#f00"
                      border: "10px solid red",
                    },

                    children: [
                      {
                        container: "ClinUIText",
                        containerProps: {
                          flex: "0 0 10%",
                        },
                        styles: {
                          // "background-color": "#f1f1f1",
                          // backgroundColor: "#0ff",
                          // padding: "20px",
                          // "font-size": "30px",
                        },
                        content: "Cornea",
                      },
                      {
                        container: "ClinUIFlexContainer",
                        containerProps: {
                          flexDirection: "column",
                          flexWrap: "wrap",
                          justifyContent: "flex-start",
                          flex: "0 0 30%",
                          height: "fit-content",
                        },
                        styles: {
                          // backgroundColor: "#f00"
                          border: "10px solid red",
                        },

                        children: [
                          {
                            container: "ClinUIText",
                            containerProps: {
                              flex: "0 0 30%",
                            },
                            styles: {
                              // "background-color": "#f1f1f1",
                              // backgroundColor: "#0ff",
                              // padding: "20px",
                              // "font-size": "30px",
                            },
                            content: "Dilated Pupil Diameter",
                          },
                          {
                            container: "ClinUICheckbox",
                            containerProps: {
                              flex: "0 0 30%",
                            },
                            styles: {
                              // "background-color": "#f1f1f1",
                              // backgroundColor: "#0ff",
                              // padding: "20px",
                              // "font-size": "30px",
                            },
                            id: "ecapture_8-#-item2",
                            content: ["Question"],
                          },
                        ],
                      },
                      {
                        container: "ClinUIFlexContainer",
                        containerProps: {
                          flexDirection: "column",
                          flexWrap: "wrap",
                          justifyContent: "flex-start",
                          flex: "0 0 30%",
                          height: "fit-content",
                        },
                        styles: {
                          // backgroundColor: "#f00"
                          border: "10px solid red",
                        },

                        children: [
                          {
                            container: "ClinUIText",
                            containerProps: {
                              flex: "0 0 30%",
                            },
                            styles: {
                              // "background-color": "#f1f1f1",
                              // backgroundColor: "#0ff",
                              // padding: "20px",
                              // "font-size": "30px",
                            },
                            content: "Dilated Pupil Diameter",
                          },
                          {
                            container: "ClinUICheckbox",
                            containerProps: {
                              flex: "0 0 30%",
                            },
                            styles: {
                              // "background-color": "#f1f1f1",
                              // backgroundColor: "#0ff",
                              // padding: "20px",
                              // "font-size": "30px",
                            },
                            id: "ecapture_8-#-item2",
                            content: ["Question"],
                          },
                        ],
                      },
                      {
                        container: "ClinUIFlexContainer",
                        containerProps: {
                          flexDirection: "column",
                          flexWrap: "wrap",
                          justifyContent: "flex-start",
                          flex: "0 0 30%",
                          height: "fit-content",
                        },
                        styles: {
                          // backgroundColor: "#f00"
                          border: "10px solid red",
                        },

                        children: [
                          {
                            container: "ClinUIText",
                            containerProps: {
                              flex: "0 0 30%",
                            },
                            styles: {
                              // "background-color": "#f1f1f1",
                              // backgroundColor: "#0ff",
                              // padding: "20px",
                              // "font-size": "30px",
                            },
                            content: "Dilated Pupil Diameter",
                          },
                          {
                            container: "ClinUITextInput",
                            containerProps: {
                              flex: "0 0 30%",
                            },
                            styles: {
                              // "background-color": "#f1f1f1",
                              // backgroundColor: "#0ff",
                              // padding: "20px",
                              // "font-size": "30px",
                            },
                            id: "ecapture_8-#-item3",
                            content: " Question",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    container: "ClinUIFlexContainer",
                    containerProps: {
                      flexDirection: "row",
                      flexWrap: "wrap",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      // flex: "0 0 70%",
                      height: "fit-content",
                    },
                    styles: {
                      // backgroundColor: "#f00"
                      border: "10px solid red",
                    },

                    children: [
                      {
                        container: "ClinUIText",
                        containerProps: {
                          flex: "0 0 10%",
                        },
                        styles: {
                          // "background-color": "#f1f1f1",
                          // backgroundColor: "#0ff",
                          // padding: "20px",
                          // "font-size": "30px",
                        },
                        content: "Cornea",
                      },
                      {
                        container: "ClinUIFlexContainer",
                        containerProps: {
                          flexDirection: "column",
                          flexWrap: "wrap",
                          justifyContent: "flex-start",
                          flex: "0 0 30%",
                          height: "fit-content",
                        },
                        styles: {
                          // backgroundColor: "#f00"
                          border: "10px solid red",
                        },

                        children: [
                          // {
                          //   container: "ClinUIText",
                          //   containerProps: {
                          //     flex: "0 0 30%",
                          //   },
                          //   styles: {
                          //     // "background-color": "#f1f1f1",
                          //     // backgroundColor: "#0ff",
                          //     // padding: "20px",
                          //     // "font-size": "30px",
                          //   },
                          //   content: "Dilated Pupil Diameter",
                          // },
                          {
                            container: "ClinUICheckbox",
                            containerProps: {
                              flex: "0 0 30%",
                            },
                            styles: {
                              // "background-color": "#f1f1f1",
                              // backgroundColor: "#0ff",
                              // padding: "20px",
                              // "font-size": "30px",
                            },
                            id: "ecapture_8-#-item4",
                            content: ["Question"],
                          },
                        ],
                      },
                      {
                        container: "ClinUIFlexContainer",
                        containerProps: {
                          flexDirection: "column",
                          flexWrap: "wrap",
                          justifyContent: "flex-start",
                          flex: "0 0 30%",
                          height: "fit-content",
                        },
                        styles: {
                          // backgroundColor: "#f00"
                          border: "10px solid red",
                        },

                        children: [
                          // {
                          //   container: "ClinUIText",
                          //   containerProps: {
                          //     flex: "0 0 30%",
                          //   },
                          //   styles: {
                          //     // "background-color": "#f1f1f1",
                          //     // backgroundColor: "#0ff",
                          //     // padding: "20px",
                          //     // "font-size": "30px",
                          //   },
                          //   content: "Dilated Pupil Diameter",
                          // },
                          {
                            container: "ClinUICheckbox",
                            containerProps: {
                              flex: "0 0 30%",
                            },
                            styles: {
                              // "background-color": "#f1f1f1",
                              // backgroundColor: "#0ff",
                              // padding: "20px",
                              // "font-size": "30px",
                            },
                            id: "ecapture_8-#-item4",
                            content: ["Question"],
                          },
                        ],
                      },
                      {
                        container: "ClinUIFlexContainer",
                        containerProps: {
                          flexDirection: "column",
                          flexWrap: "wrap",
                          justifyContent: "flex-start",
                          flex: "0 0 30%",
                          height: "fit-content",
                        },
                        styles: {
                          // backgroundColor: "#f00"
                          border: "10px solid red",
                        },

                        children: [
                          // {
                          //   container: "ClinUIText",
                          //   containerProps: {
                          //     flex: "0 0 30%",
                          //   },
                          //   styles: {
                          //     // "background-color": "#f1f1f1",
                          //     // backgroundColor: "#0ff",
                          //     // padding: "20px",
                          //     // "font-size": "30px",
                          //   },
                          //   content: "Dilated Pupil Diameter",
                          // },
                          {
                            container: "ClinUITextInput",
                            containerProps: {
                              flex: "0 0 30%",
                            },
                            styles: {
                              // "background-color": "#f1f1f1",
                              // backgroundColor: "#0ff",
                              // padding: "20px",
                              // "font-size": "30px",
                            },
                            id: "ecapture_8-#-item5",
                            content: " Question",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    container: "ClinUIFlexContainer",
                    containerProps: {
                      flexDirection: "row",
                      flexWrap: "wrap",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      // flex: "0 0 70%",
                      height: "fit-content",
                    },
                    styles: {
                      // backgroundColor: "#f00"
                      border: "10px solid red",
                    },

                    children: [
                      {
                        container: "ClinUIText",
                        containerProps: {
                          flex: "0 0 10%",
                        },
                        styles: {
                          // "background-color": "#f1f1f1",
                          // backgroundColor: "#0ff",
                          // padding: "20px",
                          // "font-size": "30px",
                        },
                        content: "Cornea",
                      },
                      {
                        container: "ClinUIFlexContainer",
                        containerProps: {
                          flexDirection: "column",
                          flexWrap: "wrap",
                          justifyContent: "flex-start",
                          flex: "0 0 30%",
                          height: "fit-content",
                        },
                        styles: {
                          // backgroundColor: "#f00"
                          border: "10px solid red",
                        },

                        children: [
                          // {
                          //   container: "ClinUIText",
                          //   containerProps: {
                          //     flex: "0 0 30%",
                          //   },
                          //   styles: {
                          //     // "background-color": "#f1f1f1",
                          //     // backgroundColor: "#0ff",
                          //     // padding: "20px",
                          //     // "font-size": "30px",
                          //   },
                          //   content: "Dilated Pupil Diameter",
                          // },
                          {
                            container: "ClinUICheckbox",
                            containerProps: {
                              flex: "0 0 30%",
                            },
                            styles: {
                              // "background-color": "#f1f1f1",
                              // backgroundColor: "#0ff",
                              // padding: "20px",
                              // "font-size": "30px",
                            },
                            id: "ecapture_8-#-item6",
                            content: [" Question"],
                          },
                        ],
                      },
                      {
                        container: "ClinUIFlexContainer",
                        containerProps: {
                          flexDirection: "column",
                          flexWrap: "wrap",
                          justifyContent: "flex-start",
                          flex: "0 0 30%",
                          height: "fit-content",
                        },
                        styles: {
                          // backgroundColor: "#f00"
                          border: "10px solid red",
                        },

                        children: [
                          // {
                          //   container: "ClinUIText",
                          //   containerProps: {
                          //     flex: "0 0 30%",
                          //   },
                          //   styles: {
                          //     // "background-color": "#f1f1f1",
                          //     // backgroundColor: "#0ff",
                          //     // padding: "20px",
                          //     // "font-size": "30px",
                          //   },
                          //   content: "Dilated Pupil Diameter",
                          // },
                          {
                            container: "ClinUICheckbox",
                            containerProps: {
                              flex: "0 0 30%",
                            },
                            id: "ecapture_8-#-item6",
                            styles: {
                              // "background-color": "#f1f1f1",
                              // backgroundColor: "#0ff",
                              // padding: "20px",
                              // "font-size": "30px",
                            },
                            content: [" Question"],
                          },
                        ],
                      },
                      {
                        container: "ClinUIFlexContainer",
                        containerProps: {
                          flexDirection: "column",
                          flexWrap: "wrap",
                          justifyContent: "flex-start",
                          flex: "0 0 30%",
                          height: "fit-content",
                        },
                        styles: {
                          // backgroundColor: "#f00"
                          border: "10px solid red",
                        },

                        children: [
                          // {
                          //   container: "ClinUIText",
                          //   containerProps: {
                          //     flex: "0 0 30%",
                          //   },
                          //   styles: {
                          //     // "background-color": "#f1f1f1",
                          //     // backgroundColor: "#0ff",
                          //     // padding: "20px",
                          //     // "font-size": "30px",
                          //   },
                          //   content: "Dilated Pupil Diameter",
                          // },
                          {
                            container: "ClinUITextInput",
                            containerProps: {
                              flex: "0 0 30%",
                            },
                            styles: {
                              // "background-color": "#f1f1f1",
                              // backgroundColor: "#0ff",
                              // padding: "20px",
                              // "font-size": "30px",
                            },
                            id: "ecapture_8-#-item7",
                            content: " Question",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },

          {
            container: "ClinUIFlexContainer",
            containerProps: {
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "flex-start",
              // flex: "0 0 30%",
              height: "fit-content",
            },
            styles: {
              // backgroundColor: "#f00"
              border: "10px solid red",
            },

            children: [
              {
                container: "ClinUIFlexContainer",
                containerProps: {
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  // flex: "0 0 70%",
                  height: "fit-content",
                },
                styles: {
                  // backgroundColor: "#f00"
                  border: "10px solid red",
                },

                children: [
                  {
                    container: "ClinUIFlexContainer",
                    containerProps: {
                      flexDirection: "column",
                      flexWrap: "wrap",
                      justifyContent: "flex-start",
                      flex: "0 0 30%",
                      height: "fit-content",
                    },
                    styles: {
                      // backgroundColor: "#f00"
                      border: "10px solid red",
                    },

                    children: [
                      {
                        container: "ClinUIText",
                        containerProps: {
                          flex: "0 0 30%",
                        },
                        styles: {
                          // "background-color": "#f1f1f1",
                          // backgroundColor: "#0ff",
                          // padding: "20px",
                          // "font-size": "30px",
                        },
                        content: "Dilated Pupil Diameter",
                      },
                      {
                        container: "ClinUISelectDropdown",
                        containerProps: {
                          flex: "0 0 30%",
                        },
                        styles: {
                          // "background-color": "#f1f1f1",
                          // backgroundColor: "#0ff",
                          // padding: "20px",
                          // "font-size": "30px",
                        },
                        id: "ecapture_8-#-item8",
                        content: ["Normal", "Other, specify"],
                      },
                    ],
                  },
                  {
                    container: "ClinUIFlexContainer",
                    containerProps: {
                      flexDirection: "column",
                      flexWrap: "wrap",
                      justifyContent: "flex-start",
                      flex: "0 0 30%",
                      height: "fit-content",
                    },
                    styles: {
                      // backgroundColor: "#f00"
                      border: "10px solid red",
                    },

                    children: [
                      {
                        container: "ClinUIText",
                        containerProps: {
                          flex: "0 0 30%",
                        },
                        styles: {
                          // "background-color": "#f1f1f1",
                          // backgroundColor: "#0ff",
                          // padding: "20px",
                          // "font-size": "30px",
                        },
                        content: "Dilated Pupil Diameter",
                      },
                      {
                        container: "ClinUISelectDropdown",
                        containerProps: {
                          flex: "0 0 30%",
                        },
                        styles: {
                          // "background-color": "#f1f1f1",
                          // backgroundColor: "#0ff",
                          // padding: "20px",
                          // "font-size": "30px",
                        },
                        id: "ecapture_8-#-item9",
                        content: ["Option1", "Option2"],
                      },
                    ],
                  },
                  {
                    container: "ClinUIFlexContainer",
                    containerProps: {
                      flexDirection: "column",
                      flexWrap: "wrap",
                      justifyContent: "flex-start",
                      flex: "0 0 30%",
                      height: "fit-content",
                    },
                    styles: {
                      // backgroundColor: "#f00"
                      border: "10px solid red",
                    },

                    children: [
                      {
                        container: "ClinUIText",
                        containerProps: {
                          flex: "0 0 30%",
                        },
                        styles: {
                          // "background-color": "#f1f1f1",
                          // backgroundColor: "#0ff",
                          // padding: "20px",
                          // "font-size": "30px",
                        },
                        content: "Dilated Pupil Diameter",
                      },
                      {
                        container: "ClinUISelectDropdown",
                        containerProps: {
                          flex: "0 0 30%",
                        },
                        styles: {
                          // "background-color": "#f1f1f1",
                          // backgroundColor: "#0ff",
                          // padding: "20px",
                          // "font-size": "30px",
                        },
                        id: "ecapture_8-#-item10",
                        content: ["Option1", "Option2"],
                      },
                    ],
                  },
                ],
              },
            ],
          },

          {
            container: "ClinUIHeader3",
            containerProps: {
              flex: "0 0 100%",
            },
            styles: {
              // "background-color": "#f1f1f1",
              // backgroundColor: "#0ff",
              // padding: "20px",
              // "font-size": "30px",
            },
            content: "Dilated Fundus",
          },
          //xxxxxx
          {
            container: "ClinUIFlexContainer",
            containerProps: {
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "flex-start",
              alignItems: "center",
              // flex: "0 0 70%",
              height: "fit-content",
            },
            styles: {
              // backgroundColor: "#f00"
              border: "10px solid red",
            },

            children: [
              {
                container: "ClinUIText",
                containerProps: {
                  flex: "0 0 10%",
                },
                styles: {
                  // "background-color": "#f1f1f1",
                  // backgroundColor: "#0ff",
                  // padding: "20px",
                  // "font-size": "30px",
                },
                content: "Dilated Pupil Diameter",
              },
              {
                container: "ClinUIFlexContainer",
                containerProps: {
                  flexDirection: "column",
                  flexWrap: "wrap",
                  justifyContent: "flex-start",
                  flex: "0 0 20%",
                  height: "fit-content",
                },
                styles: {
                  // backgroundColor: "#f00"
                  border: "10px solid red",
                },

                children: [
                  {
                    container: "ClinUIText",
                    containerProps: {
                      flex: "0 0 30%",
                    },
                    styles: {
                      // "background-color": "#f1f1f1",
                      // backgroundColor: "#0ff",
                      // padding: "20px",
                      // "font-size": "30px",
                    },
                    content: "Dilated Pupil Diameter",
                  },
                  {
                    container: "ClinUICheckbox",
                    containerProps: {
                      flex: "0 0 30%",
                    },
                    styles: {
                      // "background-color": "#f1f1f1",
                      // backgroundColor: "#0ff",
                      // padding: "20px",
                      // "font-size": "30px",
                    },
                    id: "ecapture_9-#-item1",
                    content: ["Option1"],
                  },
                ],
              },
              {
                container: "ClinUIFlexContainer",
                containerProps: {
                  flexDirection: "column",
                  flexWrap: "wrap",
                  justifyContent: "flex-start",
                  flex: "0 0 20%",
                  height: "fit-content",
                },
                styles: {
                  // backgroundColor: "#f00"
                  border: "10px solid red",
                },

                children: [
                  {
                    container: "ClinUIText",
                    containerProps: {
                      flex: "0 0 30%",
                    },
                    styles: {
                      // "background-color": "#f1f1f1",
                      // backgroundColor: "#0ff",
                      // padding: "20px",
                      // "font-size": "30px",
                    },
                    content: "Dilated Pupil Diameter",
                  },
                  {
                    container: "ClinUICheckbox",
                    containerProps: {
                      flex: "0 0 30%",
                    },
                    styles: {
                      // "background-color": "#f1f1f1",
                      // backgroundColor: "#0ff",
                      // padding: "20px",
                      // "font-size": "30px",
                    },
                    id: "ecapture_9-#-item1",
                    content: ["Option1"],
                  },
                ],
              },
              {
                container: "ClinUIFlexContainer",
                containerProps: {
                  flexDirection: "column",
                  flexWrap: "wrap",
                  justifyContent: "flex-start",
                  flex: "0 0 20%",
                  height: "fit-content",
                },
                styles: {
                  // backgroundColor: "#f00"
                  border: "10px solid red",
                },

                children: [
                  {
                    container: "ClinUIText",
                    containerProps: {
                      flex: "0 0 30%",
                    },
                    styles: {
                      // "background-color": "#f1f1f1",
                      // backgroundColor: "#0ff",
                      // padding: "20px",
                      // "font-size": "30px",
                    },
                    content: "Dilated Pupil Diameter",
                  },
                  {
                    container: "ClinUITextInput",
                    containerProps: {
                      flex: "0 0 30%",
                    },
                    styles: {
                      // "background-color": "#f1f1f1",
                      // backgroundColor: "#0ff",
                      // padding: "20px",
                      // "font-size": "30px",
                    },
                    id: "ecapture_9-#-item2",
                    content: "Option1",
                  },
                ],
              },
              {
                container: "ClinUIFlexContainer",
                containerProps: {
                  flexDirection: "column",
                  flexWrap: "wrap",
                  justifyContent: "flex-start",
                  flex: "0 0 30%",
                  height: "fit-content",
                },
                styles: {
                  // backgroundColor: "#f00"
                  border: "10px solid red",
                },

                children: [
                  {
                    container: "ClinUIText",
                    containerProps: {
                      flex: "0 0 30%",
                    },
                    styles: {
                      // "background-color": "#f1f1f1",
                      // backgroundColor: "#0ff",
                      // padding: "20px",
                      // "font-size": "30px",
                    },
                    content: "Dilated Pupil Diameter",
                  },
                  {
                    container: "ClinUITextInput",
                    containerProps: {
                      flex: "0 0 30%",
                    },
                    styles: {
                      // "background-color": "#f1f1f1",
                      // backgroundColor: "#0ff",
                      // padding: "20px",
                      // "font-size": "30px",
                    },
                    id: "ecapture_9-#-item3",
                    content: "Option1",
                  },
                ],
              },
            ],
          },

          {
            container: "ClinUIFlexContainer",
            containerProps: {
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "flex-start",
              alignItems: "center",
              // flex: "0 0 70%",
              height: "fit-content",
            },
            styles: {
              // backgroundColor: "#f00"
              border: "10px solid red",
            },

            children: [
              {
                container: "ClinUIText",
                containerProps: {
                  flex: "0 0 20%",
                },
                styles: {
                  // "background-color": "#f1f1f1",
                  // backgroundColor: "#0ff",
                  // padding: "20px",
                  // "font-size": "30px",
                },
                content: "Dilated Pupil Diameter",
              },
              {
                container: "ClinUIFlexContainer",
                containerProps: {
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "flex-start",
                  flex: "0 0 40%",
                  height: "fit-content",
                },
                styles: {
                  // backgroundColor: "#f00"
                  border: "10px solid red",
                },

                children: [
                  {
                    container: "ClinUICheckbox",
                    containerProps: {
                      flex: "0 0 30%",
                    },
                    styles: {
                      // "background-color": "#f1f1f1",
                      // backgroundColor: "#0ff",
                      // padding: "20px",
                      // "font-size": "30px",
                    },
                    id: "ecapture_9-#-item4",
                    content: [" Question"],
                  },
                  {
                    container: "ClinUIText",
                    containerProps: {
                      flex: "0 0 30%",
                    },
                    styles: {
                      // "background-color": "#f1f1f1",
                      // backgroundColor: "#0ff",
                      // padding: "20px",
                      // "font-size": "30px",
                    },
                    content: "Dilated Pupil Diameter",
                  },
                ],
              },
              {
                container: "ClinUIFlexContainer",
                containerProps: {
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "flex-start",
                  flex: "0 0 40%",
                  height: "fit-content",
                },
                styles: {
                  // backgroundColor: "#f00"
                  border: "10px solid red",
                },

                children: [
                  {
                    container: "ClinUICheckbox",
                    containerProps: {
                      flex: "0 0 30%",
                    },
                    styles: {
                      // "background-color": "#f1f1f1",
                      // backgroundColor: "#0ff",
                      // padding: "20px",
                      // "font-size": "30px",
                    },
                    id: "ecapture_9-#-item4",
                    content: [" Question"],
                  },
                  {
                    container: "ClinUIText",
                    containerProps: {
                      flex: "0 0 30%",
                    },
                    styles: {
                      // "background-color": "#f1f1f1",
                      // backgroundColor: "#0ff",
                      // padding: "20px",
                      // "font-size": "30px",
                    },
                    content: "Dilated Pupil Diameter",
                  },
                ],
              },
            ],
          },

          {
            container: "ClinUIHeader3",
            containerProps: {
              flex: "0 0 100%",
            },
            styles: {
              // "background-color": "#f1f1f1",
              // backgroundColor: "#0ff",
              // padding: "20px",
              // "font-size": "30px",
            },
            content: "Macular OCT",
          },

          {
            container: "ClinUIFlexContainer",
            containerProps: {
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "flex-start",
              alignItems: "center",
              // flex: "0 0 70%",
              height: "fit-content",
            },
            styles: {
              // backgroundColor: "#f00"
              border: "10px solid red",
            },

            children: [
              {
                container: "ClinUIText",
                containerProps: {
                  flex: "0 0 20%",
                },
                styles: {
                  // "background-color": "#f1f1f1",
                  // backgroundColor: "#0ff",
                  // padding: "20px",
                  // "font-size": "30px",
                },
                content: "Dilated Pupil Diameter",
              },
              {
                container: "ClinUIFlexContainer",
                containerProps: {
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "flex-start",
                  flex: "0 0 40%",
                  height: "fit-content",
                },
                styles: {
                  // backgroundColor: "#f00"
                  border: "10px solid red",
                },

                children: [
                  {
                    container: "ClinUICheckbox",
                    containerProps: {
                      flex: "0 0 30%",
                    },
                    styles: {
                      // "background-color": "#f1f1f1",
                      // backgroundColor: "#0ff",
                      // padding: "20px",
                      // "font-size": "30px",
                    },
                    id: "ecapture_10-#-item1",
                    content: [" Question"],
                  },
                  // {
                  //   container: "ClinUIText",
                  //   containerProps: {
                  //     flex: "0 0 30%",
                  //   },
                  //   styles: {
                  //     // "background-color": "#f1f1f1",
                  //     // backgroundColor: "#0ff",
                  //     // padding: "20px",
                  //     // "font-size": "30px",
                  //   },
                  //   content: "Dilated Pupil Diameter",
                  // },
                ],
              },
              {
                container: "ClinUIFlexContainer",
                containerProps: {
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "flex-start",
                  flex: "0 0 40%",
                  height: "fit-content",
                },
                styles: {
                  // backgroundColor: "#f00"
                  border: "10px solid red",
                },

                children: [
                  {
                    container: "ClinUICheckbox",
                    containerProps: {
                      flex: "0 0 30%",
                    },
                    styles: {
                      // "background-color": "#f1f1f1",
                      // backgroundColor: "#0ff",
                      // padding: "20px",
                      // "font-size": "30px",
                    },
                    id: "ecapture_10-#-item1",
                    content: [" Question"],
                  },
                  // {
                  //   container: "ClinUIText",
                  //   containerProps: {
                  //     flex: "0 0 30%",
                  //   },
                  //   styles: {
                  //     // "background-color": "#f1f1f1",
                  //     // backgroundColor: "#0ff",
                  //     // padding: "20px",
                  //     // "font-size": "30px",
                  //   },
                  //   content: "Dilated Pupil Diameter",
                  // },
                ],
              },
            ],
          },
        ],
      },

      {
        container: "ClinUIFlexContainer",
        containerProps: {
          flexDirection: "row",
          flexWrap: "wrap",
          // flex: "0 0 30%",
          height: "fit-content",
        },
        styles: {
          // backgroundColor: "#f00"
          border: "10px solid red",
        },

        children: [
          {
            container: "ClinUIHeader2",
            containerProps: {
              flex: "0 0 100%",
            },
            styles: {
              // "background-color": "#f1f1f1",
              // backgroundColor: "#0ff",
              // padding: "20px",
              // "font-size": "30px",
            },
            content:
              "Predicted Refraction, AI Nomohram Calculations, Exam Comments",
          },

          {
            container: "ClinUIHeader3",
            containerProps: {
              flex: "0 0 100%",
            },
            styles: {
              // "background-color": "#f1f1f1",
              // backgroundColor: "#0ff",
              // padding: "20px",
              // "font-size": "30px",
            },
            content: "Predicted Refraction",
          },

          {
            container: "ClinUIFlexContainer",
            containerProps: {
              flexDirection: "column",
              flexWrap: "wrap",
              justifyContent: "flex-start",
              // flex: "0 0 30%",
              height: "fit-content",
            },
            styles: {
              // backgroundColor: "#f00"
              border: "10px solid red",
            },

            children: [
              {
                container: "ClinUIText",
                containerProps: {
                  flex: "0 0 100%",
                },
                styles: {
                  // "background-color": "#f1f1f1",
                  // backgroundColor: "#0ff",
                  // padding: "20px",
                  // "font-size": "30px",
                },
                content: "Dilated Pupil Diameter",
              },
              {
                container: "ClinUITextInput",
                containerProps: {
                  flex: "0 0 100%",
                },
                styles: {
                  // "background-color": "#f1f1f1",
                  // backgroundColor: "#0ff",
                  // padding: "20px",
                  // "font-size": "30px",
                },
                content: " Question",
              },
            ],
          },
          {
            container: "ClinUIHeader3",
            containerProps: {
              flex: "0 0 100%",
            },
            styles: {
              // "background-color": "#f1f1f1",
              // backgroundColor: "#0ff",
              // padding: "20px",
              // "font-size": "30px",
            },
            content: "AI Nomogram Calculations",
          },
          //xxxxxx
          {
            container: "ClinUIFlexContainer",
            containerProps: {
              flexDirection: "column",
              flexWrap: "wrap",
              justifyContent: "flex-start",
              alignItems: "center",
              // flex: "0 0 70%",
              height: "fit-content",
            },
            styles: {
              // backgroundColor: "#f00"
              border: "10px solid red",
            },

            children: [
              {
                container: "ClinUIFlexContainer",
                containerProps: {
                  flexDirection: "column",
                  flexWrap: "wrap",
                  justifyContent: "flex-start",
                  flex: "0 0 20%",
                  height: "fit-content",
                },
                styles: {
                  // backgroundColor: "#f00"
                  border: "10px solid red",
                },

                children: [
                  {
                    container: "ClinUIText",
                    containerProps: {
                      flex: "0 0 30%",
                    },
                    styles: {
                      // "background-color": "#f1f1f1",
                      // backgroundColor: "#0ff",
                      // padding: "20px",
                      // "font-size": "30px",
                    },
                    content: "Dilated Pupil Diameter",
                  },
                  {
                    container: "ClinUIFlexContainer",
                    containerProps: {
                      flexDirection: "row",
                      flexWrap: "wrap",
                      justifyContent: "flex-start",
                      flex: "0 0 20%",
                      height: "fit-content",
                    },
                    styles: {
                      // backgroundColor: "#f00"
                      border: "10px solid red",
                    },

                    children: [
                      {
                        container: "ClinUICheckbox",
                        containerProps: {
                          flex: "0 0 20%",
                        },
                        styles: {
                          // "background-color": "#f1f1f1",
                          // backgroundColor: "#0ff",
                          // padding: "20px",
                          // "font-size": "30px",
                        },
                        content: ["Dilated Pupil Diameter"],
                      },
                      // {
                      //   container: "ClinUIText",
                      //   containerProps: {
                      //     flex: "0 0 20%",
                      //   },
                      //   styles: {
                      //     // "background-color": "#f1f1f1",
                      //     // backgroundColor: "#0ff",
                      //     // padding: "20px",
                      //     // "font-size": "30px",
                      //   },
                      //   content: "Dilated Pupil Diameter",
                      // },
                    ],
                  },
                ],
              },

              {
                container: "ClinUIFlexContainer",
                containerProps: {
                  flexDirection: "column",
                  flexWrap: "wrap",
                  justifyContent: "flex-start",
                  flex: "0 0 20%",
                  height: "fit-content",
                },
                styles: {
                  // backgroundColor: "#f00"
                  border: "10px solid red",
                },

                children: [
                  {
                    container: "ClinUIText",
                    containerProps: {
                      flex: "0 0 30%",
                    },
                    styles: {
                      // "background-color": "#f1f1f1",
                      // backgroundColor: "#0ff",
                      // padding: "20px",
                      // "font-size": "30px",
                    },
                    content: "Dilated Pupil Diameter",
                  },
                  {
                    container: "ClinUITextInput",
                    containerProps: {
                      flex: "0 0 30%",
                    },
                    styles: {
                      // "background-color": "#f1f1f1",
                      // backgroundColor: "#0ff",
                      // padding: "20px",
                      // "font-size": "30px",
                    },
                    content: " Question",
                  },
                ],
              },
              {
                container: "ClinUIFlexContainer",
                containerProps: {
                  flexDirection: "column",
                  flexWrap: "wrap",
                  justifyContent: "flex-start",
                  flex: "0 0 20%",
                  height: "fit-content",
                },
                styles: {
                  // backgroundColor: "#f00"
                  border: "10px solid red",
                },

                children: [
                  {
                    container: "ClinUIText",
                    containerProps: {
                      flex: "0 0 30%",
                    },
                    styles: {
                      // "background-color": "#f1f1f1",
                      // backgroundColor: "#0ff",
                      // padding: "20px",
                      // "font-size": "30px",
                    },
                    content: "Dilated Pupil Diameter",
                  },
                  {
                    container: "ClinUITextInput",
                    containerProps: {
                      flex: "0 0 30%",
                    },
                    styles: {
                      // "background-color": "#f1f1f1",
                      // backgroundColor: "#0ff",
                      // padding: "20px",
                      // "font-size": "30px",
                    },
                    content: " Question",
                  },
                ],
              },
              {
                container: "ClinUIFlexContainer",
                containerProps: {
                  flexDirection: "column",
                  flexWrap: "wrap",
                  justifyContent: "flex-start",
                  flex: "0 0 20%",
                  height: "fit-content",
                },
                styles: {
                  // backgroundColor: "#f00"
                  border: "10px solid red",
                },

                children: [
                  {
                    container: "ClinUIText",
                    containerProps: {
                      flex: "0 0 30%",
                    },
                    styles: {
                      // "background-color": "#f1f1f1",
                      // backgroundColor: "#0ff",
                      // padding: "20px",
                      // "font-size": "30px",
                    },
                    content: "Dilated Pupil Diameter",
                  },
                  {
                    container: "ClinUISelectDropdown",
                    containerProps: {
                      flex: "0 0 30%",
                    },
                    styles: {
                      // "background-color": "#f1f1f1",
                      // backgroundColor: "#0ff",
                      // padding: "20px",
                      // "font-size": "30px",
                    },
                    content: ["Option1", "Option2"],
                  },
                ],
              },
              {
                container: "ClinUIFlexContainer",
                containerProps: {
                  flexDirection: "column",
                  flexWrap: "wrap",
                  justifyContent: "flex-start",
                  flex: "0 0 20%",
                  height: "fit-content",
                },
                styles: {
                  // backgroundColor: "#f00"
                  border: "10px solid red",
                },

                children: [
                  {
                    container: "ClinUIText",
                    containerProps: {
                      flex: "0 0 30%",
                    },
                    styles: {
                      // "background-color": "#f1f1f1",
                      // backgroundColor: "#0ff",
                      // padding: "20px",
                      // "font-size": "30px",
                    },
                    content: "Dilated Pupil Diameter",
                  },
                  {
                    container: "ClinUISelectDropdown",
                    containerProps: {
                      flex: "0 0 30%",
                    },
                    styles: {
                      // "background-color": "#f1f1f1",
                      // backgroundColor: "#0ff",
                      // padding: "20px",
                      // "font-size": "30px",
                    },
                    content: ["Option1", "Option2"],
                  },
                ],
              },
              {
                container: "ClinUIFlexContainer",
                containerProps: {
                  flexDirection: "column",
                  flexWrap: "wrap",
                  justifyContent: "flex-start",
                  flex: "0 0 30%",
                  height: "fit-content",
                },
                styles: {
                  // backgroundColor: "#f00"
                  border: "10px solid red",
                },

                children: [
                  {
                    container: "ClinUIText",
                    containerProps: {
                      flex: "0 0 30%",
                    },
                    styles: {
                      // "background-color": "#f1f1f1",
                      // backgroundColor: "#0ff",
                      // padding: "20px",
                      // "font-size": "30px",
                    },
                    content: "Dilated Pupil Diameter",
                  },
                  {
                    container: "ClinUISelectDropdown",
                    containerProps: {
                      flex: "0 0 30%",
                    },
                    styles: {
                      // "background-color": "#f1f1f1",
                      // backgroundColor: "#0ff",
                      // padding: "20px",
                      // "font-size": "30px",
                    },
                    content: ["Option1", "Option2"],
                  },
                ],
              },
            ],
          },

          {
            container: "ClinUIFlexContainer",
            containerProps: {
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "flex-start",
              alignItems: "center",
              // flex: "0 0 70%",
              height: "fit-content",
            },
            styles: {
              // backgroundColor: "#f00"
              border: "10px solid red",
            },

            children: [
              {
                container: "ClinUIText",
                containerProps: {
                  flex: "0 0 20%",
                },
                styles: {
                  // "background-color": "#f1f1f1",
                  // backgroundColor: "#0ff",
                  // padding: "20px",
                  // "font-size": "30px",
                },
                content: "Dilated Pupil Diameter",
              },
              {
                container: "ClinUIFlexContainer",
                containerProps: {
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "flex-start",
                  flex: "0 0 40%",
                  height: "fit-content",
                },
                styles: {
                  // backgroundColor: "#f00"
                  border: "10px solid red",
                },

                children: [
                  {
                    container: "ClinUICheckbox",
                    containerProps: {
                      flex: "0 0 30%",
                    },
                    styles: {
                      // "background-color": "#f1f1f1",
                      // backgroundColor: "#0ff",
                      // padding: "20px",
                      // "font-size": "30px",
                    },
                    content: ["Dilated Pupil Diameter"],
                  },
                  // {
                  //   container: "ClinUIText",
                  //   containerProps: {
                  //     flex: "0 0 30%",
                  //   },
                  //   styles: {
                  //     // "background-color": "#f1f1f1",
                  //     // backgroundColor: "#0ff",
                  //     // padding: "20px",
                  //     // "font-size": "30px",
                  //   },
                  //   content: "Dilated Pupil Diameter",
                  // },
                ],
              },
              {
                container: "ClinUIFlexContainer",
                containerProps: {
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "flex-start",
                  flex: "0 0 40%",
                  height: "fit-content",
                },
                styles: {
                  // backgroundColor: "#f00"
                  border: "10px solid red",
                },

                children: [
                  {
                    container: "ClinUICheckbox",
                    containerProps: {
                      flex: "0 0 30%",
                    },
                    styles: {
                      // "background-color": "#f1f1f1",
                      // backgroundColor: "#0ff",
                      // padding: "20px",
                      // "font-size": "30px",
                    },
                    content: ["Dilated Pupil Diameter"],
                  },
                  // {
                  //   container: "ClinUIText",
                  //   containerProps: {
                  //     flex: "0 0 30%",
                  //   },
                  //   styles: {
                  //     // "background-color": "#f1f1f1",
                  //     // backgroundColor: "#0ff",
                  //     // padding: "20px",
                  //     // "font-size": "30px",
                  //   },
                  //   content: "Dilated Pupil Diameter",
                  // },
                ],
              },
            ],
          },

          {
            container: "ClinUIHeader3",
            containerProps: {
              flex: "0 0 100%",
            },
            styles: {
              // "background-color": "#f1f1f1",
              // backgroundColor: "#0ff",
              // padding: "20px",
              // "font-size": "30px",
            },
            content: "Exam Comments",
          },
          {
            container: "ClinUITextInput",
            containerProps: {
              flex: "0 0 100%",
            },
            styles: {
              // "background-color": "#f1f1f1",
              // backgroundColor: "#0ff",
              // padding: "20px",
              // "font-size": "30px",
            },
            content: "Exam Comments",
          },
        ],
      },

      // {
      //   container: "ClinUIFlexContainer",
      //   containerProps: {
      //     flexDirection: "row",
      //     flexWrap: "wrap",
      //     flex: "0 0 50%",
      //   },
      //   styles: {
      //     border: "10px solid green",
      //     // backgroundColor: "#f00"
      //   },

      //   children: [
      //     {
      //       container: "ClinUIHeader1",
      //       containerProps: {
      //         flex: "0 0 100%",
      //       },
      //       styles: {
      //         // "background-color": "#f1f1f1",
      //         // backgroundColor: "#0ff",
      //         // margin: "10px",
      //         padding: "20px",
      //         // "font-size": "30px",
      //       },
      //       content: "Exam Comments y",
      //     },
      //   ],
      // },

      // {
      //   container: "ClinUIText",
      //   containerProps: {
      //     flex: "0 0 20%",
      //   },
      //   styles: {
      //     border: "10px solid red",
      //     // "background-color": "#f1f1f1",
      //     // backgroundColor: "#0ff",
      //     // margin: "10px",
      //     padding: "20px",
      //     // "font-size": "30px",
      //   },
      //   content: "Exam Comments y",
      // },
    ],
  },

  {
    container: "ClinUIFlexContainer",
    containerProps: {
      // flexDirection: "column",
      // flexWrap: "wrap"
      height: "fit-content",
    },
    styles: {
      border: "10px solid blue",
      // backgroundColor: "#f00"
    },

    children: [
      {
        container: "ClinUIHeader1",
        containerProps: {
          flex: "0 0 100%",
        },
        styles: {
          // "background-color": "#f1f1f1",
          // backgroundColor: "#0ff",
          border: "10px solid red",
          // maxHeight:"10px"
          // margin: "10px",
          // padding: "40px",
          // "font-size": "12px",
        },
        content: "Operative Visit",
      },

      {
        container: "ClinUIFlexContainer",
        containerProps: {
          flexDirection: "row",
          flexWrap: "wrap",
          // flex: "0 0 30%",
          height: "fit-content",
        },
        styles: {
          // backgroundColor: "#f00"
          border: "10px solid red",
        },

        children: [
          {
            container: "ClinUIHeader2",
            containerProps: {
              flex: "0 0 100%",
            },
            styles: {
              // "background-color": "#f1f1f1",
              // backgroundColor: "#0ff",
              // padding: "20px",
              // "font-size": "30px",
            },
            content: "ALLY Parameters, IOL Parameters, OP Notes",
          },

          {
            container: "ClinUIFlexContainer",
            containerProps: {
              // flexDirection: "row",
              flexWrap: "wrap",
              // flex: "0 0 30%",
              height: "fit-content",
            },
            styles: {
              // backgroundColor: "#f00"
              border: "10px solid red",
            },

            children: [
              {
                container: "ClinUIHeader2",
                containerProps: {
                  flex: "0 0 30%",
                },
                styles: {
                  // "background-color": "#f1f1f1",
                  // backgroundColor: "#0ff",
                  // padding: "20px",
                  // "font-size": "30px",
                },
                content: "ALLY Parameters",
              },

              {
                container: "ClinUIFlexContainer",
                containerProps: {
                  flexDirection: "row",
                  flexWrap: "wrap",
                  // flex: "0 0 30%",
                  height: "fit-content",
                },
                styles: {
                  // backgroundColor: "#f00"
                  border: "10px solid red",
                },

                children: [
                  {
                    container: "ClinUIText",
                    containerProps: {
                      flex: "0 0 30%",
                    },
                    styles: {
                      // "background-color": "#f1f1f1",
                      // backgroundColor: "#0ff",
                      // padding: "20px",
                      // "font-size": "30px",
                    },
                    content: "System ID",
                  },

                  {
                    container: "ClinUITextInput",
                    containerProps: {
                      flex: "0 0 70%",
                    },
                    styles: {
                      // "background-color": "#f1f1f1",
                      // backgroundColor: "#0ff",
                      // padding: "20px",
                      // "font-size": "30px",
                    },
                    content: "System ID",
                  },
                ],
              },
              {
                container: "ClinUIFlexContainer",
                containerProps: {
                  flexDirection: "row",
                  flexWrap: "wrap",
                  // flex: "0 0 30%",
                  height: "fit-content",
                },
                styles: {
                  // backgroundColor: "#f00"
                  border: "10px solid red",
                },

                children: [
                  {
                    container: "ClinUIText",
                    containerProps: {
                      flex: "0 0 30%",
                    },
                    styles: {
                      // "background-color": "#f1f1f1",
                      // backgroundColor: "#0ff",
                      // padding: "20px",
                      // "font-size": "30px",
                    },
                    content: "Procedure ID",
                  },

                  {
                    container: "ClinUITextInput",
                    containerProps: {
                      flex: "0 0 70%",
                    },
                    styles: {
                      // "background-color": "#f1f1f1",
                      // backgroundColor: "#0ff",
                      // padding: "20px",
                      // "font-size": "30px",
                    },
                    content: "Procedure ID",
                  },
                ],
              },
            ],
          },

          {
            container: "ClinUIFlexContainer",
            containerProps: {
              // flexDirection: "row",
              flexWrap: "wrap",
              // flex: "0 0 30%",
              height: "fit-content",
            },
            styles: {
              // backgroundColor: "#f00"
              border: "10px solid red",
            },

            children: [
              {
                container: "ClinUIHeader2",
                containerProps: {
                  flex: "0 0 30%",
                },
                styles: {
                  // "background-color": "#f1f1f1",
                  // backgroundColor: "#0ff",
                  // padding: "20px",
                  // "font-size": "30px",
                },
                content: "IOL Parameters",
              },

              {
                container: "ClinUIFlexContainer",
                containerProps: {
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  // flex: "0 0 70%",
                  height: "fit-content",
                },
                styles: {
                  // backgroundColor: "#f00"
                  border: "10px solid red",
                },

                children: [
                  {
                    container: "ClinUIFlexContainer",
                    containerProps: {
                      flexDirection: "column",
                      flexWrap: "wrap",
                      justifyContent: "flex-start",
                      flex: "0 0 20%",
                      height: "fit-content",
                    },
                    styles: {
                      // backgroundColor: "#f00"
                      border: "10px solid red",
                    },

                    children: [
                      {
                        container: "ClinUIText",
                        containerProps: {
                          flex: "0 0 30%",
                        },
                        styles: {
                          // "background-color": "#f1f1f1",
                          // backgroundColor: "#0ff",
                          // padding: "20px",
                          // "font-size": "30px",
                        },
                        content: "IOL Type",
                      },
                      {
                        container: "ClinUISelectDropdown",
                        containerProps: {
                          flex: "0 0 30%",
                        },
                        styles: {
                          // "background-color": "#f1f1f1",
                          // backgroundColor: "#0ff",
                          // padding: "20px",
                          // "font-size": "30px",
                        },
                        content: ["Option1", "Option2"],
                      },
                    ],
                  },
                  {
                    container: "ClinUIFlexContainer",
                    containerProps: {
                      flexDirection: "column",
                      flexWrap: "wrap",
                      justifyContent: "flex-start",
                      flex: "0 0 20%",
                      height: "fit-content",
                    },
                    styles: {
                      // backgroundColor: "#f00"
                      border: "10px solid red",
                    },

                    children: [
                      {
                        container: "ClinUIText",
                        containerProps: {
                          flex: "0 0 30%",
                        },
                        styles: {
                          // "background-color": "#f1f1f1",
                          // backgroundColor: "#0ff",
                          // padding: "20px",
                          // "font-size": "30px",
                        },
                        content: "IOL Manufacturer",
                      },
                      {
                        container: "ClinUISelectDropdown",
                        containerProps: {
                          flex: "0 0 30%",
                        },
                        styles: {
                          // "background-color": "#f1f1f1",
                          // backgroundColor: "#0ff",
                          // padding: "20px",
                          // "font-size": "30px",
                        },
                        content: ["option1", "option2"],
                      },
                    ],
                  },
                  {
                    container: "ClinUIFlexContainer",
                    containerProps: {
                      flexDirection: "column",
                      flexWrap: "wrap",
                      justifyContent: "flex-start",
                      flex: "0 0 20%",
                      height: "fit-content",
                    },
                    styles: {
                      // backgroundColor: "#f00"
                      border: "10px solid red",
                    },

                    children: [
                      {
                        container: "ClinUIText",
                        containerProps: {
                          flex: "0 0 30%",
                        },
                        styles: {
                          // "background-color": "#f1f1f1",
                          // backgroundColor: "#0ff",
                          // padding: "20px",
                          // "font-size": "30px",
                        },
                        content: "If other, specify",
                      },
                      {
                        container: "ClinUITextInput",
                        containerProps: {
                          flex: "0 0 30%",
                        },
                        styles: {
                          // "background-color": "#f1f1f1",
                          // backgroundColor: "#0ff",
                          // padding: "20px",
                          // "font-size": "30px",
                        },
                        content: " Question",
                      },
                    ],
                  },
                ],
              },
              {
                container: "ClinUIFlexContainer",
                containerProps: {
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  // flex: "0 0 70%",
                  height: "fit-content",
                },
                styles: {
                  // backgroundColor: "#f00"
                  border: "10px solid red",
                },

                children: [
                  {
                    container: "ClinUIFlexContainer",
                    containerProps: {
                      flexDirection: "column",
                      flexWrap: "wrap",
                      justifyContent: "flex-start",
                      flex: "0 0 20%",
                      height: "fit-content",
                    },
                    styles: {
                      // backgroundColor: "#f00"
                      border: "10px solid red",
                    },

                    children: [
                      {
                        container: "ClinUIText",
                        containerProps: {
                          flex: "0 0 30%",
                        },
                        styles: {
                          // "background-color": "#f1f1f1",
                          // backgroundColor: "#0ff",
                          // padding: "20px",
                          // "font-size": "30px",
                        },
                        content: "IOL Model",
                      },
                      {
                        container: "ClinUITextInput",
                        containerProps: {
                          flex: "0 0 30%",
                        },
                        styles: {
                          // "background-color": "#f1f1f1",
                          // backgroundColor: "#0ff",
                          // padding: "20px",
                          // "font-size": "30px",
                        },
                        content: "",
                      },
                    ],
                  },
                  {
                    container: "ClinUIFlexContainer",
                    containerProps: {
                      flexDirection: "column",
                      flexWrap: "wrap",
                      justifyContent: "flex-start",
                      flex: "0 0 20%",
                      height: "fit-content",
                    },
                    styles: {
                      // backgroundColor: "#f00"
                      border: "10px solid red",
                    },

                    children: [
                      {
                        container: "ClinUIText",
                        containerProps: {
                          flex: "0 0 30%",
                        },
                        styles: {
                          // "background-color": "#f1f1f1",
                          // backgroundColor: "#0ff",
                          // padding: "20px",
                          // "font-size": "30px",
                        },
                        content: "IOL Power D",
                      },
                      {
                        container: "ClinUITextInput",
                        containerProps: {
                          flex: "0 0 30%",
                        },
                        styles: {
                          // "background-color": "#f1f1f1",
                          // backgroundColor: "#0ff",
                          // padding: "20px",
                          // "font-size": "30px",
                        },
                        content: "",
                      },
                    ],
                  },
                  {
                    container: "ClinUIFlexContainer",
                    containerProps: {
                      flexDirection: "column",
                      flexWrap: "wrap",
                      justifyContent: "flex-start",
                      flex: "0 0 20%",
                      height: "fit-content",
                    },
                    styles: {
                      // backgroundColor: "#f00"
                      border: "10px solid red",
                    },

                    children: [
                      {
                        container: "ClinUIText",
                        containerProps: {
                          flex: "0 0 30%",
                        },
                        styles: {
                          // "background-color": "#f1f1f1",
                          // backgroundColor: "#0ff",
                          // padding: "20px",
                          // "font-size": "30px",
                        },
                        content: "IOL Cylinder D",
                      },
                      {
                        container: "ClinUITextInput",
                        containerProps: {
                          flex: "0 0 30%",
                        },
                        styles: {
                          // "background-color": "#f1f1f1",
                          // backgroundColor: "#0ff",
                          // padding: "20px",
                          // "font-size": "30px",
                        },
                        content: "",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

const visittemp = [
  {
    container: "ClinUIScreensContainer",
    children: [
      {
        container: "ClinUIFlexContainer",
        containerProps: {
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          height: "fit-content",
        },
        styles: {
          border: "10px solid red",
        },

        children: [
          {
            container: "ClinUIHeader1",
            containerProps: {
              flex: "0 0 100%",
            },
            styles: {
              border: "10px solid red",
            },
            content: "Screen 1",
          },
          {
            container: "ClinUIHeader2",
            containerProps: {
              flex: "0 0 100%",
            },
            styles: {
              border: "10px solid red",
            },
            content: "Ecapture 1",
          },
          {
            container: "ClinUIText",
            containerProps: {
              flex: "0 0 10%",
            },
            styles: {},
            content: "Question 1?",
          },
          {
            container: "ClinUITextInput",
            containerProps: {
              flex: "0 0 20%",
            },
            styles: {
              // "background-color": "#f1f1f1",
              // backgroundColor: "#0ff",
              // padding: "20px",
              // "font-size": "30px",
            },
            id: "ecapture_0-#-item1",
            content: "Enter a valid answer",
          },
          {
            container: "ClinUIText",
            containerProps: {
              flex: "0 0 10%",
            },
            styles: {},
            content: "Question 2?",
          },
          {
            container: "ClinUITextInput",
            containerProps: {
              flex: "0 0 20%",
            },
            styles: {},
            id: "ecapture_0-#-item2",
            content: "Enter a valid answer",
          },
          {
            container: "ClinUIHeader2",
            containerProps: {
              flex: "0 0 100%",
            },
            styles: {
              border: "10px solid red",
            },
            content: "Ecapture 2",
          },
          {
            container: "ClinUIText",
            containerProps: {
              flex: "0 0 10%",
            },
            styles: {},
            content: "Question 1?",
          },
          {
            container: "ClinUITextInput",
            containerProps: {
              flex: "0 0 20%",
            },
            styles: {
              // "background-color": "#f1f1f1",
              // backgroundColor: "#0ff",
              // padding: "20px",
              // "font-size": "30px",
            },
            id: "ecapture_0-#-item1",
            content: "Enter a valid answer",
          },
          {
            container: "ClinUIText",
            containerProps: {
              flex: "0 0 10%",
            },
            styles: {},
            content: "Question 2?",
          },
          {
            container: "ClinUITextInput",
            containerProps: {
              flex: "0 0 20%",
            },
            styles: {},
            id: "ecapture_0-#-item2",
            content: "Enter a valid answer",
          },
          {
            container: "ClinUIText",
            containerProps: {
              flex: "0 0 10%",
            },
            styles: {},
            content: "Question 2?",
          },
          {
            container: "ClinUITextInput",
            containerProps: {
              flex: "0 0 20%",
            },
            styles: {},
            id: "ecapture_0-#-item2",
            content: "Enter a valid answer",
          },

          {
            container: "ClinUIHeader2",
            containerProps: {
              flex: "0 0 100%",
            },
            styles: {
              border: "10px solid red",
            },
            content: "Ecapture 3",
          },
          {
            container: "ClinUIText",
            containerProps: {
              flex: "0 0 50%",
            },
            styles: {},
            content: "Question 1?",
          },
          {
            container: "ClinUITextInput",
            containerProps: {
              flex: "0 0 50%",
            },
            styles: {
              // "background-color": "#f1f1f1",
              // backgroundColor: "#0ff",
              // padding: "20px",
              // "font-size": "30px",
            },
            id: "ecapture_0-#-item1",
            content: "Enter a valid answer",
          },
          {
            container: "ClinUIText",
            containerProps: {
              flex: "0 0 50%",
            },
            styles: {},
            content: "Question 2?",
          },
          {
            container: "ClinUITextInput",
            containerProps: {
              flex: "0 0 50%",
            },
            styles: {},
            id: "ecapture_0-#-item2",
            content: "Enter a valid answer",
          },
        ],
      },
    ],
  },
];

const visit1 = [
  {
    container: "ClinUIScreensContainer",
    children: [
      {
        container: "ClinUIFlexContainer",
        containerProps: {
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          height: "fit-content",
        },
        styles: {
          border: "10px solid red",
        },

        children: [
          {
            container: "ClinUIHeader1",
            containerProps: {
              flex: "0 0 100%",
            },
            styles: {
              border: "10px solid red",
            },
            content: "Screen 1",
          },

          {
            container: "ClinUIFlexContainer",
            containerProps: {
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "flex-start",
              height: "fit-content",
              flex: "0 0 50%",
            },
            styles: {
              border: "10px solid green",
            },
            children: [
              {
                container: "ClinUIHeader2",
                containerProps: {
                  flex: "0 0 100%",
                },
                styles: {
                  border: "10px solid red",
                },
                content: "Ecapture 1",
              },
              {
                container: "ClinUIText",
                containerProps: {
                  flex: "0 0 50%",
                },
                styles: {},
                content: "Question 1?",
              },
              {
                container: "ClinUITextInput",
                containerProps: {
                  flex: "0 0 50%",
                },
                styles: {
                  // "background-color": "#f1f1f1",
                  // backgroundColor: "#0ff",
                  // padding: "20px",
                  // "font-size": "30px",
                },
                id: "ecapture_0-#-item1",
                content: "Enter a valid answer",
              },
              {
                container: "ClinUIText",
                containerProps: {
                  flex: "0 0 50%",
                },
                styles: {},
                content: "Question 2?",
              },
              {
                container: "ClinUITextInput",
                containerProps: {
                  flex: "0 0 50%",
                },
                styles: {},
                id: "ecapture_0-#-item2",
                content: "Enter a valid answer",
              },
            ],
          },

          {
            container: "ClinUIFlexContainer",
            containerProps: {
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "flex-start",
              height: "fit-content",
              flex: "0 0 50%",
            },
            styles: {
              border: "10px solid green",
            },
            children: [
              {
                container: "ClinUIHeader2",
                containerProps: {
                  flex: "0 0 100%",
                },
                styles: {
                  border: "10px solid red",
                },
                content: "Ecapture 3",
              },
              {
                container: "ClinUIText",
                containerProps: {
                  flex: "0 0 50%",
                },
                styles: {},
                content: "Question 1?",
              },
              {
                container: "ClinUITextInput",
                containerProps: {
                  flex: "0 0 50%",
                },
                styles: {
                  // "background-color": "#f1f1f1",
                  // backgroundColor: "#0ff",
                  // padding: "20px",
                  // "font-size": "30px",
                },
                id: "ecapture_0-#-item1",
                content: "Enter a valid answer",
              },
              {
                container: "ClinUIText",
                containerProps: {
                  flex: "0 0 50%",
                },
                styles: {},
                content: "Question 2?",
              },
              {
                container: "ClinUITextInput",
                containerProps: {
                  flex: "0 0 50%",
                },
                styles: {},
                id: "ecapture_0-#-item2",
                content: "Enter a valid answer",
              },
            ],
          },
        ],
      },
    ],
  },
];

const visit0 = [
  {
    container: "ClinUIScreensContainer",
    children: [
      {
        container: "ClinUIFlexContainer",
        containerProps: {
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          height: "fit-content",
        },
        styles: {
          border: "10px solid red",
        },

        children: [
          {
            container: "ClinUIHeader1",
            containerProps: {
              flex: "0 0 100%",
            },
            styles: {
              border: "10px solid red",
            },
            content: "Screen 1",
          },

          {
            container: "ClinUIFlexContainer",
            containerProps: {
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "flex-start",
              height: "fit-content",
              flex: "0 0 70%",
            },
            styles: {
              border: "10px solid green",
            },
            children: [
              {
                container: "ClinUIHeader2",
                containerProps: {
                  flex: "0 0 100%",
                },
                styles: {
                  border: "10px solid red",
                },
                content: "Ecapture 1",
              },
              {
                container: "ClinUIText",
                containerProps: {
                  flex: "0 0 50%",
                },
                styles: {},
                content: "Question 1?",
              },
              {
                container: "ClinUITextInput",
                containerProps: {
                  flex: "0 0 50%",
                },
                styles: {
                  // "background-color": "#f1f1f1",
                  // backgroundColor: "#0ff",
                  // padding: "20px",
                  // "font-size": "30px",
                },
                id: "ecapture_0-#-item1",
                content: "Enter a valid answer",
              },
              {
                container: "ClinUIText",
                containerProps: {
                  flex: "0 0 50%",
                },
                styles: {},
                content: "Question 2?",
              },
              {
                container: "ClinUITextInput",
                containerProps: {
                  flex: "0 0 50%",
                },
                styles: {},
                id: "ecapture_0-#-item2",
                content: "Enter a valid answer",
              },
            ],
          },

          {
            container: "ClinUIFlexContainer",
            containerProps: {
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "flex-start",
              height: "fit-content",
              flex: "0 0 30%",
            },
            styles: {
              border: "10px solid green",
            },
            children: [
              {
                container: "ClinUIHeader2",
                containerProps: {
                  flex: "0 0 100%",
                },
                styles: {
                  border: "10px solid red",
                },
                content: "Ecapture 2",
              },
              {
                container: "ClinUIText",
                containerProps: {
                  flex: "0 0 50%",
                },
                styles: {},
                content: "Question 1?",
              },
              {
                container: "ClinUITextInput",
                containerProps: {
                  flex: "0 0 50%",
                },
                styles: {
                  // "background-color": "#f1f1f1",
                  // backgroundColor: "#0ff",
                  // padding: "20px",
                  // "font-size": "30px",
                },
                id: "ecapture_0-#-item1",
                content: "Enter a valid answer",
              },
              {
                container: "ClinUIText",
                containerProps: {
                  flex: "0 0 50%",
                },
                styles: {},
                content: "Question 2?",
              },
              {
                container: "ClinUITextInput",
                containerProps: {
                  flex: "0 0 50%",
                },
                styles: {},
                id: "ecapture_0-#-item2",
                content: "Enter a valid answer",
              },
              {
                container: "ClinUIText",
                containerProps: {
                  flex: "0 0 50%",
                },
                styles: {},
                content: "Question 3?",
              },
              {
                container: "ClinUITextInput",
                containerProps: {
                  flex: "0 0 50%",
                },
                styles: {},
                id: "ecapture_0-#-item2",
                content: "Enter a valid answer",
              },
            ],
          },
        ],
      },
      {
        container: "ClinUIFlexContainer",
        containerProps: {
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          height: "fit-content",
        },
        styles: {
          border: "10px solid red",
        },

        children: [
          {
            container: "ClinUIHeader1",
            containerProps: {
              flex: "0 0 100%",
            },
            styles: {
              border: "10px solid red",
            },
            content: "Screen 2",
          },

          {
            container: "ClinUIFlexContainer",
            containerProps: {
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "flex-start",
              height: "fit-content",
              flex: "0 0 70%",
            },
            styles: {
              border: "10px solid green",
            },
            children: [
              {
                container: "ClinUIHeader2",
                containerProps: {
                  flex: "0 0 100%",
                },
                styles: {
                  border: "10px solid red",
                },
                content: "Ecapture 3",
              },
              {
                container: "ClinUIText",
                containerProps: {
                  flex: "0 0 50%",
                },
                styles: {},
                content: "Question 1?",
              },
              {
                container: "ClinUITextInput",
                containerProps: {
                  flex: "0 0 50%",
                },
                styles: {
                  // "background-color": "#f1f1f1",
                  // backgroundColor: "#0ff",
                  // padding: "20px",
                  // "font-size": "30px",
                },
                id: "ecapture_0-#-item1",
                content: "Enter a valid answer",
              },
              {
                container: "ClinUIText",
                containerProps: {
                  flex: "0 0 50%",
                },
                styles: {},
                content: "Question 2?",
              },
              {
                container: "ClinUITextInput",
                containerProps: {
                  flex: "0 0 50%",
                },
                styles: {},
                id: "ecapture_0-#-item2",
                content: "Enter a valid answer",
              },
            ],
          },
        ],
      },
    ],
  },
];

const visit2 = [
  {
    container: "ClinUIScreensContainer",
    children: [
      {
        container: "ClinUIFlexContainer",
        containerProps: {
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          height: "fit-content",
        },
        styles: {
          border: "10px solid red",
        },

        children: [
          {
            container: "ClinUIHeader1",
            containerProps: {
              flex: "0 0 100%",
            },
            styles: {
              border: "10px solid red",
            },
            content: "Screen 1",
          },

          {
            container: "ClinUIFlexContainer",
            containerProps: {
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "flex-start",
              height: "fit-content",
              flex: "0 0 100%",
            },
            styles: {
              border: "10px solid green",
            },
            children: [
              {
                container: "ClinUIHeader2",
                containerProps: {
                  flex: "0 0 100%",
                },
                styles: {
                  border: "10px solid red",
                },
                content: "Ecapture 3",
              },
              {
                container: "ClinUIText",
                containerProps: {
                  flex: "0 0 50%",
                },
                styles: {},
                content: "Question 1?",
              },
              {
                container: "ClinUITextInput",
                containerProps: {
                  flex: "0 0 50%",
                },
                styles: {
                  // "background-color": "#f1f1f1",
                  // backgroundColor: "#0ff",
                  // padding: "20px",
                  // "font-size": "30px",
                },
                id: "ecapture_0-#-item1",
                content: "Enter a valid answer",
              },
              {
                container: "ClinUIText",
                containerProps: {
                  flex: "0 0 50%",
                },
                styles: {},
                content: "Question 2?",
              },
              {
                container: "ClinUITextInput",
                containerProps: {
                  flex: "0 0 50%",
                },
                styles: {},
                id: "ecapture_0-#-item2",
                content: "Enter a valid answer",
              },
            ],
          },

          {
            container: "ClinUIFlexContainer",
            containerProps: {
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "flex-start",
              height: "fit-content",
              flex: "0 0 50%",
            },
            styles: {
              border: "10px solid green",
            },
            children: [
              {
                container: "ClinUIHeader2",
                containerProps: {
                  flex: "0 0 100%",
                },
                styles: {
                  border: "10px solid red",
                },
                content: "Ecapture 2",
              },
              {
                container: "ClinUIText",
                containerProps: {
                  flex: "0 0 50%",
                },
                styles: {},
                content: "Question 1?",
              },
              {
                container: "ClinUITextInput",
                containerProps: {
                  flex: "0 0 50%",
                },
                styles: {
                  // "background-color": "#f1f1f1",
                  // backgroundColor: "#0ff",
                  // padding: "20px",
                  // "font-size": "30px",
                },
                id: "ecapture_0-#-item1",
                content: "Enter a valid answer",
              },
              {
                container: "ClinUIText",
                containerProps: {
                  flex: "0 0 50%",
                },
                styles: {},
                content: "Question 2?",
              },
              {
                container: "ClinUITextInput",
                containerProps: {
                  flex: "0 0 50%",
                },
                styles: {},
                id: "ecapture_0-#-item2",
                content: "Enter a valid answer",
              },
              {
                container: "ClinUIText",
                containerProps: {
                  flex: "0 0 50%",
                },
                styles: {},
                content: "Question 3?",
              },
              {
                container: "ClinUITextInput",
                containerProps: {
                  flex: "0 0 50%",
                },
                styles: {},
                id: "ecapture_0-#-item3",
                content: "Enter a valid answer",
              },
              {
                container: "ClinUIText",
                containerProps: {
                  flex: "0 0 50%",
                },
                styles: {},
                content: "Question 4?",
              },
              {
                container: "ClinUICheckbox",
                containerProps: {
                  flex: "0 0 50%",
                },
                styles: {},
                id: "ecapture_0-#-item4",
                content: "Enter a valid answer",
                options: ["a", "b"],
              },
              {
                container: "ClinUIText",
                containerProps: {
                  flex: "0 0 50%",
                },
                styles: {},
                content: "Question 5?",
              },
              {
                container: "ClinUISelectDropdown",
                containerProps: {
                  flex: "0 0 50%",
                },
                styles: {},
                id: "ecapture_0-#-item5",
                content: "Enter a valid answer",
                options: ["a", "b"],
              },
              {
                container: "ClinUIText",
                containerProps: {
                  flex: "0 0 50%",
                },
                styles: {},
                content: "Question 6?",
              },
              {
                container: "ClinUINumberInput",
                containerProps: {
                  flex: "0 0 50%",
                },
                styles: {},
                id: "ecapture_0-#-item6",
                content: "Enter a valid answer",
              },
            ],
          },
        ],
      },
    ],
  },
];

const [items, setItems] = React.useState({});

const setInputValues = (key, value) => {
  // console.log({key}, {value});
  setItems((prev) => {
    let obj = prev;
    obj[key] = value;

    return obj;
  });
  console.log({ items });
};

export function CLINHeader(props) {
  const { item } = props;
  return item.container == "ClinUIHeader1" ? (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        fontWeight: 700,
        fontSize: "28px",
        padding: "30px",
        maxHeight: "10px",
        ...item.containerProps,
        ...item.styles,
      }}
    >
      {item.content}
    </View>
  ) : null;
}

export function CLINHeader2(props) {
  const { item } = props;
  return item.container == "ClinUIHeader2" ? (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        fontWeight: 600,
        fontSize: "22px",
        padding: "20px",
        ...item.containerProps,
        ...item.styles,
      }}
    >
      {item.content}
    </View>
  ) : null;
}

export function CLINHeader3(props) {
  const { item } = props;
  return item.container == "ClinUIHeader3" ? (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        fontWeight: 600,
        fontSize: "15px",
        padding: "20px",
        ...item.containerProps,
        ...item.styles,
      }}
    >
      {item.content}
    </View>
  ) : null;
}

export function CLINText(props) {
  const { item } = props;
  return item.container == "ClinUIText" ? (
    <View
      style={{
        fontWeight: 400,
        fontSize: "15px",
        padding: "30px",
        ...item.containerProps,
        ...item.styles,
      }}
    >
      {item.content}
    </View>
  ) : null;
}

export function CLINTextInput(props) {
  const { item, setInputValues, savedData } = props;

  const [text, onChangeText] = React.useState(item.data || item.content);
  useEffect(() => {
    setInputValues(item.id, text);
  }, [text]);
  return item.container == "ClinUITextInput" ? (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        // alignItems: "center",
        padding: "10px",
        ...item.containerProps,
        ...item.styles,
      }}
    >
      {/* <Text>{item.label ? item.label : "input text"}</Text> */}
      <TextInput
        style={{
          borderWidth: 1,
          borderRadius: 5,
          height: 40,
          maxWidth: "500",
        }}
        // style={styles.input}
        onChangeText={(value) => {
          // console.log("***** value *******");
          // console.log("item.id: ", item.id);
          // console.log({value});
          onChangeText(value);
          setInputValues(item.id, value);
        }}
        value={text}
      />
    </View>
  ) : null;
}

export function CLINNumberInput(props) {
  const { item, setInputValues, savedData } = props;

  const [text, onChangeText] = React.useState(item.data || "0");
  useEffect(() => {
    setInputValues(item.id,parseInt(text));
  }, [text]);
  return item.container == "ClinUINumberInput" ? (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        // alignItems: "center",
        padding: "10px",
        ...item.containerProps,
        ...item.styles,
      }}
    >
      {/* <Text>{item.label ? item.label : "input text"}</Text> */}
      <TextInput
        style={{
          borderWidth: 1,
          borderRadius: 5,
          height: 40,
          maxWidth: "500",
        }}
        // style={styles.input}
        keyboardType="numeric"
        onChangeText={(value) => {
          // console.log("***** value *******");
          // console.log("item.id: ", item.id);
          // console.log({value});
          onChangeText(value);
          setInputValues(item.id, parseInt(value));
        }}
        value={text}
      />
    </View>
  ) : null;
}

export function CLINUISelectDropdown1(props) {
  const { item, setInputValues, savedData } = props;
  const [value, setValue] = React.useState(item.data || "");
  useEffect(() => {
    setInputValues(item.id, value);
  }, [value]);
  const id = item.id;
  const temp = item.options.map((i) => ({
    label: i,
    value: i,
  }));
  const [items, setItems] = React.useState(temp);
  const [open, setOpen] = React.useState(false);
  return item.container == "ClinUISelectDropdown" ? (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        maxHeight: 50,
        // alignItems: "center",
        padding: "10px",
        maxWidth: "500",
        zIndex: open?1000:0,
        ...item.containerProps,
        ...item.styles,

      }}
    >
      <Text>{item.content
       ? item.content : "dropdown text"}</Text>
      <DropDownPicker
        style={{ maxWidth: "700",  }}
        zIndex={2000}
        open={open}
        value={value}
        items={items}
        closeOnBackPressed={true}
        closeAfterSelecting={true}
        dropDownDirection="DEFAULT"
        setOpen={setOpen}
        onClose={setOpen}
        setValue={setValue}
        setItems={setItems}
        onChangeValue={(value) => {
          setValue(value);
          setInputValues(id, value);
        }}
      />
    </View>
  ) : null;
}

export function CLINUISelectDropdown(props) {
  const { item, setInputValues, savedData } = props;
  // const [value, setValue] = React.useState(item.data || "");

  const [selected, setSelected] = React.useState(item.data ||"");
  // const [categories, setCategories] = React.useState([]);
  useEffect(() => {
    setInputValues(item.id, selected);
  }, [selected]);
  const id = item.id;
  const temp = item.options.map((i) => ({
    key: i,
    value: i,
  }));
  const [items, setItems] = React.useState(temp);
  const [open, setOpen] = React.useState(false);
  return item.container == "ClinUISelectDropdown" ? (
    <View
      style={{
        // flex: 1,
        // justifyContent: "center",
        // maxHeight: 50,
        // // alignItems: "center",
        // padding: "10px",
        // maxWidth: "500",
        width: "5000",
        // // zIndex:1000,
        // ...item.containerProps,
        // ...item.styles,
        // backgroundColor:'white'

      }}
    >
    <SelectList save={selected} boxStyles={{ width: 500, backgroundColor:'white'}} setSelected={setSelected} data={items}  />
    </View>
  ) : null;
}

export function CLINUICheckBox(props) {
  const { item, setInputValues, savedData } = props;
  const [text, onChangeText] = React.useState(item.data || "");
  useEffect(() => {
    setInputValues(item.id, text);
  }, [text]);
  const list = item.options;
  const id = item.id;
  console.log({ list });
  return item.container == "ClinUICheckbox" ? (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: "5px",
        ...item.containerProps,
        ...item.styles,
      }}
    >
      {/* <Text>{item.label ? item.label : "checkbox"}</Text> */}
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          // padding: "5px",/
          ...item.containerProps,
          ...item.styles,
        }}
      >
        {list.map((item) => (
          // <View key={country}>
          <Checkbox.Item
            key={item}
            label={item}
            status={text == item ? "checked" : "unchecked"}
            onPress={(value) => {
              console.log({ value });
              if (text != item) {
                onChangeText(item);
                setInputValues(id, item);
              } else {
                onChangeText("");
                setInputValues(id, "");
              }
            }}
          />
          // </View>
        ))}
      </View>
    </View>
  ) : null;
}

export function CLINUIMultiselectCheckBox(props) {
  const { item, setInputValues, savedData } = props;
  const [text, onChangeText] = React.useState(item.data || []);
  useEffect(() => {
    setInputValues(item.id, text);
  }, [text]);
  const list = item.options;
  const id = item.id;
  console.log({ list });
  return item.container == "ClinUIMultiselectCheckbox" ? (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: "5px",
        ...item.containerProps,
        ...item.styles,
      }}
    >
      {/* <Text>{item.label ? item.label : "checkbox"}</Text> */}
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          // padding: "5px",/
          ...item.containerProps,
          ...item.styles,
        }}
      >
        
        {list.map((item) => (
          // <View key={country}>
          <Checkbox.Item
            key={item}
            label={item}
            status={text.includes(item) ? "checked" : "unchecked"}
            onPress={(value) => {
              console.log({ value });
              if (!text.includes(item) ) {
                onChangeText([...text,item]);
                setInputValues(id, item);
              } else {
                const temp = text.filter((i)=>i!=item)
                onChangeText(temp)
                setInputValues(id, temp);
              }
            }}
          />
          // </View>
        ))}
      </View>
    </View>
  ) : null;
}

export function CLINButton(props) {
  const { item } = props;
  return item.container == "ClinUIButton" ? (
    <View
      style={{
        fontWeight: 400,
        fontSize: "15px",
        padding: "30px",
        ...item.containerProps,
        ...item.styles,
      }}
    >
      {/* <Button title="Next"  onPress={() => router.push(`/sign-in/`) } /> */}
      <Button title="Next" />
    </View>
  ) : null;
}

export function FlexContainer(props) {
  console.log("************* FlexContainer ************");
  console.log({ props });
  const { item, setInputValues, savedData } = props;
  console.log({ item });
  return item.container == "ClinUIFlexContainer" ? (
    <View
      style={{
        width: "100%",
        padding: "5px",
        ...item.containerProps,
        ...item.styles,
      }}
    >
      {item.children.map((child) => (
        <>
          {child.container == "ClinUIHeader1"
            ? CLINHeader({ item: child })
            : null}
          {child.container == "ClinUIHeader2"
            ? CLINHeader2({ item: child })
            : null}
          {child.container == "ClinUIHeader3"
            ? CLINHeader3({ item: child })
            : null}
          {child.container == "ClinUIText" ? CLINText({ item: child }) : null}
          {child.container == "ClinUITextInput"
            ? CLINTextInput({ item: child, setInputValues, savedData })
            : null}
          {child.container == "ClinUIButton"
            ? CLINButton({ item: child })
            : null}
          {child.container == "ClinUICheckbox"
            ? CLINUICheckBox({ item: child, setInputValues, savedData })
            : null}

          {child.container == "ClinUIMultiselectCheckbox"
            ? CLINUIMultiselectCheckBox({
                item: child,
                setInputValues,
                savedData,
              })
            : null}
          {child.container == "ClinUIFlexContainer"
            ? FlexContainer({ item: child, setInputValues, savedData })
            : null}
          {child.container == "ClinUISelectDropdown"
            ? CLINUISelectDropdown({ item: child, setInputValues, savedData })
            : null}
          {child.container == "ClinUINumberInput"
            ? CLINNumberInput({ item: child, setInputValues, savedData })
            : null}
        </>
      ))}
    </View>
  ) : null;
  // <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" , backgroundColor: "#f0f", width: "100%"}}>
  //   {layoutSample.map((item) => (
  //     item.container=="ClinUIFlexContainer"?
  //       item.children.map(
  //         (child) => (
  //           child.container=="ClinUIHeader1"? CLINHeader({item:child}): null
  //         )
  //       )
  //       : null

  //   ))}
  // </View>
}

export default function EcapTest() {
  // useEffect(() => {
  //   console.log("-------")
  //   console.log({text});
  // });

  const router = useRouter();

  return (
    <View style={{}}>
      {visit2.map((item) => (
        <>
          {item.container == "ClinUIFlexContainer"
            ? FlexContainer({ item: item, setInputValues })
            : null}
          {item.container == "ClinUIScreensContainer"
            ? FlexContainer({ item: item.children[0], setInputValues })
            : null}
        </>
      ))}

      {/* <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      /> */}

      {/* <Button title="Next"  onPress={() => router.push(`/sign-in/`) } /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
