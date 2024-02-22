import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import useFetch from "../../ReusableTools/UseFetch";
import { authStore } from "../../MobX/AuthStore";
import { useState } from "react";
import { colors } from "../../ReusableTools/css";

const Orders = () => {
  const [refreshing, setRefreshing] = useState(false);

  const { userInfo } = authStore;

  const { data, isLoading, reFetch } = useFetch(
    `order/getOrderByDriverId/${userInfo._id}`
  );

  // refresh funtion
  const handleRefresh = () => {
    setRefreshing(true);
    reFetch();
    setRefreshing(false);
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size={"large"} color={colors.primary} />
      </View>
    );
  }

  if (data?.length === 0 || data === null) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-base font-regular">No orders yet.</Text>
      </View>
    );
  }

  const renderItems = ({ item }) => {
    console.log("item", item);
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-black font-regular">{item?.from}</Text>
        <Text className="text-black font-regular">{item?.to}</Text>
        <Text className="text-black font-regular">{item?.user_id.first_name} {item?.user_id.last_name}</Text>
      </View>
    );
  };

  return (
    <View className="flex-1 justify-center">
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={renderItems}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
      />
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({});
