"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Phone, Mail, MapPin, Send, CheckCircle2 } from "lucide-react";

export default function ContactUsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setSubmitted(true);
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");

    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <div className="flex min-h-screen flex-col bg-graphite-black text-white selection:bg-cyber-lime selection:text-black">
      <Navbar />

      <main className="flex-1">
        {/* Banner Section */}
        <section className="relative overflow-hidden bg-neon-fuchsia">
          <div className="relative h-64 sm:h-80 md:h-96 w-full">
            {/* Background Team Interaction Photo */}
            <img
              src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1600&q=80"
              alt="Contact Mind.Maze Team"
              className="h-full w-full object-cover mix-blend-multiply filter grayscale contrast-125 opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neon-fuchsia/90 via-neon-fuchsia/40 to-transparent" />

            {/* Centered CONTACT US Title */}
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-widest text-white drop-shadow-2xl">
                CONTACT US
              </h1>
            </div>
          </div>
        </section>

        {/* Content Section: Get In Touch + Form */}
        <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
            {/* Left Column: Get In Touch */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  Get In Touch
                </h2>
                <p className="mt-2 text-sm text-gray-400">
                  Punya pertanyaan seputar fakta ilmiah, ingin berkolaborasi, atau memberi saran untuk Mind.Maze? Tim kami siap mendengar.
                </p>
              </div>

              <div className="space-y-6">
                {/* Phone Item */}
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyber-lime text-black shadow-lg">
                    <Phone className="h-6 w-6 stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-400">Phone</h3>
                    <p className="text-base font-black text-white">(+62) 594218652</p>
                  </div>
                </div>

                {/* Email Item */}
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyber-lime text-black shadow-lg">
                    <Mail className="h-6 w-6 stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-400">Email</h3>
                    <p className="text-base font-black text-white break-all">
                      priscila.buana.tunggadewi@mindmaze.com
                    </p>
                  </div>
                </div>

                {/* Address Item */}
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyber-lime text-black shadow-lg">
                    <MapPin className="h-6 w-6 stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-400">Address</h3>
                    <p className="text-sm font-semibold text-white">
                      Jl. Sains & Teknologi No. 42, Digital Knowledge Hub, Indonesia
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7 rounded-3xl border border-white/10 bg-[#161616] p-6 sm:p-10 shadow-2xl">
              {submitted && (
                <div className="mb-6 flex items-center gap-3 rounded-2xl bg-cyber-lime/20 border border-cyber-lime p-4 text-sm font-bold text-cyber-lime">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                  <span>Terima kasih! Pesan Anda telah kami terima dan akan segera direspons.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="email@anda.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-2xl border border-neon-fuchsia/40 bg-neon-fuchsia/15 p-3.5 text-sm font-semibold text-white placeholder-white/50 focus:border-neon-fuchsia focus:outline-none focus:ring-1 focus:ring-neon-fuchsia"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1.5">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nama lengkap..."
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-2xl border border-neon-fuchsia/40 bg-neon-fuchsia/15 p-3.5 text-sm font-semibold text-white placeholder-white/50 focus:border-neon-fuchsia focus:outline-none focus:ring-1 focus:ring-neon-fuchsia"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1.5">
                    Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="Nomor telepon / WhatsApp..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-2xl border border-neon-fuchsia/40 bg-neon-fuchsia/15 p-3.5 text-sm font-semibold text-white placeholder-white/50 focus:border-neon-fuchsia focus:outline-none focus:ring-1 focus:ring-neon-fuchsia"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1.5">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tulis pesan atau pertanyaan Anda di sini..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full rounded-2xl border border-neon-fuchsia/40 bg-neon-fuchsia/15 p-3.5 text-sm font-semibold text-white placeholder-white/50 focus:border-neon-fuchsia focus:outline-none focus:ring-1 focus:ring-neon-fuchsia"
                  />
                </div>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 w-full rounded-full bg-cyber-lime py-3.5 text-sm font-black text-black shadow-lg hover:brightness-110 active:scale-95 transition-all"
                >
                  <Send className="h-4 w-4" />
                  <span>Kirim Pesan Sekarang</span>
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
