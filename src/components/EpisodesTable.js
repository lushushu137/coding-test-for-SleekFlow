import React, { useEffect, useState } from "react";
import { getEpisodesByIdList } from "../api/api";
import TableWithPagination from "./TableWithPagination";

const headList = [
  {
    title: "Name",
    paramName: "name",
    colWidth: 100,
  },
  {
    title: "Air Date",
    paramName: "air_date",
    colWidth: 100,
  },
  {
    title: "Episode",
    paramName: "episode",
    colWidth: 80,
  },
  {
    title: "Created Date",
    paramName: "created",
    colWidth: 100,
  },
];

const EpisodesTable = (props) => {
  const { episodeIdList, id } = props;
  const [tableDataList, setTableDataList] = useState([]);

  useEffect(() => {
    getEpisodeList(episodeIdList);
  }, [episodeIdList]);

  const getEpisodeList = async (episodeIdList) => {
    const res = await getEpisodesByIdList(episodeIdList);
    res.forEach((data) => {
      let created = data["created"];
      let date = created.split("T")[0];
      let time = created.split("T")[1].split(".")[0];
      data["created"] = date + "  " + time;
    });
    setTableDataList(res);
  };

  return (
    <React.Fragment>
      <TableWithPagination
        headList={headList}
        dataList={tableDataList}
        id={id}
      />
    </React.Fragment>
  );
};

export default EpisodesTable;
