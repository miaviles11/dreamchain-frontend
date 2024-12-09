"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Usa el módulo correcto
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Upload, Target, Gift, Sparkles } from "lucide-react";
import Footer from "@/components/ui/footer";
import Image from "next/image";
import Link from "next/link";

interface FormDream {
  name_sleep: string;
  dream_description: string;
  dream_goals: string;
  dream_reward_offered: string;
}

export default function DreamRegistryForm() {
  const [dreamForm, setDreamForm] = useState<FormDream>({
    name_sleep: "",
    dream_description: "",
    dream_goals: "",
    dream_reward_offered: "",
  });

  const router = useRouter(); // Hook para manejar la navegación

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setDreamForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("form-dream", JSON.stringify(dreamForm));
    console.log(localStorage.getItem("form-dream")); // Aquí puedes enviar el estado al servidor o hacer lo que necesites
    router.push("/success"); // Redirige a la página de éxito
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="py-6 px-4 border-b bg-white">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Image
              src="/logo.png"
              alt="Logo de DreamChain"
              width={70}
              height={70}
              className="rounded-full"
            />
            <span className="text-2xl font-bold">DreamChain</span>
          </div>
          <nav className="hidden md:flex space-x-4">
            <Link
              href="/"
              className="px-4 py-2 text-lg font-medium rounded-md hover:bg-gray-100"
            >
              Inicio
            </Link>
            <Link
              href="how-it-works"
              className="px-4 py-2 text-lg font-medium rounded-md hover:bg-gray-100"
            >
              Cómo funciona
            </Link>
            <Link
              href="user-dashboard"
              className="px-4 py-2 text-lg font-medium rounded-md hover:bg-gray-100"
            >
              Perfil
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 flex-grow">
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <h1 className="text-3xl font-bold">Registrar tu Sueño</h1>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="dream-name" className="text-lg font-medium">
                <Sparkles className="inline-block mr-2" size={20} />
                Nombre del Sueño
              </Label>
              <Input
                id="dream-name"
                name="name_sleep"
                value={dreamForm.name_sleep}
                onChange={handleChange}
                placeholder="Escribe el nombre de tu sueño"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dream-description" className="text-lg font-medium">
                <Target className="inline-block mr-2" size={20} />
                Descripción
              </Label>
              <Input
                id="dream-description"
                name="dream_description"
                placeholder="Describe tu sueño en detalle"
                value={dreamForm.dream_description}
                onChange={handleChange}
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dream-goals" className="text-lg font-medium">
                <Target className="inline-block mr-2" size={20} />
                Metas
              </Label>
              <Input
                id="dream-goals"
                name="dream_goals"
                value={dreamForm.dream_goals}
                onChange={handleChange}
                placeholder="Define las metas de tu sueño"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dream-reward" className="text-lg font-medium">
                <Gift className="inline-block mr-2" size={20} />
                Recompensa Ofrecida (Opcional)
              </Label>
              <Input
                id="dream-reward"
                name="dream_reward_offered"
                value={dreamForm.dream_reward_offered}
                onChange={handleChange}
                placeholder="Especifica la recompensa por cumplir el sueño"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dream-attachments" className="text-lg font-medium">
                <Upload className="inline-block mr-2" size={20} />
                Adjuntar Imágenes o Documentos (Opcional)
              </Label>
              <Input
                id="dream-attachments"
                type="file"
                multiple
                className="cursor-pointer"
              />
            </div>

            <Button
              className="w-full text-lg py-6"
              size="lg"
              onClick={handleSubmit}
            >
              Registrar en Blockchain
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
