import { useState, useEffect, useRef } from "react";
import { BallTriangle } from "react-loader-spinner";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Button from "./Button/Button";
import Loader from "./Loader/Loader";

export default function App() {

  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // const prevPage = usePrevious(page);
  // const prevInput = usePrevious(input);
  // const prevGallery = usePrevious(gallery);

  const onSubmit = (q) => {
    // console.log("onSubmit()... ", q);
    setGallery([]);
    setPage(1);
    setTotalPages(null);
    setInput(q);
    setError(null);
    setIsLoading(false);
  }

  const loadMore = () => { 
    // console.log("loadMore()... ", page);
    if (!error && page < totalPages) {
      setPage(prev => prev + 1);
    }
  }

  const setupGallery = () => { 
    
    setIsLoading(true);

    Loader(input, page)
      .then(({ gallery, totalPages }) => {
        // console.log("Loader(setTotalPages)... ", totalPages);
        setTotalPages(totalPages);
        // console.log("Loader(setGallery)... ", gallery);
        setGallery(prev => [...prev, ...gallery]);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });

  }

  useEffect(() => {
      // console.log("USE_EFFECT(new input detected)... ", input);    
    if (!input) return;

    setupGallery();

  }, [input, page]);
  
    // console.log("render()... ", this.state.gallery);
    // const { gallery, page, totalPages, input, error, isLoading } = state;
    const isButton = !!gallery.length && page < totalPages;
    // console.log("render(isButton)... ", isButton);
    
    return (
      <div className="App">
        <Searchbar onSubmit={onSubmit} lastSearch={input} />
        {error ? (<p> No images found. Please use other criteria </p>) : (
          <>
            <ImageGallery gallery={gallery}/>
            {isLoading ? (
              <BallTriangle heigth="50" width="50" color="red" />
            ) : (
              <>  
                {isButton && <Button loadMore={loadMore} />}  
              </>
            )}
          </>
        ) }
      </div>
    );
  

};

const usePrevious = (value) => { 
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

