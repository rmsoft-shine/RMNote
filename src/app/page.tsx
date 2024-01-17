import Write from '@/components/Write'
import Header from '@/components/Header'
import Menu from '@/components/Menu'
import NoteList from '@/components/NoteList'

export default function Home() {
  return (
    <div id="App" className="w-full h-full min-w-[1400px] max-w-[1920px]">
      <Header />
      <main className="w-full h-main flex divide-x">
        <Menu />
        <NoteList />
        <Write />
      </main>
    </div>
  )
}
