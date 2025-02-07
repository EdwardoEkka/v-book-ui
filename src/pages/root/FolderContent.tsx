import { useEffect, useState } from "react";
import FolderDisplay from "../../components/folder/FolderDisplay";
import FileDisplay from "../../components/file/FileDisplay";
import { Folder, File } from "../../types";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useParams } from "react-router-dom";
import { getSearchResults } from "../../api/api";
import SearchFolderDisplay from "../../components/folder/SearchFolderDisplay";
import SearchFileDisplay from "../../components/folder/SearchFileDisplay";

const FolderContent = ({ folder }: { folder: Folder }) => {
  const { id } = useParams();
  const { subFolders, files } = folder;
  const storedSearch = useSelector(
    (state: RootState) => state.search.searchString
  );
  const [searchFolderResults, setSearchFolderResults] = useState<any | null>([]);
  const [searchFileResults, setSearchFileResults] = useState<any | null>([]);
  const user=useSelector((state:RootState)=>state.user.user)

  useEffect(() => {
    const searchResults = async () => {
      try {
        const results = await getSearchResults(id, storedSearch, user.id);
          setSearchFolderResults(results.data.results.folderResults);
          setSearchFileResults(results.data.results.fileResults);
      } catch (error) {
        setSearchFileResults([]);
        setSearchFolderResults([]);
      }
    };
    searchResults();
  }, [storedSearch, id, user.id]);

  return (
    <Box sx={{ py: "16px" }}>
      {storedSearch.length > 0 ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "repeat(1,1fr)", sm: "repeat(2,1fr)" },
            gap: "16px",
            py: "16px",
          }}
        >
          {searchFolderResults.map((folderItem: any, index: number) => (
            <SearchFolderDisplay folder={folderItem} key={index}/>
          ))}
          {
            searchFileResults.map((fileItem:any, index:number)=>(
              <SearchFileDisplay file={fileItem} key={index}/>
            ))
          }
        </Box>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2,1fr)",
              sm: "repeat(3,1fr)",
              lg: "repeat(4,1fr)",
            },
            gap: "16px",
            py: "16px",
          }}
        >
          {subFolders.map((folderItem: Folder, index: number) => (
            <FolderDisplay folder={folderItem} key={index}/>
          ))}
          {files.map((fileItem: File, index: number) => (
            <FileDisplay file={fileItem} key={index}/>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default FolderContent;
