import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { loginApi } from "../services/user.service";
import { ILoginApiRequestAndForm, IUser } from "../interfaces/user.interface";
import { ApiResponse } from "../interfaces/gobal.interface";
import { NavigateFunction, useNavigate } from 'react-router-dom';

function LoginPage() {
    const { saveUser } = useContext(AuthContext);
    const [userForm, setUserForm] = useState<ILoginApiRequestAndForm>({
        username: "",
        password: "",
    });
    const [error, setError] = useState<string>("");

    const navigate: NavigateFunction = useNavigate()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response: ApiResponse<IUser> = await loginApi(userForm);
        if (!response.status) {
            setError("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
        }
        saveUser(response.data.token);
        return navigate("/home")
    };

    return (
        <div>
            <h1>Login</h1>
            <h2>{error}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={userForm.username}
                    onChange={(e) =>
                        setUserForm({ ...userForm, username: e.target.value })
                    }
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={userForm.password}
                    onChange={(e) =>
                        setUserForm({ ...userForm, password: e.target.value })
                    }
                />

                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginPage;
