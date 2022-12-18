import { Button } from "@mantine/core";
import googleIcon from "../assets/google.svg";
import { useFirebase } from "../context/Firebase";

export const GoogleButton = () => {
  const Firebase = useFirebase();
  return (
    <Button radius="xl" variant="outline" onClick={()=>Firebase.signInWithGoogle()}>
      <img src={googleIcon} alt="" width={17} style={{ marginRight: "10px" }} />
      SignUp with Google
    </Button>
  );
};
