import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";


const ImageGallery = ({ gallery }) => {
  // console.log("ImageGallery() is running... ", gallery);
  if (!gallery && !gallery.length) return null;
  // console.log("ImageGallery() is running... ", gallery);
  return (
    <ul className="ImageGallery">
      {gallery.map(({ id, webformatURL, largeImageURL }) => (
        <ImageGalleryItem key={id} imgURL={webformatURL} largeImg={largeImageURL} />
      ))}
    </ul>
  );
};

export default ImageGallery;

