import { makeStyles } from "@mui/material/styles";
import ColorsTheme from "../assets/colors";

const useStyles = makeStyles({

    content: {
        backgroundColor: ColorsTheme.cultured,
        height: "100vh",
        alignItems: "center"
    },

    imageError: {
        height: "90px",
    },

    descError: {
        fontSize: "40px",
        marginLeft: "20px",
    },

    textError: {
        fontSize: "small",
        fontWeight: "lighter",
    },
});

export default useStyles;