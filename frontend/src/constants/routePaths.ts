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

const friendList =
  process.env.REACT_APP_ENVIRONMENT === "production"
    ? "/expense-tracker-app/expenses/friendslist"
    : "/expenses/friendslist";

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
    ? "/expense-tracker-app/history/group/:id"
    : "/history/group/:id";

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
  friendList,
  payment,
  history,
  historyDetail,
  historyGroup,
  account,
  friendApprove,
  passwordReset,
};
