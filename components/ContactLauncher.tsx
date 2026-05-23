"use client";

import { useEffect, useState } from "react";

type ContactLauncherProps = {
  imageUrl: string;
};

export function ContactLauncher({ imageUrl }: ContactLauncherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const openContact = () => {
      setIsOpen(true);
      setSubmitStatus("idle");
      setErrorMessage("");
    };

    window.addEventListener("open-contact", openContact);

    return () => {
      window.removeEventListener("open-contact", openContact);
    };
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const formData = new FormData(event.currentTarget);
      const name = formData.get("name") as string;
      const email = formData.get("email") as string;
      const phone = formData.get("phone") as string;
      const message = formData.get("message") as string;
      const interests = formData.getAll("interest") as string[];

      if (!name.trim()) throw new Error("Name is required");
      if (!email.trim()) throw new Error("Email is required");
      if (!message.trim()) throw new Error("Message is required");

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          interests,
          message,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.error || data?.detail || "Failed to send message");
      }

      setSubmitStatus("success");
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button className="work-section__cta" type="button" onClick={() => { setIsOpen(true); setSubmitStatus("idle"); setErrorMessage(""); }}>
        SAY HELLO <span aria-hidden="true">-&gt;</span>
      </button>

      <div className="contact-page" data-open={isOpen} aria-hidden={!isOpen}>
        <div className="contact-page__panel" role="dialog" aria-modal="true" aria-labelledby="contact-title">
          <button className="contact-page__close" type="button" onClick={() => setIsOpen(false)}>
            CLOSE <span aria-hidden="true" />
          </button>

          <h2 className="contact-page__title" id="contact-title">
            <span>LET&apos;S WORK</span>
            <span>
              <img
                alt=""
                src={imageUrl}
              />
              TOGETHER
            </span>
          </h2>

          {submitStatus === "success" ? (
            <div style={{ textAlign: "center", padding: "80px 20px" }}>
              <h3 style={{ fontSize: "28px", letterSpacing: "2px", marginBottom: "16px", color: "#fff" }}>THANK YOU!</h3>
              <p style={{ color: "#aaa", fontSize: "14px", letterSpacing: "1px", textTransform: "uppercase" }}>
                Your message has been sent. Afonso will be in touch soon.
              </p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-form__row">
                <label htmlFor="contact-name">NAME</label>
                <input id="contact-name" name="name" type="text" placeholder="CHUCK NORRIS" required />
              </div>
              <div className="contact-form__row">
                <label htmlFor="contact-email">EMAIL</label>
                <input id="contact-email" name="email" type="email" placeholder="WALKER@TEXAS-RANGERS.COM" required />
              </div>
              <div className="contact-form__row">
                <label htmlFor="contact-phone">PHONE</label>
                <input id="contact-phone" name="phone" type="tel" placeholder="XXXXXXXXXX" />
              </div>
              <div className="contact-form__row contact-form__row--interest">
                <span>INTEREST</span>
                <div className="contact-form__chips" aria-label="Interest options">
                  <label>
                    <input name="interest" type="checkbox" value="DESIGN" />
                    <span>DESIGN</span>
                  </label>
                  <label>
                    <input name="interest" type="checkbox" value="DEVELOPMENT" />
                    <span>DEVELOPMENT</span>
                  </label>
                  <label>
                    <input name="interest" type="checkbox" value="FULL PACKAGE" />
                    <span>FULL PACKAGE</span>
                  </label>
                </div>
              </div>
              <div className="contact-form__row contact-form__row--message">
                <label htmlFor="contact-message">MESSAGE</label>
                <textarea
                  id="contact-message"
                  name="message"
                  placeholder="GIVE US A SHORT PROJECT BRIEF, DEADLINE, BUDGET, ETC."
                  rows={2}
                  required
                />
              </div>

              {errorMessage && (
                <p style={{ color: "#ff4d4d", fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px", margin: "15px 0 0 0" }}>
                  {errorMessage}
                </p>
              )}

              <p className="contact-form__policy">
                BY CLICKING ON &quot;SEND&quot;, YOU ACCEPT OUR <a href="/legal">POLICY</a>.
              </p>
              <button className="contact-form__send" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "SENDING..." : "SEND"}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
