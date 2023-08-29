import { useEffect } from "react";
import "./App.css";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function App() {
  // const [count, setCount] = useState(0)
  const MySwal = withReactContent(Swal);

  function onUserFormSubmit() {
    MySwal.fire(
      'Usuario agregado',
      'El usuario ha sido agregado con éxito',
      'success'
    )
  }

  useEffect(() => {
    document.title = "CRUD Usuarios | Grupo #5";
  });

  return (
    <div className="container mt-5 d-flex row-gap-2 flex-column">
      <h1 className="text-center">CRUD Usuarios</h1>
      <h3 className="text-center">Grupo #5</h3>
      <div className="d-flex justify-content-between column-gap-4">
        <div className="w-50">
          <div className="card w-75">
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
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="lastname">
                    Apellido
                  </label>
                  <input
                    autoComplete="off"
                    className="form-control"
                    type="text"
                    id="lastname"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="age">
                    Edad
                  </label>
                  <input
                    autoComplete="off"
                    className="form-control"
                    type="number"
                    id="age"
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
        <div className="w-50">
          <div className="card">
            <div className="card-header text-center">
              <h4>Ver Usuario</h4>
            </div>
            <div className="card-body text-center text-body-secondary">
              Elije un usuario y se mostrará aquí
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="text-center">
        <h2>Tabla Usuarios</h2>
      </div>
      <div>
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Apellido</th>
              <th scope="col">Edad</th>
              <th scope="col">Email</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Luis</td>
              <td>Morales</td>
              <td>20</td>
              <td>mi@email.com</td>
              <td className="d-flex justify-content-center">
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic example"
                >
                  <button type="button" className="btn btn-secondary">
                    Ver
                  </button>
                  <button type="button" className="btn btn-primary">
                    Editar
                  </button>
                  <button type="button" className="btn btn-danger">
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
