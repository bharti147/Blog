import React from "react";
import { SignUp as SignupComponent } from "../components";

//signup logic - all the work will be done by SignupComponent, so we doesnt need to do anything here, we'll just call SignupComponent on this signup page to give it better styling


function Signup() {
  return (
    <div className="py-8">
      <SignupComponent />
    </div>
  );
}

export default Signup;
