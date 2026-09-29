"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Phone, Mail, MapPin, CheckCircle2 } from "lucide-react";

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
    <div className="flex min-h-screen flex-col bg-black text-white selection:bg-cyber-lime selection:text-black">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-8 md:p-12">
        <div className="w-full max-w-5xl overflow-hidden rounded-3xl border border-white/20 bg-white text-black shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Column: Get In Touch */}
            <div className="p-8 sm:p-12 md:p-14 flex flex-col justify-between border-b md:border-b-0 md:border-r border-gray-200">
              <div>
                <h1 className="text-4xl sm:text-5xl font-black text-black tracking-tight mb-8">
                  Get In Touch
                </h1>

                <div className="space-y-8">
                  {/* Phone & FISIP UNAIR row */}
                  <div className="flex flex-wrap items-start gap-8">
                    {/* Phone */}
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyber-lime text-black shadow-md flex-shrink-0">
                        <Phone className="h-5 w-5 stroke-[2.5]" />
                      </div>
                      <div>
                        <h3 className="text-xs font-black text-black uppercase tracking-wider">Phone</h3>
                        <p className="text-sm font-bold text-gray-800">(+62) 594218652</p>
                      </div>
                    </div>

                    {/* Location: FISIP UNAIR */}
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyber-lime text-black shadow-md flex-shrink-0">
                        <MapPin className="h-5 w-5 stroke-[2.5]" />
                      </div>
                      <div>
                        <span className="text-sm font-black text-black tracking-wider uppercase">
                          FISIP UNAIR
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3 pt-2">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyber-lime text-black shadow-md flex-shrink-0 mt-0.5">
                      <Mail className="h-5 w-5 stroke-[2.5]" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xs font-black text-black uppercase tracking-wider">Email</h3>
                      <p className="text-xs sm:text-sm font-semibold text-gray-800 break-all leading-relaxed">
                        priscila.buana.tunggadewi-2024@fisip.unair.ac.id
                      </p>
                      <p className="text-xs sm:text-sm font-semibold text-gray-800 break-all leading-relaxed">
                        reenata.amodia.khansa-2024@fisip.unair.ac.id
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {submitted && (
                <div className="mt-8 flex items-center gap-2 rounded-2xl bg-cyber-lime/30 border border-cyber-lime p-3 text-xs font-black text-black animate-in fade-in">
                  <CheckCircle2 className="h-4 w-4 text-black flex-shrink-0" />
                  <span>Pesan Anda berhasil dikirim! Tim kami akan segera menghubungi Anda.</span>
                </div>
              )}
            </div>

            {/* Right Column: Interactive Form matching Image 1 */}
            <div className="p-8 sm:p-12 md:p-14 bg-white">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Row 1: Email and Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black text-black mb-1.5 uppercase tracking-wide">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-md border-0 bg-[#FF80BF] p-3 text-sm font-bold text-black placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-black mb-1.5 uppercase tracking-wide">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-md border-0 bg-[#FF80BF] p-3 text-sm font-bold text-black placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                </div>

                {/* Row 2: Phone */}
                <div>
                  <label className="block text-xs font-black text-black mb-1.5 uppercase tracking-wide">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-md border-0 bg-[#FF80BF] p-3 text-sm font-bold text-black placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                {/* Row 3: Message */}
                <div>
                  <label className="block text-xs font-black text-black mb-1.5 uppercase tracking-wide">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full rounded-md border-0 bg-[#FF80BF] p-3 text-sm font-bold text-black placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                {/* Row 4: Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="w-44 rounded-md bg-[#FF007F] py-3.5 text-sm font-black text-black tracking-widest shadow-md transition-all hover:brightness-110 active:scale-95"
                  >
                    SEND
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
