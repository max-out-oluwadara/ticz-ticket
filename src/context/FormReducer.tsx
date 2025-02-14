export type FormState = {
  name: string;
  email: string;
  ticketType: string;
  ticketCount: string;
  specialRequest: string;
  profilePicture: string;
  activePage: "home" | "tickets" | "about" | "attendee";
};

export type FormAction =
  | { type: "SET_NAME"; payload: string }
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_TICKET_TYPE"; payload: string }
  | { type: "SET_TICKET_COUNT"; payload: string }
  | { type: "SET_SPECIAL_REQUEST"; payload: string }
  | { type: "SET_PROFILE_PICTURE"; payload: string }
  | { type: "SET_ACTIVE_PAGE"; payload: "home" | "tickets" | "about" | "attendee" }
  | { type: "RESET_FORM" };

export const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_TICKET_TYPE":
      return { ...state, ticketType: action.payload };
    case "SET_TICKET_COUNT":
      return { ...state, ticketCount: action.payload };
    case "SET_SPECIAL_REQUEST":
      return { ...state, specialRequest: action.payload };
    case "SET_PROFILE_PICTURE":
      return { ...state, profilePicture: action.payload };
    case "SET_ACTIVE_PAGE":
      return { ...state, activePage: action.payload };
    case "RESET_FORM":
      return {
        name: "",
        email: "",
        ticketType: "",
        ticketCount: "",
        specialRequest: "",
        activePage: "home",
        profilePicture: "",
      };
    default:
      return state;
  }
};
