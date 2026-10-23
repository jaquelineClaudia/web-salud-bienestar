import { Hero } from "@/components/home/Hero";
import { Cansancio } from "@/components/home/Cansancio";
import { Descanso } from "@/components/home/Descanso";
import { Bienestar } from "@/components/home/Bienestar";
import { HogarSano } from "@/components/home/HogarSano";
import { Categorias } from "@/components/home/Categorias";
import { Destacados } from "@/components/home/Destacados";
import { ComoTrabajamos } from "@/components/home/ComoTrabajamos";
import { Opiniones } from "@/components/home/Opiniones";
import { Cierre } from "@/components/home/Cierre";
import { getCollections, getFeatured } from "@/lib/store";

export default async function Home() {
  const [collections, featured] = await Promise.all([getCollections(), getFeatured()]);
  return (
    <>
      <Hero />
      <Cansancio />
      <Descanso />
      <Bienestar />
      <HogarSano />
      <Categorias items={collections} />
      <Destacados items={featured} />
      <ComoTrabajamos />
      <Opiniones />
      <Cierre />
    </>
  );
}
