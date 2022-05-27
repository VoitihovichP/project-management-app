export type RegistrationFormInputs = {
  [name: string]: string;
  login: string;
  password: string;
};

export type Task = {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId?: string;
  columnId?: string;
  files: [
    {
      filename: string;
      fileSize: number;
    }
  ];
};
