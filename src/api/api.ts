import axios from "axios";
import { User } from "../types";

const api = axios.create({
  baseURL: process.env.REACT_APP_PUBLIC_URL, // Update with your server's base URL
});

export interface Folder {
  id: string;
  name: string;
  parentFolderId?: string | null;
  userId: string;
}

export interface GoogleAuthResponse  {
  success:boolean;
  token: string;
  user: {
    email: string;
    name: string;
    picture: string;
    sub: string;
  };
};

export interface File {
  id: string;
  fileName: string;
  content: string;
  parentFolderId: string;
  userId: string;
}

export const createFolder = (data: Partial<Folder>) =>
  api.post<Folder>("/folders/create-folder", data);

export const createFile = (data: Partial<File>) =>
  api.post<File>("/files/create-file", data);

export const getFolderById = (id: string, userId: string) =>
  api.get<{ success: boolean; folder: Folder }>(
    `/folders/get-folder-by-id/${id}/${userId}`
  );

export const getRootFolder = (userId: string) =>
  api.get<{ rootExists: boolean; rootFolder: Folder }>(
    `/folders/get-root-folder/${userId}`
  );

export const createRootFolder = (userId: string) =>
  api.post<Folder>(`/folders/create-root-folder/${userId}`);

export const getSearchResults = (PId: any, searchValue: string,userId: string ) =>
  api.get<{ success: boolean; results: {folderResults:Folder[], fileResults:File[]} }>(
    `/search/getSearchResults/${PId}/${userId}/${searchValue}`
  );

export const createUser = (name: string, email: string, password: string) =>
  api.post<{ success: boolean; user: User; message: string }>("/user/sign-up", {
    name,
    email,
    password,
  });

export const loginUser = (name: string, email: string, password: string) =>
  api.post<{ success: boolean; message: string; token: string }>(
    "/user/sign-in",
    { name, email, password }
  );
  
export const authenticateUser = () =>
  api.get<{ success: boolean; message: string; user: User }>(
    "/user/authenticate-user",
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

export const getFile = ( fileId : any ) => api.get<{success: boolean; message: string; file: File}>(
  `/files/get-file/${fileId}`
)

export const getAllFilesOfUser = (userId: string) => api.get<{success: boolean; message: string; files: File[]}>(
  `/files/get-all-files/${userId}`
)

export const getAllFoldersOfUser = (userId: string) => api.get<{success: boolean; message: string; folders: Folder[]}>(
  `/folders/get-all-folders/${userId}`
)


export const googleAuthentication = (code: any) =>
  api.post<GoogleAuthResponse>('/user/google-auth', { code });
