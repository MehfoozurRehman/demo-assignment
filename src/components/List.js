import React from "react";
import { parseDate } from "../utils/parseDate";

export default function List({ listData }) {
  return (
    <>
      {listData && listData.length === 0 ? (
        <div style={{ textAlign: "center", color: "red" }}>No Match Found</div>
      ) : (
        listData.map((item) => (
          <li key={JSON.stringify(item)}>
            <div>
              Repo Name:{" "}
              {item.nameWithOwner
                .replace("MehfoozurRehman/", "")
                .replace(/-/g, " ")
                .replace(/_/g, " ")}
            </div>
            <div>Created at: {parseDate(item.createdAt)}</div>
            <div>{parseDate(item.updatedAt)}</div>
            <a href={item.homepageUrl}>{item.homepageUrl}</a>
          </li>
        ))
      )}
    </>
  );
}
