import React from "react";
import { View, Text, FlatList, SafeAreaView } from "react-native";
import { stocks } from "./data/stocks";
import { appStyles } from "./styles/app";

export default function App() {
  return (
    <SafeAreaView style={appStyles.safeArea}>
      <View style={appStyles.container}>
        <Text style={appStyles.title}>Stock Market</Text>
        <FlatList
          data={stocks}
          keyExtractor={(item) => item.symbol}
          renderItem={({ item }) => (
            <View style={appStyles.stockItem}>
              <View style={appStyles.stockIdentifier}>
                <Text style={appStyles.stockName}>{item.name}</Text>
                <Text style={appStyles.stockName}>({item.symbol})</Text>
              </View>
              <Text style={appStyles.stockPrice}>${item.price}</Text>
              <Text
                style={[
                  appStyles.stockPercentage,
                  item.daily_change >= 0 ? appStyles.green : appStyles.red,
                ]}
              >
                {item.daily_change >= 0
                  ? `+${item.daily_change}%`
                  : `${item.daily_change}%`}
              </Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
