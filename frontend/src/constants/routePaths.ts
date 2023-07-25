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

const registerDetail =
  process.env.REACT_APP_ENVIRONMENT === "production"
    ? "/expense-tracker-app/register-detail"
    : "/expenses/register-detail";

const history =
  process.env.REACT_APP_ENVIRONMENT === "production"
    ? "/expense-tracker-app/history"
    : "/history";

const historyById =
  process.env.REACT_APP_ENVIRONMENT === "production"
    ? "/expense-tracker-app/history/:id"
    : "/history/:id";

const historyDetail =
  process.env.REACT_APP_ENVIRONMENT === "production"
    ? "/expense-tracker-app/history/detail"
    : "/history/detail";

const friendList =
  process.env.REACT_APP_ENVIRONMENT === "production"
    ? "/expense-tracker-app/friends-list"
    : "/friends-list";

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
    ? "/expense-tracker-app/reset-password"
    : "/reset-password";

export const paths = {
  home,
  signup,
  login,
  selectFriends,
  registerDetail,
  history,
  historyById,
  historyDetail,
  account,
  friendApprove,
  passwordReset,
};
