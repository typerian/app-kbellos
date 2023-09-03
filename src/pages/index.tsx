import Head from "next/head";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import ListarServicios from "../components/ListarServicios";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>Kbellos & Styles</title>
        <meta name="description" content="Agenda tu cita comodamente" />
        <link rel="icon" href="/k_S.svg" />
      </Head>
      <div className="mx-auto bg-gradient-to-r from-fuchsia-300 to-cyan-200">
        <NavBar />
        <Hero />
        <ListarServicios />
        <Footer />
      </div>
    </>
  );
}
