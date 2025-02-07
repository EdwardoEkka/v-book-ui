import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFolderById } from "../../api/api";
import FolderContent from "./FolderContent";
import AddFoldersAndFiles from "../../components/options";
import { Box, Container } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const RootFolder = () => {
  const { id } = useParams(); // Extract `id` from the URL
  const [folder, setFolder] = useState<any | null>(null); // State to store folder details
  const [error, setError] = useState<string | null>(null); // State to handle errors
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    const fetchFolderDetails = async () => {
      try {
        if (id) {
          const response = await getFolderById(id, user.id); // Use the helper function
          if (response.data.success) {
            setFolder(response.data.folder);
          } else {
            setError("Failed to fetch folder details.");
          }
        } else {
          setError("No folder ID provided.");
        }
      } catch (err: any) {
        setError(err.response?.data?.error || "An error occurred.");
      } finally {
        setLoading(false); // Ensure loading state is updated
      }
    };

    fetchFolderDetails();
  }, [id, user.id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Box sx={{position:"relative"}}>
        <Box sx={{position:"sticky", top:"0px", paddingTop:""}}>
          <AddFoldersAndFiles parentId={folder.id} />
        </Box>
    <Container maxWidth="lg" sx={{ padding: "0px 16px 16px 16px"}}>
      {folder ? (
        <>
        <Box>

          <FolderContent folder={folder} />
        </Box>
        </>
      ) : (
        <p>No folder details available.</p>
      )}
    </Container>
    </Box>
  );
};

export default RootFolder;
