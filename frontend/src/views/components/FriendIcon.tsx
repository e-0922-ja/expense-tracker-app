import styled from "styled-components";
import Chip from "@mui/material/Chip";
import { Friend } from "../../types";

interface FriendIconProps {
  friends: Friend[];
}

export const FriendIcon: React.FC<FriendIconProps> = ({ friends }) => {
  return (
    <ChipsWrapper>
      {friends.map((item, index) => {
        return (
          <div key={index}>
            <Chip
              label={
                item.id ? `${item.firstName} ${item.lastName}` : item.email
              }
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
};

const ChipsWrapper = styled.div`
  width: 85%;
  display: flex;
  flex-wrap: wrap;
`;
