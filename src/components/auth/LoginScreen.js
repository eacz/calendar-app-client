import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import useForm from '../../hooks/useForm';
import { startLogin, startRegister } from '../../redux/actions/auth';
import './login.css';

//TODO separete login from register
const LoginScreen = () => {
    const dispatch = useDispatch();

    //login stuff
    const [LoginValues, handleLoginInputChange] = useForm({
        lEmail: '',
        lPassword: '',
    });

    const { lEmail, lPassword } = LoginValues;

    const handleLogin = (e) => {
        e.preventDefault();
        if (!lEmail || !lPassword) {
            return Swal.fire('Error', 'Please, fill all the fields', 'error');
        }
        dispatch(startLogin(lEmail, lPassword));
    };

    //register stuff
    const [RegisterValues, handleRegisterInputChange] = useForm({
        rName: '',
        rEmail: '',
        rPassword: '',
        rPassword2: '',
    });
    const { rName, rEmail, rPassword, rPassword2 } = RegisterValues;

    const handleRegister = (e) => {
        e.preventDefault();
        if (!rEmail || !rName || !rPassword || !rPassword2) {
            return Swal.fire('Error', 'Please fill all the fields', 'error');
        }
        if (rPassword !== rPassword2) {
            return Swal.fire('Error', 'The passwords must match', 'error');
        }
        dispatch(startRegister(rEmail, rPassword, rName));
    };

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Login</h3>

                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                value={lEmail}
                                name="lEmail"
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                value={lPassword}
                                name="lPassword"
                                onChange={handleLoginInputChange}
                                type="password"
                                className="form-control"
                                placeholder="Password"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Login"
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Register</h3>
                    <form onSubmit={handleRegister}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                name="rName"
                                value={rName}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                name="rEmail"
                                value={rEmail}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                name="rPassword"
                                value={rPassword}
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                name="rPassword2"
                                value={rPassword2}
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Create Account"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
