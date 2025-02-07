import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill's Snow theme
import { createFile } from "../../api/api";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  DialogActions,
  IconButton,
  Container,
  Box
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const FileCreate = () => {
  const [fileName, setFileName] = useState<string>("");
  const [content, setContent] = useState<string>(""); // For rich text
  const user = useSelector((state: RootState) => state.user.user);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const params = useParams();
  const parentId = params.id;
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await createFile({
        fileName,
        content,
        parentFolderId: parentId,
        userId: user.id,
      });
      setFileName("");
      setContent("");
    } catch (error: any) {
      alert(error.response?.data?.message || "Error creating file");
    } finally {
      setIsDialogOpen(false);
    }
  };

  const handleSubmitDialog = () => {
    setIsDialogOpen(false);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <Container maxWidth="lg">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2, mt: 2 }}
      >
        <IconButton aria-label="go back" onClick={()=>{navigate(-1)}}>
          <ArrowBackIcon />
        </IconButton>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsDialogOpen(true)}
          sx={{ minWidth: 120 }}
        >
          Done
        </Button>
      </Stack>
      <ReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
        modules={{
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            ["clean"],
          ],
        }}
        formats={[
          "header",
          "bold",
          "italic",
          "underline",
          "strike",
          "list",
          "bullet",
          "link",
          "image",
        ]}
        style={{
          border: "1px solid #ccc",
          borderRadius: "4px",
          overflowY: "scroll",
        }}
      />
      <Dialog open={isDialogOpen} onClose={handleSubmitDialog} fullWidth>
        <DialogTitle>File Name</DialogTitle>
        <DialogContent>
          <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", paddingY: 2}}>

          <TextField
            label="File Name"
            variant="outlined"
            fullWidth
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            sx={{ mb: 2 }}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
          >
            Add File
          </Button>
          </Box>
        </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseDialog} color="primary">
                    Close
                  </Button>
                </DialogActions>
      </Dialog>
    </Container>
  );
};

export default FileCreate;
