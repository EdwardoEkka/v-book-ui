import { Paper, Typography, Stack, Box } from "@mui/material";
import { Folder } from "../../types";
import { FolderOpenOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const SearchFolderDisplay = ({ folder }: { folder: Folder }) => {
  const navigate = useNavigate();
  return (
    <Paper
      sx={{ padding: "16px", cursor: "pointer" }}
      onClick={() => {
        navigate(`/folder/${folder.id}`, { replace: true });
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
          <FolderOpenOutlined sx={{ height: "32px", width: "32px" }} />
          <Typography variant="body1" sx={{ textAlign: "left" }}>
            {folder.name}
          </Typography>
        </Stack>
        <Stack>{folder.path}</Stack>
      </Box>
    </Paper>
  );
};

export default SearchFolderDisplay;
