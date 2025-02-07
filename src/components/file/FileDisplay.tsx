import { Paper, Typography, Stack } from "@mui/material";
import { File } from "../../types";
import { Description } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const FileDisplay = ({ file }: { file: File }) => {
  const navigate = useNavigate();
  return (
    <Paper sx={{ padding: "16px", cursor:"pointer",boxShadow: 3, }} onClick={()=>{navigate(`/folder/${file.parentFolderId}/file-view/${file.id}`)}}>
      <Stack
        direction="column"
        sx={{ justifyContent: "center", alignItems: "center" }}
      >
        <Description sx={{ height: "32px", width: "32px" }} />
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          {file.fileName}
        </Typography>
      </Stack>
    </Paper>
  );
};

export default FileDisplay;
