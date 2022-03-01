import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export const ListCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [inputs, setInputs] = useState({ name: "", address: "", email: "" });
  const [modal, setModal] = useState({});
  const [alert, setAlert] = useState({ msg: "", class: "" });

  const editCompany = (e) => {
    e.preventDefault();
    axios
      .put(`/api/v1/companies/${inputs.id}`, inputs)
      .then(function (response) {
        setAlert({ msg: "company Edited successfully", class: "alert-info" });
        setTimeout(() => {
          setAlert({});
          document.getElementById("close").click();
        }, 4000);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const addCompany = (e) => {
    e.preventDefault();
    axios
      .post("/api/v1/companies/", inputs)
      .then(function (response) {
        setAlert({ msg: "company added successfully", class: "alert-success" });
        setTimeout(() => {
          setAlert({});
          document.getElementById("closeadd").click();
        }, 4000);
      })
      .catch(function (error) {
        // handle error
        setAlert({ msg: "company Name is taken", class: "alert-danger" });
      });
  };

  useEffect(() => {
    axios
      .get("/api/v1/companies/")
      .then(function (response) {
        setCompanies(response.data.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, [alert]);

  const listData = () => {
    return (
      <>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Company Name</th>
              <th scope="col">
                <button
                  className="btn btn-outline-success"
                  data-toggle="modal"
                  data-target="#addCompany"
                >
                  Add Company
                </button>
              </th>
              <th scope="col">actions</th>
            </tr>
          </thead>
          <tbody>
            {companies?.map((c) => (
              <tr>
                <td key={c.id}>{c.name}</td>
                <td key="addcompany"></td>
                <td key="showdeteils">
                  <button
                    className="btn btn-secondary m-2"
                    data-toggle="modal"
                    data-target="#deteils"
                    onClick={() => {
                      setModal(c);
                    }}
                  >
                    show deteils
                  </button>
                  <button
                    className="btn btn-primary m-2"
                    data-toggle="modal"
                    data-target="#editCompany"
                    onClick={() =>
                      setInputs({
                        id: c.id,
                        email: c.email,
                        address: c.address,
                        name: c.name,
                      })
                    }
                  >
                    Edit
                  </button>
                  <Link to={`/workers/${c.id}`} className="m-2">
                    show List Of workers
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div
          className="modal fade"
          id="editCompany"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addCompanyLabel">
                  Edit {inputs.name}
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className={`alert ${alert.class}`}>
                <p className="mb-0">{alert.msg}</p>
              </div>
              <div className="modal-body">
                <form onSubmit={editCompany}>
                  <div className="form-group">
                    <label htmlFor="company-address" className="col-form-label">
                      Address:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      required={true}
                      value={inputs.address}
                      id="company-address"
                      onChange={(e) => {
                        setInputs({ ...inputs, address: e.target.value });
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="company-email" className="col-form-label">
                      Email:
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="company-email"
                      required={true}
                      value={inputs.email}
                      onChange={(e) => {
                        setInputs({ ...inputs, email: e.target.value });
                      }}
                    />
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                      id="close"
                    >
                      Close
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="addCompany"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addCompanyLabel">
                  New Company
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className={`alert ${alert.class}`}>
                <p className="mb-0">{alert.msg}</p>
              </div>
              <div className="modal-body">
                <form onSubmit={addCompany}>
                  <div className="form-group">
                    <label htmlFor="company-name" className="col-form-label">
                      Name:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="company-name"
                      required={true}
                      onChange={(e) => {
                        setInputs({ ...inputs, name: e.target.value });
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="company-address" className="col-form-label">
                      Address:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      required={true}
                      id="company-address"
                      onChange={(e) => {
                        setInputs({ ...inputs, address: e.target.value });
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="company-email" className="col-form-label">
                      Email:
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="company-email"
                      required={true}
                      onChange={(e) => {
                        setInputs({ ...inputs, email: e.target.value });
                      }}
                    />
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                      id="closeadd"
                    >
                      Close
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="deteils"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="deteilsLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="deteilsLabel">
                  Name: {modal.name}
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <h6 className="modal-title" id="deteilsLabel">
                  <span className="mb-3">Address: </span>
                  {modal.address}
                </h6>
                <h6 className="modal-title" id="deteilsLabel">
                  <span>Email: </span>
                  {modal.email}
                </h6>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return listData();
};
