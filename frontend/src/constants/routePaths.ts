const home =
  process.env.REACT_APP_ENVIRONMENT === "production"
    ? "/expense-tracker-app"
    : "/";

const signup =
  process.env.REACT_APP_ENVIRONMENT === "production"
    ? "/expense-tracker-app/signup"
    : "/signup";

const login =
  process.env.REACT_APP_ENVIRONMENT === "production"
    ? "/expense-tracker-app/login"
    : "/login";

const selectFriends =
  process.env.REACT_APP_ENVIRONMENT === "production"
    ? "/expense-tracker-app/expenses/select-friends"
    : "/expenses/select-friends";

const payment =
  process.env.REACT_APP_ENVIRONMENT === "production"
    ? "/expense-tracker-app/payment"
    : "/expenses/payment";

const history =
  process.env.REACT_APP_ENVIRONMENT === "production"
    ? "/expense-tracker-app/history"
    : "/history";

const historyDetail =
  process.env.REACT_APP_ENVIRONMENT === "production"
    ? "/expense-tracker-app/history/:id"
    : "/history/:id";

const historyGroup =
  process.env.REACT_APP_ENVIRONMENT === "production"
    ? "/expense-tracker-app/history/group/"
    : "/history/group/";

const account =
  process.env.REACT_APP_ENVIRONMENT === "production"
    ? "/expense-tracker-app/account"
    : "/account";

const friendApprove =
  process.env.REACT_APP_ENVIRONMENT === "production"
    ? "/expense-tracker-app/friends"
    : "/friends";

const passwordReset =
  process.env.REACT_APP_ENVIRONMENT === "production"
    ? "/expense-tracker-app/passwordReset"
    : "/passwordReset";

export const paths = {
  home,
  signup,
  login,
  selectFriends,
  payment,
  history,
  historyDetail,
  historyGroup,
  account,
  friendApprove,
  passwordReset,
};