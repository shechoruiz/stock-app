import { stocks } from "./data/stocks";

// Mocks
jest.mock("react", () => ({ useState: jest.fn() }));
jest.mock("react-native", () => ({
  View: function (props) {
    return props;
  },
  Text: function (props) {
    return props;
  },
  FlatList: function (props) {
    return props;
  },
  SafeAreaView: function (props) {
    return props;
  },
}));
jest.mock("react-native-picker-select", () => ({
  RNPickerSelect: function (props) {
    return props;
  },
}));

import App from "../App";

describe("App Component", () => {
  describe("sortedStocks", () => {
    beforeEach(() => {});
    afterEach(() => {
      jest.resetAllMocks();
    });

    it("should return stocks sorted by name", () => {
      const appInstance = new App();
      appInstance.setState({ sortBy: "name" });

      const sorted = appInstance.sortedStocks();
      const expected = [...stocks].sort((a, b) => a.name.localeCompare(b.name));

      expect(sorted).toEqual(expected);
    });
  });
});
