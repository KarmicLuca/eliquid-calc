import { NavLink } from 'react-router-dom';
import { Page, Pages } from "../types"

export default function Header({pages}: Pages) {
  return <>
    <header className='header'>
      <section className="header-title">
        <h1>E-liquid calculator</h1>
        <h2>Select your preferred mode</h2>
      </section>
      <section className="flex justify-center gap-8 py-4">
        {pages.map((page: Page) => {
          return <NavLink className='px-4 py-2 rounded-md border-2 border-stone-400 hover:bg-stone-800' key={page.handle} to={page.handle}>{page.title}</NavLink>
        })}
      </section>
    </header>
  </>
}