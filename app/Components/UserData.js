import {
  View,
  Text,
  Image,
  Linking,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { i18nStore } from "../MobX/I18nStore";
import { authStore } from "../MobX/AuthStore";
import { colors } from "../ReusableTools/css";
import DestinationContainer from "./DestinationContainer";
import { Button } from "../ReusableTools/Button";
import { useState } from "react";
import axios from "axios";
import { Socket } from "../socket/socket";

const DriverData = ({ user_id, destination, _id }) => {
  const navigation = useNavigation();

  const { i18n } = i18nStore;

  const { userInfo } = authStore;
  const [room, setRoom] = useState(null);

  const handlePhoneCall = () => {
    if (user_id.phone_number) {
      Linking.openURL(`tel:${user_id.phone_number}`);
    } else {
      console.log("Phone number is not available.");
    }
  };

  const handleOpenChat = () => {
    createRoomOrGetRoomId();

    navigation.navigate(`${i18n.t("userNav.screens.chat")}`, {
      driver_id: userInfo,
      user_id: user_id,
      room: room,
    });
  };

  async function createRoomOrGetRoomId() {
    await axios
      .get(
        `${process.env.EXPO_PUBLIC_API_URL}room/getRoom?senderId=${userInfo._id}&receiverId=${user_id._id}`
      )
      .then((res) => {
        if (res.data.roomId != null) {
          setRoom(res.data.roomId._id);
          Socket.emit("join_room", res.data.roomId._id);
        } else {
          axios
            .post(`${process.env.EXPO_PUBLIC_API_URL}room/createRoom`, {
              sender: userInfo._id,
              receiver: user_id._id,
              senderModel: userInfo.role,
              receiverModel: user_id.role,
            })
            .then((res) => {
              Socket.emit("join_room", res.data.roomId._id);
              setRoom(res.data.roomId._id);
            })
            .catch((error) => {
              console.log("Error creating room:", error);
            });
        }
      })
      .catch((error) => {
        console.log("Error getting room:", error);
      });
  }

  const cancelRide = () => {
    navigation.navigate("cancelRide", {
      order_id: _id,
    });
  };

  return (
    <View className="flex-1 py-5 px-10">
      <View className="flex-row justify-between items-center w-full">
        <Text className="font-regular text-Primary">Rider Details</Text>

        <View className="flex-row items-center gap-5">
          <TouchableOpacity onPress={handlePhoneCall}>
            <View className="bg-[#9EC4F7] p-3 rounded-full">
              <Image
                source={require("../Images/Icons/phone.png")}
                className="w-[24px] h-[24px]"
                style={{ resizeMode: "contain" }}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleOpenChat}>
            <View className="bg-[#9EC4F7] p-3 rounded-full">
              <FontAwesome name="envelope" size={24} color="#273992" />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-3">
          <View style={styles.imageBorder}>
            <Image
              source={require("../Images/Icons/profilee.png")}
              style={{ resizeMode: "contain" }}
              className="w-full h-full"
            />
          </View>

          <View>
            <Text className="font-regular text-Primary mb-2">Name</Text>

            <Text className="font-regular">
              {user_id?.first_name} {user_id?.last_name}
            </Text>
          </View>
        </View>
      </View>

      <View className="px-4">
        <DestinationContainer destination={destination} driverData={true} />
      </View>

      <View className="pb-2">
        <Button text={"Cancel Ride"} cancel={true} onPress={cancelRide} />
      </View>
    </View>
  );
};

export default DriverData;

const styles = StyleSheet.create({
  imageBorder: {
    borderWidth: 1,
    width: 70,
    height: 70,
    padding: 10,
    borderColor: colors.primary,
    borderRadius: 35,
    flexDirection: "row",
  },
});