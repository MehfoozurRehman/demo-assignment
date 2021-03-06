import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { GraphQLClient, gql } from "graphql-request";
import Header from "./components/Header";
import List from "./components/List";
import "./App.css";

const queryClient = new QueryClient();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [listAfterFilter, setListAfterFilter] = useState([]);
  const [listData, setListData] = useState([]);

  const endpoint = "https://api.github.com/graphql";

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      // "User-Agent": "Awesome-Octocat-App",
    },
  });

  const query = gql`
    query {
      viewer {
        repositories(first: 100) {
          totalCount
          nodes {
            nameWithOwner
            createdAt
            updatedAt
            homepageUrl
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    }
  `;

  async function getData() {
    const data = await graphQLClient.request(query);
    setListData(data.viewer.repositories.nodes);
    setListAfterFilter(data.viewer.repositories.nodes);
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  function onSearch(e) {
    e.preventDefault();
    if (searchQuery !== "") {
      setListAfterFilter(
        listData.filter(
          (item) =>
            item.nameWithOwner.includes("MehfoozurRehman") &&
            item.nameWithOwner
              .replace("MehfoozurRehman/", "")
              .replace(/-/g, "")
              .replace(/_/g, "")
              .toLowerCase()
              .includes(searchQuery)
        )
      );
    } else {
      getData();
    }
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div data-testid="appToShow" className="container">
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={onSearch}
        />
        <ul>
          {loading ? (
            <div style={{ textAlign: "center" }}>Loading...</div>
          ) : (
            <List listData={listAfterFilter} />
          )}
        </ul>
      </div>
    </QueryClientProvider>
  );
}
