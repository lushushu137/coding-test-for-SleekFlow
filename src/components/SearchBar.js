import React, { useState, useRef, useEffect, useCallback } from "react";
import TextField from "@mui/material/TextField";
import { useDebouncedCallback } from "use-debounce";
import { getAllCharacters } from "../api/api";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  IconButton,
} from "@mui/material";

const SearchBar = (props) => {
  const [searchParam, setSearchParam] = useState({
    word: "",
    status: "",
    gender: "",
  });
  const [statusOptions, setStatusOptions] = useState([]);
  const [genderOptions, setGenderOptions] = useState([]);
  const { handleSearchResult, setLoadingState, resetDataList, setIsLargeList } =
    props;

  //fetch all character data and save to sessionStorage
  useEffect(() => {
    const initAllCharacters = async () => {
      const characterList = await getAllCharacters();
      sessionStorage.setItem("characterSheet", JSON.stringify(characterList));
      initiateOptionList();
      setLoadingState(false);
    };

    if (!sessionStorage.getItem("characterSheet")) {
      setLoadingState(true);
      initAllCharacters();
    } else {
      initiateOptionList();
    }
  }, [setLoadingState]);

  // initiate option list
  const initiateOptionList = () => {
    let statusSet = new Set();
    let genderSet = new Set();
    JSON.parse(sessionStorage.getItem("characterSheet")).forEach((data) => {
      statusSet.add(data.status);
      genderSet.add(data.gender);
    });

    let statusOptions = [];
    statusSet.forEach((status) => {
      statusOptions.push({
        value: status,
        title: status,
      });
    });
    let genderOptions = [];
    genderSet.forEach((gender) => {
      genderOptions.push({
        value: gender,
        title: gender,
      });
    });
    setStatusOptions(statusOptions);
    setGenderOptions(genderOptions);
  };

  //search when searchParam changes
  useEffect(() => {
    debouncedSearch.current();
  }, [searchParam]);

  // search with word, status, gender
  const search = () => {
    const { word, status, gender } = searchParam;
    if (!word && !status && !gender) {
      resetDataList();
    } else {
      setLoadingState(true);
      const dataList = JSON.parse(sessionStorage.getItem("characterSheet"));

      const res = dataList
        .filter((data) => data.name.includes(word))
        .filter((data) => (status ? data.status === status : true))
        .filter((data) => (gender ? data.gender === gender : true));

      // if the search result is too big, tell ContactList to use virtual scrolling
      if (dataList.length > 20) {
        setIsLargeList();
      }

      handleSearchResult(res);
      setLoadingState(false);
    }
  };

  // debounce search
  const debouncedSearch = useRef(useDebouncedCallback(search, 500));

  const handleSearchWordChange = (e) => {
    setSearchParam((param) => {
      return {
        ...param,
        word: e.target.value,
      };
    });
  };

  const handleStatusChange = (e) => {
    setSearchParam((param) => {
      return {
        ...param,
        status: e.target.value,
      };
    });
  };

  const handleGenderChange = (e) => {
    setSearchParam((param) => {
      return {
        ...param,
        gender: e.target.value,
      };
    });
  };

  const clearFilter = () => {
    // prevent multiple empty param render
    if (!searchParam.word && !searchParam.status && !searchParam.gender) return;
    setSearchParam((param) => {
      return {
        ...param,
        status: "",
        gender: "",
      };
    });
  };

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Contact
      </Typography>
      <Box sx={{ mb: 2 }}>
        <TextField
          id="search-name"
          label="Search Name"
          size="small"
          value={searchParam.word}
          onChange={handleSearchWordChange}
          fullWidth
        />
      </Box>
      <Box sx={{ mt: 2, mb: 2 }} width="100%" display="flex">
        <FormControl sx={{ mr: 2, minWidth: 120 }} size="small">
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            id="status"
            value={searchParam.status}
            label="Status"
            onChange={handleStatusChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {statusOptions.map((status) => (
              <MenuItem value={status.value} key={status.title}>
                {status.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120 }} size="small">
          <InputLabel id="gender-label">Gender</InputLabel>
          <Select
            labelId="gender-label"
            id="gender"
            value={searchParam.gender}
            label="Gender"
            onChange={handleGenderChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {genderOptions.map((gender) => (
              <MenuItem value={gender.value} key={gender.title}>
                {gender.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <IconButton
          aria-label="delete"
          onClick={clearFilter}
          size="small"
          sx={{ ml: "auto" }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </>
  );
};

export default SearchBar;
