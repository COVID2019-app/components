import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { getCountryList } from "../store/actions";

var headers = [
  {
    name: "Territories",
    color: "black",
    colspanNum: "1"
  },
  {
    name: "Confirmed_case",
    color: "blue",
    colspanNum: "1"
  },
  {
    name: "deaths",
    color: "red",
    colspanNum: "2"
  },
  {
    name: "recovered",
    color: "green",
    colspanNum: "2"
  },
  {
    name: "severe/critical",
    color: "purple",
    colspanNum: "2"
  },
  {
    name: "Tested",
    color: "grey",
    colspanNum: "1"
  },
  {
    name: "Active Cases",
    color: "#e69900",
    colspanNum: "2"
  }
];

function Home(props) {
  
  // interactions with Redux Store
  const { getCountryList, country, isFetching } = props;

  
  useEffect(() => {
    getCountryList();
  }, []);

  return (
    <TableContainer>
      <thead>
        <tr>
          {headers.map(heading => (
            <th
              colSpan={heading.colspanNum}
              style={{
                color: heading.color,
                border: "1px solid #ddd",
                padding: "8px",
                position: "sticky",
                top: "0",
                background: "skyblue"
              }}
            >
              {heading.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {country.map(item => (
          <tr>
            <Tabletd>{item.country_name}</Tabletd>
            <Tabletd>
              {item.confirmed_cases
                .toString()
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
            </Tabletd>
            <Tabletd style={{ color: "red" }}>
              {item.deaths.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
            </Tabletd>
            <Tabletd
              style={{
                background: `rgba(255, 0, 0, ${item.deaths /
                  item.confirmed_cases})`
              }}
            >
              {((item.deaths / item.confirmed_cases) * 100).toFixed(2)}%
            </Tabletd>
            <Tabletd style={{ color: "green" }}>
              {item.recovered
                .toString()
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
            </Tabletd>
            <Tabletd
              style={{
                background: `rgba(0,128,0, ${item.recovered /
                  item.confirmed_cases})`
              }}
            >
              {((item.recovered / item.confirmed_cases) * 100).toFixed(2)}%
            </Tabletd>
            <Tabletd style={{ color: "purple" }}>
              {item.severe_critical
                .toString()
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
            </Tabletd>
            <Tabletd
              style={{
                background: `rgba(128,0,128, ${item.severe_critical /
                  item.confirmed_cases})`
              }}
            >
              {((item.severe_critical / item.confirmed_cases) * 100).toFixed(2)}
              %
            </Tabletd>
            <Tabletd style={{ color: "grey" }}>
              {item.tested.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
            </Tabletd>
            <Tabletd style={{ color: "#e69900" }}>
              {item.active_cases
                .toString()
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
            </Tabletd>
            <Tabletd
              style={{
                background: `rgba(255, 171, 0, ${item.active_cases /
                  item.confirmed_cases})`
              }}
            >
              {((item.active_cases / item.confirmed_cases) * 100).toFixed(2)}%
            </Tabletd>
          </tr>
        ))}
      </tbody>
    </TableContainer>
  );
}
const mapStateToProps = state => {
  return {
    isFetching: state.isFetching,
    country: state.country
  };
};
export default connect(mapStateToProps, {
  getCountryList
})(Home);

const TableContainer = styled.table`
  max-width: 1200px;
  margin: 20px auto 50px auto;
  position: relative;
  border-collapse: collapse;
`;

const Tabletd = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  text-align:center;
`;

