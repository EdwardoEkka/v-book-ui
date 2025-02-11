import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRootFolder, createRootFolder } from "../api/api";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Box, CircularProgress, Typography } from "@mui/material";

const RootChecker = () => {
  const [rootExists, setRootExists] = useState<boolean | null>(null); // Include `null` for the loading state
  const [rootFolder, setRootFolder] = useState<any | null>(null); // Use proper typing for `Folder`
  const [error, setError] = useState<string | null>(null); // Manage error state
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    const getFolder = async () => {
      try {
        const response = await getRootFolder(user.id);
        console.log(response);

        if (response.data.rootExists) {
          setRootFolder(response.data.rootFolder);
          setRootExists(true);

          // Navigate to the folder route with rootFolder ID
          navigate(`/folder/${response.data.rootFolder.id}`);
        } else {
          setRootExists(false);
        }
      } catch (error: any) {
        setError(error.response?.data?.error || "Failed to fetch root folder");
      }
    };

    getFolder();
  }, [navigate, user.id]);

  if (rootExists === null) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          gap: 2,
        }}
      >
        <CircularProgress size={60} />
        <Typography variant="h6" color="textSecondary">
          Loading folder...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Root Folder Status</h1>
      {rootExists ? (
        <pre>{JSON.stringify(rootFolder, null, 2)}</pre>
      ) : (
        <CreateRootFolder />
      )}
    </div>
  );
};

const CreateRootFolder = () => {
  const user = useSelector((state: RootState) => state.user.user);
  useEffect(() => {
    const createRootFolderCall = async () => {
      try {
        const response = await createRootFolder(user.id);
        console.log(response.status);
      } catch (error) {
        console.error(error);
      }
    };
    createRootFolderCall();
  }, [user.id]);
  return <>Root Folder Creation</>;
};

export default RootChecker;
