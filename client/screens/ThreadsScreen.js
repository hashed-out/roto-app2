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
import getUserInfo from "../utils/GetProfileInfo";



const ThreadsScreen = () => {
  const { userId, setUserId } = useContext(UserType);
  const [content, setContent] = useState("");
  const [imageSource, setImageSource] = useState(null); // To store the selected image URI
  const [venue, setVenue] = useState("");
  const [eventDate, setEventDate] = useState("");
  getUserInfo();





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
        <Text>{}</Text>
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
      <TouchableOpacity>
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


      <View style={{ marginTop: 20 }} />

      <Button onPress={handlePostSubmit} title="Share Post" />
    </SafeAreaView>
  );
};

export default ThreadsScreen;

const styles = StyleSheet.create({});
