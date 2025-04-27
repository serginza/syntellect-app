import { useState, useCallback, ChangeEvent, useMemo } from "react";
import { observer } from "mobx-react";
import { CountryInfo } from "api/apiService";
import { InputElement } from "shared/components";
import { debounce } from "shared/utils";
import { AutocompleteControlStore } from "./AutocompleteControl.store";
import { AutocompleteControlPopper } from "./AutocompleteControlPopper";
import "./AutocompleteControl.styles.css";

type Props = {
  limit: number;
};

function AutocompleteControlProto({ limit }: Props) {
  // useState для состояний формы, store для запросов (имитация API)
  const [inputValue, setInputValue] = useState<string>("");
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const { isLoading, suggestions, getSuggestions } = AutocompleteControlStore;

  // ограничение запросов к api на 300мс
  const debouncedGetSuggestions = useMemo(
    () => debounce((value: string) => getSuggestions(value), 300),
    [getSuggestions],
  );

  const handleFocus = useCallback(() => {
    getSuggestions(inputValue);
    setShowSuggestions(true);
  }, [getSuggestions, inputValue]);

  const handleBlur = useCallback(() => {
    setShowSuggestions(false);
  }, []);

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      
      setInputValue(value);
      debouncedGetSuggestions(value);
      setShowSuggestions(!!value);
    },
    [debouncedGetSuggestions],
  );

  const handleSelectSuggestion = useCallback((suggestion: CountryInfo) => {
    setInputValue(suggestion.name);
    setShowSuggestions(false);
  }, []);

  return (
    <div className="autocomplete">
      <InputElement
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Enter country"
        className="autocomplete-input"
      />
      {showSuggestions && inputValue && (
        <AutocompleteControlPopper
          suggestions={suggestions.slice(0, limit)}
          onSelect={handleSelectSuggestion}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}

export const AutocompleteControl = observer(AutocompleteControlProto);
