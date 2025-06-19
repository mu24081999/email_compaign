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
import smsScheduleReducer from "./slices/smsSchedule";
import optionsReducer from "./slices/options";
import warmupReducer from "./slices/warmup";
import dashboardReducer from "./slices/dashboard";
import subscriptionReducer from "./slices/subscriptions";
import uniboxReducer from "./slices/unibox";
import validationReducer from "./slices/validation";
import twilioRreducer from "./slices/twilio";
import SMSCampaignReducer from "./slices/smsCampaign";
import SMSLeadReducer from "./slices/smsLeads";
import walletReducer from "./slices/wallet";
import walletLogsReducer from "./slices/walletLogs";
import verificationReducer from "./slices/verification";
import teamReducer from "./slices/team";
import EmailFlowReducer from "./slices/emailFlow";
import UnsubscribedReducer from "./slices/unsubscribed";

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
  smsSchedule: smsScheduleReducer,
  options: optionsReducer,
  warmup: warmupReducer,
  dashboard: dashboardReducer,
  subscription: subscriptionReducer,
  unibox: uniboxReducer,
  validation: validationReducer,
  twilio: twilioRreducer,
  smsCampaign: SMSCampaignReducer,
  smsLead: SMSLeadReducer,
  logs: walletLogsReducer,
  wallet: walletReducer,
  verification: verificationReducer,
  team: teamReducer,
  emailFlow: EmailFlowReducer,
  unsubscribed: UnsubscribedReducer,
});
