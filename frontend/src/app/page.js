'use client'
import { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { useRouter } from 'next/navigation';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const login = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://127.0.0.1:8000/api-auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data)
      localStorage.setItem('token', data.access);
      router.push('/profile');

    } catch (error) {
      setError(error.message);
      console.error('There was an error!', error);
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = () => {
    console.log("Esqueceu a senha");
    // Lógica para lidar com "Esqueceu a senha"
  };

  const signUp = () => {
    console.log("Cadastro de usuário");
    // Lógica para lidar com o cadastro de novos usuários
  };

  return (
    <main className="w-4/5 mx-auto h-screen flex flex-col items-center justify-center gap-10">
      <h1 className="text-fuchsia-950 font-sans font-bold text-7xl mb-10">MyBank</h1>

      <section className="w-full max-w-md px-6 py-8 bg-white shadow-md rounded-lg">
        <input
          type="text"
          placeholder="Email"
          className="w-full px-3 py-2 mb-4 leading-tight text-gray-700 border rounded-lg appearance-none focus:outline-none focus:shadow-outline"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            className="w-full px-3 py-2 mb-4 leading-tight text-gray-700 border rounded-lg appearance-none focus:outline-none focus:shadow-outline"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            onClick={togglePasswordVisibility}
            className="absolute top-2 right-0 flex items-center pr-3 cursor-pointer"
          >
            {showPassword ? (
              <IoEyeSharp className="text-gray-500" size={20} />
            ) : (
              <FaEyeSlash className="text-gray-500" size={20} />
            )}
          </span>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="button"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg focus:outline-none hover:bg-blue-600"
          onClick={login}
          disabled={loading}
        >
          {loading ? 'Carregando...' : 'Entrar'}
        </button>

        <div className="flex justify-between mt-4">
          <button
            type="button"
            className="text-sm text-gray-600 hover:text-gray-800 focus:outline-none"
            onClick={forgotPassword}
          >
            Esqueceu a senha?
          </button>
          <button
            type="button"
            className="text-sm text-gray-600 hover:text-gray-800 focus:outline-none"
            onClick={signUp}
          >
            Cadastro
          </button>
        </div>
      </section>
    </main>
  );
}
