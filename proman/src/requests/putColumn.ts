import { Requests } from './../types/enums';
import axios from 'axios';

type UpdateColumn = {
  title: string;
  order: number;
};

const putColumn = async (
  token: string,
  boardId: string,
  columnId: string,
  updateColumn: UpdateColumn
) => {
  await axios.put(`${Requests.BOARDS}/${boardId}/columns/${columnId}`, updateColumn, {
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export default putColumn;
