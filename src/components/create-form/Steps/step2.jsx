import React from "react";
import { Box, Grid, Paper } from "@material-ui/core";
import { styles } from "../common/styles";
import {
  renderButton,
  renderInputField,
  renderSelect,
  renderText,
} from "../common/DisplayComponent";

const Step2 = ({ state, handleChange, handleNext, handlePrev }) => {
  return (
    <Paper style={styles.steps}>
      <Box mt={2} mb={2}>
        {renderText({
          label: "A Bit About Education",
          type: "h6",
          color: "textPrimary",
          align: "center",
        })}
      </Box>

      <Grid container spacing={1} style={{ marginBottom: "16px" }}>
        <Grid item xs={12} sm={6}>
          {renderSelect({
            state,
            name: "highestDegree",
            label: "Qualification Degree",
            options: [
              { key: "Diploma", value: "Diploma" },
              { key: "B.Tech", value: "B.Tech" },
              { key: "BCA", value: "BCA Course" },
              { key: "M.Tech", value: "M.Tech" },
              { key: "MCA", value: "MCA" },
            ],
            onChange: handleChange,
          })}
        </Grid>
        <Grid item xs={12} sm={6}>
          {renderInputField({
            state,
            name: "percentage",
            label: "Percentage",
            onChange: handleChange,
          })}
        </Grid>
      </Grid>


      <Grid container spacing={1} style={{ marginBottom: "16px" }}>
        <Grid item xs={12}>
          {renderSelect({
            state,
            name: "course",
            label: "Course",
            options: [
              { key: "Computer-Engineering", value: "Computer-Engineering" },
              { key: "It-Engineering", value: "It-Engineering" },
              { key: "Electronics-Engineering", value: "Electronics-Engineering" },
              { key: "Civil-Engineering", value: "Civil-Engineering" },
              { key: "Digital-Engineering", value: "Digital-Engineering" },
              { key: "Electrical-Engineering", value: "Electrical-Engineering" },
              { key: "Mechanical-Engineering", value: "Mechanical-Engineering" },
              { key: "Plastic-Engineering", value: "Plastic-Engineering" },
            ],
            onChange: handleChange,
          })}
        </Grid>
        {/* <Grid item xs={12} sm={6}>
          {renderInputField({
            state,
            name: "percentage",
            label: "Percentage",
            onChange: handleChange,
          })}
        </Grid> */}
      </Grid>

      <Grid container spacing={1} style={{ marginBottom: "16px" }}>
        <Grid item xs={12} sm={6}>
          {renderInputField({
            state,
            name: "yearOfPassing",
            label: "Passing Year",
            onChange: handleChange,
          })}
        </Grid>
        <Grid item xs={12} sm={6}>
        {renderInputField({
            state,
            name: "sapId",
            label: "Sap Id",
            onChange: handleChange,
          })}
        </Grid>
      </Grid>

      <Grid container component={Box} justify='flex-end' mt={2} p={2}>
        <Box ml={2}>
          {renderButton({
            label: "Back",
            color: "default",
            onClick: handlePrev,
          })}
        </Box>
        <Box ml={2}>{renderButton({ label: "Next", onClick: handleNext })}</Box>
      </Grid>
    </Paper>
  );
};

export default Step2;
