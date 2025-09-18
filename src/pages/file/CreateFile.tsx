import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
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
  Box,
  Typography,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DescriptionIcon from "@mui/icons-material/Description";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { createClient } from "@supabase/supabase-js";

const FileCreate = () => {
  const [fileName, setFileName] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const user = useSelector((state: RootState) => state.user.user);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const params = useParams();
  const parentId = params.id;
  const navigate = useNavigate();
  const [fileType, setFileType] = useState<string>("");

  const supabaseUrl = "https://cwcwvtvwxfhdzwebaemo.supabase.co";
  const supabaseAnonKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3Y3d2dHZ3eGZoZHp3ZWJhZW1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc2MDE3NDMsImV4cCI6MjA3MzE3Nzc0M30.eVX_FpXM-kjuWQG9XjjtnnJe0vxjIQXekgi5WFBNNCo";

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;

    if (selectedFile) {
      const fileSizeMB = selectedFile.size / 1024 / 1024;
      const allowedTypes = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "application/pdf",
      ];

      if (!allowedTypes.includes(selectedFile.type)) {
        setError("Only PNG, JPG, JPEG, or PDF files are allowed");
        setFile(null);
        setUploadedUrl("");
        return;
      }

      if (fileSizeMB > 5) {
        setError("File size must be less than 5 MB");
        setFile(null);
        setUploadedUrl("");
        return;
      }
    }

    setFile(selectedFile);
    setError("");
    setUploadedUrl("");
  };

  const handleUploadFile = async () => {
    if (!file || !user?.id) {
      setError("Please select a file first");
      return;
    }

    setIsUploading(true);
    setError("");

    try {
      const filePath = `public/${user.id}/${Date.now()}_${file.name}`;

      // Upload the file
      const { error: uploadError } = await supabase.storage
        .from("nfts")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get the public URL
      const { data: publicUrlData } = supabase.storage
        .from("nfts")
        .getPublicUrl(filePath);

      if (!publicUrlData?.publicUrl) {
        throw new Error("Failed to generate public URL");
      }

      setUploadedUrl(publicUrlData.publicUrl);

      // Auto-fill filename if empty
      if (!fileName) {
        setFileName(file.name);
      }
    } catch (error: any) {
      setError(error.message || "Error uploading file");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!fileName.trim()) {
      setError("Please enter a file name");
      return;
    }

    if (!user?.id) {
      setError("User not authenticated");
      return;
    }

    try {
      let fileContent = "";

      if (fileType === "text") {
        if (!content.trim()) {
          setError("Please enter some content");
          return;
        }
        fileContent = content;
      } else if (fileType === "raw") {
        if (!uploadedUrl) {
          setError("Please upload a file first");
          return;
        }
        fileContent = uploadedUrl;
      }

      // Create file record in DB
      await createFile({
        fileName: fileName.trim(),
        content: fileContent,
        parentFolderId: parentId,
        userId: user.id,
      });

      // Reset form and navigate back
      setFileName("");
      setContent("");
      setFile(null);
      setUploadedUrl("");
      setIsDialogOpen(false);
      navigate(-1);
    } catch (error: any) {
      setError(error.message || "Error creating file");
    }
  };

  // File type selection dialog
  if (fileType !== "raw" && fileType !== "text") {
    return (
      <Dialog open={true} maxWidth="xs" fullWidth>
        <DialogTitle>
          <Typography variant="h6" align="center" fontWeight={600}>
            Select File Type
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={2}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<InsertDriveFileIcon />}
              onClick={() => setFileType("raw")}
            >
              Raw File
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              startIcon={<DescriptionIcon />}
              onClick={() => setFileType("text")}
            >
              Text File
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Container maxWidth="lg">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2, mt: 2 }}
      >
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
        <Button
          variant="contained"
          onClick={() => setIsDialogOpen(true)}
          disabled={fileType === "raw" && !uploadedUrl}
        >
          Done
        </Button>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      {fileType === "text" ? (
        <Box sx={{ minHeight: 400 }}>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            style={{ height: "350px" }}
          />
        </Box>
      ) : (
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Upload Raw File
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "2px dashed #1976d2",
                borderRadius: "16px",
                padding: "40px",
                width: "100%",
                maxWidth: "400px",
                margin: "0 auto",
                mb: 3,
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
              }}
            >
              <label
                htmlFor="file-upload"
                style={{ width: "100%", textAlign: "center" }}
              >
                <input
                  id="file-upload"
                  type="file"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                <Button
                  variant="contained"
                  component="span"
                  sx={{
                    borderRadius: "50px",
                    padding: "12px 32px",
                    fontSize: "16px",
                  }}
                >
                  Choose File
                </Button>
              </label>
            </Box>

            {file && (
              <Stack direction="column" spacing={2} alignItems="center">
                <Button
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                  onClick={handleUploadFile}
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <>
                      <CircularProgress size={20} sx={{ mr: 1 }} />
                      Uploading...
                    </>
                  ) : (
                    "Upload File"
                  )}
                </Button>

                <Typography variant="body2" color="text.secondary">
                  {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </Typography>
              </Stack>
            )}
          </Box>

          {uploadedUrl && (
            <Box sx={{ mt: 2, mb: 3, textAlign: "center" }}>
              <Typography variant="subtitle2" color="success.main">
                File uploaded successfully!
              </Typography>

              {/* Check file type */}
              {/\.(jpg|jpeg|png)$/i.test(uploadedUrl) ? (
                // Display image
                <Box
                  component="img"
                  src={uploadedUrl}
                  alt="Uploaded file"
                  sx={{
                    mt: 1,
                    maxWidth: "100%",
                    maxHeight: 300,
                    borderRadius: 2,
                  }}
                />
              ) : /\.(pdf)$/i.test(uploadedUrl) ? (
                // Display PDF
                <iframe
                  src={uploadedUrl}
                  title="Uploaded PDF"
                  width="100%"
                  height="400px"
                  style={{
                    border: "none",
                    marginTop: "8px",
                    borderRadius: "8px",
                  }}
                ></iframe>
              ) : (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Cannot preview this file type.
                </Typography>
              )}
            </Box>
          )}
        </Paper>
      )}

      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Save File</DialogTitle>
        <DialogContent>
          <TextField
            label="File Name"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            fullWidth
            margin="normal"
            required
            error={!fileName.trim() && fileName !== ""}
            helperText={
              !fileName.trim() && fileName !== "" ? "File name is required" : ""
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={
              !fileName.trim() ||
              (fileType === "raw" && !uploadedUrl) ||
              (fileType === "text" && !content.trim())
            }
          >
            Save File
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default FileCreate;
