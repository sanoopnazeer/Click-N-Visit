import React, { useEffect, useState } from "react";
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import AddCategory from "./AddCategory";
import DataTable from "react-data-table-component";
import { deleteCategory, getCategories } from "../../../axios/services/AdminServices";

const Categories = () => {
  const [basicActive, setBasicActive] = useState("tab1");
  const [categories, setCategories] = useState([])
  const [add, setAdd] = useState('')
  const token = JSON.parse(localStorage.getItem('admin')).token

  const fetchData = async () => {
    const data = await getCategories(token)
    setCategories(data.categoryDetails)
  }

  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
    fetchData();
  }, [add])

  const deleteCat = async (catId) => {
    const data = await deleteCategory(token, catId)
    if(data.status){
        fetchData();
    }
  }

  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }

    setBasicActive(value);
  };

  const columns = [
    {
      name: "Name of Categories",
      selector: (row) => row.category,
    },
    {
      name: "Action",
      selector: (row) => {
        return (
          <div>
            {" "}
              <button
                className="btn btn-danger"
                onClick={() => deleteCat(row._id)}
              >
                DELETE
              </button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="container">
        <div className="row mt-4">
          <h1> CATEGORY MANAGEMENT</h1>
        </div>

        <MDBTabs className="mb-3" style={{ marginTop: "30px" }}>
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleBasicClick("tab1")}
              active={basicActive === "tab1"}
            >
              Doctor
            </MDBTabsLink>
          </MDBTabsItem>
          {/* <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleBasicClick("tab2")}
              active={basicActive === "tab2"}
            >
              Teacher
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleBasicClick("tab3")}
              active={basicActive === "tab3"}
            >
              Trainer
            </MDBTabsLink>
          </MDBTabsItem> */}
        </MDBTabs>

        <MDBTabsContent>
          <MDBTabsPane show={basicActive === "tab1"}>
            {" "}
            <AddCategory onAdding={(newAdd) => setAdd(newAdd)} />
          </MDBTabsPane>
          <MDBTabsPane show={basicActive === "tab2"}>Tab 2 content</MDBTabsPane>
          <MDBTabsPane show={basicActive === "tab3"}>Tab 3 content</MDBTabsPane>
        </MDBTabsContent>

        <DataTable
                columns={columns}
                data={categories}
                fixedHeader
                fixedHeaderScrollHeight="500px"
                selectableRows
                selectableRowsHighlight
                highlightOnHover
                pagination
              />
      </div>
    </>
  );
};

export default Categories;
