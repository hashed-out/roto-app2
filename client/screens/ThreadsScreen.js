import React, { useState, useContext } from "react";
import { UserType } from "../UserContext";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";

import DatePicker from "react-native-datepicker"; // Import the date picker library
import {launchImageLibrary} from 'react-native-image-picker';
const ThreadsScreen = () => {
  const { userId, setUserId } = useContext(UserType);
  const [content, setContent] = useState("");
  const [imageSource, setImageSource] = useState(null); // To store the selected image URI
  const [venue, setVenue] = useState("");
  const [eventDate, setEventDate] = useState("");

  const handleImageSelect = () => {
    const options = {
      title: "Select Image",
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

      launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        setImageSource({ uri: response?.uri });
      }
    });
  }; 



  const handlePostSubmit = () => {
    const postData = {
      userId,
      content,
      venue,
      eventDate,
    };

    axios
      .post(BASE_URL + "create-post", postData)
      .then((response) => {
        setContent("");
        setImageSource(null); // Clear the selected image
        setVenue("");
        setEventDate("");
      })
      .catch((error) => {
        console.log("error creating post", error);
      });
  };

  return (
    <SafeAreaView style={{ padding: 10 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          padding: 10,
        }}
      >
        <Image
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            resizeMode: "contain",
          }}
          source={{
            uri: "https://cdn-icons-png.flaticon.com/128/149/149071.png",
          }}
        />
        <Text>Prathik</Text>
      </View>

      <View style={{ flexDirection: "row", marginLeft: 10 }}>
        <TextInput
          value={content}
          onChangeText={(text) => setContent(text)}
          placeholderTextColor={"black"}
          placeholder="Type your message..."
          multiline
        />
      </View>

      {/* Add an image picker button */}
      <TouchableOpacity onPress={handleImageSelect}>
        <Text>Select Image</Text>
      </TouchableOpacity>

      {imageSource && (
        <Image
          source={imageSource}
          style={{ width: 200, height: 200, alignSelf: "center" }}
        />
      )}

      {/* Add input fields for venue and date picker for event date */}
      <TextInput
        value={venue}
        onChangeText={(text) => setVenue(text)}
        placeholder="Venue"
      />

      <DatePicker
        style={{ width: 200, alignSelf: "center" }}
        date={eventDate}
        mode="date"
        placeholder="Select Event Date"
        format="YYYY-MM-DD"
        minDate="2023-01-01"
        maxDate="2030-12-31"
        onDateChange={(date) => setEventDate(date)}
      />

      <View style={{ marginTop: 20 }} />

      <Button onPress={handlePostSubmit} title="Share Post" />
    </SafeAreaView>
  );
};

export default ThreadsScreen;

const styles = StyleSheet.create({});
