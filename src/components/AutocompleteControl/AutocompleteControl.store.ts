import { CountryInfo, getCountryByName } from "api/apiService";
import { action, computed, makeObservable, observable } from "mobx";
import { createSingleton } from "shared/utils";

type PrivateField = "_isLoading" | "_suggestions";

class AutocompleteControlStoreProto {
  constructor() {
    makeObservable<this, PrivateField>(this, {
      _isLoading: observable,
      isLoading: computed,

      _suggestions: observable,
      suggestions: computed,

      getSuggestions: action.bound,
    });
  }

  private _isLoading: boolean = false;

  get isLoading() {
    return this._isLoading;
  }

  set isLoading(isLoading) {
    this._isLoading = isLoading;
  }

  private _suggestions: CountryInfo[] = [];

  get suggestions() {
    return this._suggestions;
  }

  set suggestions(suggestions) {
    this._suggestions = suggestions;
  }

  async getSuggestions(countryName: string) {
    if (!countryName) return (this.suggestions = []);

    this.isLoading = true;
    try {
      const suggestions = await getCountryByName(countryName);
      return (this.suggestions = suggestions);
    } catch (error) {
      if (error instanceof Error) throw error;
    } finally {
      this.isLoading = false;
    }
  }
}

export const AutocompleteControlStore = createSingleton(
  AutocompleteControlStoreProto,
);
