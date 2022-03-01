import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const Workers = () => {
  const [workers, setWorkers] = useState([]);
  const [company, setcompany] = useState("");
  const [companies, setCompanies] = useState([]);
  const [inputs, setInputs] = useState({});
  const [alert, setAlert] = useState({ msg: "", class: "" });

  let { id } = useParams();

  const getCompanies = () => {
    axios
      .get("/api/v1/companies/")
      .then(function (response) {
        setCompanies(response.data.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  const addWorker = (e) => {
    e.preventDefault();
    axios
      .post(`/api/v1/people/`, inputs)
      .then(function (response) {
        setAlert({ msg: "Worker Added successfully", class: "alert-success" });
        setTimeout(() => {
          setAlert({});
          document.getElementById("closeadd").click();
        }, 4000);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const editWorker = (e) => {
    e.preventDefault();
    axios
      .put(`/api/v1/people/${inputs.id}`, inputs)
      .then(function (response) {
        setAlert({ msg: "Worker Edited successfully", class: "alert-success" });
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

  const deleteWorker = (id) => {
    axios
      .delete(`/api/v1/people/${id}`)
      .then(function (response) {
        setAlert({
          msg: "Worker was deleted successfully",
          class: "alert-success",
        });
        setTimeout(() => {
          setAlert({});
        }, 4000);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get(`/api/v1/companies/${id}`)
      .then(function (response) {
        setcompany(response.data.data.name);
        setWorkers(response.data.data.people);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, [alert, id]);

  return (
    <>
      {workers.length === 0 ? (
        <div>
          <h4 className="text-center">
            Company : <span className="mx-2">{company}</span> has no workers yet{" "}
          </h4>
          <button
            className="btn btn-outline-success m-3"
            data-toggle="modal"
            onClick={getCompanies}
            data-target="#addWorker"
          >
            Add Worker
          </button>
        </div>
      ) : (
        <div>
          <h4 className="text-center">People who work at : {company}</h4>
          <button
            className="btn btn-outline-success m-3"
            data-toggle="modal"
            onClick={getCompanies}
            data-target="#addWorker"
          >
            Add Worker
          </button>
        </div>
      )}
      <div className={`alert ${alert.class}`}>
        <p className="mb-0">{alert.msg}</p>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Worker Name</th>
            <th scope="col">Address</th>
            <th scope="col">Phone</th>
            <th scope="col">actions</th>
          </tr>
        </thead>
        <tbody>
          {workers?.map((w) => (
            <tr>
              <td key={w.name}>{w.name}</td>
              <td key={w.address}>{w.address}</td>
              <td key={w.phone}>{w.phone}</td>
              <td>
                <button
                  className="btn btn-danger m-2"
                  onClick={() => deleteWorker(w._id)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-primary m-2"
                  data-toggle="modal"
                  data-target="#editWorker"
                  onClick={() =>
                    setInputs({
                      id: w._id,
                      phone: w.phone,
                      address: w.address,
                      name: w.name,
                    })
                  }
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        className="modal fade"
        id="editWorker"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editWorkerLabel">
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
              <form onSubmit={editWorker}>
                <div className="form-group">
                  <label htmlFor="Worker-name" className="col-form-label">
                    Address:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    required={true}
                    value={inputs.name}
                    id="worker-name"
                    onChange={(e) => {
                      setInputs({ ...inputs, name: e.target.value });
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="Worker-address" className="col-form-label">
                    Address:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    required={true}
                    value={inputs.address}
                    id="worker-address"
                    onChange={(e) => {
                      setInputs({ ...inputs, address: e.target.value });
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="worker-phone" className="col-form-label">
                    Email:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="worker-phone"
                    required={true}
                    value={inputs.phone}
                    onChange={(e) => {
                      setInputs({ ...inputs, phone: e.target.value });
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
        id="addWorker"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="addWorkerLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addWorkerLabel">
                New Worker
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
              <form onSubmit={addWorker}>
                <div className="form-group">
                  <label htmlFor="worker-name" className="col-form-label">
                    Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="worker-name"
                    required={true}
                    onChange={(e) => {
                      setInputs({ ...inputs, name: e.target.value });
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="worker-address" className="col-form-label">
                    Address:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    required={true}
                    id="worker-address"
                    onChange={(e) => {
                      setInputs({ ...inputs, address: e.target.value });
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="worker-phone" className="col-form-label">
                    Phone:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="worker-phone"
                    required={true}
                    placeholder="ex: 2015551232"
                    onChange={(e) => {
                      setInputs({ ...inputs, phone: e.target.value });
                    }}
                  />
                  <div className="form-group mt-3">
                    <label htmlFor="worker-company" className="col-form-label">
                      Add to company:
                    </label>
                    <select
                      className="form-select form-control"
                      aria-label="Default select example"
                      onChange={(e) => {
                        setInputs({ ...inputs, company: e.target.value });
                      }}
                    >
                      {companies?.map((c) => (
                        <option value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
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
    </>
  );
};
