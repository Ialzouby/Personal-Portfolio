"use client";

import { FC, useEffect, useState, useRef } from "react";
import Script from "next/script";
import { PiX } from "react-icons/pi";

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ContactModal: FC<ContactModalProps> = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [honeypot, setHoneypot] = useState("");
    const [formStartTime, setFormStartTime] = useState<number>(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    // Turnstile state
    const [tsReady, setTsReady] = useState(false);
    const [tsToken, setTsToken] = useState("");
    const [widgetId, setWidgetId] = useState<string | null>(null);
    const widgetRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            setFormStartTime(Date.now()); // Reset timer when modal opens
        } else {
            document.body.style.overflow = "unset";
            // Reset form state on close if needed, or keep it. 
            // Let's keep it but maybe reset status if it was success?
            if (submitStatus === 'success') {
                setSubmitStatus('idle');
                setFormData({ name: "", email: "", message: "" });
            }
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen, submitStatus]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                onClose();
            }
        };

        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [isOpen, onClose]);

    // Render Turnstile programmatically when script is ready
    useEffect(() => {
        if (!isOpen || !tsReady || !widgetRef.current || widgetId) return;

        const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
        if (!siteKey) return;

        const turnstile = (window as any).turnstile;
        if (!turnstile || !turnstile.render) return;

        try {
            const id = turnstile.render(widgetRef.current, {
                sitekey: siteKey,
                callback: (token: string) => setTsToken(token),
                'error-callback': () => setTsToken(''),
                'expired-callback': () => setTsToken(''),
            });
            setWidgetId(id);
        } catch (e) {
            console.error("Turnstile render error:", e);
        }
    }, [isOpen, tsReady, widgetId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus("idle");
        setErrorMessage("");

        if (honeypot) {
            console.log("🛡️ Honeypot triggered - spam blocked");
            setIsSubmitting(false);
            return;
        }

        if (!tsToken) {
            setSubmitStatus("error");
            setErrorMessage("Please complete the verification check below.");
            setIsSubmitting(false);
            return;
        }

        const formFillTime = Date.now() - formStartTime;
        if (formFillTime < 3000) {
            console.log("🛡️ Too fast submission - spam blocked");
            setSubmitStatus("error");
            setErrorMessage("Please take your time filling out the form.");
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await fetch("/api/send-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    _timestamp: formStartTime,
                    _fillTime: formFillTime,
                    turnstileToken: tsToken,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setSubmitStatus("success");
                setFormData({ name: "", email: "", message: "" });
                setFormStartTime(Date.now());

                // Reset Turnstile
                try {
                    if (widgetId && (window as any).turnstile?.reset) {
                        (window as any).turnstile.reset(widgetId);
                        setTsToken("");
                    }
                } catch { }
            } else {
                setSubmitStatus("error");
                setErrorMessage(data.error || "Failed to send message. Please try again.");
            }
        } catch (error) {
            setSubmitStatus("error");
            setErrorMessage("Network error. Please check your connection and try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (!isOpen) return null;

    return (
        <>
            <div
                className="modal-backdrop"
                onClick={onClose}
            />

            <div className="contact-modal">
                <div className="contact-modal-content">
                    <button
                        onClick={onClose}
                        className="modal-close-btn"
                        aria-label="Close modal"
                    >
                        <PiX size={24} />
                    </button>

                    {/* Left Side: Image/Info */}


                    {/* Main Content: Form */}
                    <div className="contact-modal-body">
                        <h2 className="contact-title mb-1">Get in Touch</h2>
                        <p className="text-secondary mb-4">I'd love to hear about your project</p>

                        {submitStatus === "success" && (
                            <div className="alert alert-success mb-4 text-sm p-3 rounded bg-green-50 text-green-700 border border-green-200">
                                Message sent successfully! I'll get back to you soon.
                            </div>
                        )}

                        {submitStatus === "error" && (
                            <div className="alert alert-error mb-4 text-sm p-3 rounded bg-red-50 text-red-700 border border-red-200">
                                {errorMessage || "Something went wrong. Please try again."}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="form-group mb-3">
                                <label htmlFor="modal-name">Full Name</label>
                                <input
                                    id="modal-name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your full name"
                                    className="form-control"
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label htmlFor="modal-email">Email Address</label>
                                <input
                                    id="modal-email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="your@email.com"
                                    className="form-control"
                                />
                            </div>

                            <div className="form-group mb-4">
                                <label htmlFor="modal-message">Your Message</label>
                                <textarea
                                    id="modal-message"
                                    name="message"
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    placeholder="Tell me about your project..."
                                    className="form-control"
                                />
                            </div>

                            <input
                                type="text"
                                name="website"
                                value={honeypot}
                                onChange={(e) => setHoneypot(e.target.value)}
                                style={{ position: 'absolute', opacity: 0, zIndex: -1 }}
                                tabIndex={-1}
                                autoComplete="off"
                            />

                            <div className="mb-3" ref={widgetRef} style={{ minHeight: '65px' }} />

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="submit-btn"
                            >
                                {isSubmitting ? "Sending..." : "Send Message"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.75);
          z-index: 9998;
          backdrop-filter: blur(4px);
          animation: fadeIn 0.3s ease;
        }

        .contact-modal {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 9999;
          animation: slideUp 0.3s ease;
          width: 90vw;
          max-width: 550px;
        }

        .contact-modal-content {
          background: white;
          border-radius: 24px;
          overflow: hidden;
          display: flex;
          flex-direction: row;
          position: relative;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          max-height: 90vh;
        }

        .modal-close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.1);
          border: none;
          color: #333;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 20;
        }

        .modal-close-btn:hover {
          background: rgba(0, 0, 0, 0.8);
          color: white;
          transform: rotate(90deg);
        }



        .contact-modal-body {
          flex: 1;
          padding: 40px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }

        .contact-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: #1a1a1a;
        }

        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #4a5568;
            font-size: 0.9rem;
        }

        .form-control {
            width: 100%;
            padding: 12px 16px;
            border-radius: 12px;
            border: 2px solid #e2e8f0;
            background: #f8fafc;
            color: #1a202c;
            transition: all 0.3s ease;
            font-size: 1rem;
        }

        .form-control:focus {
            outline: none;
            border-color: #3b82f6;
            background: white;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .submit-btn {
            width: 100%;
            padding: 14px;
            border-radius: 12px;
            background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
            color: white;
            border: none;
            font-weight: 600;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 10px;
        }

        .submit-btn:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
        }

        .submit-btn:disabled {
            background: #9ca3af;
            cursor: not-allowed;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translate(-50%, -45%); }
          to { opacity: 1; transform: translate(-50%, -50%); }
        }


      `}</style>

            <Script
                src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
                async
                defer
                onLoad={() => setTsReady(true)}
            />
        </>
    );
};

export default ContactModal;
