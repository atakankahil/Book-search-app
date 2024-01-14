import axios from "axios";
const BASE_URL = 'http://localhost:3000';

const api = axios.create({
    baseURL : BASE_URL
})

export const getGenre = () => api.get('/auth/genre');
export const postBook = (bookData) => api.post('/auth/add_book', bookData);
export const addGenre = (genreData) => api.post('/auth/add_genre',genreData);
export const getBook = () => api.get('/auth/book');
export const getBookDetail = (id) => api.get('/book/detail/'+id);
export const editGetBookDetail = (id) => api.get('/auth/book/'+id);
export const deleteBook = (id) => api.delete('/auth/delete_book/'+id);
export const dashboardLogout = () => api.get('/auth/logout');
export const BookCount = () => api.get('/auth/book_count');
export const searchBooksByQuery = (query) => api.get(`/auth/search_books${query ? `?search=${encodeURIComponent(query)}` : ''}`);
export const ownerLogin = (values) => api.post('/auth/ownerlogin', values);
export const verifyOwner = () => api.get('/verify');
export const editPutBookDetail = (id, book) => api.put('/auth/edit_book/'+id, book);
export const editPutGenreQuery = (id, genreName) => api.put(`/auth/edit_genre/${id}`, { name: genreName });