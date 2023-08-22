import React from "react";
import { render } from "@testing-library/react";
import { RoomProvider } from "./context/RoomContext";
import App from "./App";
import Header from "./components/Header";

test("renders Header component without errors", () => {
  render(<Header />);
});

test("renders app with loading state", () => {
  const { getByText } = render(
    <RoomProvider>
      <App />
    </RoomProvider>
  );

  const loadingElement = getByText(/Loading.../i);
  expect(loadingElement).toBeInTheDocument();
});
