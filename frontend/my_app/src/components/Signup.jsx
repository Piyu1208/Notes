import { useState } from 'react';
import api from "./axios";


function Signup() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState("");

    const validateSignup = () => {
        if(!formData.email.trim()) return "Email is required";
        
        const emailRegex = /^\S+@\S+\.\S+$/;
        if(!emailRegex.test(formData.email)) return "Invalid email";

        if(!formData.password) return "Password is required";
        if(formData.password.length < 6)
            return "Password must be atleast 6 characters";

        if(from.password !== form.confirmPassword)
            return "Passwords do not match";

        return null;
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsPending(true);

        const validationError = validateSignup();
        if(validationError) {
            setError(validationError);
            return;
        }

        try {
            await api.post("/api/signup", formData);
            console.log("success");
            setIsPending(false);
        } catch (err) {
            console.log(err);
        }
        
    };


    return (
        <div className="signup-container">
            <h2>Sign Up</h2>

            {error && <div>{error}</div>}

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="email"
                    placeholder="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <input 
                    type="text"
                    name="password"
                    placeholder="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <input 
                    type="text"
                    name="confirmPassword"
                    placeholder="confirm password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />

                {!isPending && <button type="submit">Sign Up</button>}
                {isPending && <button disabled>Signing Up...</button>}
            </form>
        </div>
    );
}

export default Signup;