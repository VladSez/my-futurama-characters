import React, { useState } from "react";
import "./App.css";
import Fuse from "fuse.js";
import Highlight from "react-highlighter";

import characters from "./characters.json";

const options = {
  shouldSort: true,
  includeMatches: true,
  threshold: 0.3,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  findAllMatches: true,
  keys: ["name", "company", "species"]
};

function App() {
  const [query, updateQuery] = useState("");

  const fuse = new Fuse(characters, options);

  const results = fuse.search(query);
  const characterResults = query
    ? results.map((character) => character.item)
    : characters;

  function onSearch({ currentTarget }) {
    updateQuery(currentTarget.value);
  }

  return (
    <>
      <header className="App-header">
        <div className="container">
          <h1>Futurama Characters</h1>
        </div>
      </header>

      <main className="container">
        <ul className="characters">
          {characterResults.map((character) => {
            const { name, company, species, thumb } = character;
            return (
              <li key={name + 1} className="character">
                {/* <Highlight search={query} style={{ fontWeight: "bold" }}>
                  {name}
                </Highlight> */}

                <span
                  className="character-thumb"
                  style={{
                    backgroundImage: `url(${thumb})`
                  }}
                />
                <ul className="character-meta">
                  <li>
                    <Highlight search={query} style={{ fontWeight: "bold" }}>
                      {name}
                    </Highlight>
                  </li>
                  <li>
                    <Highlight search={query} style={{ fontWeight: "bold" }}>
                      {company}
                    </Highlight>
                  </li>
                  <li>
                    <strong>Species:</strong> {species}
                  </li>
                </ul>
              </li>
            );
          })}
        </ul>
        <aside>
          <form className="search">
            <label>Search</label>
            <input type="text" value={query} onChange={onSearch} />
          </form>
        </aside>
      </main>

      <footer>
        <div className="container">
          <p>
            Images from <a href="http://www.cc.com/shows/futurama">Futurama</a>{" "}
            via <a href="https://futurama.fandom.com/">futurama.fandom.com</a>
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
