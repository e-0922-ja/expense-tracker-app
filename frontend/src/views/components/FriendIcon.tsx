import styled from "styled-components";
import Chip from "@mui/material/Chip";
import { Friend } from "../../types";

interface FriendIconProps {
  friends: Friend[];
}

export const FriendIcon = ({ friends }: FriendIconProps) => {
  return (
    <ChipsWrapper>
      {friends.map((item, index) => {
        return (
          <div key={index}>
            <StyledChips
              label={
                item.id ? `${item.firstName} ${item.lastName}` : item.email
              }
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

const StyledChips = styled(Chip)`
  height: 48px !important;
  font-size: 1rem !important;
  border-radius: 4px !important;
  padding: 0 10px !important;
  margin: 0 10px 10px 0 !important;
`;
