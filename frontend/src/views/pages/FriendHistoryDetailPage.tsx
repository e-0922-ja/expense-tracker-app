import { useState } from "react";
import styled from "styled-components";
import {
  IconButton,
  Toolbar,
  Drawer,
  useMediaQuery,
  useTheme,
  Box,
  Checkbox,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { DrawerContents } from "../components/DrawerContents";
import { createClient } from "@supabase/supabase-js";
import { Database } from "../../../../supabase/schema";
import { CheckedMember, Expense } from "../../types";
import { GobackButton } from "../components/GobackButton";
import { useLocation, useNavigate } from "react-router-dom";
import { SubButton } from "../components/SubButton";
import { useSelector } from "react-redux";
import { selectUser } from "../../reducer/userSlice";
import { getCategoryIcon } from "../../utils/categoryUtils";
import {
  SUCCESS_DELETE_EXPENSE,
  SUCCESS_UPDATE_EXPENSE,
} from "../../constants/message";

interface Message {
  isError: boolean;
  message: string;
}

const supabase = createClient<Database>(
  process.env.REACT_APP_SUPABASE_URL as string,
  process.env.REACT_APP_SUPABASE_ANON_KEY as string
);

export const FriendHistoryDetailPage = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const materialTheme = useTheme();
  const isMobile = useMediaQuery(materialTheme.breakpoints.down("sm"));
  const account = useSelector(selectUser);
  const userId = account.user?.id!;
  const location = useLocation();
  const expense: Expense = location.state.expense;
  const initialCheckedMembers = expense.members.map((member) => {
    return { id: member.id, paid: member.paid };
  });
  const [checkedMembers, setCheckedMembers] = useState<CheckedMember[]>(
    initialCheckedMembers
  );
  const [updateMessage, setUpdateMessage] = useState<Message>({
    isError: false,
    message: "",
  });
  const [deleteMessage, setDeleteMessage] = useState<Message>({
    isError: false,
    message: "",
  });
  const CategoryIcon = getCategoryIcon(expense.category);

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const targetId = event.target.id;
    setCheckedMembers((prevMembers) => {
      const updatedChecked = prevMembers.map((member) => {
        if (member.id === targetId) {
          return {
            ...member,
            paid: !member.paid,
          };
        }
        return member;
      });
      return updatedChecked;
    });
  };

  const handlesave = async () => {
    await updateMembersPaidStatus();
  };

  const handledelete = async () => {
    const resultDeleteExpense = await deleteExpense();
    if (resultDeleteExpense) navigate(`${paths.history}`);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navigate = useNavigate();

  const handleGoBack = () => navigate(`${paths.history}`);

  const updateMembersPaidStatus = async () => {
    try {
      const { error } = await supabase.rpc("update_members_paid", {
        expense_id: expense.id,
        checked_members: JSON.stringify(checkedMembers),
        update_by: userId,
      });
      if (error) {
        setUpdateMessage({ isError: true, message: error.message });
        return false;
      } else {
        setUpdateMessage({ isError: false, message: SUCCESS_UPDATE_EXPENSE });
        return true;
      }
    } catch (error: any) {
      setUpdateMessage({ isError: true, message: error.message });
      return false;
    }
  };

  const deleteExpense = async () => {
    try {
      const { data, error } = await supabase
        .from("Expenses")
        .delete()
        .eq("id", expense.id);
      if (error) {
        setDeleteMessage({ isError: true, message: error.message });
        return false;
      } else {
        console.log(data);
        setDeleteMessage({ isError: true, message: SUCCESS_DELETE_EXPENSE });

        return true;
      }
    } catch (error: any) {
      setDeleteMessage({ isError: true, message: error.message });
      return false;
    }
  };

  return (
    <Wrapper>
      <NavBox>
        <DeskTopDrawer variant="permanent" open>
          <Toolbar />
          <DrawerContents />
        </DeskTopDrawer>
        <MobileDrawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <Toolbar />
          <DrawerContents />
        </MobileDrawer>
      </NavBox>
      <MainBox>
        {isMobile && (
          <StyledIconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </StyledIconButton>
        )}
        <SubBox>
          <GobackButton onClick={handleGoBack} />
          <DetailBox>
            <Section>
              <PageTitle>
                Expense with
                {expense.members.map((member) => {
                  if (member.id !== userId) {
                    return <Span key={member.id}>{member.firstName}</Span>;
                  } else {
                    return null;
                  }
                })}
              </PageTitle>
            </Section>
            <Section>
              <Title>{expense.description}</Title>
            </Section>
            <Section>
              <FormContainer>
                <InputsWrapper>
                  <SubInputsWrapper>
                    <TopicTitle>Amount</TopicTitle>
                    <StyledBox>
                      <Data>{expense.payment.toFixed(2).toLocaleString()}</Data>
                    </StyledBox>
                  </SubInputsWrapper>
                  <SubInputsWrapper>
                    <TopicTitle>Who paid?</TopicTitle>
                    <StyledBox>
                      <Data>{`${expense.payerFirstName} ${expense.payerLastName}`}</Data>
                    </StyledBox>
                  </SubInputsWrapper>
                </InputsWrapper>
                <InputsWrapper>
                  <SubInputsWrapper>
                    <TopicTitle>Date</TopicTitle>
                    <StyledBox>
                      <Data>
                        {expense.date.toLocaleString().substring(0, 10)}
                      </Data>
                    </StyledBox>
                    <TopicTitle>Categories</TopicTitle>
                    <StyledBox>
                      <CategoryData>
                        <IconContainer>
                          <IconCircle>
                            <CategoryIcon />
                          </IconCircle>
                        </IconContainer>
                        {expense.category}
                      </CategoryData>
                    </StyledBox>
                  </SubInputsWrapper>
                  <SubInputsWrapper>
                    <InputSelectTitle>Already Have Returned?</InputSelectTitle>
                    <SplitterContainer>
                      {expense.members.map((member) => {
                        return (
                          <div key={member.id}>
                            <SplitWrapper>
                              <CheckboxWrapper>
                                <Checkbox
                                  id={member.id}
                                  checked={
                                    checkedMembers.find(
                                      (checkedMember) =>
                                        checkedMember.id === member.id
                                    )?.paid
                                  }
                                  onChange={handleToggle}
                                  inputProps={{ "aria-label": "controlled" }}
                                  disabled={expense.payer === member.id}
                                />
                              </CheckboxWrapper>
                              <SplitterName>
                                {`${member.firstName} ${member.lastName}`}
                              </SplitterName>
                              <SplitterBox>
                                <StyledBox>
                                  <Data>
                                    ${member.amount.toFixed(2).toLocaleString()}
                                  </Data>
                                </StyledBox>
                              </SplitterBox>
                            </SplitWrapper>
                          </div>
                        );
                      })}
                    </SplitterContainer>
                  </SubInputsWrapper>
                </InputsWrapper>
              </FormContainer>
              <ButtonContainer>
                <ButtonWrapper>
                  <SubButton title={"delete"} onClick={handledelete} />
                  {deleteMessage && (
                    <ButtonMessage isError={deleteMessage.isError}>
                      {deleteMessage.message}
                    </ButtonMessage>
                  )}
                </ButtonWrapper>
                <ButtonWrapper>
                  <SubButton title={"save"} onClick={handlesave} />
                  {updateMessage && (
                    <ButtonMessage isError={updateMessage.isError}>
                      {updateMessage.message}
                    </ButtonMessage>
                  )}
                </ButtonWrapper>
              </ButtonContainer>
            </Section>
          </DetailBox>
        </SubBox>
      </MainBox>
    </Wrapper>
  );
};

const drawerWidth = 290;

const Wrapper = styled.div`
  display: flex;
  height: calc(100% - 64px);
`;

const NavBox = styled.div`
  flex-shrink: 0;
  @media (min-width: 600px) {
    width: ${drawerWidth}px;
  }
`;

const DeskTopDrawer = styled(Drawer)`
  display: none;
  & .MuiDrawer-paper {
    box-sizing: border-box;
    width: ${drawerWidth}px;
  }
  @media (min-width: 600px) {
    display: block;
  }
`;

const MobileDrawer = styled(Drawer)`
  display: block;
  & .MuiDrawer-paper {
    box-sizing: border-box;
    width: ${drawerWidth}px;
  }
  @media (min-width: 600px) {
    display: none;
  }
`;

const StyledIconButton = styled(IconButton)`
  .MuiSvgIcon-root {
    color: ${({ theme }) => theme.palette.info.light};
  }
  .MuiTouchRipple-root {
    color: ${({ theme }) => theme.palette.info.light};
  }
`;

const MainBox = styled.div`
  background-color: ${({ theme }) => theme.palette.primary.main};
  padding: 50px 120px;
  width: calc(100% - ${drawerWidth}px);
  height: 100vh;
  @media (max-width: 600px) {
    width: 100%;
    padding: 0 20px;
    height: 100%;
  }
`;

const Title = styled.h2`
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.palette.info.light};
`;

const Section = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const InputsWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 30px;
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 0;
  }
`;

const SubInputsWrapper = styled.div`
  width: 50%;
  @media (max-width: 600px) {
    width: 100%;
  }
`;

const TopicTitle = styled.div`
  margin-top: 1rem;
  color: ${({ theme }) => theme.palette.info.light};
`;

const InputSelectTitle = styled.div`
  margin-top: 1rem;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.palette.secondary.main};
`;

const StyledBox = styled(Box)`
  margin-top: 8px;
`;

const SplitterContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const SplitWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const SplitterName = styled.div`
  width: 30%;
  display: flex;
  padding-left: 1rem;
  color: ${({ theme }) => theme.palette.info.light};
`;

const SplitterBox = styled(Box)`
  width: 70%;
`;

const DetailBox = styled.div`
  margin: 0 1rem;
`;

const Data = styled.div`
  padding: 0.7rem;
  margin-bottom: 1rem;
  background-color: ${({ theme }) => theme.palette.primary.light};
  color: ${({ theme }) => theme.palette.info.light};
  border-radius: 10px;
`;

const CategoryData = styled.div`
  display: flex;
  align-items: center;
  padding: 0.7rem;
  margin-bottom: 1rem;
  background-color: ${({ theme }) => theme.palette.primary.light};
  color: ${({ theme }) => theme.palette.info.light};
  border-radius: 10px;
  gap: 10px;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15%;
`;

const IconCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.palette.secondary.light};
  color: #fff;
`;

const ButtonContainer = styled.div`
  width: 100%;
  margin-top: 50px;
  display: flex;
  justyfy-content: space-between;
  gap: 20px;
`;

const ButtonWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PageTitle = styled.h2`
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.palette.info.light};
`;

const Span = styled.span`
  color: ${({ theme }) => theme.palette.secondary.light};
  margin-left: 0.5rem;
`;

const CheckboxWrapper = styled.div`
  .css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root {
    color: ${({ theme }) => theme.palette.info.light};
  }
  .css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root.Mui-checked,
  .css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root.MuiCheckbox-indeterminate {
    color: ${(props) => props.theme.palette.secondary.main};
  }
`;

const SubBox = styled(Box)`
  width: 100%;
`;

const ButtonMessage = styled.div<{ isError: boolean }>`
  display: flex;
  justify-content: center;
  width: 70%;
  margin-top: 7px;
  font-size: 1rem;
  color: ${({ isError }) => (isError ? "#ff908d" : "#4caf50")};
`;
