import { CountryInfo } from "api/apiService";
import { memo } from "react";
import { Skeleton } from "shared/components";

type Props = {
  suggestions: CountryInfo[];
  onSelect: (suggestion: CountryInfo) => void;
  isLoading: boolean;
};

// компонент подсказок для AutocompleteControl
const AutocompleteControlPopperProto = ({
  suggestions,
  onSelect,
  isLoading,
}: Props) => {
  return (
    <ul className="suggestions-list">
      {isLoading ? (
        <Skeleton />
      ) : suggestions.length ? (
        suggestions.map((suggestion, index) => (
          <li
            key={index}
            className="suggestion-item"
            onMouseDown={() => onSelect(suggestion)}
          >
            <div className="suggestion-card">
              <img
                className="flag"
                src={suggestion.flag}
                alt={suggestion.name}
              />
              <div>
                <strong>{suggestion.name}</strong> <br />
                <small>{suggestion.fullName}</small>
              </div>
            </div>
          </li>
        ))
      ) : (
        <li className="empty-suggestion">Country not found</li>
      )}
    </ul>
  );
};

export const AutocompleteControlPopper = memo(AutocompleteControlPopperProto);
