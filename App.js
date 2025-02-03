import React, { useState } from "react";
import { View, Text, FlatList, SafeAreaView } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { stocks } from "./data/stocks";
import { appStyles } from "./styles/app";

export default function App() {
  const [sortBy, setSortBy] = useState("name");

  const sortedStocks = () => {
    const stocksCopy = [...stocks];

    switch (sortBy) {
      case "price":
        return stocksCopy.sort((a, b) => b.price - a.price);
      case "change":
        return stocksCopy.sort((a, b) => b.daily_change - a.daily_change);
      default:
        return stocksCopy.sort((a, b) => a.name.localeCompare(b.name));
    }
  };

  return (
    <SafeAreaView style={appStyles.safeArea}>
      <View style={appStyles.container}>
        <Text style={appStyles.title}>Stock Market</Text>

        <RNPickerSelect
          onValueChange={(value) => setSortBy(value)}
          items={[
            { label: "Order by name", value: "name" },
            { label: "Order by price", value: "price" },
            { label: "Order by daily change", value: "change" },
          ]}
          value={sortBy}
          style={{
            inputIOS: appStyles.pickerInput,
            inputAndroid: appStyles.pickerInput,
          }}
        />

        <FlatList
          data={sortedStocks()}
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
