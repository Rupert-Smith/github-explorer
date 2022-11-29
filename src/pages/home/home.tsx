import styles from "./_home.module.scss";
import { RoundedCard } from "common/rounded-card/rounded-card";
import { useState } from "react";
import { API_LINK, TOTAL_RESULTS_PER_PAGE } from "store/constants";
import { Pagination } from "@mui/material";

function Home() {
  const [searchResults, setSearchResults] = useState([]);
  let paginationResults: any = searchResults;
  const [searchMade, setSearchMade] = useState(false);
  const [page, setPage] = useState(1);

  if (paginationResults.length > TOTAL_RESULTS_PER_PAGE) {
    const begin = (page - 1) * TOTAL_RESULTS_PER_PAGE;
    const end = begin + TOTAL_RESULTS_PER_PAGE;
    paginationResults = searchResults.slice(begin, end);
  }

  const displayResults = paginationResults.length !== 0;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className={styles["home-main-container"]}>
      <div className={`${styles["content"]}`}>
        <h1>Github Explorer</h1>
        <SearchBar
          setSearchMade={setSearchMade}
          setSearchResults={setSearchResults}
        />
        {displayResults && (
          <>
            <Results searchResults={paginationResults} />
            <Pagination
              className={"pagination"}
              page={page}
              count={Math.ceil(searchResults.length / TOTAL_RESULTS_PER_PAGE)}
              shape="rounded"
              variant="outlined"
              onChange={(_, newPage) => {
                handlePageChange(newPage);
              }}
            />
          </>
        )}
        {searchMade && !displayResults && (
          <div className={styles["no-results"]}>No repositories found.</div>
        )}
      </div>
    </div>
  );
}

type SearchBarTypes = {
  setSearchResults: Function;
  setSearchMade: Function;
};

function SearchBar({ setSearchResults, setSearchMade }: SearchBarTypes) {
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
      setSearchMade(true);
      setSearchResults(results);
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
