import Header from './Header'
import { Outlet } from 'react-router-dom';
import { Page, Pages } from '../types';


const pages: Page[] = [
  {
    handle: '/eliquid-calc/mixcalculator',
    title: 'Full Mix Calculator'
  },
  {
    handle: '/eliquid-calc/nicbase',
    title: 'Nic Base Calculator'
  },
]

export default function Home() {
  return <>
    <Header pages={pages}></Header>
    <Outlet></Outlet>
  </>
}