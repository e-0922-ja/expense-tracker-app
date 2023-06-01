import { Card, CardActionArea, Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";

interface Name {
  firstName: string;
}

interface Props {
  friendName: Name;
}

export const FriendsCard: React.FC<Props> = ({ friendName }) => {
  return (
    <TransactionCardWrapper>
      <CardActionArea>
        <ContentWrapper>
          <Typography gutterBottom variant="h6" component="div">
            {friendName.firstName}
          </Typography>
        </ContentWrapper>
      </CardActionArea>
    </TransactionCardWrapper>
  );
};

const TransactionCardWrapper = styled(Card)`
  width: 100%;
  margin-bottom: 20px;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px;
`;
