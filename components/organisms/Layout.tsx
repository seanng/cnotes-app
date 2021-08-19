import Navbar from 'components/molecules/Navbar'

type Props = {
  children: JSX.Element
}

export default function Layout(props: Props): JSX.Element {
  return (
    <>
      <Navbar />
      {props.children}
      {/* TODO: Footer */}
    </>
  )
}
