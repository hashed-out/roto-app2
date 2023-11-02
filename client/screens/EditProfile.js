import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserType } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { BASE_URL } from "../utils/constants";



const EditProfileScreen = () => {
  const { userId } = useContext(UserType);
  const [user, setUser] = useState({});
  const [newName, setNewName] = useState("");
  const [newBio, setNewBio] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);

  const handleSaveProfile = async () => {
    try {
      // Prepare the data to update the user's profile
      const updateFields = {
        name: newName,
        bio: newBio,
        profilePhoto,
      };

      // Call the updateUser function to update the profile
      const response = await updateUser(userId, updateFields);
      
      if (response.status === 200) {
        // Optionally, handle success and navigate back to the profile screen
        console.log("Profile updated successfully");
      } else {
        console.log("Error updating profile");
      }
    } catch (error) {
      console.log("Error updating profile", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profilePhotoContainer}>
        <Image
          source={profilePhoto || require("../assets/profile.jpg")} // Provide a default profile image
          style={styles.profilePhoto}
        />
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={() => {
            // Implement a method to upload and set the profile photo
          }}
        >
          <Text style={styles.uploadButtonText}>Change Photo</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={newName}
        onChangeText={(text) => setNewName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Bio"
        value={newBio}
        onChangeText={(text) => setNewBio(text)}
      />
      <Button title="Save" onPress={handleSaveProfile} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  profilePhotoContainer: {
    alignItems: "center",
  },
  profilePhoto: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  uploadButton: {
    backgroundColor: "#3498db",
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
  },
  uploadButtonText: {
    color: "#fff",
  },
  input: {
    width: 300,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default EditProfileScreen;