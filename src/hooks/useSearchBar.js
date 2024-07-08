import { useState } from "react";

const useSearchBar = () => {
  const [searchState, setSearchState] = useState(false);
  const [identifier, setIdentifier] = useState("");

  return { identifier, setIdentifier, searchState, setSearchState };
};

export default useSearchBar;
