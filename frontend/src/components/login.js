import React, { useState } from "react";


const Login = props => {

  const initialUserState = {
    name: "",
    id: "",
  };

  const [user, setUser] = useState(initialUserState);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser({...user, [name]: value });
  };

  const login = () => {
    // Calling props.login() from App.js
    props.login(user)
    props.history.push('/');
  }

  return (
    <form class="form-horizontal" action="/action_page.php">
      <div class="form-group">
        <label class="control-label col-sm-2" for="name">Username: </label>
        <div class="col-sm-10">
         <input 
            type="text" 
            class="form-control"
            id="name" 
            required
            value={user.name}
            name="name"
            onChange={handleInputChange}
            placeholder="Username">
          </input>
        </div>
      </div>
      <div class="form-group">
        <label class="control-label col-sm-2" for="password">Password: </label>
          <div class="col-sm-10">
            <input
              type="password" 
              class="form-control " 
              id="id"
              value={user.id}
              onChange={handleInputChange} 
              required
              name="id"
              placeholder="Password">
            </input>
          </div>
      </div>
      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <div class="checkbox">
            <label><input type="checkbox"></input> Remember me</label>
          </div>
        </div>
      </div>
      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <button 
            type="submit" 
            class="btn btn-primary"
            onClick={login}>
            Login
          </button>
        </div>
      </div>
    </form>
  );
}

export default Login;
