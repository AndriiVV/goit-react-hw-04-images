import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";


const ImageGallery = ({gallery}) => (
  <ul className="ImageGallery">
    {gallery.map(({id, webformatURL, largeImageURL}) => (
      <ImageGalleryItem key={id} imgURL={webformatURL} largeImg={ largeImageURL}/>
    ))}
  </ul>
);

export default ImageGallery;

