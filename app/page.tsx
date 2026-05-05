"use client";

import { useMemo, useState } from "react";

import Grainient from "@/components/Grainient";
import Image from "next/image";

type Locale = "en" | "bg";
type Direction = "left" | "right";

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
  };
  questions: Question[];
};

const copy: Record<Locale, CopySet> = {
  en: {
    ui: {
      brand: "Your Logo",
      languageLabel: "Language",
      languageTitle: "Choose your languageeeeeee",
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
    },
    questions: [
      {
        name: "brand_direction",
        title: "Which overall website direction feels most like your brand?",
        subtitle: "Pick the lead mood.",
        options: [
          {
            value: "Editorial and elevated",
            label: "Editorial and elevated",
            theme: "theme-editorial",
          },
          {
            value: "Minimal and luxurious",
            label: "Minimal and luxurious",
            theme: "theme-minimal-luxury",
          },
          {
            value: "Bold and premium",
            label: "Bold and premium",
            theme: "theme-bold-premium",
          },
        ],
      },
      {
        name: "color_mood",
        title: "What color mood should the website lean into?",
        subtitle: "Choose the color atmosphere.",
        options: [
          {
            value: "Soft neutrals",
            label: "Soft neutrals",
            theme: "theme-soft-neutrals",
          },
          {
            value: "High-contrast dark tones",
            label: "Dark contrast",
            theme: "theme-dark-contrast",
          },
          {
            value: "Muted luxury tones",
            label: "Muted luxury",
            theme: "theme-muted-luxury",
          },
        ],
      },
      {
        name: "type_style",
        title: "Which typography feeling fits best?",
        subtitle: "Choose the typographic voice.",
        options: [
          {
            value: "Elegant serif-led",
            label: "Elegant serif",
            theme: "theme-serif-elegant",
          },
          {
            value: "Modern minimalist sans-serif",
            label: "Minimal sans",
            theme: "theme-sans-minimal",
          },
          {
            value: "Fashion-forward contrast type",
            label: "Fashion contrast",
            theme: "theme-fashion-contrast",
          },
        ],
      },
      {
        name: "layout_style",
        title: "How should the layout feel as people scroll?",
        subtitle: "Choose the page rhythm.",
        options: [
          {
            value: "Spacious and airy",
            label: "Spacious and airy",
            theme: "theme-spacious-airy",
          },
          {
            value: "Grid-based and structured",
            label: "Grid and structured",
            theme: "theme-grid-structured",
          },
          {
            value: "Magazine-inspired",
            label: "Magazine inspired",
            theme: "theme-magazine-inspired",
          },
        ],
      },
      {
        name: "imagery_style",
        title: "What kind of imagery should lead the experience?",
        subtitle: "Choose the image direction.",
        options: [
          {
            value: "Lifestyle photography",
            label: "Lifestyle photography",
            theme: "theme-lifestyle-photo",
          },
          {
            value: "Product-first imagery",
            label: "Product-first imagery",
            theme: "theme-product-first",
          },
          {
            value: "Minimal imagery, more typography",
            label: "Minimal with type",
            theme: "theme-minimal-type",
          },
        ],
      },
      {
        name: "motion_style",
        title: "How interactive should the website feel?",
        subtitle: "Choose the motion language.",
        options: [
          {
            value: "Subtle and refined",
            label: "Subtle and refined",
            theme: "theme-subtle-refined",
          },
          {
            value: "Soft and polished",
            label: "Soft and polished",
            theme: "theme-soft-polished",
          },
          {
            value: "Bold transitions",
            label: "Bold transitions",
            theme: "theme-bold-transitions",
          },
        ],
      },
      {
        name: "visitor_feeling",
        title: "What should visitors feel when they land on the site?",
        subtitle: "Choose the first feeling.",
        options: [
          {
            value: "Inspired",
            label: "Inspired",
            theme: "theme-feel-inspired",
          },
          {
            value: "Confident",
            label: "Confident",
            theme: "theme-feel-confident",
          },
          {
            value: "Exclusive",
            label: "Exclusive",
            theme: "theme-feel-exclusive",
          },
        ],
      },
      {
        name: "avoid_direction",
        title: "Which direction should we avoid the most?",
        subtitle: "Choose the one to avoid.",
        options: [
          {
            value: "Too corporate",
            label: "Too corporate",
            theme: "theme-avoid-corporate",
          },
          {
            value: "Too playful",
            label: "Too playful",
            theme: "theme-avoid-playful",
          },
          {
            value: "Too trend-driven",
            label: "Too trend-driven",
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
    },
    questions: [
      {
        name: "brand_direction",
        title: "Коя цялостна посока най-добре отразява вашия бранд?",
        subtitle: "Изберете основното усещане.",
        options: [
          {
            value: "Редакционна и елегантна",
            label: "Редакционна и елегантна",
            theme: "theme-editorial",
          },
          {
            value: "Минимална и луксозна",
            label: "Минимална и луксозна",
            theme: "theme-minimal-luxury",
          },
          {
            value: "Смела и премиум",
            label: "Смела и премиум",
            theme: "theme-bold-premium",
          },
        ],
      },
      {
        name: "color_mood",
        title: "Към какво цветово усещане да се насочи сайтът?",
        subtitle: "Изберете цветната атмосфера.",
        options: [
          {
            value: "Меки неутрални тонове",
            label: "Меки неутрални",
            theme: "theme-soft-neutrals",
          },
          {
            value: "Тъмен висок контраст",
            label: "Тъмен контраст",
            theme: "theme-dark-contrast",
          },
          {
            value: "Приглушен лукс",
            label: "Приглушен лукс",
            theme: "theme-muted-luxury",
          },
        ],
      },
      {
        name: "type_style",
        title: "Кое типографско усещане е най-подходящо?",
        subtitle: "Изберете гласа на типографията.",
        options: [
          {
            value: "Елегантна серифна типография",
            label: "Елегантен сериф",
            theme: "theme-serif-elegant",
          },
          {
            value: "Модерен минималистичен санс",
            label: "Минимален санс",
            theme: "theme-sans-minimal",
          },
          {
            value: "Модна контрастна типография",
            label: "Моден контраст",
            theme: "theme-fashion-contrast",
          },
        ],
      },
      {
        name: "layout_style",
        title: "Как трябва да се усеща подредбата при скрол?",
        subtitle: "Изберете ритъма на страницата.",
        options: [
          {
            value: "Просторна и ефирна",
            label: "Просторна и ефирна",
            theme: "theme-spacious-airy",
          },
          {
            value: "Структурирана по грид",
            label: "Грид и структура",
            theme: "theme-grid-structured",
          },
          {
            value: "Редакционна като списание",
            label: "Като списание",
            theme: "theme-magazine-inspired",
          },
        ],
      },
      {
        name: "imagery_style",
        title: "Какъв тип изображения да водят преживяването?",
        subtitle: "Изберете визуалната посока.",
        options: [
          {
            value: "Лайфстайл фотография",
            label: "Лайфстайл фотография",
            theme: "theme-lifestyle-photo",
          },
          {
            value: "Фокус върху продукта",
            label: "Фокус върху продукта",
            theme: "theme-product-first",
          },
          {
            value: "Минимални визии и повече типография",
            label: "Минимално с типография",
            theme: "theme-minimal-type",
          },
        ],
      },
      {
        name: "motion_style",
        title: "Колко интерактивно да се усеща сайтът?",
        subtitle: "Изберете езика на движението.",
        options: [
          {
            value: "Фино и изискано",
            label: "Фино и изискано",
            theme: "theme-subtle-refined",
          },
          {
            value: "Меко и полирано",
            label: "Меко и полирано",
            theme: "theme-soft-polished",
          },
          {
            value: "Смели преходи",
            label: "Смели преходи",
            theme: "theme-bold-transitions",
          },
        ],
      },
      {
        name: "visitor_feeling",
        title: "Как трябва да се почувстват посетителите при първото влизане?",
        subtitle: "Изберете първото усещане.",
        options: [
          {
            value: "Вдъхновени",
            label: "Вдъхновени",
            theme: "theme-feel-inspired",
          },
          { value: "Уверени", label: "Уверени", theme: "theme-feel-confident" },
          {
            value: "Ексклузивно",
            label: "Ексклузивно",
            theme: "theme-feel-exclusive",
          },
        ],
      },
      {
        name: "avoid_direction",
        title: "Коя посока трябва най-много да избегнем?",
        subtitle: "Изберете какво да не бъде.",
        options: [
          {
            value: "Твърде корпоративно",
            label: "Твърде корпоративно",
            theme: "theme-avoid-corporate",
          },
          {
            value: "Твърде игриво",
            label: "Твърде игриво",
            theme: "theme-avoid-playful",
          },
          {
            value: "Твърде трендово",
            label: "Твърде трендово",
            theme: "theme-avoid-trendy",
          },
        ],
      },
    ],
  },
};

const getDirectionForOption = (index: number): Direction =>
  index === 0 ? "left" : "right";

const wait = (ms: number) =>
  new Promise((resolve) => window.setTimeout(resolve, ms));

export default function Page() {
  const [locale, setLocale] = useState<Locale>("en");
  const [languageSelected, setLanguageSelected] = useState(false);
  const [step, setStep] = useState(0);
  const [cardState, setCardState] = useState<
    "idle" | "exit-left" | "exit-right" | "enter-left" | "enter-right"
  >("idle");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [formValues, setFormValues] = useState({
    brand_name: "",
    contact_name: "",
    contact_email: "",
    brand_link: "",
    extra_notes: "",
  });
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
    setCardState(direction === "left" ? "exit-left" : "exit-right");
    await wait(360);
    next();
    setCardState(direction === "left" ? "enter-right" : "enter-left");
    await wait(360);
    setCardState("idle");
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

    const formElement = event.currentTarget;
    if (!formElement.reportValidity()) {
      setFormStatus(activeCopy.ui.detailsMissing);
      return;
    }

    const recipient = formElement.dataset.recipient?.trim();
    if (!recipient || recipient === "hello@yourstudio.com") {
      setFormStatus(activeCopy.ui.recipientMissing);
      return;
    }

    setIsSending(true);
    setFormStatus(activeCopy.ui.sending);

    const summary = buildSummary();
    const formData = new FormData();
    formData.set(
      "_subject",
      `${formValues.brand_name || "New"} Website Style Questionnaire`
    );
    formData.set("_captcha", "false");
    formData.set("language_choice", locale === "bg" ? "Bulgarian" : "English");
    formData.set("brand_name", formValues.brand_name);
    formData.set("contact_name", formValues.contact_name);
    formData.set("contact_email", formValues.contact_email);
    formData.set("brand_link", formValues.brand_link);
    formData.set("extra_notes", formValues.extra_notes);
    formData.set("project_summary", summary);

    questions.forEach((question) => {
      formData.set(question.name, answers[question.name] || "");
    });

    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${encodeURIComponent(recipient)}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Email service request failed.");
      }

      setFormStatus(activeCopy.ui.sent);
    } catch {
      const body = encodeURIComponent(summary);
      const subject = encodeURIComponent(
        `${formValues.brand_name || "New"} Website Style Questionnaire`
      );
      window.location.href = `mailto:${encodeURIComponent(recipient)}?subject=${subject}&body=${body}`;
      setFormStatus(activeCopy.ui.fallback);
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
                    src="/logo.png"
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

              {(languageSelected || step > 0) && (
                <button
                  className="deck-card__back"
                  type="button"
                  onClick={handleBack}
                >
                  {activeCopy.ui.back}
                </button>
              )}
            </div>

            {!languageSelected ? (
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
                    disabled={isSending}
                    type="submit"
                  >
                    {activeCopy.ui.submit}
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
