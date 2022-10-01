import React, { useEffect, useState, useRef, useCallback } from "react";
import ContactItem from "./ContactItem";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";

import Snackbar from "@mui/material/Snackbar";
import CircularProgress from "@mui/material/CircularProgress";
import { useHistory, useLocation } from "react-router-dom";
import { getCharactersByPage } from "../api/api";
import { useIsBottom } from "../hooks/useIsBottom";
import SearchBar from "./SearchBar";
import { FixedSizeList } from "react-window";

const ContactList = (props) => {
  const [isLoading, setIsloading] = useState(false);
  const [characterList, setCharacterList] = useState([]);
  const [page, setPage] = useState(1);
  const [enbaleScrollToLoad, setEnbaleScrollToLoad] = useState(true);
  const [isLargeList, setIsLargeList] = useState(false);
  const history = useHistory();
  const scrollArea = useRef(null);
  const location = useLocation();
  const [selectedId, setSelectedId] = useState(null);
  const [hasReachedEnd, setHasReachedEnd] = useState("");

  // get selected Id from URL
  useEffect(() => {
    if (location.pathname === "/sleekflow-coding-test/contact") {
      setSelectedId(null);
    } else {
      const id = location.pathname.split("/")[3];
      setSelectedId(parseInt(id));
    }
  }, [location]);

  //load more when scroll to bottom
  useIsBottom(scrollArea, () => {
    if (!enbaleScrollToLoad) return;
    setPage((pre) => pre + 1);
  });

  // get contacts when page change
  useEffect(() => {
    getContacts(page);
  }, [page]);

  // fetch contacts
  const getContacts = async (currPage) => {
    console.log(currPage);
    setIsLargeList(false);
    try {
      const res = await getCharactersByPage(currPage);
      const renderCharacterList = res.results.map((character, index) => {
        const { id, name, image, species } = character;
        return {
          id,
          name,
          image,
          species,
          isSelected: false,
        };
      });
      setCharacterList((pre) => {
        if (currPage === 1) return renderCharacterList;
        return [...pre, ...renderCharacterList];
      });
    } catch (err) {
      setHasReachedEnd(err.response.data.error);
      setEnbaleScrollToLoad(false);
    }
  };

  // reset scrollTop, enableScroll, page, hash
  const resetContacts = useCallback(async () => {
    setIsLargeList(false);
    scrollArea.current.scrollTop = 0;
    await getContacts(1);
    setPage(1);
    setEnbaleScrollToLoad(true);
    history.push({ pathname: "/sleekflow-coding-test/contact" });
  }, [history]);

  const handleSearchResult = useCallback(
    (res) => {
      scrollArea.current.scrollTop = 0;
      setEnbaleScrollToLoad(false);
      history.push({ pathname: "/sleekflow-coding-test/contact" });
      setCharacterList(res);
    },
    [history]
  );

  const handleSetLoadingState = useCallback(
    (state) => {
      setIsloading(state);
    },
    [setIsloading]
  );

  const setIsLargeListCb = useCallback(() => {
    setIsLargeList(true);
  }, []);

  return (
    <>
      <SearchBar
        handleSearchResult={handleSearchResult}
        setLoadingState={handleSetLoadingState}
        resetDataList={resetContacts}
        setIsLargeList={setIsLargeListCb}
      />
      <div
        className="scroll-container"
        ref={scrollArea}
        style={{
          width: "100%",
          height: "80%",
          overflow: "scroll",
        }}
      >
        {/* When the results are fetched from backend, there are only 20 data one time. No need for virtual scrolling. */}
        {/* When the results are searched from sessionStorage, the number of data could be huge. So implement a virtual scrolling. */}
        {isLargeList && (
          <FixedSizeList
            className="virtual-scroll-container"
            height={700}
            width="100%"
            itemSize={82.02}
            itemCount={characterList.length}
            overscanCount={3}
          >
            {({ index, style }) => (
              <ContactItem
                {...characterList[index]}
                selectedId={selectedId}
                styleFromVirtualScroll={style}
              />
            )}
          </FixedSizeList>
        )}
        {!isLargeList && (
          <List>
            {characterList.map((person, index) => {
              return (
                <React.Fragment key={person.id}>
                  <ContactItem {...person} selectedId={selectedId} />
                </React.Fragment>
              );
            })}
          </List>
        )}

        {/* loading UI stuff */}
        <Box
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {enbaleScrollToLoad && !isLoading && <CircularProgress />}
        </Box>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={!!hasReachedEnd}
          onClose={() => {
            setHasReachedEnd("");
          }}
          autoHideDuration={2000}
          message={hasReachedEnd}
        />
        <Backdrop
          sx={{
            position: "absolute",
            height: "100vh",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </>
  );
};

export default ContactList;
