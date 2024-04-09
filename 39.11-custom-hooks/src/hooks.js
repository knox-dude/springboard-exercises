import { useState } from "react";

function useFlip() {
  const [isFacingUp, setIsFacingUp] = useState(true);
  const flip = () => {
    setIsFacingUp(oldValue => !oldValue);
  };
  
  // return piece of state AND a function to toggle it
  return [isFacingUp, flip];
}

export default useFlip;