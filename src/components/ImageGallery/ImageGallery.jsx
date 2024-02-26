import { useEffect, useState } from 'react';
import { fetchImages } from '../../services/imagesApi';
import ImageGalleryItem from 'components/ImageGalleryItem';
import s from './ImageGallery.module.css';
import NotFound from 'components/NotFound';
import Loader from 'components/Loader';
import Button from 'components/Button';
import Modal from 'components/Modal';

const ImageGallery = props => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [largeImage, setLargeImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const [isModal, setIsModal] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setQuery(props.query);
    setPage(1);
    setPerPage(12);
  }, [props.query]);

  useEffect(() => {
    if (query) {
      async function getImages() {
        setIsLoading(true);
        setError('');
        try {
          const data = await fetchImages(query, page);

          if (data.totalHits === 0) {
            throw new Error(`Sorry, no images for ${query}`);
          }

          setImages(prev => (page === 1 ? data.hits : [...prev, ...data.hits]));
          setTotalHits(data.totalHits);
        } catch (error) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      }
      getImages();
    }
  }, [query, page]);

  const onChangePage = () => {
    setPage(prev => prev + 1);
  };

  const setLargeImg = largeImg => {
    setLargeImage(largeImg);
  };

  const toggleMOdal = () => {
    setIsModal(prev => !prev);
  };

  const totalPage = Math.ceil(totalHits / perPage);

  return (
    <div className={s.galleryWrapper}>
      {error ? (
        <NotFound error={error} />
      ) : (
        <div className={s.ImageGallery}>
          {images.length > 0 &&
            images.map((item, idx) => (
              <ImageGalleryItem
                key={idx}
                img={item.webformatURL}
                setlargeImage={setLargeImg}
                alt={item.tags}
                id={item.id}
                showModal={toggleMOdal}
                data={item.largeImageURL}
              />
            ))}
          {isModal && (
            <Modal getLargeImg={largeImage} closeModal={toggleMOdal} />
          )}
        </div>
      )}
      {isLoading && <Loader />}
      {totalHits > perPage && totalPage > page && (
        <Button changePage={onChangePage} />
      )}
    </div>
  );
};

export default ImageGallery;
