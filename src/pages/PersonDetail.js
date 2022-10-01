import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCharacterById } from "../api/api";
import CharacterName from "../components/CharacterName";
import EpisodesTable from "../components/EpisodesTable";
import PersonalInfo from "../components/PersonalInfo";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

const PersonDetail = (props) => {
  const [character, setCharacter] = useState({});
  const [episodeIdList, setEpisodeIdList] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    if (id !== null) {
      getCharacterDetail(id);
    }
  }, [id]);

  const getCharacterDetail = async (id) => {
    const character = await getCharacterById(id);
    setCharacter(character);
    const episodeIdList = character.episode.map((epi) => {
      return epi.split("/").pop();
    });
    setEpisodeIdList(episodeIdList);
  };

  return (
    <div className="person-detail" style={{ height: "100%" }}>
      <CharacterName character={character} />
      <Divider />

      <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
        Personal Info
      </Typography>
      <PersonalInfo character={character} />

      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
        Episodes
      </Typography>
      <EpisodesTable episodeIdList={episodeIdList} id={character.id} />
    </div>
  );
};

export default PersonDetail;
