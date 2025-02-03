import axiosInstance from "./AxiosInstance";

// Fetch all notes
export const getNotes = async () => {
  const response = await axiosInstance.get("/notes");
  return response.data;
};

// Create a new note
export const createNote = async (note) => {
  const response = await axiosInstance.post("/notes", note);
  return response.data;
};

// Update an existing note
export const updateNote = async (id, note) => {
  const response = await axiosInstance.put(`/notes/${id}`, note);
  return response.data;
};

// Delete a note by ID
export const deleteNote = async (id) => {
  const response = await axiosInstance.delete(`/notes/${id}`);
  return response.data;
};
