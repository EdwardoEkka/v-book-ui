import { Paper, Typography, Stack, Box } from "@mui/material";
import { File } from "../../types";
import { Description } from "@mui/icons-material";


const SearchFileDisplay = ({ file }: { file: File }) => {

  return (
    <Paper
      sx={{ padding: "16px", cursor: "pointer" }}
      onClick={() => {
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Stack direction="column" sx={{ justifyContent: "start" }}>
          <Description sx={{ height: "32px", width: "32px" }} />
          <Typography variant="body1" sx={{ textAlign: "left" }}>
            {file.fileName}
          </Typography>
        </Stack>
        <Stack>{file.path}</Stack>
      </Box>
    </Paper>
  );
};

export default SearchFileDisplay;
