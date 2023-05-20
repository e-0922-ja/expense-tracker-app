import styled from "styled-components";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import { ListItem } from "@mui/material";
import { useState } from "react";

interface NameList {
  key: number;
  label: string;
}

export default function FriendIcon() {
  const [nameListData, setNameListData] = useState<readonly NameList[]>([
    { key: 0, label: "Angular" },
    { key: 1, label: "jQuery" },
    { key: 2, label: "Polymer" },
    { key: 3, label: "React" },
    { key: 4, label: "Vue.js" },
  ]);

  const handleDelete = (nameToDelete: NameList) => () => {
    setNameListData((chips) =>
      chips.filter((chip) => chip.key !== nameToDelete.key)
    );
  };

  return (
    <ChipsWrapper>
      {nameListData.map((data) => {
        return (
          <div key={data.key}>
            <Chip
              label={data.label}
              onDelete={handleDelete(data)}
              sx={{
                height: "48px",
                fontSize: "1rem",
                borderRadius: "4px",
                padding: "0 10px",
                margin: "0 10px 10px 0",
              }}
            />
          </div>
        );
      })}
    </ChipsWrapper>
  );
}

const ChipsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
