"use client"
import { useState } from "react"

export default function GetInTouch() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", message: "" })
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="max-w-xl mx-auto p-10 rounded-2xl shadow-2xl" style={{ backgroundColor: 'rgba(var(--n1), 1)', border: '1px solid rgba(var(--n3), 0.2)' }}>
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold mb-3" style={{ color: 'rgba(var(--n5), 1)' }}>
          Let's Connect
        </h2>
        <p className="text-lg" style={{ color: 'rgba(var(--n4), 1)' }}>
          I'd love to hear about your project
        </p>
      </div>

      {submitStatus === "success" && (
        <div className="mb-8 p-5 rounded-xl border border-green-200" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)' }}>
          <p className="text-green-700 font-medium">
            Message sent successfully! I'll get back to you soon.
          </p>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="mb-8 p-5 rounded-xl border border-red-200" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-red-700 font-medium">
              Something went wrong. Please try again.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-semibold mb-2" style={{ color: 'rgba(var(--n5), 1)' }}>
            Full Name
          </label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-5 py-4 rounded-xl border-2 focus:border-blue-500 focus:outline-none transition-all duration-300"
            style={{ 
              borderColor: 'rgba(var(--n3), 0.3)',
              backgroundColor: 'rgba(var(--n2), 1)',
              color: 'rgba(var(--n5), 1)'
            }}
            placeholder="Enter your full name"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-semibold mb-2 mt-6" style={{ color: 'rgba(var(--n5), 1)' }}>
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-5 py-4 rounded-xl border-2 focus:border-blue-500 focus:outline-none transition-all duration-300"
            style={{ 
              borderColor: 'rgba(var(--n3), 0.3)',
              backgroundColor: 'rgba(var(--n2), 1)',
              color: 'rgba(var(--n5), 1)'
            }}
            placeholder="your@email.com"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="block text-sm font-semibold mb-2 mt-6" style={{ color: 'rgba(var(--n5), 1)' }}>
            Your Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full px-5 py-4 rounded-xl border-2 focus:border-blue-500 focus:outline-none transition-all duration-300 resize-none"
            style={{ 
              borderColor: 'rgba(var(--n3), 0.3)',
              backgroundColor: 'rgba(var(--n2), 1)',
              color: 'rgba(var(--n5), 1)'
            }}
            placeholder="Tell me about your project, goals, or any questions you have..."
          />
        </div>

        <div className="pt-4 text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              background: isSubmitting 
                ? 'linear-gradient(135deg, #9CA3AF 0%, #6B7280 100%)' 
                : 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
              color: 'white',
              border: 'none',
              padding: '16px 32px',
              borderRadius: '12px',
              fontWeight: '600',
              fontSize: '16px',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              boxShadow: isSubmitting 
                ? '0 4px 15px rgba(156, 163, 175, 0.3)' 
                : '0 8px 25px rgba(59, 130, 246, 0.3)',
              transform: 'translateY(0px)',
              transition: 'all 0.3s ease',
              display: 'inline-flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting) {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(59, 130, 246, 0.4)'
                e.currentTarget.style.background = 'linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)'
              }
            }}
            onMouseLeave={(e) => {
              if (!isSubmitting) {
                e.currentTarget.style.transform = 'translateY(0px)'
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.3)'
                e.currentTarget.style.background = 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)'
              }
            }}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-3">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Sending Message...</span>
              </div>
            ) : (
              <span className="flex items-center justify-center">
                <span>Send Message</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: '12px' }}>
                  <path d="m22 2-7 20-4-9-9-4Z"/>
                  <path d="M22 2 11 13"/>
                </svg>
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
