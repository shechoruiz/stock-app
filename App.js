import React, { useEffect, useState } from "react";
import { View, Text, FlatList, SafeAreaView, StatusBar } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { stocks } from "./data/stocks";
import { appStyles as styles } from "./styles/app";

export default function App() {
  const [sortBy, setSortBy] = useState("name");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log("Estado de sortBy actualizado a:", sortBy);
  }, [sortBy]);

  const sortedStocks = () => {
    const stocksCopy = [...stocks];
    console.log("Ordenando por:", sortBy);

    switch (sortBy) {
      case "price":
        return stocksCopy.sort((a, b) => b.price - a.price);
      case "change":
        return stocksCopy.sort((a, b) => b.daily_change - a.daily_change);
      default:
        return stocksCopy.sort((a, b) => a.name.localeCompare(b.name));
    }
  };

  const handleSortChange = (item) => {
    console.log("Cambiando a:", item.value); // Verificar qué valor se está eligiendo
    setSortBy(item.value); // Actualizamos el valor de sortBy
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Text style={styles.title}>Stock Market</Text>

        <Text style={styles.sortByText}>Ordenando por: {sortBy}</Text>

        <DropDownPicker
          items={[
            { label: "Ordenar por Nombre", value: "name" },
            { label: "Ordenar por Precio", value: "price" },
            { label: "Ordenar por Cambio Diario", value: "change" },
          ]}
          value={sortBy}
          containerStyle={styles.pickerContainer}
          style={styles.picker}
          dropDownStyle={styles.dropDownStyle}
          open={open}
          setOpen={setOpen}
          onChangeItem={handleSortChange}
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
