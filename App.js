import React, { useMemo, useState } from "react";
import { View, Text, FlatList, SafeAreaView } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { stocks } from "./data/stocks";
import { appStyles } from "./styles/app";

export default function App() {
  const [sortBy, setSortBy] = useState("name");
  const [open, setOpen] = useState(false);

  // const sortedStocks = () => {
  //   const stocksCopy = [...stocks];
  //   switch (sortBy) {
  //     case "price":
  //       return stocksCopy.sort((a, b) => b.price - a.price);
  //     case "change":
  //       return stocksCopy.sort((a, b) => b.daily_change - a.daily_change);
  //     default:
  //       return stocksCopy.sort((a, b) => a.name.localeCompare(b.name));
  //   }
  // };
  const sortedStocks = useMemo(() => {
    const stocksCopy = [...stocks];
    if (sortBy === "price") {
      return stocksCopy.sort((a, b) => b.price - a.price);
    } else if (sortBy === "change") {
      return stocksCopy.sort((a, b) => b.daily_change - a.daily_change);
    }

    return stocksCopy.sort((a, b) => a.name.localeCompare(b.name));
  }, [sortBy]);

  return (
    <SafeAreaView style={appStyles.safeArea}>
      <View style={appStyles.container}>
        <Text style={appStyles.title}>Stock Market</Text>

        <DropDownPicker
          items={[
            { label: "Ordenar por Nombre", value: "name" },
            { label: "Ordenar por Precio", value: "price" },
            { label: "Ordenar por Cambio Diario", value: "change" },
          ]}
          defaultValue={sortBy}
          containerStyle={appStyles.pickerContainer}
          style={appStyles.picker}
          dropDownStyle={appStyles.dropDownStyle}
          onChangeItem={(item) => {
            setSortBy(item.value);
            setOpen(false);
          }}
          open={open}
          setOpen={setOpen}
        />

        <FlatList
          data={sortedStocks}
          // data={sortedStocks()}
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
        <Text>{sortBy}</Text>
      </View>
    </SafeAreaView>
  );
}
