import React from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// Firebase
import firebaseApp from "../../../../firebase/firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { doc, getFirestore, setDoc } from "firebase/firestore"

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

function Cover() {
  // const navigate = useNavigate();
  const [ name, setName ] = React.useState('')
  const [ email, setEmail ] = React.useState('')
  const [ password, setPassword ] = React.useState('')

  const handleSubmit = async () => {
    try {
      let user = await createUserWithEmailAndPassword(auth, email, password);
      let docRef = doc(firestore, `users/${user.user.uid}`)
      setDoc(docRef, {name, email, role:'admin'}).catch(e=>{
        console.log(e)
      })
      // navigate('/dashboards/analytics')
    } catch (e) {
      console.log(e);
      window.alert('error')
    }
  }

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us today
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to register
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput 
                type="text" 
                label="Name" 
                variant="standard" 
                fullWidth 
                value={name} 
                onChange={ ({target}) => setName(target.value) } 
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput 
                type="email" 
                label="Email" 
                variant="standard" 
                fullWidth 
                value={email} 
                onChange={ ({target}) => setEmail(target.value) }
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput 
                type="password" 
                label="Password" 
                variant="standard" 
                fullWidth 
                value={password} 
                onChange={ ({target}) => setPassword(target.value) }
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </MDTypography>
              <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Terms and Conditions
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth 
                onClick={handleSubmit}
              >
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in/basic"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
