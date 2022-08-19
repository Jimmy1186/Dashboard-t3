import React from "react";

type alertBarType = {
  isShowingAlert: boolean;
  setShowingAlert: React.Dispatch<React.SetStateAction<boolean>>;
};

function AlertBar({ isShowingAlert, setShowingAlert }: alertBarType) {
  return (
    <div>
      <div
        className={`alert alert-success ${
          isShowingAlert ? "alert-shown" : "alert-hidden"
        }`}
        onTransitionEnd={() => setShowingAlert(false)}
      >
        <strong>Success!</strong> Thank you for subscribing!
      </div>
    </div>
  );
}

export default AlertBar;
