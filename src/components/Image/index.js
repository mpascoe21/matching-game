import React from 'react';

const Image = ({ src, alt, title, className, fallback }) => {
    return (
        <picture>
          <source srcSet={src + '.webp'} type="image/webp"/>
          <source srcSet={src + '.' + (fallback ? fallback : 'png')} type={fallback ? 'image/' + fallback : 'image/png'}/>
          <img src={src + '.' + (fallback ? fallback : 'png')} alt={alt} title={title} className={className} />
        </picture>
    );
}

export default Image;
