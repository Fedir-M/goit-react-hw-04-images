import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import s from './App.module.css';

export const App = () => {
  const [query, setQuery] = useState('');

  const changeQuery = query => {
    setQuery(query);
  };

  return (
    <div className={s.App}>
      <Searchbar onSubmit={changeQuery} />
      <ImageGallery query={query} />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};
