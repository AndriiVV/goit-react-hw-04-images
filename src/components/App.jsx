import { Component } from "react";
import { BallTriangle } from "react-loader-spinner";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Button from "./Button/Button";
import { Loader } from "./Loader/Loader";


class App extends Component {

  state = {
    gallery: [],
    page: null,
    totalPages: null,
    input: "",
    error: null,
    isLoading: false,
  };

  onSubmit = (q) => {
    // console.log("onSubmit()... ", q, " => ", this.state);
    this.setState({ input: q, page: 1, gallery: [], totalPages: null, error: null, });
  }

  loadMore = () => { 
    // console.log("loadMore()... ", this.state.error);
    if (!this.state.error && this.state.page < this.state.totalPages) {
      this.setState((prev) => ({page: prev.page + 1}));
    }
  }

  setGallery = () => { 
    this.setState({isLoading: true});
    const { page, input } = this.state;

    Loader(input, page)
      .then(({gallery, totalPages}) => this.setState((prev) => ({
        gallery: [...prev.gallery, ...gallery], totalPages,
      })))
      .catch((err) => this.setState({ error: err.message }))
      .finally(() => this.setState({ isLoading: false }));

  }

  componentDidUpdate(prevProps, prevState) { 
    const { page, input } = this.state;
    // console.log("componentDidUpdate()... ", prevState.page, " => ", this.state.page);
    // console.log("componentDidUpdate()... ", prevState.input, " => ", this.state.input);
    // if (input === "") return;
    if (prevState.page !== page || prevState.input !== input) { 
      // console.log("New page or input detected!");
      this.setGallery();
    }
  }

  render() { 
    // console.log("render()... ", this.state.gallery);
    const { gallery, page, totalPages, input, error, isLoading } = this.state;
    const isButton = !!gallery.length && page < totalPages;
    // console.log("render(isButton)... ", isButton);
    return (
      <div className="App">
        <Searchbar onSubmit={this.onSubmit} lastSearch={input} />
        {error ? (<p> No images found. Please use other criteria </p>) : (
          <>
            <ImageGallery gallery={gallery}/>
            {isLoading ? (
              <BallTriangle heigth="50" width="50" color="red" />
            ) : (
              <>  
                {isButton && <Button loadMore={this.loadMore} />}  
              </>
            )}
          </>
        ) }
      </div>
    );
  }

};

export default App;
