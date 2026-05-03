import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import Mensagem from '../components/Mensagem'
import { auth, db } from '../services/firebase'

function Principal() {
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [mensagem, setMensagem] = useState('')

  useEffect(() => {
    const cancelar = onAuthStateChanged(auth, async (usuarioLogado) => {
      if (!usuarioLogado) {
        navigate('/login')
        return
      }

      try {
        const usuarioRef = doc(db, 'usuarios', usuarioLogado.uid)
        const usuarioDoc = await getDoc(usuarioRef)

        if (usuarioDoc.exists()) {
          setUsuario(usuarioDoc.data())
        } else {
          setMensagem('Dados do usuário não encontrados')
        }
      } catch {
        setMensagem('Erro ao buscar dados do usuário')
      } finally {
        setCarregando(false)
      }
    })

    return () => cancelar()
  }, [navigate])

  async function sair() {
    await signOut(auth)
    navigate('/login')
  }

  if (carregando) {
    return (
      <main className="pagina">
        <section className="caixa">
          <p>Carregando...</p>
        </section>
      </main>
    )
  }

  return (
    <main className="pagina">
      <section className="caixa">
        <h1>Principal</h1>

        <Mensagem tipo="erro" texto={mensagem} />

        {usuario && (
          <div className="dados">
            <p>
              <strong>Nome:</strong> {usuario.nome}
            </p>
            <p>
              <strong>Sobrenome:</strong> {usuario.sobrenome}
            </p>
            <p>
              <strong>Data de nascimento:</strong> {usuario.nascimento}
            </p>
          </div>
        )}

        <button type="button" onClick={sair}>
          Sair
        </button>
      </section>
    </main>
  )
}

export default Principal
