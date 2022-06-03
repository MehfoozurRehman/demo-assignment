import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { GraphQLClient, gql } from "graphql-request";
import "./App.css";
import Header from "./components/Header";
import List from "./components/List";

const queryClient = new QueryClient();

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const [listData, setListData] = useState([]);
  const endpoint = "https://api.github.com/graphql";

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: "Bearer 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",
      "User-Agent": "Awesome-Octocat-App",
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
  }
  useEffect(() => {
    getData();
  }, []);

  function onSearch() {
    if (searchQuery !== "") {
      setListData(
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
        <List listData={listData} />
      </div>
    </QueryClientProvider>
  );
}
