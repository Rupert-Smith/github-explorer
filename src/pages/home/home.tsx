import styles from "./_home.module.scss";
import { RoundedCard } from "common/rounded-card/rounded-card";
import { useState } from "react";
import { API_LINK } from "store/constants";

function Home() {
  const [searchResults, setSearchResults] = useState(null);

  return (
    <div className={styles["home-main-container"]}>
      <div className={styles["content"]}>
        <h1>Github Explorer</h1>
        <SearchBar setSearchResults={setSearchResults} />
        <Results searchResults={searchResults} />
      </div>
    </div>
  );
}

type SearchBarTypes = {
  setSearchResults: Function;
};

function SearchBar({ setSearchResults }: SearchBarTypes) {
  const [searchText, setSearchText] = useState("");

  async function handleSearch() {
    try {
      const response = await fetch(API_LINK, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const responseJson = await response.json();
      let results = responseJson;

      if (searchText !== "") {
        results = results.filter((obj: any) => {
          return Object.values(obj).some((val: any) => {
            if (typeof val === "string" && val.includes(searchText)) {
              return true;
            }
          });
        });
      }
      setSearchResults(results);
      console.log(results);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className={styles["search-bar"]}
    >
      <input
        type="text"
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
        value={searchText}
        placeholder="Search repositories..."
      />
      <button
        type="submit"
        onClick={() => {
          handleSearch();
        }}
      >
        <div>Search</div>
      </button>
    </form>
  );
}

type ResultsTypes = {
  searchResults: any;
};

function Results({ searchResults }: ResultsTypes) {
  console.log(searchResults);

  return (
    <div className={styles["results-container"]}>
      {searchResults?.map((repository: any) => {
        return (
          <RoundedCard
            key={repository.id}
            propsClassName={styles["results-card"]}
          >
            <div
              className={`${styles["card-column"]} ${styles["repository-image"]}`}
            >
              <img
                src={repository.owner.avatar_url}
                alt={repository.owner.login}
              />
            </div>
            <div
              className={`${styles["card-column"]} ${styles["repository-user"]}`}
            >
              {repository.owner.login}
            </div>
            <div
              className={`${styles["card-column"]} ${styles["repository-name"]}`}
            >
              {repository.name}
            </div>
            <div
              className={`${styles["card-column"]} ${styles["repository-url"]}`}
            >
              {repository.html_url}
            </div>
            <div
              className={`${styles["repository-description"]} ${styles["card-column"]}`}
            >
              {repository.description}
            </div>
          </RoundedCard>
        );
      })}
    </div>
  );
}

export { Home };
