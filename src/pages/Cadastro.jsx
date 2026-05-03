import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import Mensagem from '../components/Mensagem'
import { auth, db } from '../services/firebase'

function Cadastro() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [nome, setNome] = useState('')
  const [sobrenome, setSobrenome] = useState('')
  const [nascimento, setNascimento] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [tipoMensagem, setTipoMensagem] = useState('')
  const [carregando, setCarregando] = useState(false)

  function emailValido(valor) {
    return /\S+@\S+\.\S+/.test(valor)
  }

  function validarFormulario() {
    if (!email || !senha || !nome || !sobrenome || !nascimento) {
      setTipoMensagem('erro')
      setMensagem('Preencha todos os campos')
      return false
    }

    if (!emailValido(email)) {
      setTipoMensagem('erro')
      setMensagem('Digite um e-mail válido')
      return false
    }

    if (senha.length < 6) {
      setTipoMensagem('erro')
      setMensagem('A senha precisa ter pelo menos 6 caracteres')
      return false
    }

    return true
  }

  async function cadastrar(evento) {
    evento.preventDefault()
    setMensagem('')

    if (!validarFormulario()) {
      return
    }

    try {
      setCarregando(true)
      const resposta = await createUserWithEmailAndPassword(auth, email, senha)
      const usuario = resposta.user

      await setDoc(doc(db, 'usuarios', usuario.uid), {
        uid: usuario.uid,
        nome,
        sobrenome,
        nascimento,
      })

      setTipoMensagem('sucesso')
      setMensagem('Cadastro realizado com sucesso')

      setTimeout(() => {
        navigate('/principal')
      }, 800)
    } catch {
      setTipoMensagem('erro')
      setMensagem('Não foi possível fazer o cadastro')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <main className="pagina">
      <form className="caixa" onSubmit={cadastrar}>
        <h1>Cadastro</h1>

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

        <label>
          Nome
          <input
            type="text"
            value={nome}
            onChange={(evento) => setNome(evento.target.value)}
          />
        </label>

        <label>
          Sobrenome
          <input
            type="text"
            value={sobrenome}
            onChange={(evento) => setSobrenome(evento.target.value)}
          />
        </label>

        <label>
          Data de nascimento
          <input
            type="date"
            value={nascimento}
            onChange={(evento) => setNascimento(evento.target.value)}
          />
        </label>

        <button type="submit" disabled={carregando}>
          {carregando ? 'Cadastrando...' : 'Cadastrar'}
        </button>

        <Mensagem tipo={tipoMensagem} texto={mensagem} />

        <p className="link">
          Já tem conta? <Link to="/login">Entrar</Link>
        </p>
      </form>
    </main>
  )
}

export default Cadastro
