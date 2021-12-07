import { Ability } from "@casl/ability";
import { initialAbility } from "./initialAbility";
import jwtDecode from "jwt-decode";

//  Read ability from localStorage
// * Handles auto fetching previous abilities if already logged in user
// ? You can update this if you store user abilities to more secure place
// ! Anyone can update localStorage so be careful and please update this
const userData = localStorage.getItem("auth")
  ? jwtDecode(localStorage.getItem("auth"))
  : null;
const existingAbility = userData
  ? userData.role === "admin" || userData.role === "staff"
    ? [
        {
          action: "manage",
          subject: "all",
        },
      ]
    : [
        {
          action: "read",
          subject: "all",
        },
        {
          action: "read",
          subject: "Auth",
        },
      ]
  : null;

export default new Ability(existingAbility || initialAbility);
