import { Requests } from './../types/enums';
import axios from 'axios';

type UpdateTask = {
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
};

const putTicket = async (
  token: string,
  boardId: string,
  columnId: string,
  taskId: string,
  updateTask: UpdateTask
) => {
  await axios.put(`${Requests.BOARDS}/${boardId}/columns/${columnId}/tasks/${taskId}`, updateTask, {
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export default putTicket;
