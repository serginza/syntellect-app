import { AutocompleteControl } from "components/AutocompleteControl";
import { ButtonControl, ButtonControlType } from "components/ButtonControl";
import "normalize.css";
import "./App.css";

const btnControl1: ButtonControlType = {
  rightButtons: [
    {
      id: 1,
      label: "Clear control",
      callback: (_, setText) => setText && setText(""),
    },
    {
      id: 2,
      label: 'Add "Hello world!"',
      callback: (_, setText) => setText && setText("Hello world!"),
    },
  ],
};

const btnControl2: ButtonControlType = {
  leftButtons: [
    {
      id: 3,
      label: "Number check",
      callback: (text) => {
        if (text && Number(text)) {
          alert(text);
        }
      },
    },
  ],
  rightButtons: [
    {
      id: 4,
      label: "Show control text",
      callback: (text) => alert(text),
    },
  ],
};

function App() {
  return (
    <div className="app-wrapper">
      <div className="button-control-wrapper">
        {/* использовал подход Component Configuration, а не render props т.к. его проще масштабировать*/}
        <ButtonControl params={btnControl1} />
        <ButtonControl params={btnControl2} />
      </div>
      <div className="autocomplete-wrapper">
        <AutocompleteControl limit={3} />
        <AutocompleteControl limit={10} />
      </div>
    </div>
  );
}

export default App;
