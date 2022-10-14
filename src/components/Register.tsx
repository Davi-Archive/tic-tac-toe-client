import { Grid, Link } from "@mui/material";
import { Row } from "react-bootstrap";

const Register = ({ gotUser, setGotUser }: any) => {
  return (
    <Grid container>
      <Grid item>
        <Row style={{ color: "gray" }}>
          {gotUser && (
            <Link
              onClick={() => setGotUser(false)}
              variant="body1"
              color="#bf4aa8"
            >
              "Don't have an account? Sign Up"
            </Link>
          )}
          {!gotUser && (
            <Link
              onClick={() => setGotUser(true)}
              variant="body1"
              color="#bf4aa8"
            >
              "Already have an username? Login"
            </Link>
          )}
        </Row>
      </Grid>
    </Grid>
  );
};

export default Register;
