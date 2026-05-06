"use client";

import { useEffect, useState } from "react";

type ContactLauncherProps = {
  imageUrl: string;
};

export function ContactLauncher({ imageUrl }: ContactLauncherProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const openContact = () => setIsOpen(true);

    window.addEventListener("open-contact", openContact);

    return () => {
      window.removeEventListener("open-contact", openContact);
    };
  }, []);

  return (
    <>
      <button className="work-section__cta" type="button" onClick={() => setIsOpen(true)}>
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

          <form className="contact-form">
            <div className="contact-form__row">
              <label htmlFor="contact-name">NAME</label>
              <input id="contact-name" name="name" type="text" placeholder="CHUCK NORRIS" />
            </div>
            <div className="contact-form__row">
              <label htmlFor="contact-email">EMAIL</label>
              <input id="contact-email" name="email" type="email" placeholder="WALKER@TEXAS-RANGERS.COM" />
            </div>
            <div className="contact-form__row">
              <label htmlFor="contact-phone">PHONE</label>
              <input id="contact-phone" name="phone" type="tel" placeholder="XXXXXXXXXX" />
            </div>
            <div className="contact-form__row contact-form__row--interest">
              <span>INTEREST</span>
              <div className="contact-form__chips" aria-label="Interest options">
                <label>
                  <input name="interest" type="checkbox" value="design" />
                  <span>DESIGN</span>
                </label>
                <label>
                  <input name="interest" type="checkbox" value="webflow" />
                  <span>WEBFLOW DEVELOPMENT</span>
                </label>
                <label>
                  <input name="interest" type="checkbox" value="full-package" />
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
              />
            </div>

            <p className="contact-form__policy">
              BY CLICKING ON &quot;SEND&quot;, YOU ACCEPT OUR <a href="/legal">POLICY</a>.
            </p>
            <button className="contact-form__send" type="submit">SEND</button>
          </form>
        </div>
      </div>
    </>
  );
}
