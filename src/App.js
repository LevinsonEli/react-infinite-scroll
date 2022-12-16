import React, { useState, useEffect, useRef  } from 'react'
import { FaSearch } from 'react-icons/fa'
import Photo from './Photo'

const mainUrl = `https://api.unsplash.com/photos/`
const searchUrl = `https://api.unsplash.com/search/photos/`

function App() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [url, setUrl] = useState(`${mainUrl}?client_id=${process.env.REACT_APP_ACCESS_KEY}&page=1`);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      const newPhotos = query ? data.results : data;
      setPhotos(prev => {
        if (page === 1)
          return newPhotos;
        else
          return [...prev, ...newPhotos];
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (query)
      setUrl(`${searchUrl}?client_id=${process.env.REACT_APP_ACCESS_KEY}&page=${page}&query=${query}`);
    else
      setUrl(`${mainUrl}?client_id=${process.env.REACT_APP_ACCESS_KEY}&page=${page}`)
  }, [page])

  useEffect(() => {
    fetchImages();
  }, [url]);

  useEffect(() => {
    const event = window.addEventListener('scroll', () => {
      if (!loading && window.innerHeight + window.scrollY + 2 >= document.body.scrollHeight)
        setPage((prev) => prev + 1);
    });

    return () => window.removeEventListener('scroll', event);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
  }

  return (
    <main>
      <section className='search'>
        <form action='' className='search-form'>
          <input
            type='text'
            placeholder='search'
            className='form-input'
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
          <button type='submit' className='submit-btn' onClick={handleSubmit}>
            <FaSearch />
          </button>
        </form>
      </section>
      <section className='photos'>
        <div className='photos-center'>
          {photos.map((photo) => {
            return <Photo key={photo.id} {...photo} />;
          })}
        </div>
        {loading && <h2 className='loading'>Loading...</h2>}
      </section>
    </main>
  );
}

export default App
