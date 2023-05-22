import styled from "styled-components";
import Chip from "@mui/material/Chip";
import { useState } from "react";

interface NameList {
  key: number;
  label: string;
}

export default function FriendIcon() {
  const [nameListData, setNameListData] = useState<readonly NameList[]>([
    { key: 0, label: "Max" },
    { key: 1, label: "Alex" },
    { key: 2, label: "Anna" },
    { key: 3, label: "John" },
    { key: 4, label: "Taro" },
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
  width: 85%;
  display: flex;
  flex-wrap: wrap;
`;
