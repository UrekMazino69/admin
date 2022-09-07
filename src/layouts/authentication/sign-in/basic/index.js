import React from "react";

// react-router-dom components
import { Link } from "react-router-dom";

//Firebase
import { db, auth } from "../../../../firebase/firebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, addDoc, setDoc, doc, getDoc, getDocs, query, where } from "firebase/firestore";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

// const auth = getAuth(firebaseApp);

function Basic() {

  const [email, setEmail] = React.useState("jansihdez@gmail.com");
  const [password, setPassword] = React.useState("123456");

  React.useEffect(() => {
    const q = query(collection(db, "users"));
    getDocs(q).then(querySnapshot => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
    });

  }, []);

  const handleSubmitCreate = async () => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      const userRef = doc(db, "users", user.uid);
      let data = {
        firstName: "jansi",
        lastName: "hernandez",
        id: user.uid,
        email:user.email,
      };
      await setDoc(userRef, data, { merge: true });

      // navigate

    } catch (e) {
      window.alert("Error al iniciar session", e.message);
    }
  };

  const handleSubmitLogin = async () => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      if (user){

      }
    } catch (e) {
      window.alert("Error al iniciar session", e.message);
    }
  };

  const [rememberMe, setRememberMe] = React.useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const addProduct = async () => {
    const docRef = await addDoc(collection(db, "product"), {
      price: 100,
      name: "Lovelace",
      born: 1815,
    });
  };


  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                fullWidth
                // value={email}
                // onChange={({target}) => setEmail(target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                fullWidth
                // value={password}
                // onChange={({target}) => setPassword(target.value)}
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              {/* <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography> */}
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton onClick={handleSubmitCreate} variant="gradient" color="info" fullWidth>
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up/cover"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
