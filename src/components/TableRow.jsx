import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function TableRow({ user, hydrateUsersData }) {
  const [isEditEnabled, setIsEditEnabled] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    email: "",
  });

  const MySwal = withReactContent(Swal);

  const onModifyButtonClicked = () => {
    if (
      userData.name != "" &&
      userData.username != "" &&
      userData.email != ""
    ) {
      axios
        .put(`https://jsonplaceholder.typicode.com/users/${user.id}`, userData)
        .then((response) => {
          console.log(response.data);
          setIsEditEnabled(false)
          MySwal.fire(
            "Usuario modificado",
            "El usuario ha sido modificado con éxito",
            "success"
          );
          hydrateUsersData();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      MySwal.fire(
        "Error",
        "No puede ir ningún espacio vacío",
        "error"
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    setUserData({
      name: user.name,
      username: user.username,
      email: user.email,
    });
  }, [user.email, user.name, user.username]);

  return (
    <tr key={user.id}>
      <th scope="row">{user.id}</th>
      {isEditEnabled ? (
        <>
          <td>
            <input
              className="form-control"
              name="name"
              type="text"
              onChange={handleChange}
              value={userData.name}
            />
          </td>
          <td>
            <input
              className="form-control"
              name="username"
              type="text"
              onChange={handleChange}
              value={userData.username}
            />
          </td>
          <td>
            <input
              className="form-control"
              name="email"
              type="email"
              onChange={handleChange}
              value={userData.email}
            />
          </td>
        </>
      ) : (
        <>
          <td>{user.name}</td>
          <td>{user.username}</td>
          <td>{user.email}</td>
        </>
      )}

      <td className="d-flex justify-content-center">
        <div className="btn-group" role="group" aria-label="Basic example">
          {isEditEnabled ? (
            <>
              <button
                type="button"
                onClick={onModifyButtonClicked}
                className="btn btn-primary"
              >
                Modificar
              </button>
              <button
                onClick={() => setIsEditEnabled(!isEditEnabled)}
                type="button"
                className="btn btn-secondary"
              >
                Cancelar
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditEnabled(true)}
                type="button"
                className="btn btn-primary"
              >
                Editar
              </button>
              <button type="button" className="btn btn-danger">
                Eliminar
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
}

TableRow.propTypes = {
  user: PropTypes.string.isRequired,
  hydrateUsersData: PropTypes.func.isRequired
};

export default TableRow;
