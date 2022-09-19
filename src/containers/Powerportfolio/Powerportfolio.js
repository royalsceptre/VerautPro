/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useMemo } from "react";
// import { Link } from "react-router-dom";
import { toastr } from "react-redux-toastr";
import ApiHelper from "../../helpers/apiHelper";
import EditPortfolioModal from "./EditPortfolioModal";
import { confirm } from "../../helpers/commonHelper";
import * as variable from "../../variables/variables";
// import {  ColumnDirective, ColumnsDirective, GridComponent, Inject, Sort, Page, Search, Toolbar } from '@syncfusion/ej2-react-grids';
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import Modal from '@mui/material/Modal';
import styled from "styled-components";
import { Container, Row, Col } from 'react-bootstrap';
import {
  useTable,
  useFilters,
  useGlobalFilter

} from "react-table";
import "./portfolio.css";

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid rgb(29, 31, 37);
    width: 100%;
    background: #3F4046;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    tr:nth-child(1) {
      display: none;
    }
    tr:nth-child(3) {
      display: none;
    }
    tr > *:nth-child(1) {
      min-width: 50px;
      text-align: center;
    }
    tr > *:nth-child(2) {
      min-width: 150px;
      text-align: center;
    }
    tr > *:nth-child(3) {
      min-width: 150px;
      text-align: center;
    }
    tr > *:nth-child(4) {
      min-width: 100px;
      text-align: center;
    }
    tr > *:nth-child(5) {
      min-width: 120px;
      text-align: center;
    }
    tr > *:nth-child(6) {
      text-align: center;
      min-width: 120px
    }
    tr > *:nth-child(7) {
      min-width: 60px;
      text-align: center;
    }
    tr > *:nth-child(8) {
      min-width: 160px;
      text-align: center;
    }
    tr > *:nth-child(9) {
      min-width: 160px;
      text-align: center;
    }
    tr > *:nth-child(10) {
      min-width: 100px;
      text-align: center;
    }
    th {
      font-size: 15px;
      margin: 0;
      padding-top: 5px;
      padding-bottom: 5px;
      border-bottom: 10px solid rgb(29, 31, 37);
      border-right: 2px solid rgb(29, 31, 37);
      text-align: center;
      :last-child {
        border-right: 0;
      }
    }
    td {
      margin: 0;
      font-size: 14px;
      font-family: poppins-semibold;
      border-bottom: 10px solid rgb(29, 31, 37);
      border-right: 2px solid rgb(29, 31, 37);
      :last-child {
        border-right: 0;
      }
    }
  }
`;


function Table({ columns, data }) {
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
              .toLowerCase()
              .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      }
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes
    },
    useFilters, // useFilters!
    useGlobalFilter // useGlobalFilter!
  );

  // We don't want to render all of the rows for this example, so cap
  // it for this use case
  const firstPageRows = rows.slice(0, 10);

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render("Header")}
                  {/* Render the columns filter UI */}
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
          <tr>
            <th
              colSpan={visibleColumns.length}
              style={{
                textAlign: "left"
              }}
            >
            </th>
          </tr>
        </thead>
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map((row, _i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

function fuzzyTextFilterFn(_rows, _id, _filterValue) {
}

function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter }
}) {
  return (
    <>
    </>
  );
}


const PowerPortfolio = () => {
  const [domainList, setDomainList] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [checked, setChecked] = useState([]);


  useEffect(() => {
    getDomainList();
  }, []);

  const getDomainList = () => {
    ApiHelper.get(variable.API_URL + '/api/domains/?page=1&limit=1000').then(res => {
      setDomainList(res.data.domains);
    });
  }


  const openEditModal = (e, data) => {
    e.stopPropagation();
    // alert();
    console.log(data);
    setShowEditModal(true);
    setSelectedDomain(data);
  };

  const handleEditDomain = domain => {
    getDomainList();
    setShowEditModal(false);
  };

  const handleDeleteDomain = (e, domainID) => {
    e.stopPropagation();
    console.log(domainID.original);
    confirm('Are you sure you want to delete this domain?', {
      title: 'Delete Domain'
    }).then(() => {
      ApiHelper.delete(`${variable.API_URL}/api/domains/${domainID}/`)
        .then(res => {
          getDomainList()

          toastr.success('Success!', 'Domain was successfully deleted.');
        }).catch(err => {
          console.log(err);
          toastr.error('Fail!', 'Failed to delete domain.');
        });
    });
  };

  const handleSingleCheckboxChange = (data) => {
    console.log(data);
  }

  const handleChange = () => {
    setSelectAll(false);
    setChecked([]);
  }


  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const columns = useMemo(
    () => [
      {
        Header: "Powerportfolio",
        columns: [
          {
            Header: (
              <input
                type="checkbox"
                onChange={handleChange}
                checked={selectAll}
              />
            ),
            accessor: " ",
            Cell: row => (
              <input
                type="checkbox"
                defaultChecked={checked[row.index]}
                checked={checked[row.index]}
                onChange={() => handleSingleCheckboxChange(row.index)}
              />
            ),
            sortable: false,
            filterable: false
          },
          {
            Header: "Domain Names",
            accessor: "domain_name",
            Cell: ({row}) => (
              <a href={`/landing/${row.original.id}`}>{row.original.domain_name}</a>
            )
          },
          {
            Header: "Business Status",
            accessor: "business_status",
          },
          {
            Header: "Price",
            accessor: "seller_price",
          },
          {
            Header: "Min Offer",
            accessor: "min_offer"
          },
          {
            Header: "Trade Option",
            accessor: "trade_option"
          },
          {
            Header: "Visits",
            accessor: "visits"
          },
          {
            Header: "Video Pitch Leads",
            accessor: "video_pitch_leads"
          },
          {
            Header: "Startup Breeders",
            accessor: "startup_breeders"
          },
          {
            Header: "Actions",
            accessor: "id",
            Cell: ({ row }) => (
              <div style={{ textAlign: "center"}}>
                <button className="viewBtn butn-1" onClick={(e) => openEditModal(e, row)}>
                  <i className="fa fa-edit fa-lg" ></i>
                </button>
                <button className="viewBtn butn-1" onClick={e => handleDeleteDomain(e, row.id)} >
                  <i className="fa fa-trash fa-lg"></i>
                </button>
              </div>
            )
          }
        ]
      }
    ]
  )


  return (
    <React.Fragment>
      <div className="pagination-wrapper">
        <Styles>
          <Container fluid style={{ background: "#1D1F25", borderRadius: "15px", marginTop: "3%", padding: "10px 30px" }}>
            <h2 className="breed">Power Portfolio</h2>
            <Row>
              <Col xs='12' style={{ overflow: "auto" }}>
                <Table columns={columns} data={domainList} style={{ width: "100%!important" }} />
              </Col>
            </Row>
            {showEditModal ?
              <EditPortfolioModal
                show={showEditModal}
                onHide={() => setShowEditModal(false)}
                domain={selectedDomain}
                onSubmit={handleEditDomain}
              /> : <React.Fragment></React.Fragment>
            }
          </Container>
        </Styles>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      </Modal>
    </React.Fragment>
  )
}
export default PowerPortfolio;