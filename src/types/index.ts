export interface File {
  id: string;
  fileName: string;
  content: string;
  parentFolderId: string;
  userId: string;
  parentFolder: Folder;
  owner: User;
  createdAt: Date;
  updatedAt: Date;
  path: string;
}

export interface Folder {
  id: string;
  name: string;
  parentFolderId?: string;
  subFolders: Folder[];
  files: File[];
  parentFolder?: Folder;
  owner: User;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  path: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}
