import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AddressDropdown from './AddressDropdown';

const MarketAnalysis = () => {
  const [listings, setListings] = useState([]);
  const [allListings, setAllListings] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [addressList, setAddressList] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('/Listing.csv');
      const csvData = await response.text();
      const parsedData = parseCSV(csvData);
      setListings(parsedData);
      setAllListings(parsedData);
      setHeaders(
        Object.keys(parsedData[0]).filter(
          (header) => header !== 'latitude' && header !== 'longitude'
        )
      );
      const addresses = [
        ...new Set(parsedData.map((a) => a['Street Address'])),
      ];
      setAddressList(addresses);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const parseCSV = (csvData) => {
    const rows = csvData.split('\n');
    const headers = rows[0].split(',');
    const parsedData = rows.slice(1).map((row) => {
      const rowData = row.split(',');
      return headers.reduce((obj, header, index) => {
        obj[header] = rowData[index];
        return obj;
      }, {});
    });
    return parsedData;
  };

  function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
  }

  function findNearbyAreas(targetLat, targetLon, dataArray, radius) {
    const nearbyAreas = [];
    for (const obj of dataArray) {
      const distance = getDistance(
        targetLat,
        targetLon,
        obj.latitude,
        obj.longitude
      );
      if (distance <= radius) {
        nearbyAreas.push(obj);
      }
    }
    return nearbyAreas;
  }

  const addressSelect = (address) => {
    const filteredData = listings.find(
      (item) => item['Street Address'] === address
    );
    const nearby = findNearbyAreas(
      filteredData.latitude,
      filteredData.longitude,
      listings,
      10
    );
    setListings(nearby);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container className="mt-5">
      <Row className="py-4">
        <h2 style={{ textAlign: 'center', color: 'black' }}>
          Competitive Market Analysis
        </h2>
      </Row>

      {listings.length > 0 && (
        <React.Fragment>
          <Row className="mb-2">
            <Col md={4}>
              <AddressDropdown
                items={addressList}
                selectCallback={addressSelect}
              ></AddressDropdown>
            </Col>
            <Col md={4}></Col>
            <Col md={4} style={{ textAlign: 'end', color: 'rgb(84, 92, 129)' }}>
              Showing <b>{listings.length}</b> of <b>{allListings.length}</b>{' '}
              records
            </Col>
            <Row>
              <p className="mx-2" style={{ color: 'gray' }}>
                Type the address to search nearby homes within 5 km radius
              </p>
            </Row>
          </Row>

          <div style={{ overflowX: 'auto', backgroundColor: '#f8f9fa' }}>
            <table style={{ whiteSpace: 'nowrap', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', padding: '10px' }}>
                  {headers.length > 0 &&
                    headers.map((columnHeader, index) => (
                      <th
                        style={{
                          marginRight: '20px',
                          padding: '5px',
                          border: '1px solid #dee2e6',
                        }}
                        key={index}
                      >
                        {columnHeader}
                      </th>
                    ))}
                  <th
                    style={{
                      marginRight: '20px',
                      padding: '5px',
                      border: '1px solid #dee2e6',
                    }}
                    key={'pricePerSqft'}
                  >
                    {'Price per sqft'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {listings.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    style={{
                      padding: '10px',
                      backgroundColor:
                        rowIndex % 2 === 0 ? '#f8f9fa' : '#e9ecef',
                    }}
                  >
                    {Object.keys(row)
                      .filter(
                        (key) => key !== 'latitude' && key !== 'longitude'
                      )
                      .map((columnKey, columnIndex) => {
                        return (
                          <td
                            style={{
                              marginRight: '20px',
                              padding: '5px',
                              border: '1px solid #dee2e6',
                            }}
                            key={columnIndex}
                          >
                            {columnKey === 'Listing Price'
                              ? Number(row['Listing Price'])
                                  .toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                  })
                                  .slice(0, -3)
                              : row[columnKey]}
                          </td>
                        );
                      })}
                    <td
                      style={{
                        marginRight: '20px',
                        padding: '5px',
                        border: '1px solid #dee2e6',
                      }}
                      key={'pricePerSqft'}
                    >
                      {(row['Listing Price'] / row['sqft']).toLocaleString(
                        'en-US',
                        {
                          style: 'currency',
                          currency: 'USD',
                        }
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </React.Fragment>
      )}
    </Container>
  );
};

export default MarketAnalysis;
