import { createContext, useReducer } from "react";
const ThemeContexttt = createContext();

const initialData = {
  theme: localStorage.getItem("Theme") == null ? "Light" : localStorage.getItem("Theme")==="Dark"?"Dark":"Light",
};
const reducer = (firstState, action) => {
  switch (action.type) {
    case "CHANGE_theme":
      return { ...firstState, theme: action.newValue };
    default:
      return firstState;
  }
};

export function ThemeProvider({ children }) {
  const [firstState, dispatch] = useReducer(reducer, initialData);

  const CHANGE_theme = (newtheme) => {
    localStorage.setItem("Theme", newtheme);
    dispatch({ type: "CHANGE_theme", newValue: newtheme });
  };

  return (
    <ThemeContexttt.Provider value={{ ...firstState, CHANGE_theme }}>
      {children}
    </ThemeContexttt.Provider>
  );
}

export default ThemeContexttt;
