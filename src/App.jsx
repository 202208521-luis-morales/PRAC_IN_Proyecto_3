import { useEffect, useState } from "react";
import "./App.css";
import Swal from "sweetalert2";
import axios from "axios";
import withReactContent from "sweetalert2-react-content";
import TableRow from "./components/TableRow";
import config from "../init-config.json"

function App() {
  // const [count, setCount] = useState(0)
  const MySwal = withReactContent(Swal);
  const [messageTable, setMessageTable] = useState("Cargando...");
  const [usersData, setUsersData] = useState([]);
  const [userToAddData, setUserToAddData] = useState({
    name: "",
    username: "",
    email: "",
  });

  function onUserFormSubmit(e) {
    e.preventDefault();
    if (
      userToAddData.name != "" &&
      userToAddData.username != "" &&
      userToAddData.email != ""
    ) {
      axios
        .post(config.endpointBack, userToAddData)
        .then((response) => {
          console.log(response.data);
          setUserToAddData({
            name: "",
            username: "",
            email: "",
          });
          hydrateUsersData();
          MySwal.fire(
            "Usuario agregado",
            "El usuario ha sido agregado con éxito",
            "success"
          );
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      MySwal.fire("Error", "No puede ir ningún espacio vacío", "error");
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserToAddData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    document.title = "CRUD Usuarios | Grupo #5";

    hydrateUsersData();
  }, []);

  const hydrateUsersData = () => {
    axios
      .get(config.endpointBack)
      .then((response) => {
        setMessageTable("No hay usuarios aún")
        setUsersData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container mt-5 d-flex row-gap-2 flex-column">
      <h1 className="text-center">CRUD Usuarios</h1>
      <h3 className="text-center">Grupo #5</h3>
      <hr />
      <div className="d-flex justify-content-center">
        <div className="card" style={{ minWidth: "500px" }}>
          <div className="text-center card-header">
            <h4>Agregar Usuario</h4>
          </div>
          <div className="card-body">
            <form onSubmit={onUserFormSubmit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="name">
                  Nombre
                </label>
                <input
                  autoComplete="off"
                  className="form-control"
                  type="text"
                  id="name"
                  name="name"
                  value={userToAddData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="username">
                  Usuario
                </label>
                <input
                  autoComplete="off"
                  className="form-control"
                  type="text"
                  id="username"
                  name="username"
                  value={userToAddData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="email">
                  Email
                </label>
                <input
                  autoComplete="off"
                  className="form-control"
                  type="email"
                  id="email"
                  name="email"
                  value={userToAddData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary">
                  + Agregar Usuario
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <hr />
      <div className="text-center">
        <h2>Tabla Usuarios</h2>
      </div>
      {usersData.length === 0 ? (
        <div>{messageTable}</div>
      ) : (
        <div>
          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">Email</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((user) => (
                <TableRow
                  hydrateUsersData={hydrateUsersData}
                  user={user}
                  key={user.id}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
