import React from "react";
import { Box, Paper } from "@material-ui/core";
import { styles } from "../common/styles";
import { renderText } from "../common/DisplayComponent";

const FinalStep = ({ data,createCertificate }) => {
  createCertificate(
    data.fullName,
    data.course,
    data.email,
    data.yearOfPassing,
    data.percentage,
    data.sapId,
    data.phone,
    data.birthDate,
    data.gender,
    data.highestDegree
  );
  return (
    <Paper style={styles.steps}>
      <Box mt={2} mb={2}>
        {renderText({
          label: "Your Submitted Data",
          type: "h6",
          color: "textPrimary",
          align: "center",
        })}
      </Box>
      {JSON.stringify(data, null, 4)}
    </Paper>
  );
};

export default FinalStep;
