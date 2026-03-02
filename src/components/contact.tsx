import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  GithubLogo,
  LinkedinLogo,
} from "@phosphor-icons/react";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("https://formspree.io/f/mdalvnpr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _replyto: formData.email,
          _subject: `New message from ${formData.name}`,
        }),
      });

      if (response.ok) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error("Failed to send");
      }
    } catch (error) {
      toast.error("Failed to send. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const socialButtons = [
    { icon: GithubLogo, variant: "glow-pink" },
    { icon: LinkedinLogo, variant: "glow-cyan" },
  ];

  return (
    <section className="relative py-20 md:py-32 overflow-hidden" id="contact">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Animated Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
              Get In Touch
            </h2>
            <motion.p
              className="text-lg md:text-xl text-muted-foreground"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              Have a project in mind? Let's create something amazing together!
            </motion.p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {[
              { type: "text", placeholder: "Your Name", key: "name" },
              { type: "email", placeholder: "Your Email", key: "email" },
            ].map((field, index) => (
              <motion.div
                key={field.key}
                initial={{ x: -30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                viewport={{ once: true }}
              >
                <Input
                  type={field.type as any}
                  placeholder={field.placeholder}
                  value={formData[field.key as keyof typeof formData]}
                  onChange={(e) =>
                    setFormData({ ...formData, [field.key]: e.target.value })
                  }
                  className="glass-strong border-primary/20 focus:glow-pink transition-all duration-300 h-12"
                  required
                />
              </motion.div>
            ))}

            <motion.div
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              viewport={{ once: true }}
            >
              <Textarea
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="glass-strong border-primary/20 focus:glow-pink transition-all duration-300 min-h-32 resize-none"
                required
              />
            </motion.div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.02 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              viewport={{ once: true }}
            >
              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-primary to-secondary hover:glow-pink transition-all duration-300 text-lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </Button>
            </motion.div>
          </form>

          <motion.div
            className="flex justify-center gap-4 mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            viewport={{ once: true }}
          >
            {socialButtons.map(({ icon: Icon, variant }, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                whileHover={{ scale: 1.15, rotate: 5 }}
                transition={{
                  delay: 0.5 + index * 0.1,
                  type: "spring",
                  stiffness: 300,
                }}
                viewport={{ once: true }}
              >
                <Button
                  size="icon"
                  variant="ghost"
                  className={`glass-strong hover:${variant} transition-all duration-300 rounded-full h-12 w-12`}
                >
                  <Icon className="h-6 w-6" weight="light" />
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
