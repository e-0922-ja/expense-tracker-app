import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";
import PortraitIcon from "@mui/icons-material/Portrait";

interface TransList {
  category: string;
  dispription: string;
  amount: number;
  date: string;
}

interface Props {
  item: TransList;
}

export const TransactionCard: React.FC<Props> = ({ item }) => {
  return (
    <TransactionCardWrapper>
      <CardActionArea>
        <ContentWrapper>
          <IconContainer>
            <PortraitIcon />
          </IconContainer>
          <DiscriptionContainer>
            <DiscriptionTitleContainer>
              <Typography gutterBottom variant="h6" component="div">
                {item.dispription}
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                ${item.amount}
              </Typography>
            </DiscriptionTitleContainer>
            <DateContainer>
              <Typography variant="body2" color="text.secondary">
                {item.date}
              </Typography>
            </DateContainer>
          </DiscriptionContainer>
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
  width: 100%;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
`;

const DiscriptionContainer = styled.div`
  width: 90%;
`;

const DiscriptionTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 50px 10px 25px;
`;

const DateContainer = styled.div`
  margin: 0 0 25px 25px;
`;
