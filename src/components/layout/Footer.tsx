import { Logo } from '../ui/Logo'

const columns = [
  ['Produto', 'Funcionalidades', 'Seguranca', 'Precos', 'API'],
  ['Empresa', 'Sobre nos', 'Blog', 'Contato'],
  ['Legal', 'Termos de uso', 'Privacidade', 'Cookies'],
]

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-dark-900 px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.5fr_2fr]">
        <div>
          <a href="#topo">
            <Logo className="scale-125" />
          </a>
          <p className="mt-4 max-w-sm text-sm leading-6 text-zinc-400">
            Midia organizada, segura e pronta para compartilhar com clientes e equipes.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          {columns.map(([title, ...items]) => (
            <div key={title}>
              <h3 className="font-semibold text-white">{title}</h3>
              <ul className="mt-4 space-y-3 text-sm text-zinc-400">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#topo" className="hover:text-white">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}

