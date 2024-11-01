import { combineReducers } from "redux";
import authReducer from "./slices/auth";
import userReducer from "./slices/user";
import kycReducer from "./slices/kyc";
import compaignReducer from "./slices/compaign";
import templateReducer from "./slices/templates";
import leadReducer from "./slices/leads";
import sequenceReducer from "./slices/sequence";
import emailReducer from "./slices/email";
import scheduleReducer from "./slices/schedule";
import optionsReducer from "./slices/options";
import warmupReducer from "./slices/warmup";
import dashboardReducer from "./slices/dashboard";

export const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  kyc: kycReducer,
  compaign: compaignReducer,
  template: templateReducer,
  lead: leadReducer,
  sequence: sequenceReducer,
  email: emailReducer,
  schedule: scheduleReducer,
  options: optionsReducer,
  warmup: warmupReducer,
  dashboard: dashboardReducer,
});
