import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import Mensagem from '../components/Mensagem'
import { auth } from '../services/firebase'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [carregando, setCarregando] = useState(false)

  function emailValido(valor) {
    return /\S+@\S+\.\S+/.test(valor)
  }

  function validarFormulario() {
    if (!email || !senha) {
      setMensagem('Preencha e-mail e senha')
      return false
    }

    if (!emailValido(email)) {
      setMensagem('Digite um e-mail válido')
      return false
    }

    return true
  }

  async function acessar(evento) {
    evento.preventDefault()
    setMensagem('')

    if (!validarFormulario()) {
      return
    }

    try {
      setCarregando(true)
      await signInWithEmailAndPassword(auth, email, senha)
      navigate('/principal')
    } catch {
      setMensagem('Usuário não cadastrado ou credenciais incorretas')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <main className="pagina">
      <form className="caixa" onSubmit={acessar}>
        <h1>Login</h1>

        <label>
          E-mail
          <input
            type="email"
            value={email}
            onChange={(evento) => setEmail(evento.target.value)}
          />
        </label>

        <label>
          Senha
          <input
            type="password"
            value={senha}
            onChange={(evento) => setSenha(evento.target.value)}
          />
        </label>

        <button type="submit" disabled={carregando}>
          {carregando ? 'Entrando...' : 'Acessar'}
        </button>

        <Mensagem tipo="erro" texto={mensagem} />

        <p className="link">
          Ainda não tem conta? <Link to="/cadastro">Cadastrar</Link>
        </p>
      </form>
    </main>
  )
}

export default Login
