import { useState } from "react";

export default function Searchbar ({onSubmit, lastSearch}) {

  const [input, setInput] = useState("");

  const handleChange = (e) => { 
    setInput(e.target.value);
  }

  const handleSubmit = (e) => { 
    // const { input } = this.state;
    e.preventDefault();
    if (!input || input === lastSearch) return;
    // console.log("handleSubmit: ", input);
    onSubmit(input);
  }


  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          // autocomplete="off"
          // autofocus
          placeholder="Search images and photos"
          value={input}
          onChange={handleChange}
        />
      </form>
    </header>
  )
  
}
      
  

