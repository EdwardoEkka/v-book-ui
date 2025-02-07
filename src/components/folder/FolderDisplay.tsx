import { Paper, Typography, Stack } from "@mui/material";
import { Folder } from "../../types";
import { FolderOpenOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const FolderDisplay = ({ folder }: { folder: Folder }) => {
  const navigate = useNavigate();
  return (
    <Paper
      sx={{ padding: "16px", cursor: "pointer", boxShadow: 3, }}
      onClick={() => {
        navigate(`/folder/${folder.id}`, { replace: true });
      }}
    >
      <Stack
        direction="column"
        sx={{ justifyContent: "center", alignItems: "center" }}
      >
        <FolderOpenOutlined sx={{ height: "32px", width: "32px" }} />
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          {folder.name}
        </Typography>
      </Stack>
    </Paper>
  );
};

export default FolderDisplay;
