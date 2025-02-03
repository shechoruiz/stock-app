import { Platform, StatusBar, StyleSheet } from "react-native";

export const appStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 50,
  },
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  pickerContainer: {
    marginBottom: 20,
    width: "100%",
    zIndex: 10,
  },
  picker: {
    height: 40,
    backgroundColor: "#f0f0f0",
  },
  dropDownContainerStyle: {
    backgroundColor: "#fafafa",
    zIndex: 20,
  },
  stockItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  stockIdentifier: {
    width: 180,
  },
  stockName: { fontSize: 16, fontWeight: "bold" },
  stockPrice: { fontSize: 16 },
  stockPercentage: { fontSize: 16 },
  green: { color: "green" },
  red: { color: "red" },
});
