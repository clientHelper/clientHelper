"use client";

import { useMemo, useState } from "react";

import Grainient from "@/components/Grainient";
import Image from "next/image";

type Locale = "en" | "bg";
type Direction = "left" | "up" | "right";
type QuestionOption = {
  value: string;
  label: string;
  theme: string;
};

type Question = {
  name: string;
  title: string;
  subtitle: string;
  options: [QuestionOption, QuestionOption, QuestionOption];
};

type CopySet = {
  ui: {
    brand: string;
    languageLabel: string;
    languageTitle: string;
    languageEnglish: string;
    languageBulgarian: string;
    progressLabel: string;
    progressLanguage: string;
    progressQuestion: (index: number, total: number) => string;
    progressDetails: string;
    back: string;
    detailsTitle: string;
    detailsSubtitle: string;
    fieldBrand: string;
    fieldContact: string;
    fieldEmail: string;
    fieldLink: string;
    fieldNotes: string;
    notesPlaceholder: string;
    submit: string;
    sending: string;
    sent: string;
    recipientMissing: string;
    detailsMissing: string;
    fallback: string;
    statusReady: string;
    successTitle: string;
    successMessage: string;
    successButton: string;
  };
  questions: Question[];
};

const copy: Record<Locale, CopySet> = {
  en: {
    ui: {
      brand: "Your Logo",
      languageLabel: "Language",
      languageTitle: "Choose your language",
      languageEnglish: "English",
      languageBulgarian: "Bulgarian",
      progressLabel: "Step",
      progressLanguage: "Language",
      progressQuestion: (index, total) => `${index} / ${total}`,
      progressDetails: "Details",
      back: "Back",
      detailsTitle: "Send the brief",
      detailsSubtitle: "Add the delivery details.",
      fieldBrand: "Brand name",
      fieldContact: "Contact name",
      fieldEmail: "Email address",
      fieldLink: "Website or Instagram",
      fieldNotes: "Additional notes",
      notesPlaceholder:
        "References, audience notes, or anything we should know.",
      submit: "Send questionnaire",
      sending: "Sending your questionnaire...",
      sent: "Questionnaire sent successfully.",
      recipientMissing:
        "Set your real email address in the form before using this live.",
      detailsMissing: "Complete the final details before sending.",
      fallback: "Automatic sending was blocked, so your email app was opened.",
      statusReady: "Complete the final details and send the brief.",
      successTitle: "Thank you",
      successMessage:
        "Your questionnaire has been sent successfully. We will get back to you soon.",
      successButton: "Send another request",
    },
    questions: [
      {
        name: "brand_personality",
        title: "How should your brand feel online?",
        subtitle: "Choose the closest direction.",
        options: [
          {
            value: "Elegant and refined",
            label: "Elegant",
            theme: "theme-editorial",
          },
          {
            value: "Modern and minimal",
            label: "Minimal",
            theme: "theme-minimal-luxury",
          },
          {
            value: "Bold and high-end",
            label: "Bold",
            theme: "theme-bold-premium",
          },
        ],
      },
      {
        name: "website_goal",
        title: "What should the website do best?",
        subtitle: "Choose the main priority.",
        options: [
          {
            value: "Build trust and credibility",
            label: "Build trust",
            theme: "theme-soft-neutrals",
          },
          {
            value: "Generate more inquiries or sales",
            label: "Drive sales",
            theme: "theme-dark-contrast",
          },
          {
            value: "Showcase the brand visually",
            label: "Showcase brand",
            theme: "theme-muted-luxury",
          },
        ],
      },
      {
        name: "visual_style",
        title: "Which visual style fits your brand best?",
        subtitle: "Choose the closest aesthetic.",
        options: [
          {
            value: "Luxury editorial",
            label: "Editorial",
            theme: "theme-serif-elegant",
          },
          {
            value: "Clean modern minimalism",
            label: "Modern minimal",
            theme: "theme-sans-minimal",
          },
          {
            value: "Fashion-forward and expressive",
            label: "Expressive",
            theme: "theme-fashion-contrast",
          },
        ],
      },
      {
        name: "layout_feeling",
        title: "How should the website feel while scrolling?",
        subtitle: "Choose the browsing experience.",
        options: [
          {
            value: "Calm and spacious",
            label: "Calm",
            theme: "theme-spacious-airy",
          },
          {
            value: "Structured and organized",
            label: "Structured",
            theme: "theme-grid-structured",
          },
          {
            value: "Dynamic and immersive",
            label: "Immersive",
            theme: "theme-magazine-inspired",
          },
        ],
      },
      {
        name: "content_focus",
        title: "What should stand out the most?",
        subtitle: "Choose the main focus.",
        options: [
          {
            value: "Photography and visuals",
            label: "Visuals",
            theme: "theme-lifestyle-photo",
          },
          {
            value: "Products or services",
            label: "Products",
            theme: "theme-product-first",
          },
          {
            value: "Typography and messaging",
            label: "Typography",
            theme: "theme-minimal-type",
          },
        ],
      },
      {
        name: "interaction_style",
        title: "How animated should the experience feel?",
        subtitle: "Choose the motion intensity.",
        options: [
          {
            value: "Subtle and smooth",
            label: "Subtle",
            theme: "theme-subtle-refined",
          },
          {
            value: "Modern and polished",
            label: "Polished",
            theme: "theme-soft-polished",
          },
          {
            value: "Bold and interactive",
            label: "Interactive",
            theme: "theme-bold-transitions",
          },
        ],
      },
      {
        name: "visitor_impression",
        title: "What should visitors think instantly?",
        subtitle: "Choose the strongest impression.",
        options: [
          {
            value: "This brand feels premium",
            label: "Premium",
            theme: "theme-feel-inspired",
          },
          {
            value: "This business feels trustworthy",
            label: "Trustworthy",
            theme: "theme-feel-confident",
          },
          {
            value: "This brand feels unique",
            label: "Unique",
            theme: "theme-feel-exclusive",
          },
        ],
      },
      {
        name: "avoid_style",
        title: "What should we avoid the most?",
        subtitle: "Choose what should NOT happen.",
        options: [
          {
            value: "Looking too generic",
            label: "Generic",
            theme: "theme-avoid-corporate",
          },
          {
            value: "Feeling too crowded",
            label: "Crowded",
            theme: "theme-avoid-playful",
          },
          {
            value: "Following short-term trends",
            label: "Trendy",
            theme: "theme-avoid-trendy",
          },
        ],
      },
    ],
  },
  bg: {
    ui: {
      brand: "Your Logo",
      languageLabel: "Език",
      languageTitle: "Изберете език",
      languageEnglish: "English",
      languageBulgarian: "Български",
      progressLabel: "Стъпка",
      progressLanguage: "Език",
      progressQuestion: (index, total) => `${index} / ${total}`,
      progressDetails: "Детайли",
      back: "Назад",
      detailsTitle: "Изпращане на брифа",
      detailsSubtitle: "Добавете данните за изпращане.",
      fieldBrand: "Име на бранда",
      fieldContact: "Лице за контакт",
      fieldEmail: "Имейл адрес",
      fieldLink: "Уебсайт или Instagram",
      fieldNotes: "Допълнителни бележки",
      notesPlaceholder: "Референции, аудитория или всичко важно за проекта.",
      submit: "Изпрати въпросника",
      sending: "Изпращаме въпросника...",
      sent: "Въпросникът е изпратен успешно.",
      recipientMissing:
        "Задайте реален имейл адрес във формата преди да го използвате.",
      detailsMissing: "Попълнете финалните данни преди изпращане.",
      fallback:
        "Автоматичното изпращане беше блокирано и отвори имейл приложението.",
      statusReady: "Попълнете финалните данни и изпратете брифа.",
      successTitle: "Благодарим ви",
      successMessage:
        "Вашият въпросник беше изпратен успешно. Ще се свържем с вас скоро.",
      successButton: "Изпрати ново запитване",
    },
    questions: [
      {
        name: "brand_personality",
        title: "Как трябва да се усеща вашият бранд онлайн?",
        subtitle: "Изберете най-близката посока.",
        options: [
          {
            value: "Елегантен и изискан",
            label: "Елегантен",
            theme: "theme-editorial",
          },
          {
            value: "Модерен и минималистичен",
            label: "Минимален",
            theme: "theme-minimal-luxury",
          },
          {
            value: "Смел и премиум",
            label: "Смел",
            theme: "theme-bold-premium",
          },
        ],
      },
      {
        name: "website_goal",
        title: "Каква е основната цел на сайта?",
        subtitle: "Изберете основния приоритет.",
        options: [
          {
            value: "Да изгражда доверие",
            label: "Доверие",
            theme: "theme-soft-neutrals",
          },
          {
            value: "Да носи повече запитвания или продажби",
            label: "Продажби",
            theme: "theme-dark-contrast",
          },
          {
            value: "Да представя бранда визуално",
            label: "Визия",
            theme: "theme-muted-luxury",
          },
        ],
      },
      {
        name: "visual_style",
        title: "Кой визуален стил подхожда най-много?",
        subtitle: "Изберете най-близката естетика.",
        options: [
          {
            value: "Луксозен редакционен стил",
            label: "Редакционен",
            theme: "theme-serif-elegant",
          },
          {
            value: "Изчистен модерен минимализъм",
            label: "Минимален",
            theme: "theme-sans-minimal",
          },
          {
            value: "Смел и модерен стил",
            label: "Експресивен",
            theme: "theme-fashion-contrast",
          },
        ],
      },
      {
        name: "layout_feeling",
        title: "Как трябва да се усеща сайтът при скрол?",
        subtitle: "Изберете усещането.",
        options: [
          {
            value: "Спокоен и просторен",
            label: "Спокоен",
            theme: "theme-spacious-airy",
          },
          {
            value: "Подреден и структуриран",
            label: "Структуриран",
            theme: "theme-grid-structured",
          },
          {
            value: "Динамичен и завладяващ",
            label: "Динамичен",
            theme: "theme-magazine-inspired",
          },
        ],
      },
      {
        name: "content_focus",
        title: "Какво трябва да изпъква най-много?",
        subtitle: "Изберете основния фокус.",
        options: [
          {
            value: "Снимки и визуално съдържание",
            label: "Визии",
            theme: "theme-lifestyle-photo",
          },
          {
            value: "Продукти или услуги",
            label: "Продукти",
            theme: "theme-product-first",
          },
          {
            value: "Типография и текст",
            label: "Типография",
            theme: "theme-minimal-type",
          },
        ],
      },
      {
        name: "interaction_style",
        title: "Колко динамичен да бъде сайтът?",
        subtitle: "Изберете нивото на анимации.",
        options: [
          {
            value: "Фин и плавен",
            label: "Фин",
            theme: "theme-subtle-refined",
          },
          {
            value: "Модерен и полиран",
            label: "Полиран",
            theme: "theme-soft-polished",
          },
          {
            value: "Силен и интерактивен",
            label: "Интерактивен",
            theme: "theme-bold-transitions",
          },
        ],
      },
      {
        name: "visitor_impression",
        title: "Какво трябва да си помислят посетителите веднага?",
        subtitle: "Изберете най-силното впечатление.",
        options: [
          {
            value: "Този бранд изглежда премиум",
            label: "Премиум",
            theme: "theme-feel-inspired",
          },
          {
            value: "Този бизнес вдъхва доверие",
            label: "Доверие",
            theme: "theme-feel-confident",
          },
          {
            value: "Този бранд е различен",
            label: "Уникален",
            theme: "theme-feel-exclusive",
          },
        ],
      },
      {
        name: "avoid_style",
        title: "Какво трябва да избегнем най-много?",
        subtitle: "Изберете какво НЕ искате.",
        options: [
          {
            value: "Да изглежда прекалено стандартно",
            label: "Стандартно",
            theme: "theme-avoid-corporate",
          },
          {
            value: "Да изглежда претрупано",
            label: "Претрупано",
            theme: "theme-avoid-playful",
          },
          {
            value: "Да следва временни трендове",
            label: "Трендово",
            theme: "theme-avoid-trendy",
          },
        ],
      },
    ],
  },
};
const getDirectionForOption = (index: number): Direction => {
  if (index === 0) return "left";
  if (index === 1) return "up";
  return "right";
};

const wait = (ms: number) =>
  new Promise((resolve) => window.setTimeout(resolve, ms));

export default function Page() {
  const [locale, setLocale] = useState<Locale>("en");
  const [languageSelected, setLanguageSelected] = useState(false);
  const [step, setStep] = useState(0);
  const [cardState, setCardState] = useState<
    | "idle"
    | "exit-left"
    | "exit-up"
    | "exit-right"
    | "enter-left"
    | "enter-up"
    | "enter-right"
  >("idle");
  const [submitState, setSubmitState] = useState<
    "idle" | "success" | "rate-limited" | "error"
  >("idle");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [formValues, setFormValues] = useState({
    brand_name: "",
    contact_name: "",
    contact_email: "",
    brand_link: "",
    extra_notes: "",
    website: "",
  });

  const [isAnimating, setIsAnimating] = useState(false);
  const [formStatus, setFormStatus] = useState("");
  const [isSending, setIsSending] = useState(false);

  const activeCopy = copy[locale];
  const questions = activeCopy.questions;
  const detailsStep = questions.length + 1;

  const progressText = useMemo(() => {
    if (!languageSelected) {
      return activeCopy.ui.progressLanguage;
    }

    if (step <= questions.length) {
      return activeCopy.ui.progressQuestion(step, questions.length);
    }

    return activeCopy.ui.progressDetails;
  }, [activeCopy.ui, languageSelected, questions.length, step]);

  const animateTo = async (direction: Direction, next: () => void) => {
    if (isAnimating) return;

    setIsAnimating(true);

    setCardState(`exit-${direction}` as typeof cardState);

    await wait(360);

    next();

    const enterDirection =
      direction === "left" ? "right" : direction === "right" ? "left" : "up";

    await new Promise(requestAnimationFrame);

    setCardState(`enter-${enterDirection}` as typeof cardState);

    await wait(360);

    setCardState("idle");

    setIsAnimating(false);
  };

  const resetFlow = (nextLocale: Locale) => {
    setLocale(nextLocale);
    setLanguageSelected(true);
    setAnswers({});
    setFormValues({
      brand_name: "",
      contact_name: "",
      contact_email: "",
      brand_link: "",
      extra_notes: "",
      website: "",
    });
    setFormStatus("");
    setStep(1);
  };

  const handleLanguageChoice = async (
    nextLocale: Locale,
    direction: Direction
  ) => {
    await animateTo(direction, () => resetFlow(nextLocale));
  };

  const handleOptionChoice = async (
    questionName: string,
    value: string,
    direction: Direction
  ) => {
    setAnswers((current) => ({ ...current, [questionName]: value }));
    setFormStatus("");
    await animateTo(direction, () => {
      setStep((current) => Math.min(current + 1, detailsStep));
    });
  };

  const handleBack = () => {
    if (!languageSelected && step === 0) {
      return;
    }

    if (step <= 1) {
      setLanguageSelected(false);
      setStep(0);
      setFormStatus("");
      return;
    }

    setStep((current) => Math.max(1, current - 1));
    setFormStatus("");
  };

  const buildSummary = () => {
    const questionSummary = questions
      .map((question) => {
        const selected = answers[question.name] || "-";
        return `${question.title}: ${selected}`;
      })
      .join("\n");

    return [
      `Language: ${locale === "bg" ? "Bulgarian" : "English"}`,
      `Brand Name: ${formValues.brand_name || "-"}`,
      `Contact Name: ${formValues.contact_name || "-"}`,
      `Email: ${formValues.contact_email || "-"}`,
      `Website / Instagram: ${formValues.brand_link || "-"}`,
      "",
      questionSummary,
      "",
      `Additional Notes: ${formValues.extra_notes || "-"}`,
    ].join("\n");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSending) return;
    const formElement = event.currentTarget;
    if (!formElement.reportValidity()) {
      setFormStatus(activeCopy.ui.detailsMissing);
      return;
    }
    setIsSending(true);
    setFormStatus(activeCopy.ui.sending);

    try {
      const controller = new AbortController();

      const timeout = setTimeout(() => {
        controller.abort();
      }, 10000);

      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        signal: controller.signal,
        body: JSON.stringify({
          brand_name: formValues.brand_name,
          contact_name: formValues.contact_name,
          contact_email: formValues.contact_email,
          brand_link: formValues.brand_link,
          extra_notes: formValues.extra_notes,
          answers,
          summary: buildSummary(),
          locale,
          website: formValues.website,
        }),
      });

      console.log("STATUS:", response.status);
      console.log("OK:", response.ok);

      const data = await response.json();
      console.log("DATA:", data);

      clearTimeout(timeout);

      if (!response.ok) {
        if (response.status === 429) {
          setSubmitState("rate-limited");
          return;
        }

        setSubmitState("error");
        return;
      }

      setSubmitState("success");
    } catch (error) {
      console.error(error);
      setSubmitState("error");
    } finally {
      setIsSending(false);
    }
  };

  const cardClassName =
    cardState === "idle" ? "deck-card" : `deck-card deck-card--${cardState}`;

  const currentQuestion =
    step > 0 && step <= questions.length ? questions[step - 1] : null;

  return (
    <div className="questionnaire-page">
      <div className="questionnaire-background" aria-hidden="true">
        <Grainient
          blendAngle={10}
          blendSoftness={0.16}
          centerX={0}
          centerY={0}
          color1="#ffffff"
          color2="#000000"
          color3="#ffffff"
          colorBalance={0}
          contrast={1.5}
          gamma={1}
          grainAmount={0.1}
          grainAnimated={false}
          grainScale={2}
          noiseScale={2}
          rotationAmount={500}
          saturation={1}
          timeSpeed={0.25}
          warpAmplitude={30}
          warpFrequency={5}
          warpSpeed={2}
          warpStrength={1}
          zoom={0.9}
        />
      </div>

      <div className="questionnaire-overlay" aria-hidden="true" />

      <main className="questionnaire-shell">
        <form
          className="questionnaire-stage"
          data-recipient="hello@yourstudio.com"
          onSubmit={handleSubmit}
        >
          <article className={cardClassName}>
            <div className="deck-card__top">
              <div className="deck-card__brand">
                <div className="deck-card__logo">
                  <Image
                    src="/g6.svg"
                    alt="Logo"
                    width={60}
                    height={60}
                    style={{ objectFit: "contain" }}
                    priority
                  />
                </div>
                <div className="deck-card__meta">
                  <span>{activeCopy.ui.progressLabel}</span>
                  <strong>{progressText}</strong>
                </div>
              </div>

              {submitState === "idle" && (languageSelected || step > 0) && (
                <button
                  className="deck-card__back"
                  type="button"
                  onClick={handleBack}
                >
                  {activeCopy.ui.back}
                </button>
              )}
            </div>

            {submitState === "success" ? (
              <div className="success-screen">
                <div className="success-screen__badge">✓</div>

                <div className="success-screen__content">
                  <span className="success-screen__eyebrow">
                    {locale === "bg" ? "Успешно" : "Success"}
                  </span>

                  <h1>{locale === "bg" ? "Благодарим ви" : "Thank you"}</h1>

                  <p>
                    {locale === "bg"
                      ? "Вашият въпросник беше изпратен успешно."
                      : "Your questionnaire was sent successfully."}
                  </p>
                </div>
              </div>
            ) : submitState === "rate-limited" ? (
              <div className="success-screen">
                <div className="success-screen__badge">!</div>

                <div className="success-screen__content">
                  <span className="success-screen__eyebrow">
                    {locale === "bg" ? "Лимит" : "Rate Limited"}
                  </span>

                  <h1>
                    {locale === "bg"
                      ? "Твърде много заявки"
                      : "Too many requests"}
                  </h1>

                  <p>
                    {locale === "bg"
                      ? "Моля опитайте отново по-късно."
                      : "Please try again later."}
                  </p>
                </div>
              </div>
            ) : submitState === "error" ? (
              <div className="success-screen">
                <div className="success-screen__badge">×</div>

                <div className="success-screen__content">
                  <span className="success-screen__eyebrow">
                    {locale === "bg" ? "Грешка" : "Error"}
                  </span>

                  <h1>
                    {locale === "bg"
                      ? "Нещо се обърка"
                      : "Something went wrong"}
                  </h1>

                  <p>
                    {locale === "bg"
                      ? "Моля опитайте отново."
                      : "Please try again."}
                  </p>
                </div>
              </div>
            ) : !languageSelected ? (
              <div className="language-screen">
                <span className="language-screen__eyebrow">
                  {activeCopy.ui.languageLabel}
                </span>

                <h1>{activeCopy.ui.languageTitle}</h1>

                <div className="language-screen__actions">
                  <button
                    className="pill-button pill-button--light"
                    type="button"
                    onClick={() => handleLanguageChoice("en", "left")}
                  >
                    {activeCopy.ui.languageEnglish}
                  </button>

                  <button
                    className="pill-button pill-button--dark"
                    type="button"
                    onClick={() => handleLanguageChoice("bg", "right")}
                  >
                    {activeCopy.ui.languageBulgarian}
                  </button>
                </div>
              </div>
            ) : currentQuestion ? (
              <div className="question-screen">
                <div className="question-screen__copy">
                  <h1>{currentQuestion.title}</h1>
                  <p>{currentQuestion.subtitle}</p>
                </div>

                <div className="question-options">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={`${currentQuestion.name}-${option.value}`}
                      className={`option-card ${option.theme}`}
                      type="button"
                      disabled={isAnimating}
                      onClick={() =>
                        handleOptionChoice(
                          currentQuestion.name,
                          option.value,
                          getDirectionForOption(index)
                        )
                      }
                    >
                      <span
                        className="option-card__visual"
                        aria-hidden="true"
                      />
                      <span className="option-card__label">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="details-screen">
                <div className="question-screen__copy">
                  <h1>{activeCopy.ui.detailsTitle}</h1>
                  <p>{activeCopy.ui.detailsSubtitle}</p>
                </div>

                <div className="details-grid">
                  <input
                    type="text"
                    name="website"
                    autoComplete="off"
                    tabIndex={-1}
                    className="hidden"
                    value={formValues.website}
                    onChange={(event) =>
                      setFormValues((current) => ({
                        ...current,
                        website: event.target.value,
                      }))
                    }
                  />

                  <label className="field">
                    <span>{activeCopy.ui.fieldBrand}</span>
                    <input
                      required
                      type="text"
                      value={formValues.brand_name}
                      onChange={(event) =>
                        setFormValues((current) => ({
                          ...current,
                          brand_name: event.target.value,
                        }))
                      }
                    />
                  </label>

                  <label className="field">
                    <span>{activeCopy.ui.fieldContact}</span>
                    <input
                      required
                      type="text"
                      value={formValues.contact_name}
                      onChange={(event) =>
                        setFormValues((current) => ({
                          ...current,
                          contact_name: event.target.value,
                        }))
                      }
                    />
                  </label>

                  <label className="field">
                    <span>{activeCopy.ui.fieldEmail}</span>
                    <input
                      required
                      type="email"
                      value={formValues.contact_email}
                      onChange={(event) =>
                        setFormValues((current) => ({
                          ...current,
                          contact_email: event.target.value,
                        }))
                      }
                    />
                  </label>

                  <label className="field">
                    <span>{activeCopy.ui.fieldLink}</span>
                    <input
                      type="text"
                      value={formValues.brand_link}
                      onChange={(event) =>
                        setFormValues((current) => ({
                          ...current,
                          brand_link: event.target.value,
                        }))
                      }
                    />
                  </label>

                  <label className="field field--wide">
                    <span>{activeCopy.ui.fieldNotes}</span>
                    <textarea
                      rows={4}
                      value={formValues.extra_notes}
                      placeholder={activeCopy.ui.notesPlaceholder}
                      onChange={(event) =>
                        setFormValues((current) => ({
                          ...current,
                          extra_notes: event.target.value,
                        }))
                      }
                    />
                  </label>
                </div>

                <div className="details-actions">
                  <p>{formStatus || activeCopy.ui.statusReady}</p>

                  <button
                    className="pill-button pill-button--submit"
                    disabled={isSending || isAnimating}
                    type="submit"
                  >
                    {isSending ? activeCopy.ui.sending : activeCopy.ui.submit}
                  </button>
                </div>
              </div>
            )}
          </article>
        </form>
      </main>
    </div>
  );
}
