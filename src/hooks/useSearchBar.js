import { useState } from "react";

const useSearchBar = () => {
  const [searchState, setSearchState] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState();

  return { phoneNumber, setPhoneNumber,searchState,setSearchState };
};

export default useSearchBar;
