import React from 'react'

const Photo = ({ urls, alt_description, likes, user }) => {
  const image_url = urls.regular;
  const {
    user_name: name,
    portfolio_url,
    profile_image: { medium },
  } = user; 

  return (
    <article className='photo'>
      <img src={image_url} alt={alt_description} />
      <div className='photo-info'>
        <div>
          <h4>{name}</h4>
          <p>{likes}</p>
        </div>
        <a href={portfolio_url}>
          <img src={medium} alt={name} className='user-image' />
        </a>
      </div>
    </article>
  );
}

export default Photo
